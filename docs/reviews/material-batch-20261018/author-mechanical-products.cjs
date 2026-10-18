const fs = require('node:fs');
const path = require('node:path');
const base = 'D:/work/codex/阿里国际站运营/官网与产品目录素材包-20261018';
const index = JSON.parse(fs.readFileSync(path.join(base, '03-商品索引/商品与图片资料索引.json'), 'utf8').replace(/^\uFEFF/, ''));
const out = __dirname;
const names = {
  multi:'XBD4.0-1W-CDL-立式多级消防泵', single:'XBD立式系列-立式单级消防泵', sql:'SQL系列-消防增压稳压设备',
  ats:'JX-ATS-63A-双电源控制柜', controls:'JX-XFXJ与JX-ATS系列-消防泵控制柜', unnamed:'未标型号-消防泵巡检控制柜',
  strainer:'GL41H-16Q-法兰Y型过滤器', check:'H44T-旋启式止回阀', globe:'J41T-法兰截止阀', ball:'PT系列-304不锈钢两片式球阀',
  elbow90:'90度系列-沟槽90度弯头', elbows:'多角度弯头系列-沟槽11.25度22.5度45度弯头', tee:'异径三通系列-沟槽异径三通',
  cross:'正四通系列-沟槽等径正四通', coupling:'刚性卡箍系列-螺栓式刚性沟槽卡箍', xgqt:'XGQT系列-金顺刚性沟槽卡箍',
  gauge:'Y100-普通压力及真空复合表', filled:'YN100BF-充液压力表', syphon:'Y100配套系列-不锈钢压力表缓冲弯管', nozzle:'多功能水枪系列-手持直流喷雾消防水枪'
};
const rows = Object.fromEntries(Object.entries(names).map(([key, name])=>[key,index.find(x=>x.product_name_zh === name)]));
function doc(key, suffix) {
  const found = rows[key].documents.find(x=>x.endsWith(suffix));
  if(!found) throw new Error(`Missing source ${key}: ${suffix}`);
  return found;
}
function read(key,suffix='listing-fields.json'){return JSON.parse(fs.readFileSync(path.join(base,doc(key,suffix)),'utf8').replace(/^\uFEFF/,''));}
const bi=(en,ar)=>({en,ar});
const products=[];
function spec(labelEn,labelAr,en,ar,key,suffix='listing-fields.json',evidence='Documented'){
  return {label:bi(labelEn,labelAr),value:bi(en,ar),sources:[doc(key,suffix)],evidence};
}
function model(en,ar,ref,selectionEn,selectionAr,keys,suffix='listing-fields.json'){
  return {name:bi(en,ar),factoryReference:ref||'Available on request',selection:bi(selectionEn,selectionAr),sourceNames:keys.map(k=>names[k]),sources:keys.map(k=>doc(k,suffix))};
}
function prompt(en,ar,bodyEn,bodyAr){return {label:bi(en,ar),body:bi(bodyEn,bodyAr)};}
function add(id,familyId,en,ar,zh,leadEn,leadAr,keys,specs,models,selectionPrompts,captions,unresolved=[],notes=[]){
  products.push({id,familyId,name:{en,ar,zh},lead:bi(leadEn,leadAr),sourceNames:keys.map(k=>names[k]),heroSourceName:names[keys[0]],specs,models,selectionPrompts,
    imageCaptions:Object.fromEntries(keys.map((key,i)=>[names[key],bi(captions[i][0],captions[i][1])])),unresolved,notes});
}
const pumpDuty=prompt('Hydraulic duty','نقطة التشغيل الهيدروليكية','Send the required flow and head, the system duty and the proposed installation arrangement.','أرسل التدفق والرفع المطلوبين ووظيفة النظام وترتيب التركيب المقترح.');
const pumpElectrical=prompt('Motor and connections','المحرك والتوصيلات','Specify the site voltage and frequency, motor requirements and mating pipe or flange drawings.','حدد جهد الموقع وتردده ومتطلبات المحرك ورسومات الأنابيب أو الفلنجات المقابلة.');
add('vertical-multistage-fire-pumps','fire-pumps-controllers','Vertical Multistage Fire Pumps','مضخات حريق رأسية متعددة المراحل','立式多级消防泵',
  'The XBD4.0/1W-CDL is a vertical multistage fire pump with a documented duty of 3.6 m³/h at 40 m head and a 1.1 kW motor.',
  'الموديل XBD4.0/1W-CDL مضخة حريق رأسية متعددة المراحل، بتدفق موثق يبلغ 3.6 m³/h ورفع 40 m ومحرك بقدرة 1.1 kW.', ['multi'],[
  spec('Model','الموديل','XBD4.0/1W-CDL','XBD4.0/1W-CDL','multi','来源与事实.json'),
  spec('Construction','التركيب','Vertical multistage','رأسي متعدد المراحل','multi','来源与事实.json'),
  spec('Rated flow','التدفق المقنن','3.6 m³/h','3.6 m³/h','multi','来源与事实.json'),
  spec('Rated head','الرفع المقنن','40 m','40 m','multi','来源与事实.json'),
  spec('Rated power','القدرة المقننة','1.1 kW','1.1 kW','multi','来源与事实.json'),
  spec('Supply voltage','جهد التغذية','380 V','380 V','multi','来源与事实.json'),
  spec('Inlet','المدخل','DN32','DN32','multi','来源与事实.json')
], [model('XBD4.0/1W-CDL','XBD4.0/1W-CDL','XBD4.0/1W-CDL','3.6 m³/h · 40 m · 1.1 kW · 380 V · DN32 inlet','3.6 m³/h · 40 m · 1.1 kW · 380 V · مدخل DN32',['multi'],'来源与事实.json')],
  [pumpDuty,pumpElectrical],[['XBD4.0/1W-CDL vertical multistage pump.','مضخة رأسية متعددة المراحل XBD4.0/1W-CDL.']],
  ['电源频率、出口尺寸、曲线、接液件及筒体材质需核实。'],['使用准确SKU XBD4.0/1W-CDL，不沿用网页标题GDL或无单位最大流量360/扬程210。']);
