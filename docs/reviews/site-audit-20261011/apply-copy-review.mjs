import fs from 'node:fs';
import assert from 'node:assert/strict';
const root = 'docs/reviews/site-audit-20261011';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const save = (f, o) => write(f, JSON.stringify(o, null, 2) + '\n');
const review = {}, edits = [];
const expand = v => v.text.replace(/\{n(\d+)\}/g, (_, i) => v.numbers[i]);
function record(file, key, before, after) { edits.push({file, key, before, after}); }
function preserved(p, key, text, numbers = p.copy[key].numbers) {
  const before = expand(p.copy[key]), after = expand({text, numbers});
  if (before === after) return;
  const html = read(p.source.path).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  const matchBefore = key === 'standard' ? `>${before}<` : before;
  const matchAfter = key === 'standard' ? `>${after}<` : after;
  const occurrences = html.split(matchBefore).length - 1;
  if (occurrences) (review[p.id] ||= []).push({key, before:matchBefore, after:matchAfter, occurrences});
  record(`site-src/_data/preserved-products/${p.id}.json`, key, p.copy[key], {text,numbers});
  p.copy[key] = {text,numbers};
}

// Remove editorial brand explanations; original photographs and their markings stay intact.
for (const file of fs.readdirSync('site-src/_data/preserved-products').filter(f => f.endsWith('.json'))) {
  const path = `site-src/_data/preserved-products/${file}`;
  const p = JSON.parse(read(path));
  const arPath = `site-src/content/products/ar/${file}`, ar = JSON.parse(read(arPath));
  let changed = false;
  for (const [key, v] of Object.entries(p.copy)) {
    if (!v.text.includes('The visible physical GUANYA / 冠亚 product markings are retained;')) continue;
    preserved(p, key, v.text.split(' The visible physical GUANYA')[0]);
    assert(ar[key].includes('GUANYA') && ar[key].includes('. '));
    const after = ar[key].split('. ')[0] + '.';
    record(arPath, key, ar[key], after); ar[key] = after; changed = true;
  }
  if (p.id === 'ria25-fire-hose-reel') {
    const changes = {
      aWallMountedFireHoseReelBuiltTo: ['A wall-mounted fire hose reel with semi-rigid hose for first-aid firefighting in indoor hydrant and hose-line systems. Available in {n0}, {n1} and {n2} m hose lengths.', ['20','25','30'], 'بكرة خرطوم حريق مثبتة على الحائط مع خرطوم شبه صلب للإطفاء الأولي ضمن أنظمة صنابير الحريق والخراطيم الداخلية. تتوفر بأطوال خرطوم {n0} و{n1} و{n2} م.'],
      criticalProductDataIsPresentedInHTMLFor: ['Compare hose length, connection and pressure ratings for your order. If your project specifies EN {n0}-{n1}, request conformity documents matching the selected model before ordering.', ['671','1'], 'قارن طول الخرطوم والتوصيل وقيم الضغط لطلبك. إذا كان المشروع يشترط EN {n0}-{n1}، فاطلب وثائق المطابقة الخاصة بالموديل المختار قبل الطلب.'],
      standard: ['Project standard requirements', [], 'متطلبات معيار المشروع'],
      eN6711SemiRigidHoseReels: ['EN {n0}-{n1}: model-specific conformity documentation requires verification', ['671','1'], 'EN {n0}-{n1}: يلزم التحقق من وثائق المطابقة الخاصة بالموديل'],
      theEN6711VersionYearIsConfirmed: ['An EN {n0}-{n1} requirement must be checked against the selected model and its conformity documents; this page does not establish compliance.', ['671','1'], 'يجب التحقق من متطلب EN {n0}-{n1} بمراجعة الموديل المختار ووثائق مطابقته؛ هذه الصفحة لا تثبت المطابقة.'],
      confirmedConstructionAndOperatingData: ['Construction and operating data', [], 'بيانات البنية والتشغيل'],
      seoTitle: ['RIA {n0} Fire Hose Reel | {n1} mm Semi-Rigid Hose | CHUANWEI FIRE', ['25','25'], 'بكرة خرطوم الحريق RIA {n0} | خرطوم شبه صلب {n1} mm | CHUANWEI FIRE'],
      seoDescription: ['RIA {n0} wall-mounted fire hose reel with {n1} mm semi-rigid hose in {n2}, {n3} and {n4} m lengths. Compare connections and request documents for your selected configuration.', ['25','25','20','25','30'], 'بكرة خرطوم الحريق RIA {n0} مثبتة على الحائط مع خرطوم شبه صلب {n1} mm بأطوال {n2} و{n3} و{n4} m. قارن التوصيلات واطلب وثائق التكوين المختار.']
    };
    for (const [key, [text,numbers,translation]] of Object.entries(changes)) {
      preserved(p,key,text,numbers); record(arPath,key,ar[key],translation); ar[key]=translation;
    }
    // The former standards badge is a product-family label, not a conformity claim.
    const before = p.shared.eN6711, after = 'RIA 25';
    review[p.id].push({key:'heroBadge', before:'>'+before+'<', after:'>'+after+'<', occurrences:1});
    record(path,'shared.eN6711',before,after); p.shared.eN6711=after; changed=true;
  }
  if(changed) { save(path,p); save(arPath,ar); }
}
for(const locale of ['en','ar']) {
  const path=`site-src/content/products/${locale}/wet-alarm-check-valve.json`, p=JSON.parse(read(path));
  const before=p.galleryDescription;
  assert(before.includes('GUANYA'));
  p.galleryDescription=before.split('. ')[0]+'.';
  record(path,'galleryDescription',before,p.galleryDescription); save(path,p);
}
for(const id of ['explosion-proof-pressure-switch','explosion-proof-solenoid-valve']) {
  const path=`site-src/_data/documented-products/${id}.json`, before=read(path), after=before.replace('Request a explosion-proof','Request an explosion-proof');
  assert.notEqual(before,after); write(path,after); record(path,'inquiryTitle','Request a explosion-proof','Request an explosion-proof');
}
save(`${root}/reviewed-copy-changes.json`,review);
save(`${root}/source-copy-edits.json`,edits);
console.log(`Reviewed ${edits.length} copy fields across ${Object.keys(review).length} preserved products plus wet-valve and inquiry copy.`);
