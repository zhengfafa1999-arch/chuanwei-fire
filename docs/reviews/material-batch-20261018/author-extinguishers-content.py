import json
from pathlib import Path

BASE = Path(r'D:\work\codex\阿里国际站运营\官网与产品目录素材包-20261018')
OUT = Path(__file__).with_name('extinguishers-alarms.json')
INDEX = json.loads((BASE / '03-商品索引/商品与图片资料索引.json').read_text(encoding='utf-8-sig'))
BY_NAME = {p['product_name_zh']: p for p in INDEX}
PRODUCTS = []

def bi(en, ar): return {'en': en, 'ar': ar}
def doc(source, ending=None):
    p = BY_NAME[source]
    if ending is None:
        candidates = [d for d in p['documents'] if d.endswith(('listing-fields.json', 'listing.json', '来源与事实.json'))]
    else:
        candidates = [d for d in p['documents'] if d.endswith(ending)]
    assert candidates, (source, ending)
    assert (BASE / candidates[0]).is_file()
    return candidates[0]
def refs(source_names, ending=None):
    if isinstance(source_names, str): source_names = [source_names]
    return [doc(s, ending) for s in source_names]
def spec(en, ar, ven, var, source_names, evidence='Documented'):
    return {'label': bi(en, ar), 'value': bi(ven, var), 'sources': refs(source_names), 'evidence': evidence}
def prompt(en, ar, body_en, body_ar): return {'label': bi(en, ar), 'body': bi(body_en, body_ar)}
def model(en, ar, factory, selection_en, selection_ar, source_names):
    if isinstance(source_names, str): source_names=[source_names]
    return {'name': bi(en, ar), 'factoryReference': factory, 'selection': bi(selection_en, selection_ar), 'sourceNames': source_names, 'sources': refs(source_names)}
def product(pid, family, en, ar, zh, lead_en, lead_ar, names, hero=None):
    p = {'id':pid,'familyId':family,'name':{'en':en,'ar':ar,'zh':zh},'lead':bi(lead_en,lead_ar),'sourceNames':names,'heroSourceName':hero or names[0], 'specs':[], 'models':[], 'selectionPrompts':[], 'imageCaptions':{}, 'unresolved':[], 'notes':[]}
    PRODUCTS.append(p)
    return p

fire_prompts = [
    prompt('Capacity and quantity','السعة والكمية','Specify the agent charge or volume and the quantity required for each model.','حدد كتلة مادة الإطفاء أو حجمها والكمية المطلوبة من كل طراز.'),
    prompt('Project requirements','متطلبات المشروع','Send the installation location, required fire rating and destination market so the exact model documents can be checked.','أرسل موقع الاستخدام وتصنيف الإطفاء المطلوب وبلد الوجهة للتحقق من وثائق الطراز المحدد.')
]
common_fire_gaps=['精确型号灭火级别、充装压力、使用温度、喷射性能及目的地适用文件待核实。','整机净重、毛重、包装、交期及商务条件需按订单确认。']

# Portable dry powder: seven documented agent charges, grouped from three records.
dry=['MF-ABCE系列-手提式干粉灭火器','MF-ABCE1-3-手提式干粉灭火器','MF-ABCE4-8-手提式干粉灭火器']
p=product('portable-dry-powder-fire-extinguishers','fire-extinguishers','Portable Dry Powder Fire Extinguishers','طفايات حريق محمولة بالمسحوق الجاف','手提式干粉灭火器','Portable dry powder extinguishers with carbon steel cylinders and manual lever operation. Agent charges from 1 kg to 8 kg are listed, with direct-nozzle and hose configurations.','طفايات محمولة بالمسحوق الجاف بأسطوانات من الفولاذ الكربوني وتشغيل يدوي بالذراع. تتوفر سعات موثقة من 1 kg إلى 8 kg، بتجهيزات فوهة مباشرة أو خرطوم.',dry)
p['specs']=[spec('Extinguishing agent','مادة الإطفاء','Dry powder','مسحوق جاف',dry[0]),spec('Cylinder material','مادة الأسطوانة','Carbon steel','فولاذ كربوني',dry[0]),spec('Format','التصميم','Portable','محمول',dry[0]),spec('Operation','التشغيل','Manual lever','ذراع يدوي',dry[1:]),spec('Agent charge options','خيارات كتلة مادة الإطفاء','1 / 2 / 3 / 4 / 5 / 6 / 8 kg','1 / 2 / 3 / 4 / 5 / 6 / 8 kg',dry[0]),spec('Outlet: 1–3 kg','المخرج: 1–3 kg','Direct nozzle','فوهة مباشرة',dry[1]),spec('Outlet: 4–8 kg','المخرج: 4–8 kg','Hose and nozzle','خرطوم وفوهة',dry[2]),spec('Pressure indicator','مؤشر الضغط','Fitted','مزود بمؤشر ضغط',dry[0])]
for n in [1,2,3,4,5,6,8]:
    small=n<=3
    p['models'].append(model(f'{n} kg dry powder',f'مسحوق جاف بسعة {n} kg',f'MF/ABCE{n}','Direct nozzle; manual lever.' if small else 'Hose and nozzle; manual lever.','فوهة مباشرة؛ ذراع يدوي.' if small else 'خرطوم وفوهة؛ ذراع يدوي.',[dry[0],dry[1 if small else 2]]))
p['selectionPrompts']=fire_prompts
p['imageCaptions']={dry[0]:bi('Portable dry powder series overview.','نظرة عامة على سلسلة الطفايات المحمولة بالمسحوق الجاف.'),dry[1]:bi('Compact direct-nozzle configuration; pictured sample MF/ABCE2.','تجهيز مدمج بفوهة مباشرة؛ العينة المصورة MF/ABCE2.'),dry[2]:bi('Hose-equipped configuration; pictured sample MF/ABCE4.','تجهيز مزود بخرطوم؛ العينة المصورة MF/ABCE4.')}
p['unresolved']=common_fire_gaps
p['notes']=['合并系列与1–3 kg、4–8 kg拆分资料；所有容量按具体型号对应，未将一个标签参数推广全系列。','碳钢有1、2、3、4、5、6、8 kg逐张参数图核验记录。','MF/ABCE为工厂型号；不把字母直接转换为国际火灾等级或认证。','保留实物TAIRUI标识；CHUANWEI FIRE为供货方。']

