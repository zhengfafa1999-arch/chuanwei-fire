import { PRODUCT_FAMILIES } from './productDirectory.js';

// Browsing groups organize visible entry points. Detailed categories remain the
// source of product ownership, canonical URLs, model search and category pages.
const valveFamilyIds = ['system-valves', 'butterfly-valves', 'gate-valves', 'pipeline-valves-strainers'];
const byId = new Map(PRODUCT_FAMILIES.map(family => [family.id, family]));
const sprinklerFamilyIds = ['sprinklers', 'foam-nozzles'];
const sprinklerFamilies = sprinklerFamilyIds.map(id => {
  const family = byId.get(id);
  if (!family) throw new Error(`Sprinkler browsing group is missing category: ${id}`);
  return family;
});
const valveFamilies = valveFamilyIds.map(id => {
  const family = byId.get(id);
  if (!family) throw new Error(`Valve browsing group is missing category: ${id}`);
  return family;
});

export const PRODUCT_BROWSE_GROUPS = PRODUCT_FAMILIES.flatMap(family => {
  if (family.id === 'sprinklers') return [{
    id: 'sprinklers-nozzles',
    name: family.name,
    description: {
      en: 'Fire sprinklers, water mist and water curtain nozzles, and foam-water nozzles.',
      ar: 'رشاشات الحريق وفوهات رذاذ الماء والستائر المائية وفوهات الماء والرغوة.',
      zh: '消防洒水喷头、水雾喷头、水幕喷头及泡沫喷头。'
    },
    image: family.image,
    families: sprinklerFamilies
  }];
  if (sprinklerFamilyIds.includes(family.id)) return [];
  if (family.id === 'system-valves') return [{
    id: 'valves-strainers',
    name: { en: 'Valves & Strainers', ar: 'الصمامات والمصافي', zh: '阀门与过滤器' },
    description: {
      en: 'Alarm and system valves, butterfly valves, gate valves, and pipeline valves and strainers.',
      ar: 'صمامات الإنذار والأنظمة وصمامات الفراشة والبوابة، وصمامات الأنابيب والمصافي.',
      zh: '报警阀及系统阀门、消防蝶阀、消防闸阀，以及管路阀门和过滤器。'
    },
    image: family.image,
    families: valveFamilies
  }];
  if (valveFamilyIds.includes(family.id)) return [];
  return [{ id: family.id, name: family.name, description: family.description, image: family.image, families: [family] }];
});

const groupedFamilyIds = PRODUCT_BROWSE_GROUPS.flatMap(group => group.families.map(family => family.id));
if (groupedFamilyIds.length !== PRODUCT_FAMILIES.length || new Set(groupedFamilyIds).size !== PRODUCT_FAMILIES.length) {
  throw new Error('Every detailed product category must belong to exactly one browsing group');
}

export default PRODUCT_BROWSE_GROUPS;
