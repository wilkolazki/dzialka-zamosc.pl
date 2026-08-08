const { parcelListing, indexListing, faqPage } = require("./eleventy/jsonld.js");
const parcelNav = require("./eleventy/parcelNav.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("parcelJsonLd", parcelListing);
  eleventyConfig.addGlobalData("indexJsonLd", () => indexListing);
  eleventyConfig.addGlobalData("faqJsonLd", () => faqPage);
  eleventyConfig.addGlobalData("parcelNav", () => parcelNav);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "."
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
