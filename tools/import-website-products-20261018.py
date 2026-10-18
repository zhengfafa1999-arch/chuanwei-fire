"""Compile reviewed bilingual records into the existing documented-product schema."""
import hashlib
import json
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / 'docs/reviews/material-batch-20261018'
RELEASE = ROOT / 'docs/release/website-products-20261018'
RIGHTS = 'docs/release/website-products-20261018/image-rights-confirmation.json'

def read(file):
    return json.loads(file.read_text(encoding='utf-8-sig'))

def write(file, value):
    file.parent.mkdir(parents=True, exist_ok=True)
    file.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def sha(file):
    return hashlib.sha256(file.read_bytes()).hexdigest()

category_text = [
    ('fire-extinguishers', 'Fire Extinguishers', 'طفايات الحريق', '灭火器',
     'Portable dry powder, water-based and carbon dioxide extinguishers, plus wheeled dry powder models.', 'طفايات محمولة بالمسحوق الجاف والماء وثاني أكسيد الكربون، وطفايات مسحوق جاف بعجلات.', '手提式干粉、水基、二氧化碳及推车式干粉灭火器。'),
    ('automatic-fire-suppression', 'Automatic Fire Suppression', 'أجهزة الإطفاء التلقائي', '自动灭火装置',
     'Suspended powder extinguishers, automatic extinguisher balls and cabinet aerosol devices.', 'طفايات مسحوق معلقة وكرات إطفاء تلقائية وأجهزة إطفاء بالهباء الجوي للخزائن.', '悬挂式干粉、自动灭火球及箱柜气溶胶灭火装置。'),
    ('fire-alarm-systems', 'Fire Alarm Equipment', 'معدات إنذار الحريق', '火灾报警设备',
     'Control panels, detectors, manual call points, input/output modules and sounder beacons.', 'لوحات تحكم وكواشف ونقاط نداء يدوية ووحدات إدخال وإخراج ومنبهات صوتية ضوئية.', '报警控制器、探测器、手动按钮、输入输出模块及声光警报器。'),
    ('fire-pumps-controllers', 'Fire Pumps & Control Cabinets', 'مضخات الحريق وخزائن التحكم', '消防泵与控制柜',
     'Vertical fire pumps, pressure-maintenance equipment, transfer cabinets and pump inspection controls.', 'مضخات حريق رأسية ومعدات المحافظة على الضغط وخزائن تحويل التغذية والتحكم بفحص المضخات.', '立式消防泵、稳压设备、双电源柜及消防泵巡检控制柜。'),
    ('pipeline-valves-strainers', 'Pipeline Valves & Strainers', 'صمامات الأنابيب والمصافي', '管路阀门与过滤器',
     'Y-strainers, swing check valves, globe valves and two-piece stainless steel ball valves.', 'مصافي على شكل Y وصمامات عدم رجوع متأرجحة وصمامات كروية الإغلاق وصمامات كروية من الفولاذ المقاوم للصدأ بقطعتين.', 'Y型过滤器、旋启式止回阀、截止阀及两片式不锈钢球阀。'),
    ('grooved-pipe-fittings', 'Grooved Pipe Fittings', 'وصلات الأنابيب المحززة', '沟槽管件',
     'Grooved elbows, reducing tees, equal crosses and rigid pipe couplings with individual size selections.', 'أكواع محززة ووصلات ثلاثية مخفضة ووصلات رباعية متساوية وقارنات صلبة بمقاسات محددة لكل نوع.', '沟槽弯头、异径三通、等径四通及刚性卡箍，按对应尺寸选型。'),
    ('pressure-gauges-accessories', 'Accessories', 'الملحقات', '配件',
     'Pressure/vacuum gauges, liquid-filled gauges and matching gauge syphons.', 'مقاييس الضغط والتفريغ والمقاييس المملوءة بالسائل وأنابيب السيفون الخاصة بها.', '压力真空表、充液耐震压力表及压力表弯管。')
]
categories = []
for cid, en, ar, zh, den, dar, dzh in category_text:
    categories.append({'id': cid, 'routeId': 'category:' + cid,
                       'name': {'en': en, 'ar': ar, 'zh': zh}, 'description': {'en': den, 'ar': dar, 'zh': dzh}})
