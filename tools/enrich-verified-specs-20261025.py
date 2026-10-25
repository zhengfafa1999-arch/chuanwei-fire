"""Apply model-specific manufacturer evidence, retaining an internal change ledger."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVIDENCE = ROOT / 'docs/reviews/web-spec-research-20261025'
DATA = ROOT / 'site-src/_data/documented-products'
changes = []

def update(product, model, item, version, pages, rows, copy_updates, unresolved):
    file = DATA / f'{product}.json'
    old = json.loads(file.read_text(encoding='utf-8'))
    (EVIDENCE / 'before').mkdir(exist_ok=True)
    snapshot = EVIDENCE / 'before' / file.name
    if snapshot.exists():
        raise RuntimeError(f'Already applied: {snapshot}')
    snapshot.write_text(json.dumps(old, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    d = json.loads(json.dumps(old))
    for key, en_label, en_value, ar_label, ar_value in rows:
        d['specifications'].append({'label': key+'Label', 'value': key+'Value'})
        for lang, label, value in [('en', en_label, en_value), ('ar', ar_label, ar_value)]:
            d['copy'][lang][key+'Label'] = label
            d['copy'][lang][key+'Value'] = value
    for key, en, ar in copy_updates:
        d['copy']['en'][key] = en
        d['copy']['ar'][key] = ar
    url = f'https://www.tandatech.com/productinfo?id={item}'
    d['source']['webResearch'] = {
        'reviewedAt': '2026-10-25', 'manufacturer': 'Tanda', 'model': model,
        'url': url, 'manual': version, 'pages': pages,
        'evidenceDirectory': 'docs/reviews/web-spec-research-20261025',
        'scope': 'Exact model only; no certification or universal compatibility claim.'
    }
    d['source']['unresolved'] = unresolved
    d['source']['notes'].append('2026-10-25：已按同型号官方说明书补充参数；此前缺失参数的备注由本次核验结果更新。')
    file.write_text(json.dumps(d, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    changes.append({'product':product, 'model':model, 'url':url, 'manual':version, 'pages':pages, 'addedRows':len(rows), 'updatedCopyKeys':[r[0] for r in copy_updates]})

update('combined-smoke-heat-detectors','JTF-GOM-TX3120A','1801010043','Ver.1.1, 2023.05',[1,3],[
 ('verifiedHeat','Heat response class','A2R','فئة الاستجابة الحرارية','A2R'),
 ('verifiedBus','Bus connection','Non-polarized two-wire bus','توصيل الناقل','ناقل بسلكين دون قطبية'),
 ('verifiedAddress','Addressing','Electronic; addresses 1–242','العنونة','إلكترونية؛ العناوين 1–242'),
 ('verifiedBase','Matching base','TX3986','القاعدة المطابقة','TX3986'),
 ('verifiedAmbient','Operating temperature','−10 to +50 °C','درجة حرارة التشغيل','−10 إلى +50 °C'),
 ('verifiedHumidity','Relative humidity','≤95% RH, non-condensing','الرطوبة النسبية','≤95% RH، دون تكاثف'),
 ('verifiedHousing','Housing material','ABS','مادة الغلاف','ABS'),
 ('verifiedWeight','Product weight','Approx. 93 g','وزن المنتج','حوالي 93 g'),
], [
 ('spec3Value','≤0.4 mA','≤0.4 mA'),
 ('spec4Value','≤0.7 mA','≤0.7 mA'),
 ('model0Selection','A2R heat response; non-polarized two-wire bus; TX3986 base.','استجابة حرارية A2R؛ ناقل بسلكين دون قطبية؛ قاعدة TX3986.'),
 ('selection1Body','Specify whether the TX3986 base is required, together with the installation environment and quantity.','حدد ما إذا كانت قاعدة TX3986 مطلوبة، مع بيئة التركيب والكمية.'),
], ['具体工程的控制器、回路协议与现场设备组合仍须匹配；不宣称通用兼容。'])

update('fire-alarm-input-output-modules','TX3212','1801020109','Ver.1.4, 2020.03',[1,2,4],[
 ('verifiedProtocol','Bus protocol','T3','بروتوكول الناقل','T3'),
 ('verifiedBusVoltage','Bus voltage','15–28 V pulsed','جهد الناقل','15–28 V نبضي'),
 ('verifiedSupply','External power supply','24 V DC nominal; 20–28 V DC','مصدر التغذية الخارجي','24 V DC اسمي؛ 20–28 V DC'),
 ('verifiedContacts','Normally open output contact','30 V DC / 2.0 A','ملامس الخرج المفتوح عادة','30 V DC / 2.0 A'),
 ('verifiedInput','Feedback input','Dry contact; normally open or normally closed configuration','دخل التغذية الراجعة','ملامس جاف؛ إعداد مفتوح عادة أو مغلق عادة'),
 ('verifiedAddress','Addressing','One bus address; electronic coding 1–242','العنونة','عنوان ناقل واحد؛ ترميز إلكتروني 1–242'),
 ('verifiedDimensions','Dimensions including base','86 × 86 × 33 mm','الأبعاد شاملة القاعدة','86 × 86 × 33 mm'),
 ('verifiedAmbient','Operating temperature','−10 to +55 °C','درجة حرارة التشغيل','−10 إلى +55 °C'),
 ('verifiedHumidity','Relative humidity','≤95% RH, non-condensing','الرطوبة النسبية','≤95% RH، دون تكاثف'),
], [
 ('spec2Value','One input and one output','دخل واحد وخرج واحد'),
 ('spec3Value','TX3212DZ plug-in base','قاعدة توصيل TX3212DZ'),
 ('model0Selection','T3 bus; separate 24 V DC supply; 30 V DC / 2.0 A normally open output contact.','ناقل T3؛ تغذية مستقلة 24 V DC؛ ملامس خرج مفتوح عادة 30 V DC / 2.0 A.'),
 ('selection1Body','Provide the controlled-equipment wiring and load details. High-voltage or high-power loads require an intermediate relay interface.','قدم توصيلات المعدات المتحكم بها وتفاصيل الحمل. تتطلب الأحمال ذات الجهد أو القدرة العالية واجهة مرحل وسيط.'),
], ['实际控制器固件兼容、控制负载与联动方案按工程设计核对；不承诺直接驱动电机或消防泵。'])

update('fire-alarm-sounder-beacons','TX3307A','1801040103','Ver.1.0, 2021.11',[1],[
 ('verifiedVoltage','TX3307A — bus supply','24 V DC nominal; 15–28 V DC','TX3307A — تغذية الناقل','24 V DC اسمي؛ 15–28 V DC'),
 ('verifiedCurrent','TX3307A — current','Standby ≤0.4 mA; activated ≤3 mA','TX3307A — التيار','استعداد ≤0.4 mA؛ تشغيل ≤3 mA'),
 ('verifiedSound','TX3307A — sound level','75–105 dB(A) at 3 m directly in front, after stabilization','TX3307A — مستوى الصوت','75–105 dB(A) على بعد 3 m أمام الجهاز مباشرة، بعد الاستقرار'),
 ('verifiedFlash','TX3307A — flash frequency','1.0–1.8 Hz','TX3307A — تردد الوميض','1.0–1.8 Hz'),
 ('verifiedBus','TX3307A — bus connection','Non-polarized two-wire bus','TX3307A — توصيل الناقل','ناقل بسلكين دون قطبية'),
 ('verifiedBase','TX3307A — matching base','TX3307-DZ','TX3307A — القاعدة المطابقة','TX3307-DZ'),
 ('verifiedDimensions','TX3307A — dimensions including base','121 × 86 × 45 mm','TX3307A — الأبعاد شاملة القاعدة','121 × 86 × 45 mm'),
 ('verifiedAmbient','TX3307A — operating temperature','0 to +55 °C','TX3307A — درجة حرارة التشغيل','0 إلى +55 °C'),
 ('verifiedHumidity','TX3307A — relative humidity','≤95% RH, non-condensing','TX3307A — الرطوبة النسبية','≤95% RH، دون تكاثف'),
], [
 ('specificationsBody','The electrical, acoustic and dimensional specifications marked TX3307A apply to that model only. Select TX3307 and TX3307A separately.','تنطبق المواصفات الكهربائية والصوتية والأبعاد الموسومة TX3307A على هذا الطراز فقط. يُختار TX3307 وTX3307A كلٌ على حدة.'),
 ('model1Selection','Non-polarized two-wire bus, 24 V DC nominal, TX3307-DZ base.','ناقل بسلكين دون قطبية، 24 V DC اسمي، قاعدة TX3307-DZ.'),
], ['TX3307（不带A）电源、工作电流、声压、底座与接线仍缺同型号说明书，不使用TX3307A参数代替。','TX3307A光强/覆盖性能与防护等级未见本次说明书明示；实际控制器兼容按项目核对。'])

update('manual-fire-alarm-call-points','J-SJP-M-TX3142','1801030106','Ver.1.2, 2021.04',[1,3],[
 ('verifiedVoltage','Bus voltage','15–28 V pulsed','جهد الناقل','15–28 V نبضي'),
 ('verifiedCurrent','Bus current','Standby ≤0.5 mA; alarm ≤0.8 mA','تيار الناقل','استعداد ≤0.5 mA؛ إنذار ≤0.8 mA'),
 ('verifiedContact','Dry contact output','30 V DC / 100 mA rated','خرج الملامس الجاف','30 V DC / 100 mA مقنن'),
 ('verifiedReset','Reset method','Reusable element; dedicated reset key','طريقة إعادة الضبط','عنصر قابل لإعادة الاستخدام؛ مفتاح إعادة ضبط مخصص'),
 ('verifiedBus','Bus connection','Non-polarized two-wire bus','توصيل الناقل','ناقل بسلكين دون قطبية'),
 ('verifiedBase','Matching base','TX3988','القاعدة المطابقة','TX3988'),
 ('verifiedDimensions','Dimensions including base','90 × 90 × 34 mm','الأبعاد شاملة القاعدة','90 × 90 × 34 mm'),
 ('verifiedProtection','Enclosure protection','IP43; indoor use','حماية الغلاف','IP43؛ استخدام داخلي'),
 ('verifiedAmbient','Operating temperature','−10 to +55 °C','درجة حرارة التشغيل','−10 إلى +55 °C'),
 ('verifiedHumidity','Relative humidity','≤95% RH, non-condensing','الرطوبة النسبية','≤95% RH، دون تكاثف'),
], [
 ('model0Selection','TX3988 base; resettable activation element; dedicated reset key; telephone socket.','قاعدة TX3988؛ عنصر تشغيل قابل لإعادة الضبط؛ مفتاح إعادة ضبط مخصص؛ مقبس هاتف.'),
 ('selection1Body','Specify the fire telephone system and whether the TX3988 base is required. The telephone connection uses separate terminals from the alarm bus.','حدد نظام هاتف الحريق وما إذا كانت قاعدة TX3988 مطلوبة. يستخدم اتصال الهاتف أطرافاً منفصلة عن ناقل الإنذار.'),
], ['具体控制器与消防电话主机兼容仍须按现场系统确认；不适用于TX3142N。'])

# An unspecified marketplace category is not evidence contradicting an explicit product title.
file = DATA / 'grooved-flange-adapters.json'
d = json.loads(file.read_text(encoding='utf-8'))
(EVIDENCE/'before'/file.name).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
d['specifications'].insert(2, {'label':'spec2Label','value':'spec2Value'})
d['copy']['en']['spec2Value'] = 'Ductile iron'
d['copy']['ar']['spec2Value'] = 'حديد دكتايل'
d['source']['unresolved'] = [x for x in d['source']['unresolved'] if '材质存在冲突' not in x]
d['source']['unresolved'] = [x.replace('主体材质及牌号，必要时含密封件和紧固件材质','球墨铸铁具体牌号，必要时含密封件和紧固件材质') for x in d['source']['unresolved']]
d['source']['materialReview'] = {'reviewedAt':'2026-10-25','basis':'原供应商同商品标题明确为球墨铸铁；结构化其它属于未分类，不能当作另一种材质与标题冲突。采用材质名称，不外推牌号、压力等级或认证。','url':'https://detail.1688.com/offer/1062903625929.html'}
file.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
changes.append({'product':'grooved-flange-adapters','addedRows':1,'basis':'Explicit original supplier product title; corrected earlier interpretation of unspecified category.'})
(EVIDENCE/'changes.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(changes,ensure_ascii=False,indent=2))
