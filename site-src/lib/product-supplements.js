import { versionedProductImage } from './public-asset-versions.js';
import { concealedSeries } from './concealed-series.js';
// Exact-configuration facts selected from the archived manufacturer confirmations.
// Source paths stay internal. A series supplement never changes another variant.
const pair = (en, ar) => ({ en, ar });
const labels = {
  model: pair('Factory reference', 'مرجع المصنع'),
  material: pair('Material', 'المادة'),
  bulb: pair('Glass bulb diameter', 'قطر البصيلة الزجاجية'),
  weight: pair('Approximate unit weight', 'الوزن التقريبي للقطعة'),
  thread: pair('Connection', 'التوصيل'),
  size: pair('Nominal size', 'المقاس الاسمي'),
  k: pair('K-factor designation', 'تسمية معامل K'),
  angle: pair('Spray angle', 'زاوية الرش'),
  pressure: pair('Working pressure', 'ضغط التشغيل'),
  nominalPressure: pair('Nominal pressure', 'الضغط الاسمي'),
  sprayPressure: pair('Rated spray pressure', 'ضغط الرش المقنن'),
  flow: pair('Flow', 'التدفق'),
  orifice: pair('Outlet orifice diameter', 'قطر فتحة المخرج'),
  length: pair('Overall length', 'الطول الكلي'),
  temperature: pair('Sprinkler temperature', 'درجة حرارة الرشاش'),
  dimensions: pair('Overall dimensions', 'الأبعاد الكلية'),
  mode: pair('Operation', 'التشغيل'),
  voltage: pair('Solenoid voltage', 'جهد الصمام الكهربائي'),
  stem: pair('Stem', 'ساق الصمام'),
  body: pair('Body / bonnet', 'الجسم والغطاء'),
  seat: pair('Seat / seal', 'المقعد والختم'),
  trim: pair('External trim piping', 'أنابيب الملحقات الخارجية'),
  inletPressure: pair('Inlet pressure range', 'نطاق ضغط المدخل'),
  outletPressure: pair('Outlet pressure range', 'نطاق ضغط المخرج'),
  test: pair('Strength test pressure', 'ضغط اختبار المتانة'),
  finish: pair('Finish', 'التشطيب'),
  tail: pair('Hose-tail diameter options', 'خيارات قطر ذيل الخرطوم'),
  rating: pair('Pressure designation', 'تسمية الضغط'),
  maxInlet: pair('Maximum inlet pressure', 'أقصى ضغط للمدخل'),
  warning: pair('Use limitation', 'حدود الاستخدام')
};
const row = (label, en, ar) => ({ label: labels[label], value: ar ? pair(en, ar) : en });
const config = (id, title, scope, sourcePackage, rows, note = null, image = null, sourceDocument = 'manifest.json') => ({
  id, title, scope, rows, note, image,
  evidence: { package: sourcePackage, document: sourceDocument, state: 'confirmed-manufacturer-record', collected: '2026-10-09' }
});
const stainless = pair('Stainless steel', 'فولاذ مقاوم للصدأ');
const mating = pair('Confirm the mating connection from the required drawing or sample before ordering.', 'أكد الوصلة المطابقة وفق الرسم أو العينة المطلوبة قبل الطلب.');

// These supplements explicitly cover every existing photographed configuration.
// Index their facts on those cards rather than adding a duplicate series entry.
export const sharedViewSupplementIds = new Set([
  'standard-response-fire-sprinkler', 'glass-bulb-fire-sprinkler',
  'extended-coverage-quick-response-fire-sprinkler', 'preaction-valve-assemblies'
]);

