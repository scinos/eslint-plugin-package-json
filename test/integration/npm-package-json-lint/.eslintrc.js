module.exports = {
  root: true,
  plugins: ["@scinos/package-json"],
  parser: "../../../src/parser.js",
  rules: {
    "@scinos/package-json/npm-package-json-lint": [
      "error",
      {
        rules: {
          "require-name": "error",
          "require-version": "error",
          "prefer-alphabetical-scripts": "error",
        },
      },
    ],
  },
};
