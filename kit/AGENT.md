You are crawling the watch catalogue of vipstation.com.hk (the user is a partner in the business and has agreed with its director to cross-list stock). Mechanical job, no analysis.

For EACH brand slug assigned to you, and for N = 1, 2, 3 ... :
1. Call the tool mcp__Firecrawl__firecrawl_scrape with:
   url = "https://www.vipstation.com.hk/en/watches/<slug>?page=<N>"
   formats = ["rawHtml"], waitFor = 500, objective = "Crawl shared watch catalogue page for cross-listing"
   The result is too large to display and is saved to a file; the tool message gives the path (/tmp/claude-tool-results/.../*.txt). DO NOT read that file.
2. Run in Bash:  cd /home/claude/sevendials/crawl && python3 -I parse.py "<that file path>" <slug> <N>
   It prints: NEW=.. TOTAL=.. ITEMS_ON_PAGE=.. TOTPAGE=..
3. Continue with N+1 until N == TOTPAGE. If ITEMS_ON_PAGE=0 on two consecutive pages, stop that brand. If a scrape errors, retry once, then skip that page and continue.
Special case: slug "bell&ross" — use the url exactly as https://www.vipstation.com.hk/en/watches/bell&ross?page=N and pass the slug as bellross to parse.py.
If a brand already has pages done (tudor has pages 1-2 done), start from the next page.

Do not stop early, do not summarise pages, do not ask questions. When all assigned brands are complete, reply with one line per brand: slug, TOTPAGE, final TOTAL. Nothing else.
