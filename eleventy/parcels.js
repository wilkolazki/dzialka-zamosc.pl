const loadJson5 = require("./loadJson5.js");
const allParcels = loadJson5("src/_data/parcels.json5");

// Parcels marked "hidden": true are omitted from rendering entirely.
// Sold parcels go to the end of the list (stable sort keeps the original order otherwise).
const parcels = allParcels
  .filter((p) => !p.hidden)
  .sort((a, b) => Number(!!a.sold) - Number(!!b.sold));

module.exports = parcels;
