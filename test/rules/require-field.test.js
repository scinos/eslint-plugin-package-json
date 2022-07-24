const rule = require("../../src/index");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
const FIELDS = [
  "author",
  "bin",
  "browser",
  "bugs",
  "bundledDependencies",
  "config",
  "contributors",
  "cpu",
  "dependencies",
  "description",
  "devDependencies",
  "directories",
  "engines",
  "files",
  "funding",
  "homepage",
  "keywords",
  "license",
  "main",
  "man",
  "name",
  "module",
  "exports",
  "optionalDependencies",
  "os",
  "overrides",
  "peerDependencies",
  "private",
  "publishConfig",
  "repository",
  "scripts",
  "version",
  "types",
  "workspaces",
];

describe("require-* family", () => {
  for (const field of FIELDS) {
    ruleTester.run(`require-${field}`, rule.rules[`require-${field}`], {
      valid: [
        {
          code: JSON.stringify({
            [field]: "Field value",
          }),
          parser: require.resolve("../../src/parser.js"),
        },
      ],

      invalid: [
        {
          code: JSON.stringify({}),
          output: `{"${field}": "",\n}`,
          parser: require.resolve("../../src/parser.js"),
          errors: [{ message: `Field '${field}' is missing` }],
        },
      ],
    });
  }
});