# Water based: use material only at the evidence-supported 6 L scope.
water=['MS-ABEF系列-手提式水基灭火器','MS-ABEF2-3-手提式水基灭火器','MS-ABEF6-9-手提式水基灭火器']
p=product('portable-water-based-fire-extinguishers','fire-extinguishers','Portable Water-Based Fire Extinguishers','طفايات حريق محمولة بعامل إطفاء مائي','手提式水基灭火器','Portable water-based extinguishers with manual lever operation and 2 L, 3 L, 6 L and 9 L agent-volume options. The 2 L configuration uses a direct nozzle; larger listed sizes use a hose.','طفايات محمولة بعامل إطفاء مائي وتشغيل يدوي بالذراع، بخيارات حجم 2 L و3 L و6 L و9 L. يستخدم تجهيز 2 L فوهة مباشرة، بينما تستخدم الأحجام الأكبر المدرجة خرطوماً.',water)
p['specs']=[spec('Extinguishing agent','مادة الإطفاء','Water-based agent','عامل إطفاء مائي',water[0]),spec('Format','التصميم','Portable','محمول',water[0]),spec('Operation','التشغيل','Manual lever','ذراع يدوي',water[1:]),spec('Agent volume options','خيارات حجم مادة الإطفاء','2 / 3 / 6 / 9 L','2 / 3 / 6 / 9 L',water[0]),spec('Outlet configurations','تجهيزات المخرج','2 L: direct nozzle; 3 / 6 / 9 L: hose','2 L: فوهة مباشرة؛ 3 / 6 / 9 L: خرطوم',water[1:]),spec('6 L cylinder material','مادة أسطوانة 6 L','Carbon steel, documented for the 6 L model','فولاذ كربوني، موثق لطراز 6 L',water[0]),spec('Pressure indicator','مؤشر الضغط','Fitted','مزود بمؤشر ضغط',water[0])]
for n in [2,3,6,9]:
    p['models'].append(model(f'{n} L water-based',f'عامل إطفاء مائي بحجم {n} L',f'MS/ABEF{n}','Direct nozzle; manual lever.' if n==2 else 'Hose configuration; manual lever.','فوهة مباشرة؛ ذراع يدوي.' if n==2 else 'تجهيز بخرطوم؛ ذراع يدوي.',[water[0],water[1 if n<6 else 2]]))
p['selectionPrompts']=fire_prompts+[prompt('Agent formulation','تركيبة مادة الإطفاء','Provide any formulation or environmental requirements and request the matching safety data sheet for the proposed model.','حدد متطلبات تركيبة مادة الإطفاء أو المتطلبات البيئية، واطلب صحيفة بيانات السلامة الخاصة بالطراز المقترح.')]
p['imageCaptions']={water[0]:bi('Water-based extinguisher series overview.','نظرة عامة على سلسلة الطفايات بعامل إطفاء مائي.'),water[1]:bi('Small-capacity configuration; pictured sample MS/ABEF2.','تجهيز السعة الصغيرة؛ العينة المصورة MS/ABEF2.'),water[2]:bi('Hose-equipped configuration; pictured sample MS/ABEF6.','تجهيز مزود بخرطوم؛ العينة المصورة MS/ABEF6.')}
p['unresolved']=common_fire_gaps+['2 L、3 L、9 L瓶体材质需单独确认。','水基药剂配方、SDS、含氟状况及电气火灾适用性未确认。']
p['notes']=['原系列证据明确仅6 L为碳钢，后拆分listing泛写碳钢但缺新增材质证据，保守保留6 L范围。','L为药剂体积，不当作瓶体容积或整机重量。','不把MS/ABEF型号字母作为国际通用火灾等级，不宣称无氟或适合带电设备。','保留实物TAIRUI标识；CHUANWEI FIRE为供货方。']

co2=['MT-BE系列-手提式二氧化碳灭火器','MT-BE2-3-手提式二氧化碳灭火器','MT-BE5-7-手提式二氧化碳灭火器']
p=product('portable-co2-fire-extinguishers','fire-extinguishers','Portable CO₂ Fire Extinguishers','طفايات حريق محمولة بثاني أكسيد الكربون','手提式二氧化碳灭火器','Portable carbon dioxide extinguishers with steel cylinders and manual lever operation. The range includes 2 kg and 3 kg horn configurations and 5 kg and 7 kg hose-and-horn configurations.','طفايات محمولة بثاني أكسيد الكربون بأسطوانات فولاذية وتشغيل يدوي بالذراع. تشمل المجموعة طرازي 2 kg و3 kg ببوق تفريغ، وطرازي 5 kg و7 kg بخرطوم وبوق تفريغ.',co2)
p['specs']=[spec('Extinguishing agent','مادة الإطفاء','Carbon dioxide (CO₂)','ثاني أكسيد الكربون (CO₂)',co2[0]),spec('Cylinder material','مادة الأسطوانة','Steel','فولاذ',co2[0]),spec('Format','التصميم','Portable','محمول',co2[0]),spec('Operation','التشغيل','Manual lever','ذراع يدوي',co2[1:]),spec('Agent charge options','خيارات كتلة مادة الإطفاء','2 / 3 / 5 / 7 kg','2 / 3 / 5 / 7 kg',co2[0]),spec('Outlet configurations','تجهيزات المخرج','2 / 3 kg: discharge horn; 5 / 7 kg: flexible hose and horn','2 / 3 kg: بوق تفريغ؛ 5 / 7 kg: خرطوم مرن وبوق تفريغ',co2[1:])]
for n in [2,3,5,7]:
    p['models'].append(model(f'{n} kg CO₂',f'ثاني أكسيد الكربون بسعة {n} kg',f'MT/BE{n}','Discharge horn; manual lever.' if n<5 else 'Flexible hose and horn; manual lever.','بوق تفريغ؛ ذراع يدوي.' if n<5 else 'خرطوم مرن وبوق تفريغ؛ ذراع يدوي.',[co2[0],co2[1 if n<5 else 2]]))
