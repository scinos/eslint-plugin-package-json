const rule = require("../../src/rules/name-valid");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
const parser = require.resolve("../../src/parser.js");

const valid = (name) => {
  return {
    code: JSON.stringify({ name }),
    parser,
  };
};

const invalid = (name, message) => {
  return {
    code: JSON.stringify({ name }),
    parser,
    errors: [{ message }],
  };
};

ruleTester.run(`name-valid`, rule["name-valid"], {
  valid: [
    valid("basicname"),
    valid("name.with.doths"),
    valid("name-with-dashes"),
    valid("123"),
    valid("1-23"),
    valid("_"),
    valid("@scope/name"),
    valid("@scope/."),
    valid("@scope/_"),
    valid("@sco-pe/name"),
    valid("@sco.pe/name"),
    valid("@_/name"),
    valid("@123/name"),
  ],

  invalid: [
    invalid(".start-with-dot", "Name can't start with a dot"),
    invalid("-start-with-dash", "Name can't start with a dash"),
    invalid(
      "very-long-name-with-more-than-214-characters" + Array(172).join("x"),
      "Name can't be longer than 214 characters"
    ),
    invalid(
      "UPPER",
      "Name must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)"
    ),
    invalid("@scope", "Name with a scope must contain a '/' too"),
    invalid("@/", "Scope can't be empty"),
    invalid("@scope/", "Name can't be empty"),
    invalid("@.scope/name", "Scope can't start with a dot"),
    invalid("@-scope/name", "Scope can't start with a dash"),
    invalid(
      "@scop()/name",
      "Scope must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)"
    ),
    invalid(
      "@scope/()",
      "Name must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)"
    ),
  ],
});
