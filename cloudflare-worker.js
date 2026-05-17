// Cloudflare Worker — Groq API proxy for theshivamrohilla.in
//
// Deploy steps:
//   1. Go to https://workers.cloudflare.com → Create Worker → paste this file
//   2. Settings → Variables → add secret: GROQ_API_KEY = your key
//   3. Copy the worker URL (e.g. https://groq-proxy.yourname.workers.dev)
//   4. In index.html replace the fetch URL:
//        'https://api.groq.com/openai/v1/chat/completions'
//      with:
//        'https://groq-proxy.yourname.workers.dev'
//   5. Remove the Authorization header and GROQ_API_KEY variable from index.html
//
// Free tier: 100,000 requests/day — more than enough for a portfolio.

const ALLOWED_ORIGIN = 'https://theshivamrohilla.in';
const ALLOWED_MODELS = ['llama-3.3-70b-versatile'];
const MAX_TOKENS_CAP = 400;

export default {
    async fetch(request, env) {
        // CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }

        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405 });
        }

        // Origin check — only your portfolio can call this
        const origin = request.headers.get('Origin');
        if (origin !== ALLOWED_ORIGIN) {
            return new Response('Forbidden', { status: 403 });
        }

        let payload;
        try { payload = await request.json(); }
        catch { return new Response('Invalid JSON', { status: 400 }); }

        // Model whitelist — prevents open relay abuse
        if (!ALLOWED_MODELS.includes(payload.model)) {
            return new Response(JSON.stringify({ error: 'Model not allowed' }), { status: 400 });
        }

        // Cap max_tokens
        payload.max_tokens = Math.min(payload.max_tokens ?? 250, MAX_TOKENS_CAP);

        const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + env.GROQ_API_KEY,
            },
            body: JSON.stringify(payload),
        });

        const data = await upstream.text();
        return new Response(data, {
            status: upstream.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            },
        });
    },
};
