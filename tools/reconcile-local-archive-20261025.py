"""Reconcile explicit fields from the user's saved listings into the matching products."""
import json,re,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/reviews/market-reference-research-20261025'
archive=json.loads((OUT/'local-archive/inventory.json').read_text(encoding='utf-8'))
changes=[]

def update(pid, archive_id, fields, resolved_note):
    path=ROOT/'site-src/_data/documented-products'/(pid+'.json')
    p=json.loads(path.read_text(encoding='utf-8'))
    for key,en_label,ar_label,en_value,ar_value,technical in fields:
        label,value=key+'Label',key+'Value'
        p['specifications']=[s for s in p['specifications'] if s['label']!=label]
        p['specifications'].append({'label':label,'value':value,'technical':technical})
        p['copy']['en'].update({label:en_label,value:en_value})
        p['copy']['ar'].update({label:ar_label,value:ar_value})
    item=archive[archive_id]
    evidence={'reviewDate':'2026-10-25','path':item['path'],'sha256':hashlib.sha256(Path(item['path']).read_bytes()).hexdigest(),'location':'Visible product attributes and model/variant table','adopted':resolved_note,'scope':'User-selected saved listing; no certification, price, stock or package-weight claims adopted.'}
    p['source']['localArchiveRecheck']=evidence
    if pid=='automatic-transfer-control-cabinets':
        p['source']['unresolved']=['额定电流、转换逻辑、频率和防护等级按准确供货柜核实；JX-ATS-63A柜体尺寸已依据保存页面SKU表补入。']
    path.write_text(json.dumps(p,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    changes.append({'product':pid,'source':evidence,'addedKeys':[x[0] for x in fields]})

size='1200 × 600 × 400 mm'
update('automatic-transfer-control-cabinets',2,[('archiveCabinetDimensions','JX-ATS-63A cabinet dimensions','أبعاد خزانة JX-ATS-63A',size,size,True)],'SKU表柜体尺寸1200*600*400，另一处表头明确mm。仅用于JX-ATS-63A，不推广到全部控制柜。')
update('fire-pump-inspection-control-cabinets',2,[('archiveCabinetDimensions','JX-XFXJ-7.5 / JX-ATS-63A cabinet dimensions','أبعاد خزانتي JX-XFXJ-7.5 / JX-ATS-63A',size,size,True)],'两款命名SKU均列1200*600*400 mm；未标型号附加照片不套用该尺寸。')
update('vertical-multistage-fire-pumps',8,[('archiveCasing','Pump casing material','مادة جسم المضخة','Cast iron','حديد زهر',False)],'商品属性明确泵体材质铸铁；不据此推断叶轮、轴和外筒材质。')

tee=archive[32]['text']
sizes=list(dict.fromkeys(re.findall(r'正三通 通径DN(\d+)外径(\d+)',tee)))
assert len(sizes)==10
value='; '.join('DN'+dn+' / '+od+' mm' for dn,od in sizes)
update('grooved-equal-tees',32,[('archiveSizeOptions','Nominal size / pipe outside diameter options','خيارات المقاس الاسمي / القطر الخارجي للأنبوب',value,value,True)],'采用保存页面10种DN/实际外径组合；同DN不同外径分别保留，不将其认作互换接口。')
reducer=archive[30]['text']
pairs=list(dict.fromkeys(re.findall(r'通径DN(\d+)\*(\d+)外径(\d+)\*(\d+)',reducer)))
assert len(pairs)==18
value='; '.join(f'DN{a} × DN{b} / {c} × {d} mm' for a,b,c,d in pairs)
update('grooved-concentric-reducers',30,[('archiveSizeOptions','Nominal size pair / pipe outside diameter pair','زوج المقاسات الاسمية / زوج الأقطار الخارجية للأنبوب',value,value,True)],'采用保存页面18组同心大小头DN和两端实际外径，不扩展未列出的规格。')
(OUT/'local-changes.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Reconciled {len(changes)} product pages from explicit local fields.')