p['selectionPrompts']=fire_prompts
p['imageCaptions']={co2[0]:bi('Portable carbon dioxide extinguisher series.','سلسلة الطفايات المحمولة بثاني أكسيد الكربون.'),co2[1]:bi('Discharge-horn configuration; pictured sample MT/BE3.','تجهيز ببوق تفريغ؛ العينة المصورة MT/BE3.'),co2[2]:bi('Flexible hose and horn; pictured sample MT/BE5.','خرطوم مرن وبوق تفريغ؛ العينة المصورة MT/BE5.')}
p['unresolved']=common_fire_gaps+['钢材牌号及热处理资料待核实。']
p['notes']=['原网页合金钢与图片碳钢冲突，取共同可证实事实钢制，不指定钢种。','仅2、3、5、7 kg手提式范围，不将30 kg推车式扩入。','保留实物TAIRUI标识；型号后缀BE不转换为国际火灾等级。']

wheel='MFT-ABCE系列-推车式干粉灭火器'
p=product('wheeled-dry-powder-fire-extinguishers','fire-extinguishers','Wheeled Dry Powder Fire Extinguishers','طفايات حريق بعجلات بالمسحوق الجاف','推车式干粉灭火器','Wheeled dry powder extinguishers with carbon steel cylinders and manual discharge equipment. The documented range covers 20 kg, 35 kg and 50 kg agent charges.','طفايات بالمسحوق الجاف مزودة بعجلات وأسطوانات من الفولاذ الكربوني وتجهيزات تفريغ يدوية. تشمل المجموعة الموثقة سعات مادة إطفاء 20 kg و35 kg و50 kg.',[wheel])
p['specs']=[spec('Extinguishing agent','مادة الإطفاء','Dry powder','مسحوق جاف',wheel),spec('Cylinder material','مادة الأسطوانة','Carbon steel','فولاذ كربوني',wheel),spec('Format','التصميم','Wheeled','مزود بعجلات',wheel),spec('Operation','التشغيل','Manual discharge','تفريغ يدوي',wheel),spec('Agent charge options','خيارات كتلة مادة الإطفاء','20 / 35 / 50 kg','20 / 35 / 50 kg',wheel)]
p['models']=[model(f'{n} kg wheeled dry powder',f'طفاية بعجلات ومسحوق جاف بسعة {n} kg',f'MFT/ABCE{n}','Wheeled cylinder configuration with manual discharge equipment.','تجهيز أسطوانة بعجلات ومعدات تفريغ يدوية.',wheel) for n in [20,35,50]]
p['selectionPrompts']=fire_prompts+[prompt('Handling and discharge equipment','المناولة وتجهيزات التفريغ','Specify access constraints and the required hose arrangement so overall dimensions and equipment can be checked.','حدد قيود الوصول وتجهيز الخرطوم المطلوب للتحقق من الأبعاد الكلية والمعدات.')]
p['imageCaptions']={wheel:bi('Wheeled dry powder extinguisher configuration.','تجهيز طفاية بالمسحوق الجاف مزودة بعجلات.')}
p['unresolved']=common_fire_gaps+['软管长度、喷枪参数、尺寸和推车部件材质待核实。']
p['notes']=['20、35、50 kg分别有碳钢参数图记录；未采用干粉90%浓度宣传。','推车式与手提式分别建页，未共用充装或喷枪参数。']

susp='悬挂式系列-自动干粉灭火器'
p=product('suspended-dry-powder-extinguishers','automatic-fire-suppression','Suspended Dry Powder Fire Extinguishers','طفايات حريق معلقة بالمسحوق الجاف','悬挂式自动干粉灭火器','Suspended dry powder extinguishers with a heat-activated glass-bulb release and top suspension ring. Listed ordinary dry powder charges are 4 kg, 6 kg, 8 kg and 10 kg.','طفايات معلقة بالمسحوق الجاف مزودة بآلية إطلاق حرارية ذات بصيلة زجاجية وحلقة تعليق علوية. سعات المسحوق الجاف العادي المدرجة هي 4 kg و6 kg و8 kg و10 kg.',[susp])
p['specs']=[spec('Extinguishing agent','مادة الإطفاء','Ordinary dry powder','مسحوق جاف عادي',susp),spec('Installation','التركيب','Suspended','معلق',susp),spec('Activation','التفعيل','Heat-activated glass-bulb release','آلية إطلاق حرارية ذات بصيلة زجاجية',susp),spec('Nominal agent charges','الكتل الاسمية لمادة الإطفاء','4 / 6 / 8 / 10 kg','4 / 6 / 8 / 10 kg',susp),spec('Nominal activation temperature','درجة حرارة التفعيل الاسمية','68°C, stated default for the ordinary dry powder configuration','68°C، القيمة الافتراضية المذكورة لتجهيز المسحوق الجاف العادي',susp)]
p['models']=[model(f'{n} kg suspended dry powder',f'مسحوق جاف معلق بسعة {n} kg','Available on request','Ordinary dry powder; exact supply model and brand to be specified in the quotation.','مسحوق جاف عادي؛ يحدد طراز التوريد والعلامة في عرض السعر.',susp) for n in [4,6,8,10]]
p['selectionPrompts']=[prompt('Protected space','الحيز المطلوب حمايته','Send the protected hazard, room layout and mounting height for model and discharge-coverage review.','أرسل طبيعة الخطر ومخطط الغرفة وارتفاع التركيب لمراجعة الطراز ونطاق التفريغ.'),prompt('Charge and thermal release','السعة وآلية الإطلاق الحرارية','Specify the charge, ambient conditions and required activation temperature; confirm the exact supply model and brand.','حدد السعة والظروف المحيطة ودرجة حرارة التفعيل المطلوبة، وأكد طراز التوريد والعلامة بدقة.')]
p['imageCaptions']={susp:bi('Ordinary dry powder unit with a suspension ring and thermal release.','وحدة مسحوق جاف عادي بحلقة تعليق وآلية إطلاق حرارية.')}
p['unresolved']=['精确工厂型号、供货品牌、罐体与释放组件材质待确认。','保护体积、保护面积、安装高度、充装压力、喷射性能与目的地适用文件待确认。','93°C仅为询价配置，未建立药剂与装量的一一对应，未列为SKU。']
p['notes']=['仅普通干粉，未把超细干粉或七氟丙烷的参数混入。','68°C来自普通干粉网页默认值，不推广到超细干粉产品。','源资料品牌可能随机供货，订单需锁定品牌型号。']