category_names = {c['id']: c['name'] for c in categories}
category_names['hoses-nozzles-couplings'] = {'en': 'Fire Hose Nozzles', 'ar': 'فوهات خراطيم الحريق'}

ui = {
    'en': {'onThisPage': 'On this page', 'gallery': 'Product gallery', 'galleryTitle': 'Product views',
           'galleryBody': 'Select an image to view the pictured product or configuration.',
           'specifications': 'Specifications', 'specificationsTitle': 'Product specifications',
           'specificationsBody': 'Use the specifications together with the configuration table below.',
           'availableModels': 'Models & configurations', 'modelsTitle': 'Models & configurations',
           'modelsBody': 'Match the product reference and selection details to your order.',
           'modelsNote': 'The photographs illustrate selected configurations. Specify the required model and quantity when requesting a quotation.',
           'factoryModel': 'Product reference', 'configuration': 'Configuration', 'selectionDetails': 'Selection details',
           'temperature': 'Temperature', 'thermalElement': 'Thermal element',
           'quotation': 'Request a quotation', 'quotationTitle': 'Select your configuration',
           'quotationBody': 'Include the product reference, quantity and delivery destination, together with the requirements below.',
           'askOnWhatsApp': 'Ask on WhatsApp', 'emailSales': 'Email sales',
           'productImagePreview': 'Product image preview', 'closeImagePreview': 'Close image preview',
           'enlargedImage': 'Enlarged product image', 'previousProductImage': 'Previous product image',
           'nextProductImage': 'Next product image', 'selectProductImage': 'Select product image',
           'inquiryTitle': 'Request product details and a quotation', 'inquiryBody': 'Send your selected configuration, quantity and destination.'},
    'ar': {'onThisPage': 'في هذه الصفحة', 'gallery': 'صور المنتج', 'galleryTitle': 'عرض المنتج',
           'galleryBody': 'اختر صورة لعرض المنتج أو التكوين الظاهر فيها.',
           'specifications': 'المواصفات', 'specificationsTitle': 'مواصفات المنتج',
           'specificationsBody': 'استخدم المواصفات مع جدول التكوينات أدناه.',
           'availableModels': 'الموديلات والتكوينات', 'modelsTitle': 'الموديلات والتكوينات',
           'modelsBody': 'طابق مرجع المنتج وتفاصيل الاختيار مع طلبك.',
           'modelsNote': 'تعرض الصور تكوينات مختارة. حدد الموديل والكمية المطلوبة عند طلب عرض السعر.',
           'factoryModel': 'مرجع المنتج', 'configuration': 'التكوين', 'selectionDetails': 'تفاصيل الاختيار',
           'temperature': 'درجة الحرارة', 'thermalElement': 'العنصر الحراري',
           'quotation': 'طلب عرض سعر', 'quotationTitle': 'اختر التكوين المطلوب',
           'quotationBody': 'أرسل مرجع المنتج والكمية ووجهة التسليم والمتطلبات أدناه.',
           'askOnWhatsApp': 'استفسر عبر WhatsApp', 'emailSales': 'راسل قسم المبيعات',
           'productImagePreview': 'معاينة صورة المنتج', 'closeImagePreview': 'إغلاق معاينة الصورة',
           'enlargedImage': 'صورة مكبرة للمنتج', 'previousProductImage': 'صورة المنتج السابقة',
           'nextProductImage': 'صورة المنتج التالية', 'selectProductImage': 'اختر صورة المنتج',
           'inquiryTitle': 'اطلب تفاصيل المنتج وعرض سعر', 'inquiryBody': 'أرسل التكوين المختار والكمية والوجهة.'}
}

