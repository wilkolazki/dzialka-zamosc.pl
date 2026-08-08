const parcels = require("../src/_data/parcels.json");

const parcelNav = {};
parcels.forEach((p, i) => {
  parcelNav[p.number] = {
    prev: parcels[(i - 1 + parcels.length) % parcels.length],
    next: parcels[(i + 1) % parcels.length]
  };
});

module.exports = parcelNav;
