export default function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter("homeCopy", (source, translations = {}) => translations[source] || source);

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