fine='03B-悬挂式超细干粉灭火器'
p=product('suspended-ultrafine-dry-powder-extinguishers','automatic-fire-suppression','Suspended Ultrafine Dry Powder Fire Extinguishers','طفايات حريق معلقة بالمسحوق الجاف فائق النعومة','悬挂式超细干粉灭火器','Suspended automatic extinguishers using ultrafine dry powder. The pictured heat-activated unit has an 8 kg agent charge; additional documented charge options require their own model and appearance confirmation.','طفايات آلية معلقة تستخدم مسحوقاً جافاً فائق النعومة. الوحدة المصورة ذات التفعيل الحراري تحتوي على 8 kg من مادة الإطفاء؛ أما السعات الإضافية الموثقة فتتطلب تأكيد الطراز والشكل الخاصين بها.',[fine])
p['specs']=[spec('Extinguishing agent','مادة الإطفاء','Ultrafine dry powder','مسحوق جاف فائق النعومة',fine),spec('Installation','التركيب','Suspended','معلق',fine),spec('Pictured activation','تفعيل الوحدة المصورة','Heat-activated discharge head','رأس تفريغ يعمل بالحرارة',fine),spec('Pictured agent charge','كتلة مادة الإطفاء في الصورة','8 kg','8 kg',fine),spec('Documented charge options','خيارات السعة الموثقة','3 / 4 / 5 / 6 / 8 / 10 / 12 kg','3 / 4 / 5 / 6 / 8 / 10 / 12 kg',fine)]
for n in [3,4,5,6,8,10,12]:
    p['models'].append(model(f'{n} kg ultrafine dry powder',f'مسحوق جاف فائق النعومة بسعة {n} kg','FZX-ACT8/1.2' if n==8 else 'Available on request','Pictured model; charge and factory reference documented.' if n==8 else 'Listed charge option; exact model, brand and matching photo required.','الطراز المصور؛ السعة والمرجع المصنعي موثقان.' if n==8 else 'خيار سعة مدرج؛ يلزم تحديد الطراز والعلامة والصورة المطابقة.',fine))
p['selectionPrompts']=[prompt('Charge and exact model','السعة والطراز المحدد','Choose the agent charge and confirm the exact factory model, brand and matching product photo before ordering.','اختر سعة مادة الإطفاء وأكد الطراز المصنعي والعلامة والصورة المطابقة قبل الطلب.'),prompt('Installation design','تصميم التركيب','Provide enclosure dimensions, protected hazard, ambient temperature and mounting layout for exact-model documentation review.','قدم أبعاد الحيز وطبيعة الخطر ودرجة الحرارة المحيطة ومخطط التركيب لمراجعة وثائق الطراز المحدد.')]
p['imageCaptions']={fine:bi('Pictured 8 kg unit, factory reference FZX-ACT8/1.2; other charges require their own matching photos.','الوحدة المصورة بسعة 8 kg، المرجع المصنعي FZX-ACT8/1.2؛ تتطلب السعات الأخرى صوراً مطابقة خاصة بها.')}
p['unresolved']=['罐体材质、精确动作温度、充装压力、喷射性能及保护范围待同厂同型号文件确认。','3、4、5、6、10、12 kg仅有规格选项，缺逐款型号、品牌、外观对应。','图示浙安广消样品制造商资料与笼统福建产地字段不一致，未对外发布省份。']
p['notes']=['8 kg样品品牌浙安广消，制造商广东浙安消防科技有限公司；保留原标识，不当作CHUANWEI自产。','同名其他厂家FZX-ACT型号钢材、1.2 MPa、68°C等联网参考明确非本SKU，全部排除。','型号内1.2未拆解成已确认压力。']

