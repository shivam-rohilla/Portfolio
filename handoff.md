# Developer Handoff — theshivamrohilla.in

**Owner:** Shivam Rohilla (shvmroh@gmail.com)
**Live URL:** https://theshivamrohilla.in
**Repo:** https://github.com/shivam-rohilla/Portfolio
**Branch:** main → auto-deploys to GitHub Pages
**Last updated:** 2026-05-17

---

## Architecture at a Glance

Single-file static site. Everything lives in `index.html` — HTML structure, inline `<style>` block, inline `<script>` block. No build step, no bundler, no framework. Deployed via GitHub Pages with a custom domain (`CNAME` file = `theshivamrohilla.in`).

```
index.html          ← entire site
style.css           ← legacy, NOT used (all CSS is inlined)
hero.webp           ← background image, preloaded
Shivam-Rohilla_hero-pic.jpeg ← hero photo + OG image
resume.pdf          ← downloadable CV
favicon.svg         ← SVG favicon
CNAME               ← custom domain for GitHub Pages
sitemap.xml         ← XML sitemap
robots.txt          ← crawl directives
llms.txt            ← AI crawler profile (GEO)
cloudflare-worker.js ← optional Groq proxy (not deployed yet)
portfolio.md        ← site analysis and feature reference
handoff.md          ← this file
```

---

## External Dependencies

| Service | What it does | Key / Credential | Where set |
|---|---|---|---|
| **Groq API** | Powers the AI chat widget | `gsk_Q8MQhX36Gk...` | Hardcoded in `index.html` ~line 3266 |
| **EmailJS** | Contact form submissions | Public key `5lI0s7pbojuMeVBJV` | Hardcoded in `index.html` |
| **Google Fonts** | Inter + Fira Code fonts | None (public CDN) | `<link>` in `<head>` |
| **GitHub Pages** | Hosting | GitHub account | Repo Settings → Pages |
| **Groq Console** | API key management + usage limits | console.groq.com | Manual login |

### EmailJS Config
- Service ID: `service_portfolio`
- Template ID: `template_contact`
- Public Key: `5lI0s7pbojuMeVBJV`
- Dashboard: https://dashboard.emailjs.com

