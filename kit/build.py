import json,glob,re,os,sys
HKD_AUD=0.185; GST=1.10
# 9 Nov 2026 pricing rule (Peter): cost = the LOWER of VIP's price and the cheapest brand-NEW WhatsApp-group offer
# (last 30 days). Price ex-GST = cost + 10% target margin, rounded UP to a clean figure, but CAPPED at the other
# (higher) source so we are never the dearest of the two; floor 2% over cost. Then +10% GST.
# Sanity: a group offer more than 30% under VIP is ignored unless seen at least twice in the window.
TARGET=1.00; FLOOR=1.00; MARKUP=TARGET   # 9 Nov: straight VIP price, no markup
SHEET_MARGIN=1.10; SHEET_EXCLUDE=set()
try: SHEET=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'group_prices.json')))
except Exception: SHEET={}
def clean_down(ex):
    import math
    step=100 if ex<2000 else (500 if ex<10000 else 1000)
    return int(math.floor(ex/step)*step)
def price_ex(cost,cap):
    import math
    step=lambda v:100 if v<2000 else (500 if v<10000 else 1000)
    ex=int(math.ceil(cost*TARGET/step(cost*TARGET))*step(cost*TARGET))
    if cap is not None and ex>cap:
        ex=max(clean_down(cap), int(math.ceil(cost*FLOOR/step(cost*FLOOR))*step(cost*FLOOR)))
    return ex
def sheet_match(n):
    n=n.upper()
    if n in SHEET: return SHEET[n]
    for k in range(len(n)-1,5,-1):
        if n[:k] in SHEET:
            rest=n[k:]
            # only accept a prefix match when the dropped tail is a VIP suffix (no digits, e.g. BKO / LS / J) or a -0001 style variant code
            if not re.search(r'\d',rest) or rest.startswith('000'): return SHEET[n[:k]]
            return None
    return None
MATS=["18kt Gold & Diamond & Steel","18kt Rose Gold & Steel","18kt White Gold & Steel","18kt Gold & Steel","18kt White Gold","18kt Yellow Gold","18kt Rose Gold","18kt Gold","Rose Gold & Steel","Gold & Steel","Stainless Steel & Diamonds","Stainless Steel","Steel & Gold","Titanium","Ceramic","Platinum","Bronze","Carbon Fiber & Titanium","Carbon Fiber","PVD Gold","925 Silver","Steel","Rose Gold","Yellow Gold","White Gold","Gold","Sapphire","Aluminium","Tantalum","Carbon"]
BRANDNAME={"AUDEMARS PIGUET":"Audemars Piguet","BELL&ROSS":"Bell & Ross","GLASHUTTE":"Glashütte Original","IWC":"IWC","JAEGER-LECOULTRE":"Jaeger-LeCoultre","TAG HEUER":"TAG Heuer","PATEK PHILIPPE":"Patek Philippe","RICHARD MILLE":"Richard Mille","GIRARD PERREGAUX":"Girard-Perregaux","VACHERON CONSTANTIN":"Vacheron Constantin","FRANCK MULLER":"Franck Muller","GRAND SEIKO":"Grand Seiko","ROGER DUBUIS":"Roger Dubuis","CHRISTIAN BERNARD":"Christian Bernard","MAIKOU BODE":"Maikou Bode"}
SLUGNAME={"bellross":"Bell & Ross","bell&ross":"Bell & Ross","glashutte":"Glashütte Original","iwc":"IWC","jaeger-lecoultre":"Jaeger-LeCoultre","tag-heuer":"TAG Heuer","girard-perregaux":"Girard-Perregaux"}
def brandname(g,slug):
    return SLUGNAME.get(slug, slug.replace('-',' ').title())