add('vertical-single-stage-fire-pumps','fire-pumps-controllers','Vertical Single-stage Fire Pumps','مضخات حريق رأسية أحادية المرحلة','立式单级消防泵',
  'A vertical single-stage electric pump for hydrant and sprinkler water supply, with a cast iron pump body and opposed flanged ports.',
  'مضخة كهربائية رأسية أحادية المرحلة لتغذية صنابير الحريق والرشاشات بالماء، بجسم من الحديد الزهر وفتحتي توصيل متقابلتين بفلنجات.', ['single'],[
  spec('Pump construction','تركيب المضخة','Vertical single stage','رأسية أحادية المرحلة','single','技术参数证据表.json','Confirmed'),
  spec('Pump body','جسم المضخة','Cast iron','حديد زهر','single','技术参数证据表.json','Confirmed'),
  spec('Drive','التشغيل','Electric motor','محرك كهربائي','single','技术参数证据表.json','Confirmed'),
  spec('Connection arrangement','ترتيب التوصيلات','Opposed inline flanged ports','فتحتان متقابلتان على خط واحد بفلنجات','single','技术参数证据表.json','Visible'),
  spec('Motor position','موضع المحرك','Above the pump casing','أعلى جسم المضخة','single','技术参数证据表.json','Visible'),
  spec('Application','الاستخدام','Hydrant and sprinkler water supply','تغذية صنابير الحريق والرشاشات بالماء','single','技术参数证据表.json','Confirmed')
], [model('Vertical single-stage configuration','تكوين رأسي أحادي المرحلة',null,'Select the exact vertical model against the required duty point and motor data.','اختر الموديل الرأسي الدقيق وفق نقطة التشغيل المطلوبة وبيانات المحرك.',['single'])],
  [pumpDuty,pumpElectrical],[['Vertical single-stage pump with the motor above the casing.','مضخة رأسية أحادية المرحلة والمحرك أعلى الجسم.']],
  ['缺立式泵准确型号、性能曲线、电机铭牌和尺寸图。'],['来源SKU原始值中的17个XBD...W-JXL型号为卧式，按listing-fields明确排除；不把其流量、扬程、功率、380 V或DN200移植到本立式款。']);
add('fire-pressure-maintenance-sets','fire-pumps-controllers','Fire Pressure Maintenance Sets','مجموعات تثبيت ضغط مياه الحريق','消防增压稳压设备',
  'The SQL series reference assembly combines a vertical pressure vessel and two pumps on a common skid for fire water pressure maintenance.',
  'يجمع التكوين المرجعي من سلسلة SQL خزان ضغط رأسيًا ومضختين على قاعدة مشتركة لتثبيت ضغط مياه الحريق.', ['sql'],[
  spec('Series','السلسلة','SQL','SQL','sql','技术参数证据表.json','Confirmed'),
  spec('Duty','الوظيفة','Fire water pressure maintenance','تثبيت ضغط مياه الحريق','sql','技术参数证据表.json','Confirmed'),
  spec('Vessel arrangement shown','ترتيب الخزان الظاهر','Vertical vessel','خزان رأسي','sql','技术参数证据表.json','Visible'),
  spec('Pump count shown','عدد المضخات الظاهر','Two pumps','مضختان','sql','技术参数证据表.json','Visible'),
  spec('Assembly shown','التجميع الظاهر','Vessel and pumps on a common skid','الخزان والمضختان على قاعدة مشتركة','sql','技术参数证据表.json','Visible')
], [model('SQL series reference assembly','التكوين المرجعي لسلسلة SQL',null,'Vertical vessel and two pumps; select the vessel and pump duty for the project.','خزان رأسي ومضختان؛ حدد مواصفات الخزان ونقطة تشغيل المضخات حسب المشروع.',['sql'])],[
  prompt('Pressure and vessel duty','الضغط ومتطلبات الخزان','Provide the required operating pressure, usable water volume and pressure-maintenance flow.','قدم ضغط التشغيل المطلوب وحجم الماء القابل للاستخدام وتدفق تثبيت الضغط.'),
  prompt('Assembly scope','نطاق التجميع','Specify pump configuration, power supply, control requirements and the equipment to include in the set.','حدد تكوين المضخات والتغذية الكهربائية ومتطلبات التحكم والمعدات المطلوب تضمينها في المجموعة.')
], [['SQL reference assembly with a vertical vessel and two pumps.','تكوين SQL المرجعي بخزان رأسي ومضختين.']],
  ['完整SQL型号、罐容、材质、压力、流量、功率与接口资料缺失。'],['只描述可见组装配置，不承诺一用一备、隔膜结构、自动控制逻辑或控制柜包含在内。']);
add('automatic-transfer-control-cabinets','fire-pumps-controllers','Dual Power Control Cabinets','خزائن تحكم بمصدرَي تغذية','双电源控制柜',
  'The JX-ATS-63A is a dual power control cabinet with a cold rolled steel enclosure and a documented 380 V supply.',
  'JX-ATS-63A خزانة تحكم بمصدرَي تغذية، بهيكل من الفولاذ المدرفل على البارد وجهد تغذية موثق يبلغ 380 V.', ['ats'],[
  spec('Model','الموديل','JX-ATS-63A','JX-ATS-63A','ats','来源与事实.json'),
  spec('Cabinet function','وظيفة الخزانة','Dual power supply control','التحكم بمصدرَي تغذية','ats','来源与事实.json'),
  spec('Supply voltage','جهد التغذية','380 V','380 V','ats','来源与事实.json'),
  spec('Enclosure','الهيكل','Cold rolled steel','فولاذ مدرفل على البارد','ats','来源与事实.json')
], [model('JX-ATS-63A dual power cabinet','خزانة بمصدرَي تغذية JX-ATS-63A','JX-ATS-63A','380 V; electrical arrangement specified to the approved control schematic.','380 V؛ يحدد التكوين الكهربائي وفق مخطط التحكم المعتمد.',['ats'],'来源与事实.json')],[
  prompt('Power arrangement','ترتيب التغذية','Send both supply specifications, connected load and the required changeover sequence.','أرسل مواصفات مصدرَي التغذية والحمل المتصل وتسلسل التحويل المطلوب.'),
  prompt('Cabinet configuration','تكوين الخزانة','Provide the control schematic, site frequency, installation dimensions and required enclosure protection.','قدم مخطط التحكم وتردد الموقع وأبعاد التركيب ودرجة حماية الهيكل المطلوبة.')
], [['JX-ATS-63A dual power control cabinet.','خزانة تحكم بمصدرَي تغذية JX-ATS-63A.']],
  ['额定电流、转换逻辑、频率、尺寸和防护等级按准确供货柜核实。'],['型号中的63A不另行当作已核实额定电流；不采用异常尺寸140 mm、重量100 g、22/30 W或未经证实的IP55。','页面slug按现有规划保留automatic-transfer，但买家名称仅使用资料已确认的dual power control。']);
