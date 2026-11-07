# Seven Dials nightly build kit
- parse.py  : `OUT_DIR=out python3 -I parse.py <firecrawl-rawhtml-result-file> <brand-slug> <page>` -> appends to out/<slug>.jsonl
- build.py  : `OUT_DIR=out SITE_OUT=../index.html python3 build.py` -> listings_vip.json + index.html (template: index.template.html)
- AGENT.md  : brief for crawler sub-agents (37 brand slugs, Firecrawl rawHtml, ?page=N)
Pricing: HKD x 1.08 x 1.10 GST x HKD_AUD (constant in build.py). In-stock only (NO_ISSTOCK != 0).
Server pulls https://raw.githubusercontent.com/peteratef-afk/sevendials-site/main/index.html via cPanel cron.

sheet_prices.json: WhatsApp dealer asking prices (New only, lowest/median AUD, last 30 days) keyed by normalised reference; build.py prices every brand except Rolex/Patek/AP/Richard Mille from it at +10% margin then GST. Refresh it from the Dropbox copy of Watch_Stock_8_Weeks when available.
