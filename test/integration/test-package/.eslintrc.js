module.exports = {
  root: true,
  plugins: ["@scinos/package-json"],
  parser: "../../../src/parser.js",
  rules: {
    "@scinos/package-json/name-valid": "error",
  },
};