add('fire-pump-inspection-control-cabinets','fire-pumps-controllers','Fire Pump Inspection & Control Cabinets','خزائن فحص وتحكم لمضخات الحريق','消防泵巡检控制柜',
  'Choose an inspection control cabinet or a dual power cabinet for the required fire pump electrical arrangement. The photographed configurations are identified separately in the selection table.',
  'اختر خزانة فحص وتحكم أو خزانة بمصدرَي تغذية وفق الترتيب الكهربائي المطلوب لمضخات الحريق. تعرض التكوينات المصورة بشكل منفصل في جدول الاختيار.', ['controls','unnamed'],[
  spec('Named cabinet models','موديلات الخزائن المسماة','JX-XFXJ-7.5 / JX-ATS-63A','JX-XFXJ-7.5 / JX-ATS-63A','controls','技术参数证据表.json','Confirmed'),
  spec('JX-XFXJ-7.5 function','وظيفة JX-XFXJ-7.5','Inspection control','الفحص والتحكم','controls','listing-fields.json','Confirmed'),
  spec('JX-ATS-63A function','وظيفة JX-ATS-63A','Dual power supply control','التحكم بمصدرَي تغذية','controls','listing-fields.json','Confirmed'),
  spec('Named cabinet supply','تغذية الخزائن المسماة','380 V','380 V','controls','技术参数证据表.json','Confirmed'),
  spec('Named cabinet dimensions','أبعاد الخزائن المسماة','1200 × 600 × 400 mm; supplier sequence','1200 × 600 × 400 mm؛ حسب ترتيب المورد','controls','技术参数证据表.json','Confirmed'),
  spec('Named cabinet enclosure','هيكل الخزائن المسماة','Cold rolled steel','فولاذ مدرفل على البارد','controls','技术参数证据表.json','Confirmed'),
  spec('Additional photographed cabinet supply','تغذية الخزانة الإضافية المصورة','380 V','380 V','unnamed','来源与事实.json'),
  spec('Additional photographed cabinet enclosure','هيكل الخزانة الإضافية المصورة','Cold rolled steel','فولاذ مدرفل على البارد','unnamed','来源与事实.json')
], [
  model('JX-XFXJ-7.5 inspection cabinet','خزانة فحص JX-XFXJ-7.5','JX-XFXJ-7.5','Inspection control; 380 V; cabinet 1200 × 600 × 400 mm in supplier sequence.','فحص وتحكم؛ 380 V؛ أبعاد الخزانة 1200 × 600 × 400 mm حسب ترتيب المورد.',['controls']),
  model('JX-ATS-63A dual power cabinet','خزانة بمصدرَي تغذية JX-ATS-63A','JX-ATS-63A','Dual power control; 380 V; cabinet 1200 × 600 × 400 mm in supplier sequence.','تحكم بمصدرَي تغذية؛ 380 V؛ أبعاد الخزانة 1200 × 600 × 400 mm حسب ترتيب المورد.',['controls']),
  model('Additional inspection cabinet configuration','تكوين إضافي لخزانة فحص',null,'380 V, cold rolled steel enclosure; identify the exact cabinet from the reference image when enquiring.','380 V، هيكل من الفولاذ المدرفل على البارد؛ حدد الخزانة المطلوبة من الصورة المرجعية عند الاستفسار.',['unnamed'],'来源与事实.json')
], [
  prompt('Pump and control duty','متطلبات المضخات والتحكم','State the number of connected pumps, each motor rating and the inspection or power-control function required.','حدد عدد المضخات المتصلة وقدرة كل محرك ووظيفة الفحص أو التحكم بالتغذية المطلوبة.'),
  prompt('Schematic and installation','المخطط والتركيب','Send the approved control schematic, supply frequency and cabinet layout; identify the photographed configuration to be supplied.','أرسل مخطط التحكم المعتمد وتردد التغذية ومخطط الخزانة، وحدد التكوين المصور المطلوب توريده.')
], [['JX-XFXJ series inspection cabinet reference.','صورة مرجعية لخزانة فحص من سلسلة JX-XFXJ.'],['Additional inspection cabinet; exact model selected by enquiry.','خزانة فحص إضافية؛ يحدد الموديل الدقيق عند الاستفسار.']],
  ['各柜电机负载适配、频率、内部器件、防护等级待确认；未标型号柜尺寸缺失。'],['1200×600×400 mm仅适用于有对应证据的JX两款，不用于未标型号柜。','不把JX-XFXJ型号7.5转换成kW；原表功率W字段异常，排除。不同柜型功能分别描述。']);