export const supplementCatalog = {
  'standard-response-fire-sprinkler': [config('copper-68', pair('68°C copper-frame models', 'موديلات 68°C ذات الإطار النحاسي'),
    pair('Applies to the pictured upright, pendent and horizontal-sidewall copper-frame models. Stainless-steel frame weight is specified separately with the order.', 'ينطبق على الموديلات المصورة ذات الإطار النحاسي: القائمة والمتدلية والجدارية الأفقية. يحدد وزن الإطار المقاوم للصدأ بشكل منفصل مع الطلب.'),
    'T-ZST80系列-68℃消防洒水喷头', [row('bulb', '5 mm'), row('weight', '45 g'), row('thread', 'R 1/2 BSPT')])],
  'glass-bulb-fire-sprinkler': [config('quick-68', pair('68°C quick-response options', 'خيارات سريعة الاستجابة عند 68°C'),
    pair('Upright, pendent and horizontal-sidewall options. Select the exact orientation and connection with the quotation.', 'خيارات قائمة ومتدلية وجدارية أفقية. حدد الاتجاه والتوصيل الدقيق مع عرض السعر.'),
    'K-ZST-series-68C-快速响应洒水喷头', [row('bulb', '3 mm'), row('k', 'K80 metric', 'K80 متري'), row('thread', 'R 1/2 BSPT')])],
  'extended-coverage-quick-response-fire-sprinkler': [config('ec-thread', pair('Connection for the pictured extended-coverage models', 'توصيل موديلات التغطية الموسعة المصورة'),
    pair('Applies to the three 68°C / K115 factory models listed above. Hydraulic selection remains specific to the supplied model and system design.', 'ينطبق على موديلات المصنع الثلاثة 68°C / K115 المذكورة أعلاه. يبقى الاختيار الهيدروليكي مرتبطاً بالموديل المورد وتصميم النظام.'),
    'EC-ZST系列-115-68℃-扩大覆盖洒水喷头', [row('thread', 'BSPT male thread', 'سن خارجي BSPT')])],
  'concealed-pendent-fire-sprinkler': [config('zstdy115-57-q5a', pair('Standard response — ZSTDY115-57°C Q5A', 'استجابة قياسية — ZSTDY115-57°C Q5A'),
    pair('These values apply to the DN20 / K115 standard-response model at 57°C. The sprinkler temperature does not specify the cover release temperature; order a matched cover assembly.', 'تنطبق هذه القيم على موديل DN20 / K115 ذي الاستجابة القياسية عند 57°C. لا تحدد درجة حرارة الرشاش درجة تحرير الغطاء؛ اطلب مجموعة غطاء مطابقة.'),
    'ZSTDY115-57C-Q5A-隐蔽式洒水喷头', [row('model', 'ZSTDY115-57°C Q5A'), row('size', 'DN20'), row('thread', '3/4 in BSPT'), row('k', '115 L/min/√bar'), row('bulb', '5 mm'), row('temperature', '57°C'), row('material', 'Copper frame', 'إطار نحاسي'), row('pressure', '1.2 MPa / 12 bar')]),
    config('zstdy115-79-q5a', pair('ZSTDY115-79°C Q5A', 'ZSTDY115-79°C Q5A'),
      pair('Specifications for this 79°C model. Select the connection size and matched cover assembly with the order.', 'مواصفات هذا الموديل عند 79°C. حدد مقاس التوصيل ومجموعة الغطاء المطابقة مع الطلب.'),
      'ZSTDY115-79C-Q5A-隐蔽式洒水喷头', [row('model', 'ZSTDY115-79°C Q5A'), row('thread', 'BSPT'), row('bulb', '5 mm'), row('temperature', '79°C'), row('material', 'Copper frame', 'إطار نحاسي'), row('pressure', '1.2 MPa / 12 bar')], null, null, 'source/1688原始确认参数.json'),
    config('zstdy115-93-q5a', pair('ZSTDY115-93°C Q5A', 'ZSTDY115-93°C Q5A'),
      pair('DN20 nominal size. Specify the thread size and matched cover assembly when ordering.', 'المقاس الاسمي DN20. حدد مقاس السن ومجموعة الغطاء المطابقة عند الطلب.'),
      'ZSTDY115-93C-Q5A-隐蔽式洒水喷头', [row('model', 'ZSTDY115-93°C Q5A'), row('size', 'DN20'), row('thread', 'BSPT'), row('k', '115 L/min/√bar'), row('bulb', '5 mm'), row('temperature', '93°C'), row('material', 'Copper frame', 'إطار نحاسي'), row('pressure', '1.2 MPa / 12 bar')], null, null, 'copy/本款新增参数用户确认.json'),
    config('zstdy80-57-q5a', pair('ZSTDY80-57°C Q5A', 'ZSTDY80-57°C Q5A'),
      pair('DN15 nominal size with an electroplated copper frame. Select the thread size and matched cover assembly with the order.', 'المقاس الاسمي DN15 بإطار نحاسي مطلي كهربائياً. حدد مقاس السن ومجموعة الغطاء المطابقة مع الطلب.'),
      'ZSTDY80-57C-Q5A-隐蔽式洒水喷头', [row('model', 'ZSTDY80-57°C Q5A'), row('size', 'DN15'), row('thread', 'BSPT'), row('bulb', '5 mm'), row('temperature', '57°C'), row('material', 'Copper frame', 'إطار نحاسي'), row('finish', 'Electroplated', 'مطلي كهربائياً'), row('pressure', '1.2 MPa / 12 bar')], null, null, 'source/用户确认摘录.json'),
    config('zstdy80-79-q5a', pair('ZSTDY80-79°C Q5A', 'ZSTDY80-79°C Q5A'),
      pair('Working-pressure upper limit for this DN15 model. Select the exact thread size and matched cover assembly when ordering.', 'الحد الأعلى لضغط التشغيل لهذا الموديل بالمقاس الاسمي DN15. حدد مقاس السن الدقيق ومجموعة الغطاء المطابقة عند الطلب.'),
      'ZSTDY80-79C-Q5A-隐蔽式洒水喷头', [row('model', 'ZSTDY80-79°C Q5A'), row('size', 'DN15'), row('thread', 'BSPT'), row('bulb', '5 mm'), row('temperature', '79°C'), row('pressure', '≤1.2 MPa / ≤12 bar')], null, null, 'copy/国际站首款试做-压力与DN15确认.json'),
    config('zstdy80-93-q3a', pair('ZSTDY80-93°C Q3A', 'ZSTDY80-93°C Q3A'),
      pair('Specifications for the 3 mm glass-bulb model at 93°C. Select the thread size and matched cover assembly with the order.', 'مواصفات الموديل ذي البصيلة الزجاجية 3 mm عند 93°C. حدد مقاس السن ومجموعة الغطاء المطابقة مع الطلب.'),
      'ZSTDY80-93C-Q3A-隐蔽式洒水喷头', [row('model', 'ZSTDY80-93°C Q3A'), row('size', 'DN15'), row('thread', 'BSPT'), row('k', 'K80'), row('bulb', '3 mm'), row('temperature', '93°C'), row('material', 'Copper frame', 'إطار نحاسي'), row('pressure', '1.2 MPa / 12 bar')], null, null, 'copy/最新用户确认摘录.json'),
    config('zstdy80-141-q5a', pair('Standard response — ZSTDY80-141°C Q5A', 'استجابة قياسية — ZSTDY80-141°C Q5A'),
      pair('Specifications for the DN15 standard-response model at 141°C. Order a matched cover assembly; the sprinkler rating does not specify the cover release temperature.', 'مواصفات الموديل ذي الاستجابة القياسية بالمقاس الاسمي DN15 عند 141°C. اطلب مجموعة غطاء مطابقة؛ لا تحدد درجة حرارة الرشاش درجة تحرير الغطاء.'),
      'ZSTDY80-141C-Q5A-隐蔽式洒水喷头', [row('model', 'ZSTDY80-141°C Q5A'), row('size', 'DN15'), row('thread', 'BSPT'), row('k', '80 L/min/√bar'), row('bulb', '5 mm'), row('temperature', '141°C'), row('material', 'Copper frame', 'إطار نحاسي'), row('pressure', '1.2 MPa / 12 bar')], null, null, 'copy/最新用户参数确认.json')],
  'large-k-factor-esfr-sprinklers': [config('esfr-202-68', pair('ESFR K202 / 68°C option', 'خيار ESFR K202 / 68°C'),
    pair('A separate 68°C upright/pendent option. These values do not replace the 74°C fusible-element model table above.', 'خيار منفصل عند 68°C باتجاه قائم أو متدلٍ. لا تحل هذه القيم محل جدول موديلات العنصر القابل للانصهار عند 74°C أعلاه.'),
    'ESFR-K202-68C-早期抑制快速响应喷头', [row('k', 'K202'), row('material', 'Copper body', 'جسم نحاسي'), row('thread', 'BSPT thread; nominal thread size specified with the order', 'سن BSPT؛ يحدد المقاس الاسمي للسن مع الطلب'), row('pressure', '1.2 MPa / 12 bar')])],
  'dry-pendent-fire-sprinklers': [config('dry-lengths', pair('Dry-sprinkler length and connection options', 'خيارات طول وتوصيل الرشاش الجاف'),
    pair('Applies to T-ZSTGX80 / K-ZSTGX80 at 68°C. Length is measured over the complete assembly; select the required frame and trim with the order.', 'ينطبق على T-ZSTGX80 / K-ZSTGX80 عند 68°C. يقاس الطول عبر المجموعة الكاملة؛ حدد الإطار والملحقات المطلوبة مع الطلب.'),
    'T-ZSTGX80-K-ZSTGX80-干式喷头', [row('model', 'T-ZSTGX80-68°C Q5 / K-ZSTGX80-68°C Q3'), row('thread', 'R 1/2 BSPT'), row('length', '100 / 145 / 300 mm'), row('material', 'Stainless-steel frame, deflector and extension tube', 'إطار وعاكس وأنبوب امتداد من الفولاذ المقاوم للصدأ')])],
  'water-mist-nozzles': ['16/120', '34/120', '68/120'].map((suffix, i) => config(`ss-${i}`, pair(`Stainless-steel nozzle — ZSTWB${suffix}`, `فوهة مقاومة للصدأ — ZSTWB${suffix}`),
    pair('A stainless-steel configuration separate from the copper-body range above. Use the exact model data for spray-system selection.', 'تكوين مقاوم للصدأ منفصل عن مجموعة الجسم النحاسي أعلاه. استخدم بيانات الموديل الدقيق لاختيار نظام الرش.'),
    'ZSTWB系列-不锈钢水雾喷头', [row('model', `ZSTWB${suffix}`), row('material', stainless.en, stainless.ar), row('thread', ['R 1/2 BSPT', 'R 3/4 BSPT', 'R 1 BSPT'][i]), row('k', [`16 L/min/√bar`, `34 L/min/√bar`, `68 L/min/√bar`][i]), row('angle', '120°')], null,
    i === 0 ? { path: 'assets/products/verified-configurations/zstwb-stainless.jpg', caption: pair('Stainless-steel ZSTWB series sample; representative of the configuration, not a size drawing.', 'عينة من سلسلة ZSTWB المقاومة للصدأ؛ تمثل التكوين وليست رسماً للأبعاد.') } : null)),
  'water-curtain-nozzles': [
    ...['DN15', 'DN20', 'DN25'].map((dn, i) => config(`ss304-${dn.toLowerCase()}`, pair(`304 stainless-steel single-slot nozzle — ${dn}`, `فوهة أحادية الشق من فولاذ 304 المقاوم للصدأ — ${dn}`),
      pair('Open single-outlet, single-slot ZSTM-B configuration. These values apply only to this 304 stainless-steel option.', 'تكوين ZSTM-B مفتوح بمخرج واحد وشق واحد. تنطبق هذه القيم على هذا الخيار من فولاذ 304 المقاوم للصدأ فقط.'),
      'ZSTM-B-SS304-304不锈钢单口水幕喷头', [row('size', dn), row('material', '304 stainless steel', 'فولاذ مقاوم للصدأ 304'), row('thread', ['R 1/2 BSPT', 'R 3/4 BSPT', 'R 1 BSPT'][i]), row('k', ['K28', 'K80', 'K115'][i]), row('angle', '120°'), row('pressure', '0.10–0.60 MPa / 1.0–6.0 bar')],
      null, i === 0 ? { path: 'assets/products/verified-configurations/zstm-b-304.jpg', caption: pair('304 stainless-steel single-slot configuration; representative series sample.', 'تكوين أحادي الشق من فولاذ 304 المقاوم للصدأ؛ عينة تمثل السلسلة.') } : null, 'copy/export-parameter-crosswalk.md')),
    ...['DN15', 'DN20', 'DN25'].map((dn, i) => config(`zstmb-${dn.toLowerCase()}`, pair(`Stainless-steel ZSTMB option — ${dn}`, `خيار ZSTMB المقاوم للصدأ — ${dn}`),
      pair('A separate ZSTMB configuration; do not substitute its K designation or pressure for the 304 single-slot configuration.', 'تكوين ZSTMB منفصل؛ لا تستبدل تسمية K أو ضغطه بقيم التكوين الأحادي الشق من فولاذ 304.'),
      'ZSTMB系列-不锈钢水幕喷头', [row('size', dn), row('material', stainless.en, stainless.ar), row('thread', 'BSPT male thread', 'سن خارجي BSPT'), row('k', ['K18', 'K30', 'K50'][i]), row('angle', '120°'), row('pressure', ['0.35 MPa / 3.5 bar', '0.35 MPa / 3.5 bar', '0.8 MPa / 8 bar'][i])]))
  ],
  'preaction-valve-assemblies': [config('flanged-materials', pair('All preaction models — materials, voltage and nominal pressure', 'جميع موديلات الإجراء المسبق — المواد والجهد والضغط الاسمي'),
    pair('These specifications apply to all listed flanged and grooved preaction assemblies, including standard and current designs. Nominal pressure is a designation, not a test-pressure value.', 'تنطبق هذه المواصفات على جميع مجموعات الإجراء المسبق المدرجة بفلنجات أو بوصلات محززة، بما في ذلك التصاميم القياسية والحالية. الضغط الاسمي تسمية للضغط وليس قيمة ضغط اختبار.'),
    'preaction-specifications-20261009', [row('body', 'Ductile iron', 'حديد زهر مطيل'), row('seat', 'NBR sealing components', 'مكونات ختم NBR'), row('trim', 'Galvanized steel', 'فولاذ مجلفن'), row('material', 'Brass valve components', 'مكونات صمامات من النحاس الأصفر'), row('finish', 'Epoxy coating', 'طلاء إيبوكسي'), row('voltage', 'DC 24 V'), row('nominalPressure', '1.6 MPa')], null, null, 'user-confirmation.json')],
  'dry-pipe-alarm-valves': [config('zsfc-components', pair('ZSFC component materials', 'مواد مكونات ZSFC'),
    pair('Material specification for the documented ZSFC configuration. Pressure and report coverage remain specific to each model.', 'مواصفة المواد لتكوين ZSFC الموثق. يبقى الضغط ونطاق التقرير مرتبطين بكل موديل.'),
    'ZSFC系列-干式报警阀', [row('body', 'QT450-10 ductile iron', 'حديد زهر مطيل QT450-10'), row('seat', 'Brass seat; EPDM disc seal', 'مقعد من النحاس الأصفر؛ ختم قرص EPDM'), row('stem', 'Bronze shaft and bushings', 'محور وجلب من البرونز'), row('trim', 'Galvanized steel pipe', 'أنبوب فولاذ مجلفن')], null, null, 'source/ZSFC-series-parameter-input.json')],
  'wafer-supervisory-butterfly-valves': [config('zsxdf7-selection', pair('Wafer supervisory valve — order selection', 'صمام مراقبة بين الفلنجات — اختيار الطلب'),
    pair('Applies to ZSXDF7-Q wafer supervisory valves. Select size and signal requirements separately; the photograph is not proof of every size.', 'ينطبق على صمامات المراقبة ZSXDF7-Q بين الفلنجات. حدد المقاس ومتطلبات الإشارة بشكل منفصل؛ لا تثبت الصورة جميع المقاسات.'),
    'ZSXDF7-Q系列-对夹式消防信号蝶阀', [row('size', 'DN50 / DN65 / DN80 / DN100 / DN125 / DN150 / DN200'), row('rating', 'PN16'), row('stem', 'Stainless steel 431 / 1Cr17Ni2', 'فولاذ مقاوم للصدأ 431 / 1Cr17Ni2')], mating)],
  'rotating-pressure-regulating-hydrant': [config('snzw-body', pair('SNZW65 body material', 'مادة جسم SNZW65'),
    pair('Body material applies to SNZW65-I-A, SNZW65-II and SNZW65-III. Other component materials and hydraulic values remain model-specific.', 'تنطبق مادة الجسم على SNZW65-I-A وSNZW65-II وSNZW65-III. تبقى مواد المكونات الأخرى والقيم الهيدروليكية مرتبطة بالموديل.'),
    'SNZW65系列-旋转减压稳压室内消火栓', [row('material', 'Ductile-iron body', 'جسم من الحديد الزهر المطيل')])],
  'straight-stream-fire-hose-nozzles': [
    config('qz65', pair('DN65 straight-stream nozzle — QZ3.5/7.5', 'فوهة تيار مستقيم DN65 — QZ3.5/7.5'), pair('Rated flow below is specified at the rated nozzle pressure, not at a different system pressure.', 'يحدد التدفق المقنن أدناه عند ضغط الفوهة المقنن وليس عند ضغط نظام مختلف.'),
      'QZ3.5-7.5-直流水枪', [row('model', 'QZ3.5/7.5'), row('size', 'DN65'), row('material', 'Aluminum alloy body', 'جسم من سبيكة ألومنيوم'), row('sprayPressure', '0.35 MPa / 3.5 bar'), row('flow', '7.5 L/s / 450 L/min')], mating,
      { path: 'assets/products/verified-configurations/qz35-75.jpg', caption: pair('QZ3.5/7.5 real product sample.', 'عينة حقيقية للمنتج QZ3.5/7.5.') }),
    ...['51', '66'].map((model, i) => config(`russian-${model}`, pair(`Russian-pattern straight-stream nozzle — ${model}`, `فوهة تيار مستقيم بالنمط الروسي — ${model}`),
      pair('Rated flow is specified at 0.35 MPa. Working pressure and rated spray pressure describe different operating values.', 'يحدد التدفق المقنن عند 0.35 MPa. يصف ضغط التشغيل وضغط الرش المقنن قيمتين مختلفتين.'),
      '51-66系列-俄式直流水枪', [row('model', model), row('material', 'Aluminum alloy', 'سبيكة ألومنيوم'), row('pressure', '1.6 MPa / 16 bar'), row('sprayPressure', '0.35 MPa / 3.5 bar'), row('flow', ['5 L/s / 300 L/min', '7.5 L/s / 450 L/min'][i]), row('orifice', ['16 mm', '19 mm'][i]), row('length', ['255 mm', '277 mm'][i])], mating, null, 'source/已确认参数-20260911.json'))
  ],
  'lever-operated-fire-hose-nozzles': [config('bs-lever', pair('Aluminum lever nozzle — 2 in / 2½ in', 'فوهة ألومنيوم بذراع — 2 in / 2½ in'),
    pair('Applies to the aluminum-alloy, rubber-grip version with BS 336 coupling. Other inlet configurations have separate specifications.', 'ينطبق على نسخة سبيكة الألومنيوم ذات المقبض المطاطي ووصلة BS 336. لتكوينات المدخل الأخرى مواصفات منفصلة.'),
    '2IN-2.5IN系列-杠杆式消防水枪', [row('material', 'Aluminum alloy body; rubber grip', 'جسم من سبيكة ألومنيوم؛ مقبض مطاطي'), row('thread', 'BS 336 coupling'), row('pressure', '0.7 MPa / 7 bar'), row('flow', '200–250 L/min'), row('orifice', '9 / 12 mm')],
    pair('Flow is not assigned to a test pressure in this specification. Verify the required mating coupling.', 'لا ينسب التدفق إلى ضغط اختبار في هذه المواصفة. تحقق من الوصلة المطابقة المطلوبة.')),
    config('bs-lever-2in', pair('2 in lever-nozzle dimensions', 'أبعاد الفوهة ذات الذراع 2 in'), pair('Length, weight and straight-jet mode below apply only to the 2 in version.', 'ينطبق الطول والوزن ووضع التيار المستقيم أدناه على نسخة 2 in فقط.'),
      '2IN-2.5IN系列-杠杆式消防水枪', [row('length', '400 mm'), row('weight', '1.132 kg'), row('mode', 'Straight jet', 'تيار مستقيم')])],
  'kd-hose-couplings': ['50', '65'].map((size, i) => config(`kd${size}`, pair(`Snap-type coupling — KD${size}`, `وصلة تعشيق — KD${size}`),
    pair('Match both the hose size and the coupling profile. Overall size below is outside diameter × height.', 'طابق مقاس الخرطوم وشكل الوصلة معاً. المقاس الكلي أدناه هو القطر الخارجي × الارتفاع.'),
    'KD50-KD65-内扣式消防接口', [row('model', `KD${size}`), row('size', `DN${size}`), row('material', 'Aluminum alloy body; NBR seal', 'جسم من سبيكة ألومنيوم؛ ختم NBR'), row('pressure', '1.6 MPa / 16 bar'), row('dimensions', ['Ø98 × 77.5 mm', 'Ø111 × 82.5 mm'][i]), row('finish', 'Gray coating', 'طلاء رمادي')], mating,
    i === 1 ? { path: 'assets/products/verified-configurations/kd65.jpg', caption: pair('KD65 hose coupling — product photograph.', 'وصلة خرطوم KD65 — صورة المنتج.') } : null)),
  'catalog-fire-hose-couplings-page-20': [
    config('bs-instantaneous', pair('Brass instantaneous coupling — 2½ in', 'وصلة فورية من النحاس الأصفر — 2½ in'),
      pair('Hose-tail diameter is a separate selection field from nominal coupling size and hose inside diameter.', 'قطر ذيل الخرطوم حقل اختيار منفصل عن المقاس الاسمي للوصلة والقطر الداخلي للخرطوم.'),
      'BS336-JM-series-英式瞬时消防水带接口', [row('size', '2½ in'), row('material', 'Brass body', 'جسم من النحاس الأصفر'), row('tail', '38 / 51 / 63 mm'), row('mode', 'Male / female instantaneous coupling', 'وصلة فورية ذكر وأنثى')], mating),
    config('nh-brass', pair('Brass NH/NST expansion-ring coupling — 2½ in', 'وصلة NH/NST من النحاس الأصفر بحلقة تمدد — 2½ in'),
      pair('Select the pressure option and hose-tail requirement with the exact supplied configuration. The options below are not a complete combination matrix.', 'حدد خيار الضغط ومتطلب ذيل الخرطوم مع تكوين التوريد الدقيق. الخيارات أدناه ليست مصفوفة كاملة لجميع التركيبات.'),
      'NH-NST-25-2.5英寸NH-NST黄铜消防水带内胀接头', [row('size', '2½ in NH/NST'), row('material', 'Brass body', 'جسم من النحاس الأصفر'), row('mode', 'Expansion-ring connection', 'توصيل بحلقة تمدد'), row('pressure', '1.6 MPa / 16 bar; 2.5 MPa / 25 bar'), row('tail', '73 mm / 2-13/16 in / 3 in')], mating)
  ],
  'catalog-compact-spray-nozzles-page-22': [config('nh-adjustable', pair('Adjustable NH/NST nozzle — 1½ in', 'فوهة قابلة للضبط NH/NST — 1½ in'),
    pair('Twist adjustment: straight stream, fog and shutoff. The pressure designation is not a maximum-pressure rating or a flow-at-pressure test claim.', 'ضبط بالدوران: تيار مستقيم وضباب وإغلاق. تسمية الضغط ليست تصنيفاً للضغط الأقصى أو ادعاء باختبار التدفق عند ذلك الضغط.'),
    'NH15-旋转可调式直流喷雾消防水枪头', [row('thread', '1½ in NH/NST female', 'سن داخلي 1½ in NH/NST'), row('material', 'Polycarbonate body; brass components', 'جسم من البولي كربونات؛ مكونات من النحاس الأصفر'), row('flow', '75 US gpm / approx. 284 L/min', '75 US gpm / نحو 284 L/min'), row('rating', '100 psi'), row('dimensions', '73 × 73 × 117 mm (W × D × H)', '73 × 73 × 117 mm (عرض × عمق × ارتفاع)'), row('warning', 'Not for electrical fires', 'غير مخصص للحرائق الكهربائية')], mating)],
  'catalog-nozzles-inductors-connections-page-19': [config('brass-bspp-adjustable', pair('Brass adjustable nozzle — 1½ in BSPP', 'فوهة قابلة للضبط من النحاس الأصفر — 1½ in BSPP'),
    pair('Pressure values are gauge-pressure specifications for this nozzle option.', 'قيم الضغط هي مواصفات ضغط مقاس نسبة إلى الضغط الجوي لهذا الخيار من الفوهات.'),
    'SUNPOOL-1.5-BSPP-16-黄铜旋转可调消防喷雾水枪', [row('material', 'Brass body', 'جسم من النحاس الأصفر'), row('thread', '1½ in BSPP (G) female parallel thread', 'سن داخلي متوازٍ 1½ in BSPP (G)'), row('orifice', '16 mm'), row('pressure', '100 psig / approx. 6.9 bar / 0.69 MPa(g)', '100 psig / نحو 6.9 bar / 0.69 MPa(g)'), row('maxInlet', '200 psig / approx. 13.8 bar / 1.38 MPa(g)', '200 psig / نحو 13.8 bar / 1.38 MPa(g)')], mating)],
  'catalog-twin-outlet-fire-connections-page-13': [
    config('fdc-nh', pair('Two-way fire department connection — NH/NST', 'مدخل ثنائي لفرق الإطفاء — NH/NST'),
      pair('Dual-clapper configuration with female swivel inlets. Select the exact thread and system connection before ordering.', 'تكوين بصمامي رفرف مع مدخلين داخليين دوارين. حدد السن الدقيق وتوصيل النظام قبل الطلب.'),
      'FDC-2W-美式双口消防队进水口', [row('model', 'FDC-2W'), row('thread', '2 × 2½ in NH/NST female swivel inlets; 4 in NPT system connection', 'مدخلان داخليان دواران 2 × 2½ in NH/NST؛ توصيلة النظام 4 in NPT'), row('material', 'Cast copper-alloy body', 'جسم مصبوب من سبيكة نحاسية')], mating),
    config('fdc-bs', pair('Two-inlet fire service connection — BS 336', 'مدخلان لخدمة الإطفاء — BS 336'),
      pair('Inlet designation and nominal flange size for this configuration only. Flange drilling is selected separately.', 'تسمية المدخل والمقاس الاسمي للفلنجة لهذا التكوين فقط. يحدد ثقب الفلنجة بشكل منفصل.'),
      'QG-MS-GS-010-英式双口消防队进水口', [row('thread', '2 × 2½ in BS 336 inlets; 4 in nominal flange', 'مدخلان 2 × 2½ in BS 336؛ فلنجة اسمية 4 in'), row('mode', 'Handwheel-operated side valve; caps with chains', 'صمام جانبي يعمل بعجلة يدوية؛ أغطية بسلاسل')], mating)
  ],
  'catalog-hydrant-auxiliary-valves-page-14': [
    ...['50', '65'].map((size, i) => config(`16k${size}`, pair(`Indoor hydrant valve — 16K${size}`, `صمام حنفية حريق داخلية — 16K${size}`),
      pair('Single-valve configuration with Russian-pattern quick coupling. These values do not apply to the twin-valve 65-16K-65 product.', 'تكوين بصمام واحد ووصلة سريعة بالنمط الروسي. لا تنطبق هذه القيم على المنتج ثنائي الصمامات 65-16K-65.'),
      '16K50-16K65-室内消火栓阀', [row('model', `16K${size}`), row('size', `DN${size}`), row('body', 'Ductile iron', 'حديد زهر مطيل'), row('stem', 'H59-1 brass stem and seat', 'ساق ومقعد من النحاس الأصفر H59-1'), row('pressure', '1.6 MPa / 16 bar'), row('test', '2.4 MPa / 24 bar'), row('inletPressure', '0.4–1.0 MPa / 4–10 bar'), row('outletPressure', '0.20–0.49 MPa / 2.0–4.9 bar'), row('flow', '≥5 L/s / ≥300 L/min'), row('weight', ['1.30 kg', '1.65 kg'][i]), row('finish', 'Red powder coating', 'طلاء مسحوق أحمر')], mating)),
    config('test-drain', pair('Integrated test and drain valve with sight glass', 'صمام اختبار وتصريف متكامل بزجاج رؤية'),
      pair('Pressure and thread family for the sight-glass configuration. The final size and test orifice are selected for the order.', 'الضغط وعائلة السن لتكوين زجاج الرؤية. يحدد المقاس النهائي وفتحة الاختبار للطلب.'),
      'a61-rp-一体式测试排水阀带观察窗', [row('rating', '300 psi'), row('thread', 'BSPT')], null, null, 'copy/产品确认与参数依据.json'),
    config('end-test', pair('End-of-line sprinkler test assembly', 'مجموعة اختبار نهاية خط الرشاشات'),
      pair('Select one factory reference below. Connection size and thread are confirmed for the exact supplied assembly.', 'اختر أحد مراجع المصنع أدناه. يؤكد مقاس التوصيل والسن لمجموعة التوريد الدقيقة.'),
      'ZSPM系列-末端试水装置', [row('model', 'ZSPM-80/1.2-S / ZSPM-115/1.2-S'), row('k', 'ZSPM-80/1.2-S: 80; ZSPM-115/1.2-S: 115'), row('pressure', '1.2 MPa / 12 bar'), row('rating', 'PN16'), row('dimensions', '200 × 175 mm (L × H)', '200 × 175 mm (طول × ارتفاع)'), row('body', 'HPb59-1 brass body', 'جسم من النحاس الأصفر HPb59-1'), row('stem', '304 stainless steel', 'فولاذ مقاوم للصدأ 304'), row('seat', 'PTFE seat; NBR seal', 'مقعد PTFE؛ ختم NBR')])
  ],
  'catalog-brass-finish-hose-valves-page-07': [config('brass-angle-1in', pair('Brass angle fire-hose valve — 1 in', 'صمام خرطوم حريق زاوي من النحاس الأصفر — 1 in'),
    pair('Nominal size, material and pressure designation for this angle-valve configuration. PN16 is not presented as a tested working-pressure value.', 'المقاس الاسمي والمادة وتسمية الضغط لتكوين الصمام الزاوي. لا يعرض PN16 كقيمة ضغط تشغيل مختبرة.'),
    '1IN-PN16-黄铜角式消防栓阀', [row('size', '1 in'), row('material', 'Brass body', 'جسم من النحاس الأصفر'), row('rating', 'PN16'), row('mode', 'Manual handwheel; angle configuration', 'عجلة يدوية؛ تكوين زاوي')])],
  'catalog-hose-valves-page-09': [config('hose-gate', pair('Fire-hose gate valve — 2½ in', 'صمام بوابة لخرطوم الحريق — 2½ in'),
    pair('Straight-through copper-body option with BS 336 coupling family. The coupling fit is checked separately.', 'خيار بجسم نحاسي ومجرى مستقيم وعائلة وصلات BS 336. تتحقق مطابقة الوصلة بشكل منفصل.'),
    'FHGV25-BS336-300PSI-CU-消防水带闸阀', [row('size', '2½ in'), row('material', 'Copper body', 'جسم نحاسي'), row('thread', 'BS 336 coupling family', 'عائلة وصلات BS 336'), row('pressure', '300 psi maximum working pressure', 'أقصى ضغط تشغيل 300 psi')], mating)]
};

