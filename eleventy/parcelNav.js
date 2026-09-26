const parcels = require("./parcels.js");

const parcelNav = {};
parcels.forEach((p, i) => {
  parcelNav[p.number] = {
    prev: parcels[(i - 1 + parcels.length) % parcels.length],
    next: parcels[(i + 1) % parcels.length]
  };
});

module.exports = parcelNav;
