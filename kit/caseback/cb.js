/* ===================== CASEBACK PRESENTATION LAYER =====================
   Overrides the presentation functions only (home, card, grid, listing, item,
   pages, render). The data layer, LISTINGS, PRICING, applyFx, the fx.json fetch
   and the price fields produced by kit/build.py are NOT touched here.
========================================================================= */
const CB_HOUSES=['Rolex','Patek Philippe','Audemars Piguet','Richard Mille'];
const CB_ROMAN=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
function cbSealDate(d){d=d||new Date();return String(d.getDate()).padStart(2,'0')+' · '+CB_ROMAN[d.getMonth()]+' · '+d.getFullYear();}
function cbThin(n){return Number(n).toLocaleString('en-AU').replace(/,/g,'\u2009');}
const CB_SEAL_SMALL='<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="100" cy="100" r="96" stroke-width="4"/><circle cx="100" cy="100" r="58" stroke-width="16" stroke-dasharray="12 18.37" stroke-dashoffset="6"/></svg>';
function cbSeal(onDark,num,date){const rim=onDark?'var(--cb-straw)':'var(--cb-bottle)',ink=onDark?'var(--cb-on-dark)':'var(--cb-bottle)';
  return `<svg viewBox="0 0 200 200" fill="none" stroke="${ink}" role="img" aria-label="Caseback seal"><defs><path id="cbrim${onDark?1:0}" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs><circle cx="100" cy="100" r="96" stroke-width="1.4"/><circle cx="100" cy="100" r="90" stroke-width="0.5"/><text font-family="Cormorant Garamond, serif" font-size="13.2" letter-spacing="3.6" font-weight="500" fill="${rim}" stroke="none"><textPath href="#cbrim${onDark?1:0}">INSPECTED · AUTHENTICATED · WARRANTED · CASEBACK MELBOURNE ·</textPath></text><circle cx="100" cy="100" r="58" stroke-width="8" stroke-dasharray="12 18.37" stroke-dashoffset="6"/><circle cx="100" cy="100" r="46" stroke-width="0.8"/>${num?`<text x="100" y="92" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="2.5" fill="${ink}" stroke="none">NO. ${num}</text>`:''}<path d="M80 100h40" stroke-width="0.6" stroke="${rim}"/>${date?`<text x="100" y="116" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="13" fill="${ink}" stroke="none">${date}</text>`:''}</svg>`;}
function cbFam(it){let f=(it.family||'').replace(/\bIi\b/g,'II').replace(/\bIii\b/g,'III').replace(/\bGmt\b/g,'GMT').replace(/\s+/g,' ').trim();
  if(!f||/^watch$/i.test(f)||f.length>34) return it.ref;
  const m=(it.ref||'').match(/^(\d{4,6})/); if(m&&!f.includes(m[1])) f+=' '+m[1];
  return f;}
function cbAttr(it){if(it.dial)return it.dial+' dial';if(it.size)return it.size+' mm';return (it.material||'').replace(/^18kt /i,'');}
function cbTitle(it){const a=cbAttr(it);return a?`${esc(cbFam(it))}, ${esc(a)}`:esc(cbFam(it));}
function cbTitleItalic(it){const a=cbAttr(it);return a?`${esc(cbFam(it))}, <em>${esc(a.toLowerCase())}</em>`:esc(cbFam(it));}
function cbCond(it){if(it.brand==='Patek Philippe'||it.condition==='Enquire')return 'On enquiry';return {New:'Unworn','Pre-Owned':'Pre-owned',Display:'Excellent'}[it.condition]||it.condition;}
function cbPapers(it){return it.box&&it.papers?'Full set':it.box?'Box only':it.papers?'Papers only':'Watch only';}
function cbMeta(it){return [it.year,cbCond(it)==='On enquiry'?null:cbPapers(it)].filter(Boolean).join(' · ')||cbCond(it);}
function cbHouseCount(b){return LISTINGS.filter(x=>x.brand===b&&!x.sold).length;}
function cbPrice(it){return it.price==null?null:money(it.price);}

