import { renderSeoTags } from "./site-src/_data/seo.js";

export default function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter("homeCopy", (source, translations = {}) => translations[source] || source);
  eleventyConfig.addNunjucksShortcode("seoTags", renderSeoTags);

  return {
    dir: {
      input: "site-src",
      includes: "_includes",
      data: "_data",
      output: "."
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk"
  };
}