const flangePrompt=prompt('Size and mating flange','المقاس والفلنجة المقابلة','Specify the nominal size and provide the mating flange drilling and installation dimensions.','حدد المقاس الاسمي وقدم أبعاد ثقوب الفلنجة المقابلة وأبعاد التركيب.');
const fluidPrompt=prompt('Service conditions','ظروف التشغيل','State the working fluid, operating pressure and temperature for the exact supplied configuration.','حدد المائع وضغط التشغيل ودرجة الحرارة للتكوين المطلوب توريده.');
function valveModels(key,ref,sizes){return sizes.map(size=>model(size,size,ref,`${ref} · ${size} · flanged connection`,`${ref} · ${size} · توصيل بفلنجة`,[key],key==='check'?'parameter-crosswalk.json':'listing-fields.json'));}
add('flanged-y-strainers','pipeline-valves-strainers','Flanged Y Strainers','مصافٍ بفلنجات على شكل Y','法兰Y型过滤器',
  'The GL41H-16Q Y strainer removes solid particles from water with a perforated screen in a ductile iron body. Five nominal sizes are listed at 1.6 MPa nominal pressure.',
  'تحجز المصفاة GL41H-16Q على شكل Y الجسيمات الصلبة من الماء بواسطة شبكة مثقبة داخل جسم من حديد الدكتايل. تتوفر خمسة مقاسات اسمية موثقة بضغط اسمي 1.6 MPa.', ['strainer'],[
  spec('Model','الموديل','GL41H-16Q','GL41H-16Q','strainer','技术参数证据表.json','Confirmed'),
  spec('Body material','مادة الجسم','Ductile iron','حديد دكتايل','strainer','技术参数证据表.json','Confirmed'),
  spec('Nominal pressure','الضغط الاسمي','1.6 MPa','1.6 MPa','strainer','技术参数证据表.json','Confirmed'),
  spec('Nominal sizes','المقاسات الاسمية','DN50 / DN65 / DN80 / DN100 / DN125','DN50 / DN65 / DN80 / DN100 / DN125','strainer','技术参数证据表.json','Confirmed'),
  spec('Connection','التوصيل','Flanged','بفلنجات','strainer','技术参数证据表.json','Confirmed'),
  spec('Seal material','مادة مانع التسرب','EPDM','EPDM','strainer','技术参数证据表.json','Confirmed'),
  spec('Screen and cover','الشبكة والغطاء','Perforated screen; bolted cover','شبكة مثقبة وغطاء مثبت بمسامير','strainer','技术参数证据表.json','Visible')
],valveModels('strainer','GL41H-16Q',['DN50','DN65','DN80','DN100','DN125']),[flangePrompt,
  prompt('Filtration duty','متطلبات الترشيح','Specify particle size or screen opening, required flow and water operating conditions.','حدد حجم الجسيمات أو فتحات الشبكة والتدفق المطلوب وظروف تشغيل الماء.')],
  [['GL41H-16Q flanged Y strainer.','مصفاة GL41H-16Q بفلنجات على شكل Y.']],['滤网材质和孔径、法兰钻孔及运行温度待确认。'],['仅采用水用途，不沿用有冲突的蒸汽适用性；不映射Class150。']);
add('swing-check-valves','pipeline-valves-strainers','Swing Check Valves','صمامات عدم رجوع متأرجحة','旋启式止回阀',
  'H44T swing check valves provide a flanged non-return connection with a ductile iron body. The documented range covers DN50 to DN200 at 1.6 MPa nominal pressure.',
  'توفر صمامات عدم الرجوع المتأرجحة H44T توصيلًا بفلنجات وجسمًا من حديد الدكتايل. تشمل المقاسات الموثقة DN50 إلى DN200 بضغط اسمي 1.6 MPa.', ['check'],[
  spec('Model','الموديل','H44T','H44T','check','parameter-crosswalk.json'),
  spec('Valve type','نوع الصمام','Swing check valve','صمام عدم رجوع متأرجح','check','图中文字-中英对照.txt'),
  spec('Body material','مادة الجسم','Ductile iron','حديد دكتايل','check','parameter-crosswalk.json','Confirmed'),
  spec('Nominal pressure','الضغط الاسمي','1.6 MPa','1.6 MPa','check','parameter-crosswalk.json','Confirmed'),
  spec('Nominal sizes','المقاسات الاسمية','DN50 / DN65 / DN80 / DN100 / DN150 / DN200','DN50 / DN65 / DN80 / DN100 / DN150 / DN200','check','parameter-crosswalk.json','Confirmed'),
  spec('Connection','التوصيل','Flanged','بفلنجات','check','parameter-crosswalk.json','Visible')
],valveModels('check','H44T',['DN50','DN65','DN80','DN100','DN150','DN200']),[flangePrompt,fluidPrompt],
  [['H44T swing check valve with flanged ends.','صمام عدم رجوع متأرجح H44T بنهايات ذات فلنجات.']],['安装方向、内部材质、密封材料、温度与法兰钻孔需核实。'],['实物DIN3202 F6/GGG50铸字保留在照片，不升级为全系列标准或材质等级宣称。']);
add('flanged-globe-valves','pipeline-valves-strainers','Flanged Globe Valves','صمامات غلوب بفلنجات','法兰截止阀',
  'The J41T globe valve provides manual flow shutoff in fire water supply pipelines, using a handwheel, ductile iron body and bolted bonnet.',
  'يوفر صمام غلوب J41T إيقافًا يدويًا للتدفق في خطوط مياه الحريق، بعجلة تشغيل وجسم من حديد الدكتايل وغطاء مثبت بمسامير.', ['globe'],[
  spec('Model','الموديل','J41T','J41T','globe'),
  spec('Body material','مادة الجسم','Ductile iron','حديد دكتايل','globe','listing-fields.json','Confirmed'),
  spec('Nominal pressure','الضغط الاسمي','PN16 / 1.6 MPa','PN16 / 1.6 MPa','globe','listing-fields.json','Confirmed'),
  spec('Nominal sizes','المقاسات الاسمية','DN50 / DN80 / DN100 / DN150 / DN200','DN50 / DN80 / DN100 / DN150 / DN200','globe','listing-fields.json','Confirmed'),
  spec('Connection','التوصيل','Flanged','بفلنجات','globe','listing-fields.json','Visible'),
  spec('Operation','التشغيل','Manual handwheel','عجلة تشغيل يدوية','globe','listing-fields.json','Visible'),
  spec('Bonnet','الغطاء','Bolted','مثبت بمسامير','globe','listing-fields.json','Visible')
],valveModels('globe','J41T',['DN50','DN80','DN100','DN150','DN200']),[flangePrompt,fluidPrompt],
  [['J41T flanged globe valve with manual handwheel.','صمام غلوب J41T بفلنجات وعجلة تشغيل يدوية.']],['阀内件、密封材料、允许温度、法兰钻孔和安装尺寸待核实。'],['采用本款用户确认PN16和球墨铸铁，不借其他止回阀或过滤器参数。']);
