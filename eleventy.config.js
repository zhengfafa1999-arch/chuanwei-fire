export default function () {
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
