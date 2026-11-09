#!/usr/bin/env python3
"""Build index.caseback.template.html from index.template.html + the Caseback layer.
Only presentation is replaced. The data/pricing script (LISTINGS, PRICING, applyFx, fx.json) is kept verbatim."""
import re, os
K=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t=open(os.path.join(K,'index.template.html')).read()
css=open(os.path.join(K,'caseback','cb.css')).read()
mk=open(os.path.join(K,'caseback','cb_markup.html')).read()
js=open(os.path.join(K,'caseback','cb.js')).read()
# head
t=re.sub(r'<title>.*?</title>','<title>Caseback · Fine watches, Melbourne</title>\n<meta name="description" content="Caseback is an independent Melbourne dealer in new and pre-owned fine watches. Rolex, Patek Philippe, Audemars Piguet, Richard Mille and more. Level 1, 99 Queen Street, by appointment.">\n<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 140 140%27 fill=%27none%27 stroke=%27%2315201C%27 stroke-linecap=%27round%27%3E%3Ccircle cx=%2770%27 cy=%2770%27 r=%2765%27 stroke-width=%273%27/%3E%3Ccircle cx=%2770%27 cy=%2770%27 r=%2755%27 stroke-width=%2710%27 stroke-dasharray=%278.3 12.5%27/%3E%3Ccircle cx=%2770%27 cy=%2770%27 r=%2724%27 stroke-width=%272.4%27/%3E%3Cpath d=%27M70 46v48M46 70h48%27 stroke-width=%271.4%27/%3E%3Cpath d=%27M88 56c7-10 21-11 29-4%27 stroke-width=%272.4%27/%3E%3C/svg%3E">',t,count=1,flags=re.S)
t=re.sub(r'<link href="https://fonts.googleapis.com/css2[^>]*>','<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">',t,count=1)
# drop every existing <style> block in head, insert Caseback css
head,body=t.split('</head>',1)
head=re.sub(r'<style[^>]*>.*?</style>\s*','',head,flags=re.S)
head+= '<style id="caseback">\n'+css+'\n</style>\n'
t=head+'</head>'+body
# body chrome
a=t.index('<!-- TOP BAR -->'); b=t.index('</footer>')+len('</footer>')
t=t[:a]+mk+t[b:]
# keep originals reachable for the overrides
t=t.replace('function openModal(kind,id){closeAll();','function _origOpenModal(kind,id){closeAll();',1)
t=t.replace('function infoPage(k){','function _origInfoPage(k){',1)
# presentation layer goes right before the boot line
boot='renderBadges();render();'
i=t.rindex(boot)
t=t[:i]+js+'\n'+t[i:]
open(os.path.join(K,'index.caseback.template.html'),'w').write(t)
print('ok',len(t))