add('two-piece-stainless-steel-ball-valves','pipeline-valves-strainers','Two-piece Stainless Steel Ball Valves','صمامات كروية من الستانلس ستيل بجسم من قطعتين','两片式不锈钢球阀',
  'A 304 stainless steel two-piece ball valve with a manual lever and female threaded ends for pressure gauge connections. The source lists PT1/4 and PT1/2 connection options.',
  'صمام كروي من الستانلس ستيل 304 بجسم من قطعتين وذراع يدوي ونهايات ملولبة داخليًا لتوصيلات مقاييس الضغط. تتضمن الخيارات الموثقة PT1/4 وPT1/2.', ['ball'],[
  spec('Material','المادة','304 stainless steel','ستانلس ستيل 304','ball','listing-fields.json','Confirmed'),
  spec('Body construction','تركيب الجسم','Two piece','من قطعتين','ball','listing-fields.json','Confirmed'),
  spec('Connection','التوصيل','Female threaded ends','نهايات ملولبة داخليًا','ball','listing-fields.json','Confirmed'),
  spec('Thread designations','رموز السن اللولبي','PT1/4 / PT1/2','PT1/4 / PT1/2','ball','listing-fields.json','Confirmed'),
  spec('Operation','التشغيل','Manual lever','ذراع يدوي','ball','listing-fields.json','Visible'),
  spec('Application','الاستخدام','Pressure gauge connections','توصيلات مقاييس الضغط','ball','listing-fields.json','Confirmed')
], ['PT1/4','PT1/2'].map(size=>model(`${size} female × female`,`${size} أنثى × أنثى`,null,'Select this supplier thread designation against the mating connection drawing.','طابق رمز السن لدى المورد مع رسم التوصيل المقابل.',['ball'])),[
  prompt('Thread match','مطابقة السن اللولبي','Choose PT1/4 or PT1/2 and provide the mating thread drawing for dimensional verification.','اختر PT1/4 أو PT1/2 وقدم رسم السن المقابل للتحقق من الأبعاد.'),fluidPrompt],
  [['Two-piece stainless steel ball valve with manual lever.','صمام كروي من الستانلس ستيل بجسم من قطعتين وذراع يدوي.']],
  ['精确螺纹标准、压力温度曲线、阀座和密封材质待确认。'],['保留PT1/4与PT1/2，不转换NPT/BSP，不采用倒写PT4/1；照片1000WOG不单独作为额定压力。']);

const groovePrompt=prompt('Pipe and groove dimensions','أبعاد الأنبوب والأخدود','Specify both nominal DN and actual pipe outside diameter, with the mating groove profile or drawing.','حدد كلًا من المقاس الاسمي DN والقطر الخارجي الفعلي للأنبوب، مع شكل الأخدود المقابل أو رسمه.');
const grooveDuty=prompt('Joint duty','متطلبات الوصلة','Provide operating pressure, temperature and required gasket or coating details for the selected configuration.','قدم ضغط التشغيل ودرجة الحرارة وتفاصيل الحشية أو الطلاء المطلوبة للتكوين المختار.');
function dimensionModel(key, variant, prefixEn='',prefixAr=''){
  const en=variant.option_en.replace(/Angle /,'').replace(/ deg /,'° · ').replace(/ Pipe OD /,' · Pipe OD ');
  const ar=en.replace('Pipe OD','القطر الخارجي للأنبوب');
  return model(prefixEn+en,prefixAr+ar,null,'Select the exact listed size and pipe OD combination; match the groove dimensions.','اختر مجموعة المقاس والقطر الخارجي المدرجة بدقة، وطابق أبعاد الأخدود.',[key]);
}
const elbowModels=['elbow90','elbows'].flatMap(key=>read(key).variants.map(v=>dimensionModel(key,v)));
add('grooved-pipe-elbows','grooved-pipe-fittings','Grooved Pipe Elbows','أكواع أنابيب ذات أخاديد','沟槽弯头',
  'Ductile iron grooved elbows for changing the direction of fire protection piping. Select from the listed 90°, 45°, 22.5° and 11.25° angle and pipe outside-diameter combinations.',
  'أكواع من حديد الدكتايل ذات أخاديد لتغيير اتجاه أنابيب مكافحة الحريق. اختر من مجموعات الزوايا 90° و45° و22.5° و11.25° وأقطار الأنابيب الخارجية المدرجة.', ['elbow90','elbows'],[
  spec('Material','المادة','Ductile iron','حديد دكتايل','elbow90'),
  spec('Connection','التوصيل','Grooved ends','نهايات ذات أخاديد','elbow90'),
  spec('90° nominal size options','خيارات المقاس الاسمي لزاوية 90°','DN50 / DN65 / DN80 / DN100 / DN125 / DN150 / DN200','DN50 / DN65 / DN80 / DN100 / DN125 / DN150 / DN200','elbow90'),
  spec('Additional bend angles','زوايا الانحناء الإضافية','11.25° / 22.5° / 45°','11.25° / 22.5° / 45°','elbows'),
  spec('11.25° and 22.5° nominal sizes','المقاسات الاسمية لزاويتي 11.25° و22.5°','DN65 / DN80 / DN100 / DN125 / DN150 / DN200','DN65 / DN80 / DN100 / DN125 / DN150 / DN200','elbows'),
  spec('Selection basis','أساس الاختيار','Angle + nominal DN + pipe outside diameter','الزاوية + المقاس الاسمي DN + القطر الخارجي للأنبوب','elbows')
],elbowModels,[groovePrompt,grooveDuty],[['90° grooved elbow reference.','صورة مرجعية لكوع ذي أخاديد بزاوية 90°.'],['45° sample; 11.25° and 22.5° options are listed separately.','عينة بزاوية 45°؛ خيارات 11.25° و22.5° مدرجة بشكل منفصل.']],
  ['各尺寸沟槽、压力、壁厚、重量及11.25°/22.5°准确照片待核实。'],['90°10组+多角度22组，保留原始配对，不生成角度与尺寸全排列。','45°照片不冒充11.25°或22.5°；不将2.5铸字作为全系列工作压力。']);