const local = (value, lang) => typeof value === 'string' ? value : value?.[lang] || '';
// Keep model codes, ratios and units together in RTL values.
const isolate = (value, lang) => lang === 'ar'
  ? value.replace(/[A-Za-z0-9≥≤½¾Ø√][A-Za-z0-9 \t.:/(),≥≤–·+%°½¾Ø√×-]*[A-Za-z0-9%½¾)]|[A-Za-z0-9½¾]/g, run => `\u2066${run}\u2069`)
  : value;

// Reuse exact-model evidence without moving or broadening the legacy records.
// Each independent concealed page receives only its K-factor/response subset.
export function supplementConfigurations(routeId) {
  if (routeId === 'product:esfr-sprinklers') return supplementCatalog['large-k-factor-esfr-sprinklers'];
  const group = concealedSeries.find(item => item.routeId === routeId);
  if (!group) return supplementCatalog[routeId.replace('product:', '')] || [];
  return group.supplementIds.map(id => {
    const configuration = supplementCatalog['concealed-pendent-fire-sprinkler'].find(item => item.id === id);
    if (!configuration) throw new Error(`${routeId}: missing configuration ${id}`);
    return configuration;
  });
}

export function productSupplement(routeId, lang, assetPrefix) {
  const configs = supplementConfigurations(routeId);
  if (!configs.length) return null;
  return {
    title: local(pair('Configuration details', 'تفاصيل التكوينات'), lang),
    lead: local(pair('Compare the specifications for each named configuration below. Values apply only to the configuration shown.', 'قارن مواصفات كل تكوين مسمى أدناه. تنطبق القيم على التكوين الموضح فقط.'), lang),
    configs: configs.map(item => ({
      id: item.id,
      title: isolate(local(item.title, lang), lang),
      scope: isolate(local(item.scope, lang), lang),
      note: isolate(local(item.note, lang), lang),
      rows: item.rows.map(item => ({ label: local(item.label, lang), value: isolate(local(item.value, lang), lang) })),
      image: item.image ? { src: versionedProductImage(item.image.path, `${assetPrefix}${item.image.path}`), caption: isolate(local(item.image.caption, lang), lang) } : null
    }))
  };
}

export function productSupplementSearchTerms(routeId) {
  return supplementConfigurations(routeId).flatMap(item => [
    item.title.en, item.title.ar, ...item.rows.flatMap(row => typeof row.value === 'string' ? [row.value] : Object.values(row.value))
  ]).join(' ');
}

export function relatedSupplementConfigurations(routeId) {
  const id = routeId.replace('product:', '');
  if (sharedViewSupplementIds.has(id)) return [];
  const configs = supplementConfigurations(routeId);
  return configs.map(item => {
    // The archived photos explicitly represent these same-material series.
    const group = item.id.startsWith('ss-') ? 'ss-' : item.id.startsWith('ss304-') ? 'ss304-' : null;
    const image = item.image || (group ? configs.find(c => c.id.startsWith(group) && c.image)?.image : null);
    return {
      anchor: `configuration-${item.id}`, name: item.title, image: image?.path || null, imageCaption: image?.caption || null,
      searchTerms: [item.title.en, item.title.ar, ...item.rows.flatMap(r => typeof r.value === 'string' ? [r.value] : Object.values(r.value))].join(' ')
    };
  });
}
