import { PRODUCT_FAMILIES } from './productDirectory.js';

// Browsing groups organize visible entry points. Detailed categories remain the
// source of product ownership, canonical URLs, model search and category pages.
const valveFamilyIds = ['system-valves', 'butterfly-valves', 'gate-valves', 'pipeline-valves-strainers'];
const byId = new Map(PRODUCT_FAMILIES.map(family => [family.id, family]));
const valveFamilies = valveFamilyIds.map(id => {
  const family = byId.get(id);
  if (!family) throw new Error(`Valve browsing group is missing category: ${id}`);
  return family;
});

export const PRODUCT_BROWSE_GROUPS = PRODUCT_FAMILIES.flatMap(family => {
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