add('grooved-reducing-tees','grooved-pipe-fittings','Grooved Reducing Tees','وصلات T مخفضة ذات أخاديد','沟槽异径三通',
  'Ductile iron reducing tees connect a smaller branch to a grooved pipe run. Each listed option preserves the main and branch nominal sizes together with their matching pipe outside diameters.',
  'تربط وصلات T المخفضة من حديد الدكتايل فرعًا أصغر بخط أنابيب ذي أخاديد. يحافظ كل خيار مدرج على المقاسين الاسميين للخط والفرع مع القطرين الخارجيين الموافقين.', ['tee'],[
  spec('Material','المادة','Ductile iron','حديد دكتايل','tee'),
  spec('Configuration','التكوين','Reducing branch tee','وصلة T بفرع مخفض','tee'),
  spec('Connection','التوصيل','Grooved','بأخاديد','tee'),
  spec('Main nominal sizes','المقاسات الاسمية للخط الرئيسي','DN80 / DN100 / DN125 / DN150 / DN200','DN80 / DN100 / DN125 / DN150 / DN200','tee'),
  spec('Listed combinations','المجموعات المدرجة','19 main/branch and pipe OD combinations','19 مجموعة لمقاسي الخط والفرع وقطري الأنبوب الخارجيين','tee')
],read('tee').variants.map(v=>dimensionModel('tee',v)),[groovePrompt,
  prompt('Branch arrangement','ترتيب الفرع','Provide the main and branch sizes, required flow direction and operating pressure.','قدم مقاسي الخط الرئيسي والفرع واتجاه التدفق المطلوب وضغط التشغيل.')],
  [['Grooved reducing tee with a smaller branch connection.','وصلة T ذات أخاديد بفرع أصغر.']],['沟槽尺寸、压力、壁厚与重量待核实。'],['19个原始主管/支管组合单列；不采用网页通用“轴向型”或把样品铸字扩大到全系列。']);
add('grooved-equal-crosses','grooved-pipe-fittings','Grooved Equal Crosses','وصلات صليبية متساوية ذات أخاديد','沟槽等径正四通',
  'Ductile iron equal crosses provide four grooved connections of equal nominal size for fire protection pipe branching. Select the nominal size and pipe outside diameter together.',
  'توفر الوصلات الصليبية المتساوية من حديد الدكتايل أربع نهايات ذات أخاديد بمقاس اسمي واحد لتفريع أنابيب مكافحة الحريق. اختر المقاس الاسمي والقطر الخارجي للأنبوب معًا.', ['cross'],[
  spec('Material','المادة','Ductile iron','حديد دكتايل','cross'),
  spec('Configuration','التكوين','Four equal nominal-size outlets','أربع فتحات متساوية المقاس الاسمي','cross'),
  spec('Connection','التوصيل','Grooved ends','نهايات ذات أخاديد','cross'),
  spec('Nominal size options','خيارات المقاس الاسمي','DN65 / DN80 / DN100 / DN125 / DN150 / DN200','DN65 / DN80 / DN100 / DN125 / DN150 / DN200','cross'),
  spec('Listed size and OD combinations','مجموعات المقاس والقطر الخارجي المدرجة','9','9','cross')
],read('cross').variants.map(v=>dimensionModel('cross',v)),[groovePrompt,grooveDuty],
  [['Equal cross with four grooved ends.','وصلة صليبية متساوية بأربع نهايات ذات أخاديد.']],['压力、壁厚、重量、沟槽尺寸待核实。'],['仅收等径正四通；原网页沟槽异径/丝接异径四通不并入本页，不使用错误DN150×65=65×76组合。']);
add('rigid-grooved-pipe-couplings','grooved-pipe-fittings','Rigid Grooved Pipe Couplings','وصلات أنابيب صلبة ذات أخاديد','刚性沟槽卡箍',
  'Bolted rigid couplings join compatible grooved pipe ends. The XGQT range and the separate reference coupling are distinct configurations; the latter has a supplier-described EPDM gasket. Confirm the gasket material for your order.',
  'تربط الوصلات الصلبة المثبتة بمسامير أطراف الأنابيب ذات الأخاديد المتوافقة. مجموعة XGQT والوصلة المرجعية المنفصلة تكوينان مختلفان؛ ويصف المورد حشية الوصلة الأخيرة بأنها EPDM، مع ضرورة تأكيد مادة دفعة التوريد.', ['xgqt','coupling'],[
  spec('XGQT housing material','مادة جسم XGQT','Ductile iron','حديد دكتايل','xgqt'),
  spec('XGQT listed nominal sizes','المقاسات الاسمية المدرجة لـ XGQT','DN50 / DN65 / DN80 / DN100 / DN125 / DN150 / DN200','DN50 / DN65 / DN80 / DN100 / DN125 / DN150 / DN200','xgqt'),
  spec('XGQT size and OD combinations','مجموعات المقاس والقطر الخارجي لـ XGQT','10','10','xgqt'),
  spec('Separate coupling housing','جسم الوصلة المنفصلة','Ductile iron bolted split housing','جسم من حديد الدكتايل مقسوم ومثبت بمسامير','coupling'),
  spec('Separate coupling gasket','حشية الوصلة المنفصلة','EPDM shown in its source material','EPDM وفق موادها المرجعية','coupling'),
  spec('Connection function','وظيفة التوصيل','Join compatible grooved pipe ends','ربط أطراف الأنابيب ذات الأخاديد المتوافقة','xgqt')
], [...read('xgqt').variants.map(v=>dimensionModel('xgqt',v,'XGQT · ','XGQT · ')),
  model('Separate bolted coupling reference','وصلة منفصلة بمسامير — صورة مرجعية',null,'Ductile iron split housing; supplier-described EPDM gasket, confirm batch material. Specify the exact housing and connection dimensions.','جسم مقسوم من حديد الدكتايل؛ يصف المورد الحشية بأنها EPDM، ويجب تأكيد مادة دفعة التوريد. حدد الجسم وأبعاد التوصيل بدقة.',['coupling'])],
  [groovePrompt,prompt('Coupling and gasket configuration','تكوين الوصلة والحشية','Identify the XGQT range or the separate reference coupling and specify the gasket compound, pressure and required assembly details.','حدد مجموعة XGQT أو الوصلة المرجعية المنفصلة، واذكر مركب الحشية والضغط وتفاصيل التجميع المطلوبة.')],
  [['XGQT reference coupling; listed DN and pipe OD options apply to this range.','وصلة XGQT مرجعية؛ تنطبق خيارات DN وقطر الأنبوب الخارجي المدرجة على هذه المجموعة.'],['Separate bolted coupling reference; supplier-described EPDM gasket, confirm batch material.','وصلة منفصلة بمسامير — صورة مرجعية؛ يصف المورد الحشية بأنها EPDM، ويجب تأكيد مادة دفعة التوريد.']],
  ['XGQT密封圈材质、两款沟槽图纸/压力/扭矩待确认；另一家卡箍准确型号和尺寸表缺失。','另一家卡箍的EPDM来自同组密封圈宣传，实际出货批次密封圈材质需核对。'],['不把XGQT尺寸、品牌借给另一家卡箍，不把另一家EPDM或涂层借给XGQT。','另一家文件夹DN89、DN114不作为真实公称DN发布。']);

