#!/usr/bin/env python3
"""Crawl vipstation.com.hk catalogue with plain curl (no paid scraping service).
Usage: OUT_DIR=out python3 crawl.py   -> out/<slug>.jsonl via parse.py
"""
import os, re, subprocess, sys, tempfile, concurrent.futures as cf, time
KIT=os.path.dirname(os.path.abspath(__file__))
OUT=os.environ.get('OUT_DIR', os.path.join(KIT,'out'))
os.makedirs(OUT, exist_ok=True)
SLUGS="""audemars-piguet bell&ross blancpain breguet breitling bulgari cartier chanel chopard
christian-bernard corum franck-muller girard-perregaux glashutte grand-seiko hublot iwc jaeger-lecoultre
longines maikou-bode movado omega oris panerai parmigiani patek-philippe piaget rado richard-mille
roger-dubuis rolex tag-heuer tissot titoni tudor vacheron-constantin zenith""".split()
WORKERS=int(os.environ.get('WORKERS','6'))

def fetch(slug, page):
    url=f"https://www.vipstation.com.hk/en/watches/{slug}?page={page}"
    for attempt in range(3):
        fd,path=tempfile.mkstemp(suffix='.html'); os.close(fd)
        r=subprocess.run(['curl','-sS','-L','--max-time','90','-o',path,'-w','%{http_code}',url],capture_output=True,text=True)
        if r.stdout.strip()=='200' and os.path.getsize(path)>5000:
            return path
        os.unlink(path); time.sleep(3*(attempt+1))
    return None

def parse(path, slug, page):
    r=subprocess.run([sys.executable,'-I',os.path.join(KIT,'parse.py'),path,slug.replace('&',''),str(page)],
                     capture_output=True,text=True,env={**os.environ,'OUT_DIR':OUT})
    os.unlink(path)
    m=re.search(r'ITEMS_ON_PAGE=(\d+).*TOTPAGE=(\d+)',r.stdout)
    return (int(m.group(1)),int(m.group(2))) if m else (0,0)

def crawl_brand(slug):
    page=1; tot=1; empty=0; total_items=0
    while page<=tot:
        p=fetch(slug,page)
        if p is None:
            print(f"{slug} p{page}: FETCH FAILED",flush=True); page+=1; continue
        n,tp=parse(p,slug,page)
        if tp: tot=tp
        total_items+=n
        empty = empty+1 if n==0 else 0
        if empty>=2: break
        page+=1
    print(f"{slug}: pages={tot} items={total_items}",flush=True)
    return slug,tot,total_items

if __name__=='__main__':
    # clear previous output so sold-out items drop off
    for f in os.listdir(OUT):
        if f.endswith('.jsonl'): os.unlink(os.path.join(OUT,f))
    with cf.ThreadPoolExecutor(WORKERS) as ex:
        res=list(ex.map(crawl_brand, SLUGS))
    print("DONE", sum(r[2] for r in res), "rows")