/* tile */
function card(it){
  const p=cbPrice(it);
  return `<a class="cb-tile" href="#item-${it.id}"><div class="cb-tile__img">${pic(it)}<span class="cb-tile__stamp">${CB_SEAL_SMALL}</span>${it.sold?'<div class="cb-tile__sold"><span class="cb-badge">Sold</span></div>':''}</div>
  <div class="cb-tile__l1"><h4>${cbTitle(it)}</h4><span class="cb-mono ${p?'':'poa'}">${p||'On request'}</span></div>
  <div class="cb-tile__l2 cb-mono-sm"><span>${esc(it.brand)} · ${esc(it.ref)}</span><span class="c">${esc(cbCond(it)==='On enquiry'?'On enquiry':cbCond(it)+(it.box&&it.papers?' · Full set':''))}</span></div></a>`;
}
function grid(items){return items.length?`<div class="cb-grid">${items.map(i=>card(i)).join('')}</div>`:cbEmpty();}
function cbEmpty(){return `<div class="cb-empty"><h3>Nothing matches that yet.</h3><p>Tell us what you are after and we will source it.</p><a class="cb-btn" href="https://wa.me/61499005000?text=${encodeURIComponent('Hello, I am looking for a watch. Can you source it?')}" target="_blank" rel="noopener">Ask us to source it</a></div>`;}

/* home */
function cbFeatured(){const pick=(f)=>LISTINGS.find(f);
  return pick(x=>/^5711/.test(x.ref)&&x.price&&x.img)||pick(x=>x.brand==='Patek Philippe'&&x.family==='Nautilus'&&x.price&&x.img)||pick(x=>x.brand==='Rolex'&&x.family==='Daytona'&&x.price&&x.img)||LISTINGS.find(x=>x.price&&x.img)||LISTINGS[0];}
function cbHouseRep(b){const fam={'Rolex':'Submariner','Patek Philippe':'Nautilus','Audemars Piguet':'Royal Oak','Richard Mille':null}[b];
  return LISTINGS.find(x=>x.brand===b&&(!fam||x.family===fam)&&x.img&&!x.sold)||LISTINGS.find(x=>x.brand===b&&x.img);}