function gaugeModels(key,ref){return read(key).variants.map(v=>{
  const range=v.option_en.replace(' to ','…');
  return model(`${ref} · ${range}`,`${ref} · ${range}`,ref,`100 mm dial · M20x1.5 bottom connection · selected range ${range}`,`قرص 100 mm · توصيل سفلي M20x1.5 · المجال المختار ${range}`,[key]);
});}
const gaugeRangePrompt=prompt('Measuring range','مجال القياس','Specify the required scale range and normal and maximum working pressure; each listed range is a separate gauge option.','حدد مجال التدريج المطلوب وضغط التشغيل المعتاد والأقصى؛ كل مجال مدرج خيار مستقل للمقياس.');
const gaugeFluidPrompt=prompt('Process connection and fluid','توصيل العملية والمائع','Provide the mating thread drawing, working fluid, temperature and required wetted-part material.','قدم رسم السن المقابل والمائع ودرجة الحرارة ومادة الأجزاء الملامسة للمائع المطلوبة.');
add('pressure-vacuum-gauges','pressure-gauges-accessories','Pressure & Vacuum Gauges','مقاييس الضغط والفراغ','普通压力及真空复合表',
  'The Y100 analog gauge offers a 100 mm nominal dial and M20x1.5 bottom connection. Positive-pressure, vacuum and compound ranges are selected as individual gauge options.',
  'يوفر مقياس Y100 التناظري قرصًا بقطر اسمي 100 mm وتوصيلًا سفليًا M20x1.5. تختار مجالات الضغط الموجب والفراغ والمجالات المركبة كخيارات مستقلة للمقياس.', ['gauge'],[
  spec('Model','الموديل','Y100','Y100','gauge','listing-fields.json','Confirmed'),
  spec('Nominal dial diameter','قطر القرص الاسمي','100 mm','100 mm','gauge','listing-fields.json','Confirmed'),
  spec('Connection','التوصيل','M20x1.5 bottom connection','توصيل سفلي M20x1.5','gauge','listing-fields.json','Confirmed'),
  spec('Accuracy class','فئة الدقة','1.6','1.6','gauge','listing-fields.json','Confirmed'),
  spec('Indication','طريقة البيان','Local analog dial','قرص تناظري للقراءة الموضعية','gauge','listing-fields.json','Visible'),
  spec('Range types','أنواع مجالات القياس','Positive pressure / vacuum / compound','ضغط موجب / فراغ / مركب','gauge','listing-fields.json','Confirmed')
],gaugeModels('gauge','Y100'),[gaugeRangePrompt,gaugeFluidPrompt],
  [['Y100 analog pressure gauge reference; scale selected by range.','صورة مرجعية لمقياس ضغط تناظري Y100؛ يختار التدريج حسب المجال.']],
  ['外壳及接液材质、环境温度和介质兼容性待核实。'],['不沿用网页标题不锈钢到黑壳Y100；正压仅按实际SKU至60 MPa，不发布总范围100 MPa。']);
add('liquid-filled-pressure-gauges','pressure-gauges-accessories','Liquid-filled Pressure Gauges','مقاييس ضغط مملوءة بالسائل','充液压力表',
  'The YN100BF is a liquid-filled analog gauge with a stainless steel case, a 100 mm nominal dial and M20x1.5 bottom connection. Choose the required measuring range from the individual options.',
  'YN100BF مقياس تناظري مملوء بالسائل، بهيكل من الستانلس ستيل وقرص بقطر اسمي 100 mm وتوصيل سفلي M20x1.5. اختر مجال القياس المطلوب من الخيارات المستقلة.', ['filled'],[
  spec('Model','الموديل','YN100BF','YN100BF','filled','listing-fields.json','Confirmed'),
  spec('Type','النوع','Liquid-filled analog gauge','مقياس تناظري مملوء بالسائل','filled','listing-fields.json','Confirmed'),
  spec('Case material','مادة الهيكل','Stainless steel','ستانلس ستيل','filled','listing-fields.json','Confirmed'),
  spec('Nominal dial diameter','قطر القرص الاسمي','100 mm','100 mm','filled','listing-fields.json','Confirmed'),
  spec('Connection','التوصيل','M20x1.5 bottom connection','توصيل سفلي M20x1.5','filled','listing-fields.json','Confirmed'),
  spec('Accuracy class','فئة الدقة','1.6','1.6','filled','listing-fields.json','Confirmed'),
  spec('Range types','أنواع مجالات القياس','Positive pressure / vacuum / compound','ضغط موجب / فراغ / مركب','filled','listing-fields.json','Confirmed')
],gaugeModels('filled','YN100BF'),[gaugeRangePrompt,gaugeFluidPrompt],
  [['YN100BF liquid-filled gauge with stainless steel case.','مقياس YN100BF مملوء بالسائل بهيكل من الستانلس ستيل.']],
  ['充液种类、接液件材料、温度限制与专用介质适用性待核实。'],['不采用“威卡款”作为WIKA品牌或授权；不宣称未核验CE，不采用网页250MPa总量程，实际SKU最高正压100 MPa。']);
