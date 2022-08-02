const requireForbidFieldRules = require("./rules/require-forbid-field");
const nameValid = require("./rules/name-valid");

module.exports = {
  rules: {
    ...requireForbidFieldRules.rules,
    ...nameValid,
  },
};