ball='AFO系列-0.5kg自动灭火球'
p=product('fire-extinguisher-balls','automatic-fire-suppression','Dry Powder Fire Extinguisher Balls','كرات إطفاء الحريق بالمسحوق الجاف','干粉灭火球','Dry powder fire extinguisher balls in the documented 0.5 kg product-weight size with a 110 mm ball body. Stand and loop-handle styles are available as alternative configurations.','كرات إطفاء بالمسحوق الجاف بمقاس موثق يبلغ وزن المنتج فيه 0.5 kg وقطر جسم الكرة 110 mm. تتوفر بتجهيز حامل أو بتجهيز حلقة تعليق كخيارين بديلين.',[ball])
p['specs']=[spec('Agent description','وصف مادة الإطفاء','ABC dry powder, as described in the supplier record','مسحوق جاف ABC وفق وصف سجل المورد',ball),spec('Declared product weight','وزن المنتج المعلن','0.5 kg; agent net mass is separate','0.5 kg؛ الكتلة الصافية لمادة الإطفاء قيمة منفصلة',ball),spec('Ball body diameter','قطر جسم الكرة','110 mm','110 mm',ball),spec('Exterior configurations','التجهيزات الخارجية','Stand style or loop-handle style','تجهيز بحامل أو بحلقة تعليق',ball)]
p['models']=[model('0.5 kg stand style','تجهيز بحامل بوزن منتج 0.5 kg','Available on request','110 mm ball body; 0.5 kg refers to declared product weight.','قطر جسم الكرة 110 mm؛ تشير 0.5 kg إلى وزن المنتج المعلن.',ball),model('0.5 kg loop-handle style','تجهيز بحلقة تعليق بوزن منتج 0.5 kg','Available on request','110 mm ball body; alternative loop-handle configuration.','قطر جسم الكرة 110 mm؛ تجهيز بديل بحلقة تعليق.',ball)]
p['selectionPrompts']=[prompt('Exterior style','التجهيز الخارجي','Choose the stand or loop-handle configuration and specify the required quantity and packing.','اختر تجهيز الحامل أو حلقة التعليق وحدد الكمية والتعبئة المطلوبتين.'),prompt('Application and technical documents','الاستخدام والوثائق الفنية','Send the intended location and hazard so the exact model, activation information and product documents can be checked.','أرسل موقع الاستخدام وطبيعة الخطر للتحقق من الطراز المحدد ومعلومات التفعيل ووثائق المنتج.')]
p['imageCaptions']={ball:bi('0.5 kg product-weight size: stand and loop-handle alternatives; ball body diameter 110 mm.','مقاس بوزن منتج 0.5 kg: بديل بحامل وآخر بحلقة تعليق؛ قطر جسم الكرة 110 mm.')}
p['unresolved']=['确切工厂型号、外壳材质、药剂净重、动作条件、保护范围与目的地适用文件待确认。','0.5 kg仅为产品声明重量，不能转写成0.5 kg药剂净重。']
p['notes']=['仅纳入用户文件夹内0.5 kg两张图，未扩入其他重量。','110 mm来自原AFO出口PPT记录；2026-10-17用户确认支架及吊环两款均可供。','ABC保留为供应商药剂名称，不当作已核实目的地火灾等级或认证。']

xdx='XDX系列-箱柜热气溶胶灭火装置'
p=product('cabinet-aerosol-fire-suppression','automatic-fire-suppression','Cabinet Aerosol Fire Suppression Devices','أجهزة إطفاء الحريق بالهباء الجوي للخزائن','箱柜热气溶胶灭火装置','Compact aerosol fire suppression devices for enclosed electrical cabinets. The supplied configuration shows two thermal leads and a rear mounting surface; device selection depends on the enclosure and exact-model data.','أجهزة مدمجة لإطفاء الحريق بالهباء الجوي للخزائن الكهربائية المغلقة. يظهر التجهيز المقدم سلكي بدء حراري وسطح تثبيت خلفياً؛ ويعتمد الاختيار على الحيز وبيانات الطراز المحدد.',[xdx])
p['specs']=[spec('Intended configuration','الاستخدام المقصود','Enclosed electrical cabinets','خزائن كهربائية مغلقة',xdx),spec('Function','الوظيفة','Release an aerosol extinguishing agent when activated','إطلاق عامل إطفاء بالهباء الجوي عند التفعيل',xdx),spec('Product form','شكل المنتج','Compact housing with two thermal leads','غلاف مدمج بسلكي بدء حراري',xdx),spec('Rear mounting surface','سطح التثبيت الخلفي','Adhesive backing shown in the source photographs','طبقة لاصقة خلفية ظاهرة في صور المصدر',xdx)]
p['models']=[model('Compact cabinet device','جهاز مدمج للخزائن','Available on request','Thermal-lead configuration; exact device model and charge to be selected for the enclosure.','تجهيز بسلكي بدء حراري؛ يحدد الطراز والسعة وفقاً للحيز.',xdx)]
p['selectionPrompts']=[prompt('Enclosure details','تفاصيل الحيز','Provide cabinet dimensions, internal equipment, ventilation openings and the protected hazard.','قدم أبعاد الخزانة ومعداتها الداخلية وفتحات التهوية وطبيعة الخطر المطلوب حمايته.'),prompt('Device and installation data','بيانات الجهاز والتركيب','Confirm the exact model, agent quantity, activation conditions, installation clearances and mounting method against the product documentation.','أكد الطراز وكمية مادة الإطفاء وظروف التفعيل ومسافات الخلوص وطريقة التثبيت وفق وثائق المنتج.')]
p['imageCaptions']={xdx:bi('Compact device with two thermal leads and a rear mounting surface.','جهاز مدمج بسلكي بدء حراري وسطح تثبيت خلفي.')}
p['unresolved']=['精确可供型号、壳体材质、药剂量、动作条件、保护容积、安装间距待核实。','XDX10G/20G/30G/40G仅为照片候选，缺同型号说明书与供货确认，不列具体SKU。','原图保护范围m²与m³冲突，未采用。','资料标题称导轨式，但可见结构为胶贴，DIN导轨兼容性不承诺。']
p['notes']=['不沿用旧QRR候选型号；未把照片上的海外认证文字作为证据。','未公布胶品牌或粘接强度；图像优化候选如改写标签不得替换原图。']

