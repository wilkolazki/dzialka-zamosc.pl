const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");

// Reads a JSON5 file relative to the project root.
module.exports = (file) =>
  JSON5.parse(fs.readFileSync(path.join(__dirname, "..", file), "utf-8"));