products = read(REVIEW / 'extinguishers-alarms.json')['products'] + read(REVIEW / 'mechanical.json')['products']
images = read(REVIEW / 'images.json')
assert len(products) == len({p['id'] for p in products}) == 32
names = [name for p in products for name in p['sourceNames']]
assert len(names) == len(set(names)) == 43
assert set(names) == {i['sourceName'] for i in images}, 'Every selected source must belong to exactly one product series'
watermarks = {i['path']: i for i in read(ROOT / 'site-src/_data/product-watermarks.json')['items']}
listings, rights, coverage = [], [], []
for p in products:
    selected = [i for i in images if i['sourceName'] in p['sourceNames']]
    selected.sort(key=lambda i: (i['sourceName'] != p['heroSourceName'], p['sourceNames'].index(i['sourceName']), i['path']))
    assert selected[0]['sourceName'] == p['heroSourceName']
    assert p['specs'] and p['models'] and len(p['selectionPrompts']) >= 2
    copies = {locale: {**ui[locale], 'title': p['name'][locale], 'lead': p['lead'][locale],
                       'eyebrow': category_names[p['familyId']][locale],
                       'seoTitle': p['name'][locale] + ' | CHUANWEI FIRE', 'seoDescription': p['lead'][locale],
                       'note': p.get('note', {}).get(locale, p['selectionPrompts'][0]['body'][locale])}
              for locale in ['en', 'ar']}
    media, dimensions, gallery = {}, {}, []
    for n, img in enumerate(selected):
        key = 'hero' if n == 0 else 'image' + str(n)
        media[key] = img['path']
        dimensions[key] = {k: img[k] for k in ['width', 'height']}
        gallery.append({'media': key, 'alt': f'image{n}Alt', 'caption': f'image{n}Caption', 'thumbnailAlt': f'image{n}Alt'})
        for locale in copies:
            caption = p['imageCaptions'][img['sourceName']][locale]
            if p['id'] == 'fire-extinguisher-balls':
                loop_handle = '吊环' in img['source']
                caption = (('Loop-handle style' if loop_handle else 'Stand style') + ' · 0.5 kg product weight') if locale == 'en' else (('طراز بحلقة حمل' if loop_handle else 'طراز بحامل') + ' · وزن المنتج 0.5 kg')
            elif sum(i['sourceName'] == img['sourceName'] for i in selected) > 1:
                ordinal = [i['path'] for i in selected if i['sourceName'] == img['sourceName']].index(img['path']) + 1
                caption += (' — View ' if locale == 'en' else ' — صورة ') + str(ordinal)
            copies[locale][f'image{n}Alt'] = caption
            copies[locale][f'image{n}Caption'] = caption
        mark = watermarks[img['path']]
        assert sha(ROOT / img['path']) == mark['watermarkedSha256']
        rights.append({'productId': p['id'], 'path': img['path'], 'sha256': mark['watermarkedSha256'],
                       'source': img['source'], 'sourceSha256': img['sourceSha256'],
                       'selectedSource': img['selectedSource'], 'selectedSha256': img['selectedSha256'],
                       'unwatermarkedSha256': mark['originalSha256'], 'optimizedDisplay': img['optimizedDisplay']})
    specs = []
    for n, spec in enumerate(p['specs']):
        assert spec['sources'] and spec['evidence'], f"Missing evidence: {p['id']}/{n}"
        specs.append({'label': f'spec{n}Label', 'value': f'spec{n}Value'})
        for locale in copies:
            copies[locale][f'spec{n}Label'] = spec['label'][locale]
            copies[locale][f'spec{n}Value'] = spec['value'][locale]
    models = []
    for n, model in enumerate(p['models']):
        models.append({'configuration': f'model{n}Name', 'factoryReference': f'model{n}Reference', 'selection': f'model{n}Selection'})
        for locale in copies:
            reference = model['factoryReference']
            if reference == 'Available on request' and locale == 'ar':
                reference = 'حسب طلب الاستفسار'
            copies[locale][f'model{n}Name'] = model['name'][locale]
            copies[locale][f'model{n}Reference'] = reference
            copies[locale][f'model{n}Selection'] = model['selection'][locale]
    confirmations = []
    for n, prompt in enumerate(p['selectionPrompts']):
        confirmations.append({'label': f'selection{n}Label', 'body': f'selection{n}Body'})
        for locale in copies:
            copies[locale][f'selection{n}Label'] = prompt['label'][locale]
            copies[locale][f'selection{n}Body'] = prompt['body'][locale]
    facts = [f'spec{n}Value' for n, spec in enumerate(p['specs']) if len(spec['value']['en']) <= 52][:3]
    model_columns = [{'label': 'configuration', 'field': 'configuration', 'localized': True}]
    # Do not repeat an empty model-code placeholder on every size-selection row.
    if any(m['factoryReference'] != 'Available on request' for m in p['models']):
        model_columns.append({'label': 'factoryModel', 'field': 'factoryReference', 'localized': True})
    model_columns.append({'label': 'selectionDetails', 'field': 'selection', 'localized': True})
    data = {'id': p['id'], 'routeId': 'product:' + p['id'], 'template': 'product-series/documented-product.njk',
            'styles': ['css/common.css', 'css/sprinkler-product.css', 'css/sprinkler-product-gallery.css', 'css/documented-product.css', 'css/site-navigation.css'],
            'source': {'evidence': 'User-selected new-folder product archive; reviewed field-by-field for this product series.',
                       'review': 'docs/reviews/material-batch-20261018/' + ('extinguishers-alarms.json' if p in products[:15] else 'mechanical.json'),
                       'sourceNames': p['sourceNames'], 'unresolved': p.get('unresolved', []), 'notes': p.get('notes', [])},
            'publication': {'status': 'release-candidate', 'externalRelease': True, 'imageRights': 'user-confirmed-website-use', 'imageRightsEvidence': RIGHTS},
            'media': media, 'imageDimensions': dimensions, 'shared': {}, 'heroFacts': facts, 'gallery': gallery,
            'specifications': specs,
            'modelColumns': model_columns,
            'models': models, 'confirmationItems': confirmations,
            'inquiry': {'whatsapp': 'https://wa.me/8617326528368?text=' + quote('Hello, I am interested in ' + p['name']['en'] + '.\nProduct page: https://chuanweifire.com/products/' + p['familyId'] + '/' + p['id'] + '.html\nQuantity / destination / requirements:'),
                        'email': 'mailto:zhengcolin1@gmail.com'},
            'validation': {'anchors': ['gallery', 'specifications', 'models', 'quotation'], 'requiredTechnicalValues': []},
            'copy': copies}
    write(ROOT / 'site-src/_data/documented-products' / (p['id'] + '.json'), data)
    listings.append({'id': p['id'], 'routeId': data['routeId'], 'familyId': p['familyId'], 'name': p['name'], 'image': media['hero']})
    coverage.append({'id': p['id'], 'name': p['name']['zh'], 'sourceNames': p['sourceNames'],
                     'images': list(media.values()), 'modelRows': len(models), 'unresolved': p.get('unresolved', []),
                     'en': f"products/{p['familyId']}/{p['id']}.html", 'ar': f"ar/products/{p['id']}/index.html"})
for category in categories:
    category['image'] = next(p['image'] for p in listings if p['familyId'] == category['id'])
write(ROOT / 'site-src/_data/website-catalog-20261018.json', {'categories': categories, 'products': listings})
write(RELEASE / 'image-rights-confirmation.json', {
    'status': 'confirmed', 'scope': 'CHUANWEI FIRE official website public display', 'date': '2026-10-18',
    'confirmation': {'userRequest': '这些商品都加入到官网里面', 'scopeAnswer': '新建文件夹对应的全部商品（推荐）',
                     'imageSelection': 'Use the 8 reviewed display optimizations already requested by the user; retain the other 36 original images.'},
    'images': rights})
write(REVIEW / 'coverage.json', {'sourceImages': 44, 'sourceProductNames': 43, 'productSeries': 32,
                                'localizedProductPages': 64, 'newCategories': 7, 'products': coverage})
print('Imported 32 series, 64 bilingual product pages, 7 categories and all 44 selected images.')