# Alarm products: keep Tanda identity and model-specific compatibility questions.
alarm_family='fire-alarm-systems'
compat_prompt=prompt('Control panel compatibility','توافق لوحة التحكم','Provide the control panel model, protocol and existing device references so compatibility can be checked before supply.','قدم طراز لوحة التحكم والبروتوكول ومراجع الأجهزة الحالية للتحقق من التوافق قبل التوريد.')
base_prompt=prompt('Base and installation','القاعدة والتركيب','Specify whether a matching base is required and provide installation conditions and quantity.','حدد ما إذا كانت القاعدة المطابقة مطلوبة، وقدم ظروف التركيب والكمية.')
panel='JB-TBL-TX3008NL-火灾报警控制器'
p=product('fire-alarm-control-panels',alarm_family,'Fire Alarm Control Panels','لوحات التحكم في إنذار الحريق','火灾报警控制器','Wall-mounted Tanda fire alarm control panels with a 7-inch touchscreen and configurations of up to 8 loops. Final loop loading and device compatibility are specified for the project.','لوحات تحكم في إنذار الحريق من Tanda للتركيب الجداري، بشاشة لمس 7 بوصات وتجهيزات تصل إلى 8 حلقات. تحدد سعة تحميل الحلقات وتوافق الأجهزة وفق المشروع.',[panel])
p['specs']=[spec('Product brand','العلامة التجارية للمنتج','Tanda','Tanda',panel),spec('Display','الشاشة','7-inch touchscreen','شاشة لمس 7 بوصات',panel),spec('Loop configuration','تجهيز الحلقات','Up to 8 loops','حتى 8 حلقات',panel),spec('Mounting','التركيب','Wall mounted','جداري',panel)]
p['models']=[model('Wall-mounted touchscreen panel','لوحة جدارية بشاشة لمس','JB-TBL-TX3008NL','Up to 8 loops; installed loop count and device loading to match the project schedule.','حتى 8 حلقات؛ يحدد عدد الحلقات المركبة وتحميل الأجهزة وفق جدول المشروع.',panel)]
p['selectionPrompts']=[prompt('System schedule','جدول النظام','Provide the required loop count, detector and module quantities, and the project device schedule.','قدم عدد الحلقات المطلوب وكميات الكواشف والوحدات وجدول أجهزة المشروع.'),prompt('Panel configuration','تجهيز لوحة التحكم','Specify power supply, backup battery, interface and language requirements, and identify the devices to be connected.','حدد متطلبات التغذية والبطارية الاحتياطية والواجهات واللغة، مع تحديد الأجهزة المطلوب توصيلها.')]
p['imageCaptions']={panel:bi('Tanda wall-mounted fire alarm control panel with touchscreen.','لوحة تحكم جدارية في إنذار الحريق من Tanda بشاشة لمس.')}
p['unresolved']=['1936点宣传与1600点SKU冲突，未确定单环及总容量。','实际出货回路数、电源、蓄电池、接口、语言、协议、设备兼容及尺寸需按项目核实。']
p['notes']=['只发布最高8回路及7英寸屏，不写固定总点数。','包装尺寸字段cm与尺寸图mm冲突；页面未采用包装尺寸。','未把附属SKU另建虚构产品；Tanda实物品牌保留。']

comb='JTF-GOM-TX3120A-烟温复合探测器'
p=product('combined-smoke-heat-detectors',alarm_family,'Combined Smoke and Heat Detectors','كواشف الدخان والحرارة المدمجة','烟温复合探测器','Tanda combined smoke and heat detectors for compatible fire alarm systems. The supplied model record lists 24 V DC operation with separate standby and alarm current values.','كواشف مدمجة للدخان والحرارة من Tanda لأنظمة إنذار الحريق المتوافقة. يورد سجل الطراز المقدم تشغيل 24 V DC وقيمتين منفصلتين لتيار الاستعداد وتيار الإنذار.',[comb])
p['specs']=[spec('Product brand','العلامة التجارية للمنتج','Tanda','Tanda',comb),spec('Detection','الكشف','Combined smoke and heat','دخان وحرارة معاً',comb),spec('Supply voltage','جهد التغذية','24 V DC','24 V DC',comb),spec('Standby current','تيار الاستعداد','0.4 mA','0.4 mA',comb),spec('Alarm current','تيار الإنذار','0.7 mA','0.7 mA',comb)]
p['models']=[model('Combined smoke and heat detector','كاشف مدمج للدخان والحرارة','JTF-GOM-TX3120A','24 V DC; smoke and heat sensing in one detector.','24 V DC؛ كشف الدخان والحرارة في كاشف واحد.',comb)]
p['selectionPrompts']=[compat_prompt,base_prompt]
p['imageCaptions']={comb:bi('Tanda combined smoke and heat detector.','كاشف مدمج للدخان والحرارة من Tanda.')}
p['unresolved']=['精确探测算法、感温等级、环境范围、底座与控制器兼容需说明书确认。']
p['notes']=['0.4 mA、0.7 mA按来源与事实中的明确单位使用；不宣称全覆盖、零盲区或量化误报改善。']

heat='JTW-ZDM-TX3110N-点型感温探测器'
p=product('heat-detectors',alarm_family,'Heat Detectors','كواشف الحرارة','点型感温探测器','Ceiling-mounted Tanda point-type heat detectors. The documented configuration has a 100 mm diameter, 49 mm height and a listed 24 V supply.','كواشف حرارة نقطية من Tanda للتركيب السقفي. يبلغ قطر التجهيز الموثق 100 mm وارتفاعه 49 mm، مع جهد تغذية مدرج 24 V.',[heat])
p['specs']=[spec('Product brand','العلامة التجارية للمنتج','Tanda','Tanda',heat),spec('Detection','الكشف','Point-type heat detection','كشف حراري نقطي',heat),spec('Supply voltage','جهد التغذية','24 V','24 V',heat),spec('Mounting','التركيب','Ceiling mounted','سقفي',heat),spec('Diameter','القطر','100 mm','100 mm',heat),spec('Height','الارتفاع','49 mm','49 mm',heat)]
p['models']=[model('Ceiling-mounted heat detector','كاشف حرارة سقفي','JTW-ZDM-TX3110N','100 mm diameter × 49 mm height; listed supply 24 V.','قطر 100 mm × ارتفاع 49 mm؛ جهد التغذية المدرج 24 V.',heat)]
p['selectionPrompts']=[compat_prompt,prompt('Thermal conditions','الظروف الحرارية','Provide normal and maximum ambient temperatures and the required detector response class for model review.','قدم درجتي الحرارة المحيطة الاعتيادية والقصوى وفئة استجابة الكاشف المطلوبة لمراجعة الطراز.')]
p['imageCaptions']={heat:bi('Tanda ceiling-mounted point-type heat detector.','كاشف حرارة نقطي سقفي من Tanda.')}
p['unresolved']=['原网页静态/报警电流与工作温度缺单位，未采用。','动作温度、探测等级、AC/DC电源性质、环境范围、底座兼容与防护等级待核实。']
p['notes']=['不将来源24 V擅自扩写为24 V DC。','不采用未核验IP43或高温耐受营销声明。']

