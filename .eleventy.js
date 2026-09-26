const { parcelListing, indexListing, faqPage, developerOfferListing } = require("./eleventy/jsonld.js");
const parcelNav = require("./eleventy/parcelNav.js");
const visibleParcels = require("./eleventy/parcels.js");
const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("json5", (contents) => JSON5.parse(contents));
  eleventyConfig.addFilter("parcelJsonLd", parcelListing);
  eleventyConfig.addGlobalData("indexJsonLd", () => indexListing);
  eleventyConfig.addGlobalData("faqJsonLd", () => faqPage);
  eleventyConfig.addGlobalData("developerOfferJsonLd", () => developerOfferListing);
  eleventyConfig.addGlobalData("parcelNav", () => parcelNav);
  eleventyConfig.addGlobalData("visibleParcels", () => visibleParcels);

  // Resolves a parcel's descriptionFile to an include path, or returns null when
  // the file does not exist. Accepts a bare name ("x.html", relative to
  // src/_includes/descriptions/) or a path from the project root / includes dir.
  eleventyConfig.addFilter("descriptionInclude", (file) => {
    if (!file) return null;
    const relative = file.replace(/^(\.\/)?(src\/)?(_includes\/)?(descriptions\/)?/, "");
    const includePath = path.posix.join("descriptions", relative);
    if (fs.existsSync(path.join(__dirname, "src", "_includes", includePath))) return includePath;
    console.warn(`[11ty] descriptionFile not found: src/_includes/${includePath}`);
    return null;
  });

  // Remove parcel pages left over from parcels that are now hidden (or removed).
  eleventyConfig.on("eleventy.before", ({ directories }) => {
    const outputDir = directories.output;
    const expected = new Set(visibleParcels.map((p) => `dzialka-budowlana-249-${p.number}.html`));
    for (const file of fs.readdirSync(outputDir)) {
      if (/^dzialka-budowlana-249-.+\.html$/.test(file) && !expected.has(file)) {
        fs.unlinkSync(path.join(outputDir, file));
        console.log(`[11ty] Removed stale ${file}`);
      }
    }
  });

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