function home(){
  const total=LISTINGS.filter(x=>!x.sold).length;
  const ft=cbFeatured();
  const newest=LISTINGS.filter(x=>!x.sold&&x.img&&x.price&&CB_HOUSES.includes(x.brand)).sort((a,b)=>(b.added||'').localeCompare(a.added||'')).slice(0,3);
  return `
  <section class="cb-hero">
    <div class="cb-hero__copy">
      <div class="cb-hero__eyebrow"><i></i><span class="cb-eyebrow">Melbourne · By appointment</span></div>
      <h1>Known before <em>it is worn.</em></h1>
      <p>Every watch we sell has been opened, measured and sealed in our Queen Street workshop before you ever see it. Five thousand pieces, one standard.</p>
      <div class="cb-hero__cta"><a class="cb-btn" href="#watches">View the collection</a><a class="cb-link" href="#sell">Sell a watch</a></div>
      <div class="cb-hero__strip cb-mono-sm">${cbThin(total)} PIECES · ${brands.length} HOUSES · EST. MMXXVI</div>
    </div>
    <div class="cb-hero__panel">
      <div class="cb-hero__seal">${cbSeal(true)}</div>
      <a class="cb-hero__tile" href="#item-${ft.id}"><div class="ph"><img src="${esc(ft.imgBig||ft.img)}" alt="${esc(ft.brand+' '+cbFam(ft)+' '+ft.ref)}" onerror="this.onerror=null;this.src='${esc(ft.img)}'"></div><div class="cb-mono-sm">${esc(ft.ref)}${ft.price?' · '+SYM[CUR]+cbThin(Math.round(ft.price*RATES[CUR])):''}</div></a>
      <div class="cb-hero__sealed">Sealed ${cbSealDate()}</div>
    </div>
  </section>
  <div class="wrap"><div class="cb-ledger">${CB_HOUSES.map(b=>`<a href="#brand-${slug(b)}"><b>${b}</b><span class="cb-mono-sm">${cbThin(cbHouseCount(b))}</span></a>`).join('')}</div></div>
  <div class="wrap">
    <section class="cb-sec" style="border-top:0"><div class="cb-sec__head"><h2>Sealed this week</h2><a class="cb-link" href="#watches">All watches →</a></div>
      <div class="cb-rail">${newest.map(card).join('')}</div></section>
    <section class="cb-sec"><div class="cb-promise">
      <div><span class="cb-eyebrow">I</span><h4>Inspected by hand.</h4><p>Movement, case, serial, papers.</p></div>
      <div><span class="cb-eyebrow">II</span><h4>Warranty carried.</h4><p>Remaining factory cover, transferred to you.</p></div>
      <div><span class="cb-eyebrow">III</span><h4>Delivered insured.</h4><p>Australia-wide, five to seven days.</p></div>
      <div><span class="cb-eyebrow">IV</span><h4>Bought back.</h4><p>Trade in or sell, same-day offer.</p></div>
    </div></section>
    <section class="cb-sec"><div class="cb-sec__head"><h2>By house</h2><a class="cb-link" href="#watches">All houses →</a></div>
      <div class="cb-houses">${CB_HOUSES.map(b=>{const r=cbHouseRep(b);return `<a class="cb-house" href="#brand-${slug(b)}"><div class="ph">${r?`<img src="${esc(r.imgBig||r.img)}" alt="${esc(b)}" loading="lazy" onerror="this.onerror=null;this.src='${esc(r.img)}'">`:''}</div><div class="row"><b>${b}</b><span class="cb-mono-sm">${cbThin(cbHouseCount(b))}</span></div></a>`;}).join('')}</div></section>
  </div>
  ${cbVisitBlock()}`;
}
function cbVisitBlock(){return `<section class="cb-visit" style="margin-top:56px">
  <div class="cb-visit__map"><svg viewBox="0 0 420 300" fill="none" stroke="currentColor" aria-label="Map of Queen Street, Melbourne"><g stroke-width="1"><path d="M0 60h420M0 140h420M0 220h420M70 0v300M190 0v300M310 0v300"/></g><g stroke="var(--cb-peat)" stroke-width="1.2"><path d="M190 0v300"/></g><circle cx="190" cy="140" r="9" fill="var(--cb-bottle)" stroke="none"/><text x="204" y="136" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="1" fill="var(--cb-peat)" stroke="none">99 QUEEN ST</text><text x="196" y="292" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="1" fill="var(--cb-mist)" stroke="none">QUEEN ST</text><text x="6" y="54" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="1" fill="var(--cb-mist)" stroke="none">LITTLE COLLINS ST</text><text x="6" y="134" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="1" fill="var(--cb-mist)" stroke="none">COLLINS ST</text><text x="6" y="214" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="1" fill="var(--cb-mist)" stroke="none">FLINDERS LN</text></svg></div>
  <div class="cb-visit__info"><span class="cb-eyebrow">Visit</span><h3>Level 1, 99 Queen Street</h3><p>Mon to Sat, 9:30 to 6, by appointment</p>
    <div class="cb-people"><div><b>Peter</b><span>Watches</span><span class="cb-mono-sm">+61 499 005 000</span></div><div><b>Mina</b><span>Sourcing and trade</span><span class="cb-mono-sm">WHATSAPP</span></div></div>
    <a class="cb-btn cb-btn--secondary" href="https://wa.me/61499005000?text=${encodeURIComponent('Hello, I would like to book an appointment at 99 Queen Street.')}" target="_blank" rel="noopener">Book an appointment</a></div>
</section>`;}

/* collection / search */
F.more=F.more||{brand:false,material:false};
function cbChk(set,v,n,base,label){return `<label><input type="checkbox" ${set.has(v)?'checked':''} onchange="tog('${n}','${esc(v).replace(/'/g,"\\'")}')">${esc(label||v)}<i>${cbThin(base.filter(x=>x[n]===v).length)}</i></label>`;}
function cbGroup(title,n,vals,base,labels){const set=F[n];const open=F.more[n];const shown=open?vals:vals.slice(0,6);
  return `<div><h5>${title}</h5>${shown.map(v=>cbChk(set,v,n,base,labels&&labels[v])).join('')}${vals.length>6?`<a href="#" class="more" onclick="F.more['${n}']=!F.more['${n}'];render();return false">${open?'Show fewer':'+ '+(vals.length-6)+' more'}</a>`:''}</div>`;}
