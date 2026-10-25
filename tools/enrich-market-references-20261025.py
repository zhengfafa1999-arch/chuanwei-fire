"""Add attributed selection examples, without changing supplied-product specifications."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/reviews/market-reference-research-20261025'
OUT.mkdir(parents=True, exist_ok=True)
DATA = ROOT / 'site-src/_data/documented-products'
records = []

def row(en, ar, value, arabic=None):
    return (en, ar, value, arabic or value, arabic is None)

def add(ids, title, url, rows, note, note_ar, location='Official product page'):
    if isinstance(ids, str): ids = [ids]
    for product_id in ids:
        path = DATA / (product_id + '.json')
        product = json.loads(path.read_text(encoding='utf-8'))
        before = OUT / 'before' / path.name
        before.parent.mkdir(exist_ok=True)
        if not before.exists(): before.write_bytes(path.read_bytes())
        example = {'title':'reference0Title', 'rows':[], 'note':'reference0Note', 'url':url}
        for lang in ('en', 'ar'):
            copy = product['copy'][lang]
            copy['referenceHeading'] = 'Selection reference' if lang == 'en' else 'مرجع الاختيار'
            copy['referenceScope'] = ('The manufacturer example below helps you specify an enquiry. Its values describe the named reference model, not the CHUANWEI product pictured above. Request the offered model’s datasheet for your order.' if lang == 'en' else 'يساعد المثال التالي من الشركة المصنّعة المذكورة في تحديد متطلبات الاستفسار. القيم تخص الطراز المرجعي المذكور، ولا تمثل مواصفات منتج CHUANWEI المصوّر أعلاه. اطلب ورقة بيانات الطراز المعروض لطلبك.')
            copy['referenceSource'] = 'Manufacturer reference' if lang == 'en' else 'مرجع الشركة المصنّعة'
            copy['reference0Title'] = title
            copy['reference0Note'] = note if lang == 'en' else note_ar
        for i, (en, ar, val, arval, technical) in enumerate(rows):
            label, value = f'reference0Row{i}Label', f'reference0Row{i}Value'
            example['rows'].append({'label':label, 'value':value, 'technical':technical})
            product['copy']['en'].update({label:en, value:val})
            product['copy']['ar'].update({label:ar, value:arval})
        product['referenceExamples'] = [example]
        product['source']['marketReference'] = {'grade':'C-other-manufacturer-or-series-reference', 'reviewDate':'2026-10-25', 'url':url, 'model':title, 'location':location, 'scope':'Selection reference only; no supplied-SKU specification, certification, compatibility or availability inferred.'}
        path.write_text(json.dumps(product, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
        records.append({'product':product_id, **product['source']['marketReference'], 'rows':[{'label':r[0], 'value':r[2]} for r in rows]})

pipe_ids = ['grooved-concentric-reducers','grooved-equal-crosses','grooved-equal-tees','grooved-pipe-elbows','grooved-reducing-tees']
add(pipe_ids, 'Victaulic grooved fittings · 07.01', 'https://assets.victaulic.com/assets/uploads/literature/07.01.pdf', [row('Ductile iron grade','درجة الحديد الدكتايل','ASTM A536 65-45-12'), row('Groove system','نظام الأخدود','OGS')], 'Match the pipe outside diameter and groove profile; the assembly pressure rating also depends on the coupling and pipe.', 'طابق القطر الخارجي للأنبوب وشكل الأخدود؛ يعتمد ضغط مجموعة التوصيل أيضاً على الوصلة والأنبوب.', '07.01, pages 1–2')
add('rigid-grooved-pipe-couplings','Victaulic Style 107N · 06.23','https://assets.victaulic.com/assets/uploads/literature/06.23.pdf',[row('Reference size range','نطاق المقاسات المرجعي','DN50–DN300'),row('Pipe material','مادة الأنبوب','Carbon steel','فولاذ كربوني')], 'Specify pipe outside diameter, groove dimensions, gasket compound and the required assembly pressure.', 'حدد القطر الخارجي للأنبوب وأبعاد الأخدود ومادة الحشية وضغط مجموعة التوصيل المطلوب.', '06.23, page 1')
add('grooved-flange-adapters','Victaulic Style 741 · 06.06','https://assets.victaulic.com/assets/uploads/literature/06.06.pdf',[row('Reference size range','نطاق المقاسات المرجعي','DN50–DN600'),row('Housing material grade','درجة مادة الجسم','ASTM A536 65-45-12')], 'Flange drilling and groove compatibility must match both mating components.', 'يجب أن تتطابق ثقوب الفلنجة والأخدود مع جزأي التوصيل.', '06.06, product description and materials')
add('threaded-mechanical-tees','Victaulic Styles 920 / 920N · 11.02','https://assets.victaulic.com/assets/uploads/literature/11.02.pdf',[row('Main × branch size range','نطاق مقاس الأنبوب الرئيسي × الفرع','DN50 × DN15 – DN200 × DN100')], 'Select the exact outlet connection and use the hole dimensions specified for that size.', 'اختر نوع توصيل المخرج بدقة واستخدم أبعاد الثقب المحددة لذلك المقاس.', '11.02, page 1')
add('flanged-y-strainers','Pango GL41H-16Q','https://www.pangovalve.cn/glq/156.html',[row('Body material grade','درجة مادة الجسم','QT450-10'),row('Screen material grade','درجة مادة المصفاة','304'),row('Nominal pressure','الضغط الاسمي','PN16')], 'Choose the screen aperture for the water quality and allowable pressure loss; mesh size is a separate selection.', 'اختر فتحات المصفاة وفق جودة المياه وفقد الضغط المسموح؛ مقاس الشبكة خيار مستقل.')
add('flanged-globe-valves','Datian J41T-16','https://www.dtjt.com/proDetail_1417.html',[row('Nominal pressure','الضغط الاسمي','1.6 MPa'),row('Body material','مادة الجسم','Grey cast iron','حديد زهر رمادي')], 'Match flange drilling, medium and operating temperature to the offered valve.', 'طابق ثقوب الفلنجة والوسط ودرجة حرارة التشغيل مع الصمام المعروض.')
add('swing-check-valves','NIBCO F-918-B','https://www.nibco.com/nibco-products/valves/check-valves/f-918-b',[row('Body / trim','الجسم / الأجزاء الداخلية','Cast iron / bronze','حديد زهر / برونز'),row('Cold non-shock pressure','ضغط بارد دون صدمات','200 psi / 13.8 bar')], 'This rating applies to the named valve under cold, non-shock conditions; flange class alone is not its working pressure.', 'ينطبق هذا التصنيف على الصمام المذكور في ظروف باردة دون صدمات؛ فئة الفلنجة وحدها لا تحدد ضغط التشغيل.')
add('two-piece-stainless-steel-ball-valves','NIBCO T-580-S6-R-66-LL','https://catalog.nibco.com/viewitems/ball-valves-7/ntional-port-stainless-steel-trim-t-580-s6-r-66-ll',[row('Seat material','مادة المقعد','Reinforced PTFE','PTFE مقوّى'),row('Operating rotation','زاوية التشغيل','90°')], 'Specify the thread standard and the required pressure at the operating temperature.', 'حدد معيار القلاوظ والضغط المطلوب عند درجة حرارة التشغيل.')
wika = 'https://www.wika.com/media/Data-sheets/Pressure/Pressure-gauges/ds_pm0212_en_co.pdf'
add('liquid-filled-pressure-gauges','WIKA 213.53 · NS100',wika,[row('Steady pressure limit','حد الضغط الثابت','100% FS'),row('Fluctuating pressure limit','حد الضغط المتذبذب','90% FS')], 'FS means full scale. These limits are for the 100 mm reference model; smaller dial sizes have different limits.', 'FS تعني نهاية نطاق القياس. هذه الحدود تخص الطراز المرجعي بقطر 100 مم؛ تختلف حدود المقاسات الأصغر.', 'PM 02.12, pressure limitation table')
add('pressure-vacuum-gauges','WIKA 213.53 · connection examples',wika,[row('Thread examples','أمثلة القلاوظ','G 1/4 B; G 1/2 B; 1/4 NPT; 1/2 NPT')], 'Connection examples only. Specify both the vacuum and positive-pressure endpoints, dial size and mounting direction.', 'هذه أمثلة للتوصيل فقط. حدد حد التفريغ وحد الضغط الموجب وقطر القرص واتجاه التركيب.', 'PM 02.12, process connection table')
add('pressure-gauge-syphons','WIKA 910.15','https://www.wika.com/en-us/910_15.WIKA',[row('Horizontal pressure tapping','سحب الضغط الأفقي','U-form','شكل U'),row('Vertical pressure tapping','سحب الضغط الرأسي','Trumpet form','شكل البوق')], 'Select a pressure–temperature rating for the exact material and connection; temperature and pressure maxima are not interchangeable.', 'اختر تصنيف الضغط ودرجة الحرارة للمادة والتوصيل المحددين؛ لا يجوز جمع القيم القصوى المستقلة للضغط والحرارة.')
amerex = 'https://amerex-fire.com/api/documents/download?a=en&d=import-amerex-portable-fire-extinguisher-catalog'
add('portable-dry-powder-fire-extinguishers','Amerex B500 / B500T',amerex,[row('Agent charge','كتلة مادة الإطفاء','5 lb')], 'Compare agent charge separately from shipping weight, cylinder size and fire rating.', 'قارن كتلة مادة الإطفاء بشكل مستقل عن وزن الشحن ومقاس الأسطوانة وتصنيف الإطفاء.', 'Portable catalogue, ABC dry chemical table')
add('portable-co2-fire-extinguishers','Amerex 322 / 330',amerex,[row('322 agent charge','شحنة الطراز 322','5 lb'),row('330 agent charge','شحنة الطراز 330','10 lb')], 'These are carbon dioxide charge masses, not complete extinguisher weights.', 'هذه كتل شحنة ثاني أكسيد الكربون وليست أوزان الطفايات كاملة.', 'Portable catalogue, carbon dioxide table')
add('portable-water-based-fire-extinguishers','Amerex 240','https://amerex-fire.com/products/fire-extinguishers/portable-fire-extinguishers/240',[row('Discharge duration','مدة التفريغ','55 s'),row('Cylinder material','مادة الأسطوانة','Stainless steel','فولاذ مقاوم للصدأ')], 'This is a plain-water model; its data do not establish additive or foam compatibility for another extinguisher.', 'هذا طراز يعمل بالماء فقط؛ لا تثبت بياناته توافق الإضافات أو الرغوة مع طفاية أخرى.')
add('suspended-dry-powder-extinguishers','ANAF PS2-AT','https://www.anaf.eu/en/ps2-at',[row('Powder charge','شحنة المسحوق','2 kg'),row('Thermal activation options','خيارات التنشيط الحراري','68°C / 79°C')], 'Specify the selected activation temperature and installation arrangement for the protected equipment.', 'حدد درجة حرارة التنشيط المختارة وترتيب التركيب للمعدات المحمية.')
add('suspended-ultrafine-dry-powder-extinguishers','Qinghua FZX-ACT3/1.2','https://www.qhxf.com/product-detail/BXZvgADW',[row('Agent charge','كتلة مادة الإطفاء','3 kg'),row('Working pressure','ضغط التشغيل','1.2 MPa'),row('Thermal activation','التنشيط الحراري','68°C')], 'Protection volume and local coverage require the exact device layout and hazard design; charge alone does not determine coverage.', 'يتطلب حجم الحماية والتغطية الموضعية تخطيط الجهاز وتصميم المخاطر بدقة؛ لا تحدد كتلة الشحنة وحدها نطاق التغطية.')
add('cabinet-aerosol-fire-suppression','Stat-X 30E / 100E','https://www.statx.com/product/stat-x-fixed-system-electrical-units/',[row('30E aerosol mass','كتلة الهباء للطراز 30E','30 g'),row('100E aerosol mass','كتلة الهباء للطراز 100E','100 g')], 'Agent mass differs from generator weight. Enclosure volume, openings and hazard determine the required system design.', 'تختلف كتلة مادة الإطفاء عن وزن المولد. يحدد حجم الحيز والفتحات ونوع المخاطر تصميم النظام المطلوب.')
add('pistol-grip-combination-fire-nozzles','TFT G-Force GB3N2S','https://tft.com/product_series/g-force-series/',[row('Flow settings at 7 bar','إعدادات التدفق عند 7 بار','110 / 230 / 360 / 470 / 570 L/min')], 'Flow settings apply at the stated nozzle inlet pressure; specify the hose coupling separately.', 'تنطبق إعدادات التدفق عند ضغط مدخل الفوهة المذكور؛ حدد وصلة الخرطوم بشكل مستقل.')
detector_url='https://www.pottersignal.com/product/manual/550-0622-AAE_Potter_PAD200_6DB_4DB_Series.pdf'
for pid,model in [('heat-detectors','PAD100-HD'),('photoelectric-smoke-detectors','PAD100-PD')]:
    add(pid,'Potter '+model,detector_url,[row('Supply voltage','جهد التغذية','24 VDC'),row('Standby current','تيار الاستعداد','300 µA')], 'Addressable detectors require a compatible panel and protocol; equal voltage does not establish interchangeability.', 'تتطلب الكواشف المعنونة لوحة وبروتوكولاً متوافقين؛ تساوي الجهد لا يعني إمكانية الاستبدال.', 'Detector manual, specifications page 4')
add('fire-alarm-control-panels','Potter IPA-100','https://www.pottersignal.com/ipa-fire-alarm/fire-control-panels/fire-control-panel-ipa-100',[row('Address capacity','سعة العناوين','127'),row('Power supply','مصدر التغذية','5 A')], 'Specify device protocol, loop capacity and the total alarm load; output ratings do not replace the overall power budget.', 'حدد بروتوكول الأجهزة وسعة الحلقة وإجمالي حمل الإنذار؛ لا تحل تصنيفات المخارج محل حساب القدرة الإجمالية.')
add('fire-pump-inspection-control-cabinets','Tornatech GPx series','https://www.tornatech.com/product/gpx-series-electric-fire-pump-controllers-2/',[row('Supply frequency','تردد التغذية','50 / 60 Hz'),row('Starting methods','طرق البدء','Full or reduced voltage','جهد كامل أو مخفّض')], 'This is a fire-pump controller reference. Inspection sequences, interlocks and bypass functions must be specified for the required cabinet.', 'هذا مرجع لوحدة تحكم بمضخة حريق. يجب تحديد تسلسل الفحص والتشابكات ووظائف التجاوز للخزانة المطلوبة.')
add('automatic-transfer-control-cabinets','ABB TruONE','https://new.abb.com/docs/librariesprovider22/default-document-library/truone_ats_1scc303008c0201_global_catalog_22-03.pdf?sfvrsn=11c6c60a_0',[row('Three-phase voltage','الجهد ثلاثي الطور','200–480 VAC'),row('Supply frequency','تردد التغذية','50 / 60 Hz')], 'Select rated current, pole count and transfer logic for the connected load and power system.', 'اختر التيار المقنن وعدد الأقطاب ومنطق التحويل وفق الحمل المتصل ونظام التغذية.', 'TruONE global catalogue 2022, technical data')
for pid,title,flow,head in [
    ('vertical-single-stage-fire-pumps','Jiaxun vertical single-stage series','1–100 L/s','32–150 m'),
    ('horizontal-single-stage-fire-pumps','Jiaxun horizontal single-stage series','10–100 L/s','35–150 m'),
    ('vertical-multistage-fire-pumps','Jiaxun vertical multistage series','1–40 L/s','36–202 m'),
    ('fire-pressure-maintenance-sets','Jiaxun multistage pressure-maintenance series','1–5 L/s','30–158 m')]:
    add(pid,title,'http://shanghaijiaxun.com/81.html',[row('Series flow range','نطاق تدفق السلسلة',flow),row('Series head range','نطاق ارتفاع الضخ للسلسلة',head)], 'These catalogue ranges span multiple models; maximum flow and maximum head are not one duty point. Select the offered pump using its performance curve.', 'تغطي نطاقات الكتالوج عدة طرازات؛ أقصى تدفق وأقصى ارتفاع ضخ ليسا نقطة تشغيل واحدة. اختر المضخة المعروضة باستخدام منحنى أدائها.', 'Archived manufacturer catalogue: docs/reviews/web-spec-research-20261025/jiaxun-page-5.jpg')

add('wheeled-dry-powder-fire-extinguishers','Amerex 495','https://amerex-fire.com/api/documents/download?a=en&d=import-amerex-fire-extinguisher-parts-book',[row('ABC powder charge','شحنة مسحوق ABC','50 lb'),row('Hose assembly','مجموعة الخرطوم','1/2 in × 25 ft')], 'Charge mass and hose size are separate selection criteria; compare the complete unit dimensions and fire rating for the offered model.', 'كتلة الشحنة ومقاس الخرطوم معياران مستقلان للاختيار؛ قارن أبعاد الوحدة الكاملة وتصنيف الإطفاء للطراز المعروض.', 'Parts book, printed page 15 / PDF page 17')

(OUT/'changes.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Added attributed reference sections to {len(records)} products / {len(records)*2} localized pages.')