### Groq Config
- Model in use: `llama-3.3-70b-versatile`
- Console: https://console.groq.com
- The key is exposed client-side (GitHub Pages can't run server functions). This is a known, accepted trade-off. Set a daily usage cap in the Groq console to limit blast radius.

---

## Pending Manual Tasks

These can't be done in code — they need dashboard/console access:

1. **Groq usage cap** — `console.groq.com → API Keys → Usage Limits` → set a daily token cap to prevent runaway spend if the key leaks
2. **EmailJS domain restriction** — EmailJS Dashboard → Account → Security → Allowed Origins → add `https://theshivamrohilla.in` (prevents other sites using your public key)
3. **Cloudflare Worker (optional)** — `cloudflare-worker.js` is ready to deploy. Moves Groq key out of client code. Steps in the file's comments. Until then, the key stays in index.html.

---

## Deployment

### Normal deploy
```bash
git add index.html          # or whatever changed
git commit -m "description"
git push origin main
```
GitHub Pages picks up `main` automatically. Live in ~60 seconds.

### Custom domain
The `CNAME` file contains `theshivamrohilla.in`. DNS is pointed at GitHub Pages (`185.199.108-111.153.github.io`). Do not delete the CNAME file.

### GitHub secret scanning
The Groq API key in `index.html` will trigger GitHub's push protection. When blocked:
- Visit the URL shown in the error
- Choose **"I'll fix this later"** (Option A — allow the secret)
- Re-run `git push origin main`

---

## Key Features

### 1. AI Chat Widget
- Floating button bottom-right corner
- Calls Groq API with `llama-3.3-70b-versatile`
- System prompt at ~line 3260 in index.html — personalized to Shivam's background
- To change the model: search `llama-3.3-70b-versatile` in index.html, update in two places (fetch payload + `cloudflare-worker.js` ALLOWED_MODELS if using the proxy)
- To replace Groq with another provider: update the fetch URL and auth header

### 2. Bug Hunt Easter Egg Game
- **Trigger:** type `debug` anywhere on the page, OR click `◉ debug` in the footer
- **30-second timer** — runs out → "time's up" screen
- **Scoring:** click falling bug icons (tinted tech icons from the skills section)
- **Boss round:** spawns at game end if score ≥ 5; 3HP, flees cursor, speeds up, teleports at 1HP
- **Score screen:** shows result + LinkedIn share button (copies post text to clipboard, opens LinkedIn compose)
- **Performance:** icons pre-tinted to offscreen canvases at game start (`prepareTintedImages()`), canvas loop throttled to ~30fps
- To disable: remove or comment out the `bhStartFromBtn` function and the footer `◉ debug` button

### 3. Contact Form (EmailJS)
- `<form id="contact-form">` in the Contact section
- Handled by EmailJS, initialized inside `window.addEventListener('load')` (deferred)
- EmailJS script loaded with `defer` + SRI hash from cdn.jsdelivr.net
- To update the template: change `template_contact` in the emailjs.send() call

---

## Security Headers

Applied via `<meta http-equiv>` tags (GitHub Pages doesn't support HTTP headers):

| Header | Value |
|---|---|
| Content-Security-Policy | Restricts scripts to self + jsdelivr; styles to self + Google Fonts; connects to groq + emailjs |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| X-Content-Type-Options | `nosniff` |

**Cannot be set on GitHub Pages** (require server or Cloudflare):
- HSTS (`Strict-Transport-Security`)
- `X-Frame-Options` (HTTP header version)
- `Permissions-Policy`

To unlock these: put Cloudflare in front of the GitHub Pages origin (free plan is sufficient).

---

## SEO & Structured Data

### Schema.org (@graph)
Located in `<head>` as `<script type="application/ld+json">`:
- `Person` — name, job titles, employer, education, certifications, social links, `mainEntityOfPage`
- `WebSite` — with SearchAction potential
- `ProfilePage` — `datePublished`, `isPartOf`
- `BreadcrumbList` — homepage breadcrumb
- `ItemList` — 9 `SoftwareApplication` items (projects)

To add a new project: add an `ListItem` entry to the `ItemList` array and increment `numberOfItems`.

### Other SEO files
- `sitemap.xml` — update `lastmod` date after significant changes
- `robots.txt` — currently open (`Allow: /`) with sitemap pointer
- `llms.txt` — AI crawler profile, update when skills/projects change

---

## How to Update Content

| What | Where in index.html |
|---|---|
| Hero headline / subtitle | Search `id="tagline"` |
| Skills percentages | Search `skill-bar` |
| Projects list | Search `id="projects"` |
| About text | Search `id="about"` |
| Contact email in footer | Search `shvmroh@gmail.com` |
| AI chat system prompt | Search `You are an AI assistant` |
| Schema.org data | Search `application/ld+json` |
| `llms.txt` profile | Edit `llms.txt` separately |
| Sitemap | Edit `sitemap.xml` separately |

---

## Performance Notes

- Hero background: `hero.webp` — preloaded in `<head>` with `fetchpriority="high"`
- Hero photo: `Shivam-Rohilla_hero-pic.jpeg` — also used as OG image
- Fonts: `font-display: swap`, loaded non-blocking
- Particle canvas: skips rendering on `window.innerWidth <= 768` (mobile)
- Bug hunt canvas: 30fps throttle (`if (now - lastFrame < 33) return`)
- EmailJS CDN: `defer` attribute, initialized in `window.addEventListener('load')`

---

## Known Limitations / Won't Fix

| Item | Why |
|---|---|
| Groq key in client bundle | GitHub Pages = no server functions. Key is intentionally allowed on GitHub repo. Mitigate with usage cap + optional Cloudflare Worker. |
| No mobile hamburger menu | Nav links hidden at <768px; site is simple enough that users scroll. Not a priority. |
| `style.css` exists but unused | All CSS is inlined. `style.css` is a legacy leftover. Can be deleted. |
| No analytics | Not installed intentionally. Add GA4 or Plausible if needed. |

---

## Repo & Branch Strategy

Single branch (`main`). No CI/CD beyond GitHub Pages auto-deploy. For risky changes:
1. Test locally by opening `index.html` in a browser
2. Commit and push
3. Verify at https://theshivamrohilla.in within ~60 seconds

---

## Contacts & Accounts

| Account | Owner | Notes |
|---|---|---|
| GitHub (`shivam-rohilla`) | Shivam | Repo owner, GitHub Pages source |
| Groq Console | Shivam | API key management |
| EmailJS (`5lI0s7pbojuMeVBJV`) | Shivam | Contact form |
| Domain (`theshivamrohilla.in`) | Shivam | DNS points to GitHub Pages |
