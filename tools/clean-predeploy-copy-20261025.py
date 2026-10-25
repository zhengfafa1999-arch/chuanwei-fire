"""One-time, evidence-preserving corrections identified by the public-content audit."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'docs/reviews/predeploy-content-20261025'
changes=[]
def save(p, data):
    old=p.read_text('utf-8'); new=json.dumps(data,ensure_ascii=False,indent=2)+'\n'
    if old==new:return
    backup=OUT/'before'/p.relative_to(ROOT); backup.parent.mkdir(parents=True,exist_ok=True)
    if not backup.exists():backup.write_text(old,'utf-8')
    p.write_text(new,'utf-8'); changes.append(str(p.relative_to(ROOT)))
def product(id, updates, omit=(), columns=()):
    p=ROOT/'site-src/_data/documented-products'/f'{id}.json'
    d=json.loads(p.read_text('utf-8'))
    for key,(en,ar) in updates.items():
        d['copy']['en'][key]=en;d['copy']['ar'][key]=ar
        if key=='lead':d['copy']['en']['seoDescription']=en;d['copy']['ar']['seoDescription']=ar
    d['specifications']=[r for r in d['specifications'] if r['value'] not in omit]
    d['modelColumns']=[r for r in d['modelColumns'] if r['field'] not in columns]
    save(p,d)

product('rigid-grooved-pipe-couplings',{
 'lead':('Bolted rigid couplings join compatible grooved pipe ends. Compare the XGQT size range and the additional split-housing configuration below. Specify the pipe dimensions and gasket requirements when ordering.','تربط الوصلات الصلبة المثبتة بمسامير أطراف الأنابيب ذات الأخاديد المتوافقة. قارن مقاسات XGQT والتكوين الإضافي ذي الجسم المقسوم أدناه، وحدد أبعاد الأنبوب ومتطلبات الحشية عند الطلب.'),
 'image1Alt':('Additional bolted split-housing coupling','وصلة إضافية ذات جسم مقسوم ومثبت بمسامير'),
 'image1Caption':('Additional bolted split-housing coupling','وصلة إضافية ذات جسم مقسوم ومثبت بمسامير'),
 'model10Name':('Additional bolted coupling','وصلة إضافية مثبتة بمسامير'),
 'model10Selection':('Ductile iron split housing. Specify the housing dimensions, groove profile and gasket requirements.','جسم مقسوم من حديد الدكتايل. حدد أبعاد الجسم وشكل الأخدود ومتطلبات الحشية.'),
},omit=['spec4Value'])
product('cabinet-aerosol-fire-suppression',{'spec3Value':('Adhesive-backed configuration shown','تكوين مزود بطبقة لاصقة خلفية كما في الصورة')})
product('fire-extinguisher-balls',{
 'lead':('Dry powder fire extinguisher balls with a stated product weight of 0.5 kg and a 110 mm ball body. Stand and loop-handle styles are available as alternative configurations.','كرات إطفاء بالمسحوق الجاف بوزن منتج معلن يبلغ 0.5 kg وقطر جسم الكرة 110 mm. تتوفر بتجهيز حامل أو حلقة تعليق كخيارين بديلين.'),
 'spec0Value':('Dry powder','مسحوق جاف'),
})
product('combined-smoke-heat-detectors',{'lead':('Tanda combined smoke and heat detectors for compatible fire alarm systems, with 24 V DC operation. Standby and alarm current values are listed below.','كواشف مدمجة للدخان والحرارة من Tanda لأنظمة إنذار الحريق المتوافقة، تعمل بجهد 24 V DC. ترد قيم تيار الاستعداد وتيار الإنذار أدناه.')})
product('heat-detectors',{'lead':('Ceiling-mounted Tanda point-type heat detectors with a 100 mm diameter, 49 mm height and 24 V supply.','كواشف حرارة نقطية من Tanda للتركيب السقفي، بقطر 100 mm وارتفاع 49 mm وجهد تغذية 24 V.')})
product('two-piece-stainless-steel-ball-valves',{
 'lead':('A 304 stainless steel two-piece ball valve with a manual lever and female threaded ends for pressure gauge connections. Connection options are PT1/4 and PT1/2.','صمام كروي من الستانلس ستيل 304 بجسم من قطعتين وذراع يدوي ونهايات ملولبة داخليًا لتوصيلات مقاييس الضغط. خيارات التوصيل هي PT1/4 وPT1/2.'),
 **{f'model{i}Selection':('Match the thread designation to the mating connection drawing.','طابق رمز السن مع رسم التوصيل المقابل.') for i in range(2)}
})
product('fire-pump-inspection-control-cabinets',{
 'model0Selection':('Inspection control; 380 V. Request the model-specific cabinet layout and installation drawing.','فحص وتحكم؛ 380 V. اطلب مخطط الخزانة ورسم التركيب الخاصين بالموديل.'),
 'model1Selection':('Dual power control; 380 V. Request the model-specific cabinet layout and installation drawing.','تحكم بمصدرَي تغذية؛ 380 V. اطلب مخطط الخزانة ورسم التركيب الخاصين بالموديل.'),
 'model2Selection':('380 V, cold rolled steel enclosure. Include the pictured configuration with your enquiry.','380 V وجسم من الصلب المدرفل على البارد. أرفق التكوين المصور مع استفسارك.'),
},omit=['spec4Value'],columns=['factoryReference'])
product('suspended-ultrafine-dry-powder-extinguishers',{
 'lead':('Suspended automatic extinguishers using ultrafine dry powder. The pictured heat-activated unit has an 8 kg agent charge. Choose a charge option below and request the matching model details.','طفايات آلية معلقة تستخدم مسحوقاً جافاً فائق النعومة. الوحدة المصورة ذات التفعيل الحراري تحتوي على 8 kg من مادة الإطفاء. اختر السعة أدناه واطلب بيانات الموديل المطابق.'),
 'spec4Label':('Charge options','خيارات سعة مادة الإطفاء'),
 **{f'model{i}Selection':('Request the model-specific data sheet and product photograph for this charge.','اطلب ورقة بيانات الموديل وصورة المنتج المطابق لهذه السعة.') for i in [0,1,2,3,5,6]},
 'model4Selection':('Pictured 8 kg model: FZX-ACT8/1.2.','الموديل المصور بسعة 8 kg: FZX-ACT8/1.2.'),
},columns=['factoryReference'])
product('grooved-flange-adapters',{
 'selection1Body':('Send the service requirements, required body material, quantity and destination. Customization details are reviewed against your order.','أرسل متطلبات الاستخدام ومادة الجسم المطلوبة والكمية والوجهة. تُراجع تفاصيل التخصيص وفق طلبك.')
},omit=['spec2Value'])

# Remove specification rows that contain only an unresolved status. Keep their
# original values in the internal source files and before snapshot for follow-up.
for id in ['nrs-gate-valves','rotating-pressure-regulating-hydrant']:
    p=ROOT/'site-src/_data/preserved-products'/f'{id}.json';d=json.loads(p.read_text('utf-8'))
    d['specifications']=[r for r in d['specifications'] if r[1] not in ['availableOnRequest','toBeConfirmed']]
    key={'nrs-gate-valves':'specificationsConfirmedOnRequest','rotating-pressure-regulating-hydrant':'confirmedOnRequest'}.get(id)
    if key:d['copy'][key]['text']='Product configuration'
    save(p,d)
    if key:
        p=ROOT/'site-src/content/products/ar'/f'{id}.json';d=json.loads(p.read_text('utf-8'));d[key]='تكوين المنتج';save(p,d)

# Replace website-production explanations with buyer-facing technical guidance.
for p in (ROOT/'site-src/_data/preserved-products').glob('*.json'):
    d=json.loads(p.read_text('utf-8')); changed=False
    for key,value in d.get('copy',{}).items():
        if isinstance(value,dict) and value.get('text','').startswith('Critical product data is presented in HTML'):
            value['text']='Compare the specifications and configurations below. Request the documents applicable to your selected model and destination market.';changed=True
    if changed:save(p,d)
for p in (ROOT/'site-src/content/products/ar').glob('*.json'):
    d=json.loads(p.read_text('utf-8'));changed=False
    for key,value in d.items():
        if isinstance(value,str) and (value.startswith('تُعرض بيانات المنتج الأساسية بصيغة HTML') or key=='technicalDescription' and value.startswith('تُعرض بيانات المنتج الأساسية')):
            d[key]='قارن المواصفات والتكوينات أدناه. اطلب الوثائق الخاصة بالموديل المختار والسوق المستهدف.';changed=True
    if changed:save(p,d)
p=ROOT/'site-src/content/products/en/wet-alarm-check-valve.json';d=json.loads(p.read_text('utf-8'))
d['technicalDescription']='Compare the specifications and configurations below. Request the installation drawing and documents for your selected assembly.';save(p,d)

(OUT/'changed-source-files.json').write_text(json.dumps([p.relative_to(OUT/'before').as_posix() for p in (OUT/'before').rglob('*') if p.is_file()],ensure_ascii=False,indent=2),'utf-8')
print(f'Updated {len(changes)} source files; original content saved outside public output.')
