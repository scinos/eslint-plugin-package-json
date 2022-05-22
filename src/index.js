const fs = require("fs");
const path = require("path");

const rules = Object.fromEntries(
  fs
    .readdirSync(`${__dirname}/rules`)
    .filter((fileName) => fileName.endsWith(".js") && /^[^._]/.test(fileName))
    .map((fileName) => fileName.replace(/\.js$/, ""))
    .map((ruleName) => [
      ruleName,
      require(path.join(__dirname, "rules", ruleName)),
    ])
);

module.exports = {
  rules,
};
