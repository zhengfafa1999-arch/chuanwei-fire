"""Audit only registered public outputs; keep findings outside the deployable site."""
import json, re, sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'docs/reviews/predeploy-content-20261025'
class Content(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.parts = []
        self.links = []
        self.alt = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'): self.skip += 1
        if tag in ('p','li','dd','dt','td','th','h1','h2','h3','h4','div','section','br'): self.parts.append('\n')
        if tag == 'a': self.links.append(attrs.get('href',''))
        if tag == 'img': self.alt.append(attrs.get('alt',''))
    def handle_endtag(self, tag):
        if tag in ('script','style'): self.skip -= 1
        if tag in ('p','li','dd','dt','td','th','h1','h2','h3','h4','div','section','br'): self.parts.append('\n')
    def handle_data(self, data):
        if not self.skip: self.parts.append(data)

patterns = {
 'editorial': r'\b(?:pending|placeholder|draft|TODO|TBC|TBD|lorem|unverified|unconfirmed)\b|to be confirmed|not (?:yet )?(?:provided|verified|confirmed|available)|source[- ](?:photo|image|document|material|record|provided|listing)|supplied (?:record|source)|user[- ]confirmed|provided (?:photo|material|image)|company-provided|do not publish|internal (?:review|note)|待确认|待核实|占位|未确认|草稿|للتأكيد|غير مؤكد|المصدر|المتاحة حاليًا|لاحقًا',
 'quotation': r'available on request|subject to|confirm(?:ed|ation)?|upon request|حسب الطلب|عند الطلب|تأكيد|تُؤكد',
 'claims': r'\b(?:UL|FM|CE|LPCB|NFPA|ATEX|IECEx|certified|approved|guarantee|best|leading|100%|lifetime|maintenance.free|ISO|EN\d|BS\d)\b|معتمد|شهادة|شهادات|ضمان',
 'placeholder_syntax': r'\{(?:n\d+|[a-zA-Z_]+)\}|&#x?\w+;|localhost|127\.0\.0\.1|file:///|[CD]:[\\/]|example\.com|your[- ]company|your@email',
}
compiled = {k: re.compile(v,re.I) for k,v in patterns.items()}
rows=[]
unique={k:defaultdict(list) for k in patterns}
for route in json.loads((OUT/'routes.json').read_text('utf-8')):
    html=(ROOT/route['path']).read_text('utf-8')
    parser=Content(); parser.feed(html)
    lines=[' '.join(x.split()) for x in ''.join(parser.parts).splitlines() if x.strip()]
    row={**route,'lines':lines,'alts':parser.alt,'links':parser.links}
    rows.append(row)
    for line in dict.fromkeys(lines + parser.alt):
        for category,pattern in compiled.items():
            if pattern.search(line): unique[category][line].append(route['path'])
(OUT/'public-text.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),'utf-8')
findings={category:[{'text':text,'pages':pages} for text,pages in items.items()] for category,items in unique.items()}
(OUT/'content-scan.json').write_text(json.dumps(findings,ensure_ascii=False,indent=2),'utf-8')
print(json.dumps({'pages':len(rows),'uniqueMatches':{k:len(v) for k,v in findings.items()}},ensure_ascii=False))
for key in sys.argv[1:]:
    for item in findings[key]: print(json.dumps({'category':key, 'text':item['text'],'count':len(item['pages']),'example':item['pages'][0]},ensure_ascii=False))
