# Portfolio Analysis — Shivam Rohilla

## Overview

Personal portfolio website for **Shivam Rohilla**, an AI Automation Engineer and Full-Stack Developer currently working at Elite DhobiLite Laundry Pvt Ltd (Noida) and pursuing an MCA at DCRUST. Built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools. Hosted on GitHub Pages at **https://theshivamrohilla.in**.

---

## Site Structure

| Section | ID | Theme |
|---|---|---|
| Hero / Summary | `#summary` | Dark |
| Technical Skills | `#skills` | Medium |
| Featured Projects | `#projects` | Dark |
| Education | `#education` | Medium |
| Certifications | `#certifications` | Dark |
| About Me | `#about` | Medium |
| Contact | `#contact` | Accent |

Navigation: Bio · Skills · Work · Hire Me (CTA)

---

## Identity & Positioning

- **Role:** AI Automation Engineer + Full-Stack Developer
- **Employer:** Elite DhobiLite Laundry Pvt Ltd, Noida (2025–Present)
- **Core pitch:** n8n workflow automation, LLM-powered tools (GPT-4o-mini, Claude API), and AWS cloud infrastructure — production systems at scale (200+ franchise locations)
- **Target opportunities:** AI Engineering, Full-Stack, Cloud, Automation roles
- **Contact:** shvmroh@gmail.com

---

## Technical Skills

### AI & Automation
n8n (90%) · GPT-4o-mini / Claude API (85%) · Google APIs (80%) · App Store Connect API (75%)

### Full-Stack
HTML/CSS (90%) · Python Flask (85%) · React (75%) · SQL/MySQL (75%) · Node.js (70%)

### Cloud & Infrastructure
AWS EC2/S3/RDS (80%) · Linux (80%) · Netlify (85%) · VPC/Security Groups (70%)

### Tools
Git (85%) · Google Sheets API (85%) · Telegram Bot API (80%) · ClickUp API (75%)

---

## Projects (7 Total)

| Project | Key Tech |
|---|---|
| iOS App Store Review Automation | n8n, JWT auth, GPT-4o-mini, 3-tier routing |
| Play Store Review Automation | n8n, dedup, sentiment routing, Sheets logging |
| GMB Review Auto-Reply System | GBP API, 200+ franchise locations, n8n |
| GMB Audit Workflow | bi-monthly audit, 160 listings, 8 scoring dimensions |
| Review Analytics Dashboard | Netlify, SHA-256 login, 7 tabs, n8n webhook backend |
| Clawdbot — AI System Automation Bot | Python, deployed on AWS EC2 |
| Multi-Tier AWS Architecture | EC2 + ALB + Auto Scaling + RDS, multi-AZ |

---

## Education

| Degree | Institution | Period |
|---|---|---|
| MCA | DCRUST, Sonipat | Present |
| BCA | DCRUST, Sonipat | 2020–2023 |

---

## Certifications

1. **AWS Certified Solutions Architect – Associate** (Amazon Web Services)
2. **Google Data Analytics Professional Certificate** (Coursera)

---

## Technical Implementation

### Stack
- Pure HTML5, CSS3, vanilla JavaScript — zero dependencies, no build step
- Google Fonts: Inter (UI) + Fira Code (mono) — loaded non-blocking via `font-display: swap`
- EmailJS for contact form (CDN, deferred, SRI hash)
- Groq API (llama-3.3-70b-versatile) for AI chat widget

### Key Features

#### AI Chat Widget
- Floating chat button (bottom-right corner)
- Streams responses from Groq API (`llama-3.3-70b-versatile`)
- System prompt personalized to Shivam's portfolio
- API key is client-side (GitHub Pages limitation) — mitigated with daily usage cap
- Optional Cloudflare Worker proxy available: `cloudflare-worker.js`

#### Bug Hunt Easter Egg Game
- Hidden: type `debug` anywhere on the page, or click `◉ debug` in the footer
- 30-second timer; click falling bug icons to score points
- Boss round triggers at end if score ≥ 5: 3HP boss with flee AI, increasing speed per HP, teleport at 1HP
- Score screen with LinkedIn share (clipboard copy + LinkedIn compose URL)
- Pre-tinted offscreen canvases for zero per-frame `ctx.filter` overhead
- Canvas throttled to ~30fps (`if (now - lastFrame < 33) return`)

