import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
E=ROOT/'docs/reviews/web-spec-research-20261025'
changes=json.loads((E/'changes.json').read_text(encoding='utf-8'))

def edit(id,source,updates):
    p=ROOT/'site-src/_data/documented-products'/f'{id}.json'
    d=json.loads(p.read_text(encoding='utf-8'))
    before=E/'before'/p.name
    assert not before.exists()
    before.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    for key,en,ar in updates:
        d['copy']['en'][key]=en
        d['copy']['ar'][key]=ar
    d['source']['generalTechnicalReference']={'url':source,'reviewedAt':'2026-10-25','scope':'General operating principle or selection guidance only; no numeric specification or certification transferred from the reference manufacturer.'}
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    changes.append({'product':id,'generalGuidanceOnly':True,'url':source,'updatedCopyKeys':[u[0] for u in updates]})

edit('liquid-filled-pressure-gauges','https://blog.wika.com/en/products/filling-liquids-pressure-gauges-usage-advantages/',[
 ('lead','The YN100BF is a liquid-filled analog gauge with a stainless steel case, a 100 mm nominal dial and M20x1.5 bottom connection. Case filling helps damp movement caused by vibration. Choose the measuring range for the operating pressure.','مقياس YN100BF تناظري مملوء بسائل، بغلاف من الفولاذ المقاوم للصدأ وقرص اسمي 100 mm ووصلة سفلية M20x1.5. يساعد سائل الغلاف على تخميد الحركة الناتجة عن الاهتزاز. اختر نطاق القياس وفق ضغط التشغيل.'),
 ('selection1Body','Provide the mating thread drawing, working fluid, process and ambient temperatures, and required wetted-part material. Specify the case-fill fluid separately from the process fluid.','قدم رسم القلاوظ المطابق ووسط التشغيل ودرجات حرارة الوسط والمحيط ومادة الأجزاء الملامسة للوسط المطلوبة. حدد سائل ملء الغلاف بصورة منفصلة عن وسط التشغيل.')])
edit('pressure-gauge-syphons','https://www-prod.wika.com/en-en/pressure_gauges.WIKA',[
 ('lead','Coiled stainless steel tube accessories for pressure gauge connection assemblies. A syphon can serve as a cooling element between a hot process and the gauge. Material options are 201, 304 and 316L; select the thread and coil arrangement for the installation.','ملحقات أنابيب ملتفة من الفولاذ المقاوم للصدأ لتوصيل مقاييس الضغط. يمكن للسيفون أن يعمل كعنصر تبريد بين الوسط الساخن والمقياس. خيارات المادة هي 201 و304 و316L؛ اختر القلاوظ وشكل الالتفاف وفق التركيب.')])
edit('fire-pressure-maintenance-sets','https://www.grundfos.com/ca/learn/research-and-insights/jockey-pump',[
 ('lead','The SQL series reference assembly combines a vertical pressure vessel and two pumps on a common skid for fire water pressure maintenance. Pressure-maintenance equipment compensates for small pressure losses and reduces unnecessary main fire-pump starts. Select the assembly to match the system pressure and maintenance duty.','تجمع مجموعة سلسلة SQL المعروضة وعاء ضغط رأسياً ومضختين على قاعدة مشتركة للمحافظة على ضغط مياه الحريق. تعوض معدات المحافظة على الضغط الفواقد الصغيرة وتحد من مرات التشغيل غير الضرورية لمضخة الحريق الرئيسية. اختر المجموعة وفق ضغط النظام ومتطلبات المحافظة عليه.')])
for id in ['horizontal-single-stage-fire-pumps','vertical-single-stage-fire-pumps','vertical-multistage-fire-pumps']:
    edit(id,'https://www.grundfos.com/au/learn/research-and-insights/duty-point',[
      ('selection0Label','Pump duty point and installation','نقطة تشغيل المضخة والتركيب'),
      ('selection0Body','Provide the required flow and head at the same duty point, together with suction conditions and the installation drawing. Pump selection uses the performance curve; maximum flow and maximum head are not a simultaneous operating point.','قدم التدفق والارتفاع المطلوبين عند نقطة التشغيل نفسها، مع ظروف السحب ورسم التركيب. يعتمد اختيار المضخة على منحنى الأداء؛ ولا يمثل أقصى تدفق وأقصى ارتفاع نقطة تشغيل متزامنة.')])
(E/'changes.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Added general technical guidance to six product pages in English and Arabic.')