function listing(opts){
  const {base,fixedBrand}=opts; let items=base.slice();
  if(F.brand.size&&!fixedBrand) items=items.filter(x=>F.brand.has(x.brand));
  if(F.material.size) items=items.filter(x=>F.material.has(x.material));
  if(F.condition.size) items=items.filter(x=>F.condition.has(x.condition));
  if(F.min) items=items.filter(x=>x.price!=null&&x.price>=+F.min);
  if(F.max) items=items.filter(x=>x.price!=null&&x.price<=+F.max);
  const s=F.sort;
  if(s==='plow') items.sort((a,b)=>(a.price??1e12)-(b.price??1e12));
  if(s==='phigh') items.sort((a,b)=>(b.price??-1)-(a.price??-1));
  if(s==='newest') items.sort((a,b)=>(b.added||'').localeCompare(a.added||''));
  if(s==='ref') items.sort((a,b)=>a.ref.localeCompare(b.ref));
  const PER=48,pages=Math.max(1,Math.ceil(items.length/PER)); if(F.page>pages)F.page=pages;
  const from=(F.page-1)*PER, pageItems=items.slice(from,from+PER);
  const mats=[...new Set(base.map(x=>x.material))].filter(Boolean).sort((a,b)=>base.filter(x=>x.material===b).length-base.filter(x=>x.material===a).length);
  const brandsHere=[...new Set(base.map(x=>x.brand))].sort((a,b)=>base.filter(x=>x.brand===b).length-base.filter(x=>x.brand===a).length);
  const conds=['New','Pre-Owned','Display','Enquire'].filter(c=>base.some(x=>x.condition===c));
  const condLabels={New:'Unworn','Pre-Owned':'Pre-owned',Display:'Excellent',Enquire:'On enquiry'};
  const chips=[...[...F.brand].map(v=>['brand',v,v]),...[...F.condition].map(v=>['condition',v,condLabels[v]||v]),...[...F.material].map(v=>['material',v,v])];
  const nf=chips.length+(F.min?1:0)+(F.max?1:0);
  const crumb=opts.crumbs||[['Watches','#watches']];
  return `<div class="wrap">
  <div class="cb-crumbs cb-mono-sm">${crumb.map((c,i)=>i<crumb.length-1?`<a href="${c[1]}">${esc(c[0])}</a>`:`<b>${esc(c[0])}</b>`).join(' / ')}</div>
  <div class="cb-titlerow"><h2>${opts.titleHtml}</h2><span class="cb-mono-sm">${cbThin(items.length)} PIECES</span>
    <div class="tools"><form class="cb-search" onsubmit="doSearch(event)"><input id="q" class="cb-input" placeholder="Search reference or model" value="${esc(opts.q||'')}" aria-label="Search"><button class="cb-btn" style="padding:12px 18px">Search</button></form>
    <button class="cb-btn cb-btn--secondary cb-fbtn" style="padding:12px 18px" onclick="document.querySelector('.cb-filters').classList.add('open')">Filter${nf?' · '+nf:''}</button>
    <select class="cb-select" onchange="F.sort=this.value;F.page=1;render()" aria-label="Sort">${[['featured','Featured'],['newest','Newest'],['plow','Price low to high'],['phigh','Price high to low'],['ref','Reference']].map(([v,l])=>`<option value="${v}" ${F.sort===v?'selected':''}>${l}</option>`).join('')}</select></div></div>
  <div class="cb-collection"><aside class="cb-filters">
    <div class="cb-sheethead"><span class="cb-eyebrow">Filter</span><button class="cb-btn cb-btn--secondary" style="padding:10px 16px" onclick="document.querySelector('.cb-filters').classList.remove('open')">Done</button></div>
    ${fixedBrand?'':cbGroup('House','brand',brandsHere,base)}
    ${conds.length>1?cbGroup('Condition','condition',conds,base,condLabels):''}
    ${cbGroup('Case material','material',mats,base)}
    <div><h5>Price range</h5><div class="rng"><input class="cb-input mono" type="number" placeholder="Min" value="${F.min}" onchange="F.min=this.value;F.page=1;render()" aria-label="Minimum price"><span class="cb-mono-sm">to</span><input class="cb-input mono" type="number" placeholder="Max" value="${F.max}" onchange="F.max=this.value;F.page=1;render()" aria-label="Maximum price"></div></div>
    ${nf?`<div style="border:0;padding-top:16px"><a href="#" class="cb-link" onclick="clearF();return false">Clear all</a></div>`:''}
  </aside>
  <div>${chips.length?`<div class="cb-chips">${chips.map(([n,v,l])=>`<button class="cb-badge" onclick="tog('${n}','${esc(v).replace(/'/g,"\\'")}')">${esc(l)} ×</button>`).join('')}</div>`:''}
    ${grid(pageItems)}
    ${items.length?`<div class="cb-pager"><span class="cb-mono-sm">${cbThin(from+1)} TO ${cbThin(Math.min(from+PER,items.length))} OF ${cbThin(items.length)}</span>${pages>1?`<div class="nums">${pagerBtns(F.page,pages)}</div>`:''}</div>`:''}
  </div></div></div>`;
}
function pagerBtns(cur,pages){const set=new Set([1,2,pages-1,pages]);for(let k=cur-2;k<=cur+2;k++)set.add(k);const ks=[...set].filter(k=>k>=1&&k<=pages).sort((a,b)=>a-b);let out='';let prev=0;
  if(cur>1)out+=`<button onclick="F.page=${cur-1};render();window.scrollTo(0,0)" aria-label="Previous">‹</button>`;
  for(const k of ks){if(k-prev>1)out+='<span class="gap">…</span>';out+=`<button class="${cur===k?'on':''}" onclick="F.page=${k};render();window.scrollTo(0,0)">${k}</button>`;prev=k;}
  if(cur<pages)out+=`<button onclick="F.page=${cur+1};render();window.scrollTo(0,0)" aria-label="Next">›</button>`;return out;}