#### Contact Form
- EmailJS with public key `5lI0s7pbojuMeVBJV`, service `service_portfolio`, template `template_contact`
- Deferred via `window.addEventListener('load')` — not render-blocking

### Visual Design
- Dark GitHub-inspired palette (`#0d1117` base, `#58a6ff` accent blue, `#238636` green)
- Alternating `section-dark` / `section-medium` / `section-accent` panels
- Background canvas particle system — disabled on mobile for performance
- Sticky navbar with `backdrop-filter: blur(8px)` glassmorphism

### Animations & UX
- CSS scroll-reveal via `IntersectionObserver` (`.reveal` → `.active`)
- `hover-lift` utility: `translateY(-5px)` on hover
- Smooth scroll for anchor links

### Responsive
- Single breakpoint at `768px`: nav collapses, H1 scales to 2.5rem
- No hamburger menu (links are hidden on mobile — nav is minimal)
- Grids use `auto-fit / minmax` for natural reflow

### Performance
- Hero image: `hero.webp` with `<link rel="preload" fetchpriority="high">`
- Fonts: `font-display: swap`, no render-blocking
- EmailJS script: `defer` + lazy init inside `window.addEventListener('load')`
- Canvas particle system skips on mobile (`window.innerWidth <= 768`)
- Canvas bug hunt game throttled to ~30fps

### SEO & Schema
- Schema.org `@graph` with: Person, WebSite, ProfilePage, BreadcrumbList, ItemList (9 SoftwareApplications)
- `mainEntityOfPage` on Person for Knowledge Panel eligibility
- `llms.txt` at root for AI crawlers
- `robots.txt`: `User-agent: *` allow-all with Sitemap pointer
- `sitemap.xml`: homepage + resume.pdf
- Open Graph + Twitter Card meta tags
- `og:site_name`, `og:locale`, canonical, `link[rel=me]`

### Security
- CSP via `<meta http-equiv>`: restricts scripts, styles, fonts, images, connect endpoints
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- SRI hash on EmailJS CDN script (`integrity="sha384-..."`)
- `frame-ancestors: none`, `base-uri: self`, `form-action: self`
- Note: HSTS, X-Frame-Options (HTTP header), Permissions-Policy require Cloudflare or a non-static host

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Entire site — HTML, CSS (inline `<style>`), JS (inline `<script>`) |
| `style.css` | Legacy/unused — all styles are inlined in index.html |
| `favicon.svg` | SVG favicon |
| `hero.webp` | Hero section background image (WebP, preloaded) |
| `Shivam-Rohilla_hero-pic.jpeg` | Author photo used in hero + OG image |
| `resume.pdf` | Downloadable CV linked from navbar and hero |
| `sitemap.xml` | XML sitemap (homepage + resume.pdf) |
| `robots.txt` | Crawl directives + sitemap pointer |
| `llms.txt` | AI crawler profile (GEO) |
| `CNAME` | GitHub Pages custom domain: `theshivamrohilla.in` |
| `cloudflare-worker.js` | Optional Groq API proxy (deploy to Cloudflare Workers) |
| `portfolio.md` | This file — site analysis and reference |
| `handoff.md` | Developer handoff document |

---

## Resolved Gaps (from original audit)

| Was | Now |
|---|---|
| No Open Graph / Twitter card tags | Full OG + Twitter Card added |
| No `resume.pdf` in sitemap | Added |
| No schema markup | Full `@graph` with Person, WebSite, ProfilePage, BreadcrumbList, ItemList |
| No security headers | CSP + Referrer-Policy + X-Content-Type-Options via meta tags |
| No AI/LLM chat feature | Groq-powered floating chat widget |
| Outdated role (Cloud Associate) | Updated to AI Automation Engineer + Full-Stack Developer |
| No easter egg or engagement feature | Bug Hunt game (hidden, keyboard + footer button) |

## Remaining Gaps

| Item | Detail |
|---|---|
| Mobile nav | Links hidden at <768px, no hamburger menu |
| `style.css` | File exists but unused — all CSS is inlined in index.html |
| `Untitled-1.html` | Scratch file in repo root, can be deleted |
| Groq key client-side | GitHub Pages limitation; `cloudflare-worker.js` ready for Cloudflare migration |
| EmailJS domain not restricted | Set allowed origins in EmailJS dashboard |
| HSTS / X-Frame-Options | Require Cloudflare CDN or non-static host |