add('pressure-gauge-syphons','pressure-gauges-accessories','Pressure Gauge Syphon Tubes','أنابيب سيفون لمقاييس الضغط','不锈钢压力表缓冲弯管',
  'Coiled stainless steel tube accessories for pressure gauge connection assemblies. The material options are 201, 304 and 316L; thread and coil configuration are specified with the order.',
  'ملحقات أنبوبية ملتفة من الستانلس ستيل لتجميعات توصيل مقاييس الضغط. خيارات المادة هي 201 و304 و316L؛ ويحدد السن اللولبي وشكل الالتفاف مع الطلب.', ['syphon'],[
  spec('Accessory type','نوع الملحق','Coiled pressure gauge connection tube','أنبوب توصيل ملتف لمقياس ضغط','syphon','listing-fields.json','Confirmed'),
  spec('Material options','خيارات المادة','201 / 304 / 316L stainless steel','ستانلس ستيل 201 / 304 / 316L','syphon','listing-fields.json','Confirmed'),
  spec('Listed thread options','خيارات السن المدرجة','M14x1.5 / M20x1.5','M14x1.5 / M20x1.5','syphon','listing-fields.json','Confirmed'),
  spec('End arrangement shown','ترتيب النهايات الظاهر','Threaded fittings on coiled tube forms','وصلات ملولبة على أنابيب ملتفة','syphon','listing-fields.json','Visible')
],['201','304','316L'].map(grade=>model(`${grade} stainless steel`, `ستانلس ستيل ${grade}`,null,'Specify the thread, coil form and end arrangement for this material option.','حدد السن وشكل الالتفاف وترتيب النهايات لخيار المادة هذا.',['syphon'])),[
  prompt('Material and end connections','المادة وتوصيلات النهايات','Choose 201, 304 or 316L and supply the required thread and end arrangement drawing.','اختر 201 أو 304 أو 316L وقدم رسم السن وترتيب النهايات المطلوب.'),
  prompt('Dimensions and service','الأبعاد وظروف التشغيل','Specify installation space, coil dimensions, operating pressure and process temperature.','حدد مساحة التركيب وأبعاد الالتفاف وضغط التشغيل ودرجة حرارة العملية.')
], [['Coiled syphon tube reference for pressure gauge connections.','أنبوب سيفون ملتف لتوصيلات مقاييس الضغط — صورة مرجعية.']],
  ['尺寸、壁厚、额定压力、温度及各材质/接口/外形组合待确认。'],['三材质与两螺纹不做全排列；Y100作为原资料配套字段，不冒充弯管准确工厂型号。']);
add('pistol-grip-combination-fire-nozzles','hoses-nozzles-couplings','Pistol-grip Combination Fire Nozzles','فوهات حريق متعددة الأنماط بقبضة مسدس','手持直流喷雾消防水枪',
  'A handheld fire nozzle with a pistol grip, bail handle and adjustable jet or fog pattern selection. Match the exact inlet and control arrangement to the required supply configuration.',
  'فوهة حريق يدوية بقبضة مسدس ومقبض قوسي وإمكانية اختيار نمط نفاث أو ضبابي. طابق ترتيب المدخل والتحكم بدقة مع التكوين المطلوب توريده.', ['nozzle'],[
  spec('Application','الاستخدام','Handheld firefighting water discharge','إطلاق مياه مكافحة الحريق يدويًا','nozzle'),
  spec('Discharge patterns','أنماط التدفق','Jet / fog','نفاث / ضبابي','nozzle'),
  spec('Grip','القبضة','Pistol grip','قبضة مسدس','nozzle'),
  spec('Control arrangement shown','ترتيب التحكم الظاهر','Bail handle and adjustable pattern selector','مقبض قوسي ومحدد نمط قابل للضبط','nozzle')
], [model('Pistol-grip jet and fog configuration','تكوين نفاث وضبابي بقبضة مسدس',null,'Identify the inlet, handle and pattern-control arrangement from the reference configuration.','حدد ترتيب المدخل والمقبض والتحكم بالنمط من التكوين المرجعي.',['nozzle'])],[
  prompt('Inlet connection','توصيل المدخل','Provide the mating hose coupling standard, exact dimensions and a connection drawing or photograph.','قدم معيار وصلة الخرطوم المقابلة وأبعادها الدقيقة ورسمًا أو صورة للتوصيل.'),
  prompt('Required performance','الأداء المطلوب','State flow, inlet pressure and required jet or fog duty; identify the exact nozzle configuration for a matching datasheet.','حدد التدفق وضغط المدخل ومتطلبات النمط النفاث أو الضبابي، وحدد تكوين الفوهة الدقيق للحصول على ورقة بيانات مطابقة.')
], [['Pistol-grip jet and fog nozzle reference.','فوهة نفاثة وضبابية بقبضة مسدس — صورة مرجعية.']],
  ['准确型号、材质、接口标准、流量/压力/射程及重量需逐配置核实。'],['不把多色手柄当作唯一SKU；不组合不同入口或流量图片参数，不继承既有银色直流水枪参数。','DN65及2.5寸文件夹标签不构成准确接口标准证据，暂不发布。']);

for(const product of products){
  if(product.selectionPrompts.length<2)throw new Error(`Missing prompts ${product.id}`);
  for(const value of [...product.specs,...product.models]) for(const source of value.sources) if(!fs.existsSync(path.join(base,source)))throw new Error(`Missing ${source}`);
  if(!product.sourceNames.every(name=>Object.keys(product.imageCaptions).includes(name)))throw new Error(`Missing captions ${product.id}`);
  const buyerFields=[product.name,product.lead,...product.specs.flatMap(s=>[s.label,s.value]),...product.models.flatMap(m=>[m.name,m.selection]),...product.selectionPrompts.flatMap(p=>[p.label,p.body]),...Object.values(product.imageCaptions)];
  for(const pair of buyerFields){
    if(!pair.en || !pair.ar)throw new Error(`Missing translation ${product.id}`);
    if(/[\u4e00-\u9fff]/.test(pair.en+pair.ar))throw new Error(`Chinese buyer text ${product.id}`);
    const numbers=text=>(text.match(/-?\d+(?:\.\d+)?/g)||[]).sort().join('|');
    if(numbers(pair.en)!==numbers(pair.ar))throw new Error(`Numeric mismatch ${product.id}: ${pair.en} / ${pair.ar}`);
  }
}
const coverage=[...new Set(products.flatMap(p=>p.sourceNames))];
if(products.length!==17 || coverage.length!==20)throw new Error(`Wrong coverage ${products.length}/${coverage.length}`);
fs.writeFileSync(path.join(out,'mechanical.json'),JSON.stringify({products},null,2)+'\n');
console.log(JSON.stringify({pages:products.length,sourcePrefixes:coverage.length,modelRows:products.reduce((n,p)=>n+p.models.length,0),products:products.map(p=>({id:p.id,models:p.models.length}))},null,2));