function clearF(){F.brand.clear();F.material.clear();F.condition.clear();F.min='';F.max='';F.page=1;render();}

/* product */
function item(it){
  state.recent=[it.id,...state.recent.filter(x=>x!==it.id)].slice(0,12);save();
  const p=cbPrice(it);
  const waText=`Hello, I am interested in ${it.brand} ${cbFam(it)}, ref. ${it.ref}, listed at ${p||'price on request'}.`;
  const sim=LISTINGS.filter(x=>x.brand===it.brand&&x.id!==it.id&&!x.sold&&x.img&&(x.family===it.family)).slice(0,3);
  const sim2=sim.length<3?sim.concat(LISTINGS.filter(x=>x.brand===it.brand&&x.id!==it.id&&!x.sold&&x.img&&!sim.includes(x)).slice(0,3-sim.length)):sim;
  const badges=[cbCond(it)!=='On enquiry'?cbCond(it):null,it.box&&it.papers?'Full set':null,"Manufacturer's warranty remaining"].filter(Boolean);
  const rows=[['Condition',cbCond(it)],['Case',[it.material,it.size?it.size+' mm':''].filter(Boolean).join(', ')],['Dial',it.dial],['Movement',it.movement],['Year',it.year],['Papers',cbCond(it)==='On enquiry'?null:cbPapers(it)],['Warranty',"Remaining manufacturer's warranty"],['Delivery','Insured, Australia-wide, 5 to 7 business days']].filter(r=>r[1]);
  document.title=`${cbFam(it)}${cbAttr(it)?', '+cbAttr(it):''} · ${it.brand} ${it.ref} · Caseback`;
  cbJsonLd(it);
  return `<div class="wrap">
  <div class="cb-crumbs cb-mono-sm"><a href="#watches">Watches</a> / <a href="#brand-${slug(it.brand)}">${esc(it.brand)}</a> / <b>${esc(it.ref)}</b></div>
  <div class="cb-product">
    <div><div class="cb-gallery">${pic(it,true)}<span class="cap cb-mono-sm">01 / 01 · DIAL</span>${it.sold?'<span class="cb-badge" style="position:absolute;top:16px;left:16px">Sold</span>':''}</div></div>
    <div class="cb-buy">
      <span class="cb-eyebrow">${esc(it.brand)}</span>
      <h1>${cbTitleItalic(it)}</h1>
      <div class="meta">${[it.ref,it.year,it.material,it.size?it.size+' MM':''].filter(Boolean).map(esc).join(' · ')}</div>
      <div class="cb-price">${p?`<span class="p">${p}</span><span class="cb-mono-sm">INCL. GST · PLUS SHIPPING${CUR!=='AUD'?' · INDICATIVE, CHARGED IN AUD':''}</span>`:`<span class="p poa">Price on request</span>`}</div>
      <div class="badges">${badges.map(b=>`<span class="cb-badge cb-badge--green">${esc(b)}</span>`).join('')}</div>
      <div class="actions">
        <a class="cb-btn cb-btn--block" href="https://wa.me/61499005000?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener">Enquire on WhatsApp</a>
        <button class="cb-btn cb-btn--secondary cb-btn--block" onclick="openModal('reserve','${it.id}')">Reserve for 48 hours</button>
      </div>
      <p class="note">Or see it in person. Level 1, 99 Queen Street, by appointment.</p>
      <div class="cb-report"><div class="cb-report__head"><h3>The caseback report</h3>${cbSeal(false)}</div>
        <dl class="cb-kv">${rows.map(r=>`<dt>${r[0]}</dt><dd>${r[0]==='Year'?`<span class="cb-mono">${esc(r[1])}</span>`:esc(r[1])}</dd>`).join('')}<dt>Reference</dt><dd><span class="cb-mono">${esc(it.ref)}</span></dd></dl>
        <p style="font-size:12px;color:var(--cb-stone);margin-top:16px"><a class="cb-link" href="#info-authenticity">How we authenticate →</a></p></div>
    </div>
  </div>
  <section class="cb-sec"><div class="cb-specs">
    <div><span>Case</span><b>${esc([it.material,it.size?it.size+' mm':''].filter(Boolean).join(', ')||'—')}</b></div>
    <div><span>House</span><b>${esc(it.brand)}</b></div>
    <div><span>Collection</span><b>${esc(cbFam(it))}</b></div>
    <div><span>Papers</span><b>${esc(cbCond(it)==='On enquiry'?'On enquiry':cbPapers(it))}</b></div></div></section>
  ${sim2.length?`<section class="cb-sec"><div class="cb-sec__head"><h2>Similar pieces</h2><a class="cb-link" href="#brand-${slug(it.brand)}">All ${esc(it.brand)} →</a></div><div class="cb-rail">${sim2.map(card).join('')}</div></section>`:''}
  </div>`;
}
function cbJsonLd(it){let s=document.getElementById('cbld');if(!s){s=document.createElement('script');s.type='application/ld+json';s.id='cbld';document.head.appendChild(s);}
  s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product","name":`${it.brand} ${cbFam(it)} ${it.ref}`,"sku":it.ref,"brand":{"@type":"Brand","name":it.brand},"image":it.imgBig||it.img,"offers":it.price?{"@type":"Offer","price":it.price,"priceCurrency":"AUD","availability":it.sold?"https://schema.org/SoldOut":"https://schema.org/InStock"}:undefined});}

/* modals: reserve + offer (WhatsApp hand-off, no payment) */

function openModal(kind,id){
  if(kind==='reserve'){closeAll();const it=byId[id];
    $('#modalBody').innerHTML=`<h3>Reserve for 48 hours</h3><p>${esc(it.brand)} ${cbTitle(it)} · <span class="cb-mono">${esc(it.ref)}</span><br>No payment. We hold it for 48 hours and confirm on WhatsApp.</p>
    <form onsubmit="cbReserve(event,'${id}')"><label>Name</label><input name="name" required><label>Phone</label><input name="phone" type="tel" required><label>Email</label><input name="email" type="email" required><button class="btn">Reserve on WhatsApp</button></form>`;
    $('#modal').classList.add('on');$('#ov').classList.add('on');return;}
  return _origOpenModal(kind,id);
}
function cbReserve(e,id){e.preventDefault();const it=byId[id];const f=e.target;const g=n=>(f.elements[n].value||'').trim();
  const lines=['CASEBACK · RESERVE 48 HOURS','Watch: '+it.brand+' '+cbFam(it)+', ref. '+it.ref,'Listed at: '+(cbPrice(it)||'price on request'),'Name: '+g('name'),'Phone: '+g('phone'),'Email: '+g('email')];
  closeAll();location.href='https://wa.me/61499005000?text='+encodeURIComponent(lines.join('\n'));}
function sellToWhatsApp(e,photos){ if(e) e.preventDefault(); const f=document.getElementById('sellForm'); if(!f) return; const g=n=>(f.elements[n]&&f.elements[n].value||'').trim(); if(!photos && !f.reportValidity()) return;
  const lines=['CASEBACK · SELL / TRADE REQUEST','House: '+g('brand'),'Reference: '+(g('ref')||'-'),'Year: '+(g('year')||'-'),'Condition: '+(g('cond')||'-'),'Box and papers: '+(g('kit')||'-'),g('ask')?'Asking: A$'+g('ask'):'','Name: '+(g('name')||'-'),'Phone: '+(g('mobile')||'-'),g('email')?'Email: '+g('email'):'','Preferred contact: '+(g('pref')||'WhatsApp'),g('notes')?'Notes: '+g('notes'):'','(Dial and caseback photos to follow in this chat)'].filter(Boolean);
  location.href='https://wa.me/61499005000?text='+encodeURIComponent(lines.join('\n')); }

/* pages */
function sellPage(){const yrs=[];for(let y=new Date().getFullYear();y>=1960;y--)yrs.push(y);
  return `<section class="cb-greenhero"><div class="wrap"><span class="cb-eyebrow" style="color:var(--cb-straw)">Sell or trade</span><h1 style="margin-top:20px">Sell or trade. <em>Same-day offer.</em></h1><p>Send the reference, a photo of the dial and a photo of the caseback. Peter replies with a number within the working day.</p></div></section>
  <div class="wrap">
  <section class="cb-sec" style="border-top:0"><div class="cb-steps">
    <div><span class="cb-eyebrow">I</span><h4>Tell us the reference.</h4><p>House, model, year and what comes with it.</p></div>
    <div><span class="cb-eyebrow">II</span><h4>Send two photos.</h4><p>The dial and the caseback, in daylight.</p></div>
    <div><span class="cb-eyebrow">III</span><h4>Receive an offer.</h4><p>Pay-out same day on acceptance.</p></div></div></section>
  <section class="cb-sec"><div class="cb-sec__head"><h2>Send for an offer</h2></div>
  <form class="cb-form" id="sellForm" onsubmit="sellToWhatsApp(event)">
    <div><label class="l">House</label><select class="cb-select" name="brand">${brands.map(b=>`<option>${esc(b)}</option>`).join('')}<option>Other</option></select></div>
    <div><label class="l">Model or reference</label><input class="cb-input mono" name="ref" required placeholder="126610LN"></div>
    <div><label class="l">Year</label><select class="cb-select" name="year"><option value="">Select</option>${yrs.map(y=>`<option>${y}</option>`).join('')}</select></div>
    <div><label class="l">Asking price (optional)</label><input class="cb-input mono" name="ask" type="number" placeholder="A$"></div>
    <div class="full"><label class="l">Condition</label><div class="cb-radios">${['Unworn','Excellent','Worn'].map((c,i)=>`<label><input type="radio" name="cond" value="${c}" ${i==1?'checked':''}>${c}</label>`).join('')}</div></div>
    <div class="full"><label class="l">Box and papers</label><div class="cb-radios">${['Full set','Box only','Papers only','Watch only'].map((c,i)=>`<label><input type="radio" name="kit" value="${c}" ${i==0?'checked':''}>${c}</label>`).join('')}</div></div>
    <div><label class="l">Name</label><input class="cb-input" name="name" required></div>
    <div><label class="l">Phone</label><input class="cb-input" name="mobile" type="tel" required></div>
    <div><label class="l">Email</label><input class="cb-input" name="email" type="email"></div>
    <div><label class="l">Preferred contact</label><div class="cb-radios" style="padding-top:12px">${['WhatsApp','Email'].map((c,i)=>`<label><input type="radio" name="pref" value="${c}" ${i==0?'checked':''}>${c}</label>`).join('')}</div></div>
    <div class="full"><label class="l">Notes</label><textarea name="notes" rows="3"></textarea></div>
    <div class="full"><button class="cb-btn">Send for an offer</button><p class="reassure">This opens WhatsApp with your details filled in; attach the dial and caseback photos there. We reply within one working day. Nothing is listed or shared until you accept.</p></div>
  </form></section>
  <section class="cb-sec"><div class="cb-promise" style="grid-template-columns:repeat(3,minmax(0,1fr))">
    <div><span class="cb-eyebrow">Licensed</span><h4>SHD-0016602 (VIC)</h4><p>Second-hand dealer licence.</p></div>
    <div><span class="cb-eyebrow">Posted watches</span><h4>Insured transit.</h4><p>We send a prepaid insured satchel on request.</p></div>
    <div><span class="cb-eyebrow">Your contact</span><h4>Peter.</h4><p class="cb-mono-sm">+61 499 005 000</p></div></div></section>
  </div>`;}
function contactPage(){return `<div class="wrap"><div class="cb-crumbs cb-mono-sm"><b>Visit</b></div></div>${cbVisitBlock()}`;}
function reviewsPage(){return contactPage();}

function infoPage(k){const h=_origInfoPage(k).replace(/Seven Dials/g,'Caseback').replace(/sevendials\.com\.au/g,'caseback.com.au');return `<div class="wrap"><div class="cb-page">${h.replace(/^<div class="page">/,'').replace(/<\/div>$/,'')}</div></div>`;}

/* chrome */
function renderBadges(){}
function openDrawer(){location.hash='#watches';}
function closeAll(){$('#modal').classList.remove('on');$('#ov').classList.remove('on');cbMenu(false);const fl=document.querySelector('.cb-filters');if(fl)fl.classList.remove('open');}
function cbMenu(on){const s=document.getElementById('cbsheet');if(s)s.classList.toggle('on',!!on);}
function doSearch(e){e.preventDefault();const v=(document.getElementById('q')||{}).value||'';CB_Q=v.trim();location.hash='#search';if(location.hash==='#search')render();}
let CB_Q='';
window.addEventListener('scroll',()=>{const w=document.getElementById('cbwa');if(w)w.classList.toggle('on',scrollY>300);},{passive:true});

function render(){
  const fn=document.getElementById('fxNote');if(fn)fn.textContent=FX.date?`rate ${FX.rate.toFixed(4)} as at ${FX.date}`:'updated hourly';
  const h=(location.hash||'#home').slice(1); const app=$('#app'); let out='';
  document.querySelectorAll('#cbnav a').forEach(a=>{const t=a.getAttribute('href').slice(1);a.classList.toggle('on',t===h||(t==='watches'&&/^(brand-|search|item-)/.test(h)));});
  document.title='Caseback · Fine watches, Melbourne';
  if(h==='home'||h==='') out=home();
  else if(h==='watches'||h==='new'||h==='hot'||h==='special'||h==='preowned'||h==='display') out=listing({titleHtml:'All watches',base:LISTINGS});
  else if(h.startsWith('brand-')){const b=brandBySlug[h.slice(6)];out=b?listing({titleHtml:esc(b),base:LISTINGS.filter(x=>x.brand===b),fixedBrand:true,crumbs:[['Watches','#watches'],[b,'#'+h]]}):cbEmpty();}
  else if(h.startsWith('item-')){const it=byId[h.slice(5)];out=it?item(it):`<div class="wrap">${cbEmpty()}</div>`;}
  else if(h==='search'){const q=CB_Q;const toks=q.toLowerCase().split(/\s+/).filter(Boolean);const base=toks.length?LISTINGS.filter(x=>{const s=(nameOf(x)+' '+(x.dial||'')+' '+x.sku).toLowerCase().replace(/[.\-\/ ]/g,'');return toks.every(t=>s.includes(t.replace(/[.\-\/ ]/g,'')));}):LISTINGS;
    out=listing({titleHtml:toks.length?`Results for “<em>${esc(q)}</em>”`:'All watches',base,q,crumbs:[['Watches','#watches'],['Search','#search']]});}
  else if(h==='sell') out=sellPage();
  else if(h==='visit'||h==='contact'||h==='reviews') out=contactPage();
  else if(h.startsWith('info-')) out=infoPage(h.slice(5));
  else out=`<div class="wrap"><div class="cb-empty"><h3>This reference is not in the ledger.</h3><p>Try the collection, or ask us to source it.</p><a class="cb-btn" href="#watches">View the collection</a></div></div>`;
  app.innerHTML=out;
}
