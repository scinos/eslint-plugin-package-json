const { FIELDS, rules } = require("../../src/rules/require-forbid-field");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

describe("forbid-* family", () => {
  for (const field of FIELDS) {
    ruleTester.run(`forbid-${field}`, rules[`forbid-${field}`], {
      valid: [
        {
          code: JSON.stringify({}),
          parser: require.resolve("../../src/parser.js"),
        },
      ],

      invalid: [
        {
          code: JSON.stringify({
            [field]: "Field value",
          }),
          output: "{}",
          parser: require.resolve("../../src/parser.js"),
          errors: [{ message: `Field '${field}' is forbidden` }],
        },
      ],
    });
  }
});