smoke=['JTY-GM-TX3100N-点型光电感烟探测器','JTY-GM-TX3100D-点型光电感烟探测器']
p=product('photoelectric-smoke-detectors',alarm_family,'Photoelectric Smoke Detectors','كواشف الدخان الكهروضوئية','点型光电感烟探测器','Ceiling-mounted Tanda photoelectric smoke detectors with 24 V DC supply. TX3100N and TX3100D are listed separately so the exact device and matching base can be specified.','كواشف دخان كهروضوئية من Tanda للتركيب السقفي وبجهد تغذية 24 V DC. يدرج TX3100N وTX3100D بشكل منفصل لتحديد الجهاز الدقيق والقاعدة المطابقة.',smoke)
p['specs']=[spec('Product brand','العلامة التجارية للمنتج','Tanda','Tanda',smoke),spec('Detection','الكشف','Photoelectric smoke detection','كشف دخان كهروضوئي',smoke),spec('Supply voltage','جهد التغذية','24 V DC','24 V DC',smoke),spec('Mounting','التركيب','Ceiling mounted','سقفي',smoke)]
p['models']=[model('Photoelectric smoke detector — N model','كاشف دخان كهروضوئي — الطراز N','JTY-GM-TX3100N','24 V DC; specify the matching base and control panel.','24 V DC؛ حدد القاعدة ولوحة التحكم المتوافقتين.',smoke[0]),model('Photoelectric smoke detector — D model','كاشف دخان كهروضوئي — الطراز D','JTY-GM-TX3100D','24 V DC; base-included and detector-only order scopes must be specified.','24 V DC؛ يجب تحديد الطلب مع القاعدة أو للكاشف فقط.',smoke[1])]
p['selectionPrompts']=[compat_prompt,base_prompt]
p['imageCaptions']={smoke[0]:bi('JTY-GM-TX3100N photoelectric smoke detector.','كاشف الدخان الكهروضوئي JTY-GM-TX3100N.'),smoke[1]:bi('JTY-GM-TX3100D photoelectric smoke detector.','كاشف الدخان الكهروضوئي JTY-GM-TX3100D.')}
p['unresolved']=['两型号的协议兼容、地址设定、灵敏度、环境条件及底座包含范围待精确型号文件确认。']
p['notes']=['TX3100N资料缺网页正文，型号与24 V来自实物底标核验记录；未借用其他型号参数。','TX3100D有含底座/不含底座条目，图片不能证明每笔订单均含底座。']

call='TX3142-手动火灾报警按钮'
p=product('manual-fire-alarm-call-points',alarm_family,'Manual Fire Alarm Call Points','نقاط نداء يدوية لإنذار الحريق','手动火灾报警按钮','Tanda manual fire alarm call points with a telephone socket. The supplied TX3142 configuration provides a manual alarm activation point for a compatible fire alarm system.','نقاط نداء يدوية لإنذار الحريق من Tanda مزودة بمقبس هاتف. يوفر تجهيز TX3142 المقدم نقطة تفعيل يدوي للإنذار ضمن نظام متوافق.',[call])
p['specs']=[spec('Product brand','العلامة التجارية للمنتج','Tanda','Tanda',call),spec('Product type','نوع المنتج','Manual fire alarm call point','نقطة نداء يدوية لإنذار الحريق',call),spec('Alarm activation','تفعيل الإنذار','Manual','يدوي',call),spec('Additional feature','ميزة إضافية','Telephone socket','مقبس هاتف',call)]
p['models']=[model('Manual call point with telephone socket','نقطة نداء يدوية بمقبس هاتف','TX3142','Specify the matching base and telephone-system connection requirements.','حدد القاعدة المطابقة ومتطلبات اتصال نظام الهاتف.',call)]
p['selectionPrompts']=[compat_prompt,prompt('Telephone and mounting requirements','متطلبات الهاتف والتركيب','Specify the telephone-system interface, base requirement and mounting arrangement.','حدد واجهة نظام الهاتف والحاجة إلى القاعدة وطريقة التركيب.')]
p['imageCaptions']={call:bi('TX3142 manual call point with telephone socket.','نقطة نداء يدوية TX3142 مزودة بمقبس هاتف.')}
p['unresolved']=['电源电压、尺寸、复位方式、接线、电话接口与底座匹配待确认。']
p['notes']=['仅TX3142，不使用TX3142N照片或参数。','不宣称未核实的电压、尺寸或认证适用性。']

