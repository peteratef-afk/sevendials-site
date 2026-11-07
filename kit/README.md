# Seven Dials nightly build kit
- parse.py  : `OUT_DIR=out python3 -I parse.py <firecrawl-rawhtml-result-file> <brand-slug> <page>` -> appends to out/<slug>.jsonl
- build.py  : `OUT_DIR=out SITE_OUT=../index.html python3 build.py` -> listings_vip.json + index.html (template: index.template.html)
- AGENT.md  : brief for crawler sub-agents (37 brand slugs, Firecrawl rawHtml, ?page=N)
Pricing: HKD x 1.08 x 1.10 GST x HKD_AUD (constant in build.py). In-stock only (NO_ISSTOCK != 0).
Server pulls https://raw.githubusercontent.com/peteratef-afk/sevendials-site/main/index.html via cPanel cron.
