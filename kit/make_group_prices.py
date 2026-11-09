#!/usr/bin/env python3
"""Build kit/group_prices.json from the WhatsApp stock sheet (Watch_Stock_8_Weeks).
Input: path to the xlsx, or a CSV of its "For Sale" sheet (as copied to Dropbox by the daily scan).
Keeps brand-NEW offers with a usable price, last 30 days, converted to AUD at the fixed base rate
(the browser rescales everything by the live HKD/AUD rate).
Output per normalised reference: lowest (AUD), latest (AUD), n (offers in window), asof.
"""
import sys, json, re, os
import pandas as pd
BASE_HKD_AUD = 0.185
FX = {'HKD': BASE_HKD_AUD, 'HKD?': BASE_HKD_AUD, 'USD': 1.52, 'EUR': 1.76, 'GBP': 2.00, 'AED': 0.414, 'SGD': 1.17}
src = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), 'group_prices.json')
if src.lower().endswith('.csv'):
    d = pd.read_csv(src)
else:
    d = pd.read_excel(src, sheet_name='For Sale')
d = d[(d['Price check'] == 'ok') & (d['Condition'] == 'New') & (d['Currency'].isin(FX))].copy()
d['aud'] = [a * FX[c] for a, c in zip(d['Amount'], d['Currency'])]
d['n'] = d['Reference'].astype(str).str.upper().str.replace(r'[^A-Z0-9]', '', regex=True)
d['Last seen'] = pd.to_datetime(d['Last seen'])
asof = d['Last seen'].max()
d = d[d['Last seen'] >= asof - pd.Timedelta(days=30)].sort_values('Last seen')
g = d.groupby('n')
res = {}
for n, grp in g:
    res[n] = {'lowest': round(float(grp['aud'].min())), 'latest': round(float(grp['aud'].iloc[-1])), 'n': int(len(grp)), 'asof': asof.strftime('%Y-%m-%d')}
json.dump(res, open(out, 'w'))
print(f"{len(res)} references, as of {asof:%Y-%m-%d} -> {out}")
