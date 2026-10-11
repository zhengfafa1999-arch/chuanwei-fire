import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync(new URL('../_data/qualification-documents.json', import.meta.url), 'utf8'));
const copy = {
  en: { eyebrow: 'Patent documents', title: 'Chinese patent certificates', lead: 'Invention and utility-model patent certificate scans. Open a document to view its details.', invention: 'Chinese invention patent', utility: 'Chinese utility-model patent', grant: 'Grant date', view: 'Open certificate scan', all: 'View all patent documents' },
  ar: { eyebrow: 'وثائق براءات الاختراع', title: 'شهادات براءات الاختراع الصينية', lead: 'صور شهادات براءات الاختراع ونماذج المنفعة. افتح الوثيقة لعرض تفاصيلها.', invention: 'براءة اختراع صينية', utility: 'براءة نموذج منفعة صينية', grant: 'تاريخ المنح', view: 'فتح صورة الشهادة', all: 'عرض جميع وثائق البراءات' },
  zh: { eyebrow: '专利文件', title: '中国专利证书', lead: '发明及实用新型专利证书扫描件，点击查看文件详情。', invention: '中国发明专利', utility: '中国实用新型专利', grant: '授权公告日', view: '查看证书扫描件', all: '查看全部专利文件' }
};
export function qualificationDocuments(locale, assetPrefix, { featured = false, allHref } = {}) {
  const labels = copy[locale] ?? copy.en;
  return { copy: labels, allHref, items: data.documents.filter(d => !featured || d.featured).map(d => ({
    title: d.name[locale] ?? d.name.en, type: labels[d.kind], patentNumber: d.patentNumber, grantDate: d.grantDate,
    image: `${assetPrefix}assets/certificates/patents/preview-${d.page}.jpg`, href: `${assetPrefix}assets/certificates/patents/document-${d.page}.jpg`
  })) };
}