module='TX3212-输入输出模块'
p=product('fire-alarm-input-output-modules',alarm_family,'Fire Alarm Input/Output Modules','وحدات إدخال وإخراج لإنذار الحريق','火灾报警输入输出模块','Tanda input/output modules for compatible fire alarm control interfaces. The supplied TX3212 configuration uses a plug-in base; electrical interfaces must be matched to the connected equipment.','وحدات إدخال وإخراج من Tanda لواجهات التحكم المتوافقة مع إنذار الحريق. يستخدم تجهيز TX3212 المقدم قاعدة قابلة للتوصيل؛ ويجب مطابقة الواجهات الكهربائية مع المعدات المتصلة.',[module])
p['specs']=[spec('Product brand','العلامة التجارية للمنتج','Tanda','Tanda',module),spec('Product type','نوع المنتج','Fire alarm input/output module','وحدة إدخال وإخراج لإنذار الحريق',module),spec('Interface functions','وظائف الواجهة','Input and output','إدخال وإخراج',module),spec('Base arrangement','تجهيز القاعدة','Plug-in base','قاعدة قابلة للتوصيل',module)]
p['models']=[model('Input/output module','وحدة إدخال وإخراج','TX3212','Plug-in base configuration; specify control and feedback requirements.','تجهيز بقاعدة قابلة للتوصيل؛ حدد متطلبات التحكم والتغذية الراجعة.',module)]
p['selectionPrompts']=[compat_prompt,prompt('Controlled equipment and signals','المعدات المتحكم بها والإشارات','Provide the equipment wiring diagram, required input signal and output contact rating so the interface can be checked.','قدم مخطط توصيل المعدات وإشارة الإدخال المطلوبة وتصنيف نقاط خرج التلامس للتحقق من الواجهة.')]
p['imageCaptions']={module:bi('TX3212 input/output module configuration.','تجهيز وحدة الإدخال والإخراج TX3212.')}
p['unresolved']=['供电、输入方式、输出触点容量、通道数、协议、接线与尺寸未核实。']
p['notes']=['包装86/33/86的cm字段不合理，未擅自改成mm。','不宣称直接驱动电机、泵或通用兼容；未编造接线图。']

sound=['TX3307-火灾声光警报器','TX3307A-火灾声光警报器']
p=product('fire-alarm-sounder-beacons',alarm_family,'Fire Alarm Sounder Beacons','أجهزة إنذار حريق صوتية وضوئية','火灾声光警报器','Tanda sounder beacons provide audible and visual fire alarm indication. TX3307 and TX3307A are separate model options with red housings; each requires its own base and wiring confirmation.','توفر أجهزة الإنذار الصوتية والضوئية من Tanda إشارات حريق مسموعة ومرئية. يتوفر TX3307 وTX3307A كطرازين منفصلين بغلاف أحمر، ويتطلب كل منهما تأكيد القاعدة والتوصيلات الخاصة به.',sound,sound[1])
p['specs']=[spec('Product brand','العلامة التجارية للمنتج','Tanda','Tanda',sound),spec('Alarm indication','إشارة الإنذار','Audible and visual','صوتية وضوئية',sound),spec('Housing appearance','مظهر الغلاف','Red housing','غلاف أحمر',sound),spec('Model options','خيارات الطراز','TX3307 / TX3307A','TX3307 / TX3307A',sound)]
p['models']=[model('Sounder beacon — TX3307','جهاز إنذار صوتي وضوئي — TX3307','TX3307','Confirm the TX3307-specific base, wiring and panel compatibility.','أكد القاعدة والتوصيلات وتوافق اللوحة الخاصة بطراز TX3307.',sound[0]),model('Sounder beacon — TX3307A','جهاز إنذار صوتي وضوئي — TX3307A','TX3307A','Confirm the TX3307A-specific base, wiring and panel compatibility.','أكد القاعدة والتوصيلات وتوافق اللوحة الخاصة بطراز TX3307A.',sound[1])]
p['selectionPrompts']=[compat_prompt,prompt('Notification design','تصميم التنبيه','Specify the exact model, installation environment and required sound and visual performance for documentation review.','حدد الطراز الدقيق وبيئة التركيب والأداء الصوتي والضوئي المطلوب لمراجعة الوثائق.')]
p['imageCaptions']={sound[0]:bi('TX3307 sounder beacon; use its model-specific base and wiring.','جهاز إنذار صوتي وضوئي TX3307؛ تستخدم القاعدة والتوصيلات الخاصة بطرازه.'),sound[1]:bi('TX3307A sounder beacon; confirm its own base and wiring.','جهاز إنذار صوتي وضوئي TX3307A؛ يجب تأكيد القاعدة والتوصيلات الخاصة به.')}
p['unresolved']=['各型号供电、工作电流、声压及测距条件、光输出、防护等级、编码与接线资料待核实。']
p['notes']=['同系列页仅作并列型号选择，未把TX3307与TX3307A当作互换件。','TX3307源页混入A型照片，来源记录已排除；不交叉使用底座接线。','未将二总线当作无线；未采用缺测距条件的75–105 dB。']

# Coverage and structural checks keep the data directly usable by the site importer.
expected=[s for s in BY_NAME if s.startswith(('MF-','MFT-','MS-','MT-','悬挂式系列','03B-','AFO系列-0.5kg','XDX','JB-TBL','JTF-','JTW-','JTY-','TX3142','TX3212','TX3307'))]
covered=[s for p in PRODUCTS for s in p['sourceNames']]
assert len(PRODUCTS)==15
assert set(covered)==set(expected), (set(expected)-set(covered),set(covered)-set(expected))
assert len(covered)==len(set(covered))==23
for p in PRODUCTS:
    assert 4<=len(p['specs'])<=8, p['id']
    assert p['models'] and len(p['selectionPrompts'])>=2
    assert set(p['imageCaptions'])==set(p['sourceNames'])
    assert p['heroSourceName'] in p['sourceNames']
    for row in p['models']:
        assert set(row['sourceNames']).issubset(p['sourceNames'])
    for row in p['specs']+p['models']:
        assert all((BASE/s).is_file() for s in row['sources'])
OUT.write_text(json.dumps({'products':PRODUCTS},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'path':str(OUT),'pages':len(PRODUCTS),'source_prefixes':len(covered),'models':sum(len(p['models']) for p in PRODUCTS),'specs':sum(len(p['specs']) for p in PRODUCTS)},ensure_ascii=False))