def norm(s): return re.sub(r'[^a-z0-9]','',s.lower())
items=[]; seen=set()
for f in sorted(glob.glob(os.path.join(os.environ.get('OUT_DIR','out'),'*.jsonl'))):
    slug=os.path.basename(f)[:-6]
    for line in open(f,encoding='utf-8'):
        try: r=json.loads(line)
        except: continue
        code=(r.get('ST_CODE') or '').strip(); name=(r.get('ST_NAME') or '').strip()
        key=code+'|'+(r.get('ST_WEB_NAME') or '')
        if not code or key in seen: continue
        seen.add(key)
        brand=brandname(r.get('ST_ITEMGROUP'),slug)
        # material = longest material phrase at end of name
        MW={'18kt','18k','gold','rose','white','yellow','everose','steel','stainless','diamond','diamonds','&','titanium','ceramic','platinum','bronze','carbon','fiber','fibre','pvd','925','silver','sapphire','aluminium','aluminum','tantalum','rolesor','oystersteel','pink','red','magic','ceramos','ceramic'}
        toks0=name.split(); k=len(toks0)
        while k>0 and toks0[k-1].lower() in MW: k-=1
        matt=toks0[k:]; 
        if matt and matt[0]=='&': matt=matt[1:]
        mat=' '.join(matt).strip() or 'Stainless Steel'; rest=' '.join(toks0[:k]).strip()
        if mat.lower() in ('steel','stainless'): mat='Stainless Steel'
        # strip brand prefix
        for bw in sorted({brand, slug.replace('-',' '), (r.get('ST_ITEMGROUP') or ''), 'Tag Heuer','Bell&Ross','Glashutte','Jaeger-Lecoultre','Girard Perregaux'},key=len,reverse=True):
            if bw and rest.lower().startswith(bw.lower()): rest=rest[len(bw):].strip(); break
        # strip reference token(s): tokens that match the code (ignoring punctuation) or contain digits
        toks=rest.split(); ncode=norm(code)
        fam=[]; 
        for t in toks:
            nt=norm(t)
            if nt and ((len(nt)>=3 and (nt in ncode or ncode in nt)) or (re.search(r'\d',t) and len(nt)>=4)): continue
            fam.append(t)
        family=' '.join(fam).strip() or 'Watch'
        family=re.sub(r'\b(Leather|Rubber|Canvas|Nato|Satin|Strap|Ls|Cs|Rs)\b','',family,flags=re.I).strip() or family
        hkd=r.get('NO_PRICE'); tl=r.get('NO_TL_PRICE'); src=r.get('NO_SOURCEPRICE')
        def clean_up(ex):
            import math
            step=100 if ex<2000 else (500 if ex<10000 else 1000)
            return int(math.ceil(ex/step)*step)
        def conv(v):
            if not v: return None
            ex=v*HKD_AUD                       # ex-GST, straight conversion
            return int(round(ex*GST))          # incl. GST (ex x 1.10)
        was=None; flags=[]; src_price='vip'; sheet_base=None; price=None; cost=None; cap=None
        vip_aud=hkd*HKD_AUD if hkd else None
        sm=sheet_match(norm(code))
        if not sm and brand=='Audemars Piguet' and norm(code).upper()[:7] in SHEET: sm=SHEET[norm(code).upper()[:7]]   # groups post AP case refs only (e.g. 15510ST)
        grp=sm['lowest'] if sm else None
        # sanity: drop a lone group offer that is >30% under VIP (likely a typo/wrong currency) or absurdly far from VIP either way
        if grp and vip_aud and (grp<0.70*vip_aud and sm.get('n',1)<2): grp=None
        if grp and vip_aud and not (0.35*vip_aud<=grp<=2.5*vip_aud): grp=None
        # 9 Nov: price = VIP HKD converted to AUD, plus GST. Group prices kept only as reference (sheetBase), never used for pricing.
        if grp: sheet_base=round(grp)
        if vip_aud:
            cost=vip_aud; cap=None; price=int(round(vip_aud*GST))
        if r.get('NO_ISTL') and tl and hkd and tl<hkd: flags.append('flash'); was=price; price=conv(tl)
        lab=(r.get('ST_LABEL') or '').lower()
        if 'hot' in lab: flags.append('hot')
        if 'new' in lab: flags.append('new-arrival')
        if 'special' in lab or 'discount' in lab or 'sale' in lab: flags.append('special')
        img=r.get('ST_IMG') or ''
        big=re.sub(r'\.jpg_\d+x\d+\.jpg','.jpg',img)
        if r.get('NO_ISSTOCK')==0: continue
        items.append({"id":re.sub(r'[^a-z0-9]+','-',(slug+'-'+code).lower()).strip('-'),"brand":brand,"family":family,"ref":code,"material":mat,
          "dial":"","size":"","condition":("Enquire" if brand=="Patek Philippe" else "New"),"year":"","box":True,"papers":True,
          "price":price,"was":was,"hkd":hkd,"rrpHkd":src,"flags":flags,"sold":(r.get('NO_ISSTOCK')==0),
          "movement":"","sku":"VS-"+code,"img":img,"imgBig":big,"src":"vipstation","priceSource":src_price,"sheetBase":sheet_base,"cost":(round(cost) if cost else None),"cap":(round(cap) if cap else None),"added":"2026-11-07"})
json.dump(items,open('listings_vip.json','w'),ensure_ascii=False)
_d=os.path.dirname(os.path.abspath(__file__)); _cb=os.path.join(_d,'index.caseback.template.html')
tpl=open(_cb if os.path.exists(_cb) else os.path.join(_d,'index.template.html')).read()   # Caseback presentation layer (9 Nov 2026); pricing/data unchanged
open(os.environ.get('SITE_OUT','index.html'),'w').write(tpl.replace('__LISTINGS__',json.dumps(items,ensure_ascii=False).replace('</','<\\/')))
from collections import Counter
print(len(items),'items'); print(Counter(i['brand'] for i in items).most_common())
print('sold',sum(i['sold'] for i in items),'poa',sum(i['price'] is None for i in items))
print(items[0])
