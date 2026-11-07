"""Usage: python3 -I parse.py <tool-result-file> <brand-slug> <page>
Extracts embedded itemList JSON from a VIP Station listing page and appends to out/<brand>.jsonl.
Prints: NEW=<n> TOTAL=<n> MAXPAGE=<n>"""
import sys,re,json,os
f,brand,page=sys.argv[1],sys.argv[2],int(sys.argv[3])
s=open(f,encoding='utf-8',errors='ignore').read()
i=s.find('itemList =[')
if i<0: i=s.find('itemList=[')
arr=[]
if i>=0:
    j=s.find('];',i); raw=s[s.find('[',i):j+1]
    for attempt in (raw, raw.encode().decode('unicode_escape','ignore')):
        try: arr=json.loads(attempt); break
        except Exception: pass
mp=0
m=re.search(r'totpage\\?":(\d+)',s) or re.search(r'totpage"?\s*:\s*(\d+)',s)
if m: mp=int(m.group(1))
out=os.path.join(os.environ.get('OUT_DIR','out'),f'{brand}.jsonl'); os.makedirs(os.path.dirname(out) or '.',exist_ok=True)
seen=set()
if os.path.exists(out):
    for line in open(out):
        try: seen.add(json.loads(line)['ST_CODE']+'|'+json.loads(line)['ST_WEB_NAME'])
        except: pass
new=0
with open(out,'a') as w:
    for it in arr:
        k=(it.get('ST_CODE') or '')+'|'+(it.get('ST_WEB_NAME') or '')
        if k in seen: continue
        seen.add(k); it['_brand']=brand; it['_page']=page; w.write(json.dumps(it,ensure_ascii=False)+'\n'); new+=1
print(f'NEW={new} TOTAL={len(seen)} ITEMS_ON_PAGE={len(arr)} TOTPAGE={mp}')
