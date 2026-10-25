// Independently published groups confirmed by the user and the supplied samples.
// Configuration evidence remains attached to its original exact-model record.
const definitions = [
  ['k80-standard-concealed', 80, 'standard', 'Q5A', ['zstdy80-57-q5a', 'zstdy80-79-q5a', 'zstdy80-141-q5a']],
  ['k80-quick-concealed', 80, 'quick', 'Q3A', ['zstdy80-93-q3a']],
  ['k115-standard-concealed', 115, 'standard', 'Q5A', ['zstdy115-57-q5a', 'zstdy115-79-q5a', 'zstdy115-93-q5a']],
  ['k115-quick-concealed', 115, 'quick', 'Q3A', []]
];

export const concealedSeries = definitions.map(([seriesId, kFactor, response, bulbCode, supplementIds]) => {
  const productId = `k${kFactor}-${response}-response-concealed-sprinkler`;
  const responseEn = response === 'standard' ? 'Standard Response' : 'Quick Response';
  const responseAr = response === 'standard' ? 'ذات استجابة قياسية' : 'سريعة الاستجابة';
  return {
    seriesId, productId, routeId: `product:${productId}`, kFactor, response, bulbCode, supplementIds,
    factoryModel: `ZSTDY${kFactor}-68°C ${bulbCode}`,
    name: { en: `K${kFactor} ${responseEn} Concealed Sprinklers`, ar: `رشاشات K${kFactor} مخفية ${responseAr}`, zh: `K${kFactor}${response === 'standard' ? '标准' : '快速'}隐蔽式` },
    image: `assets/products/concealed-series/${seriesId}-covered-and-exposed.webp`,
    imageCaption: {
      en: `K${kFactor} / 68°C ${response}-response concealed sprinkler — covered assembly and exposed mechanism.`,
      ar: `رشاش مخفي K${kFactor} / 68°C ${response === 'standard' ? 'ذو استجابة قياسية' : 'سريع الاستجابة'} — المجموعة مع الغطاء والآلية المكشوفة.`
    }
  };
});
