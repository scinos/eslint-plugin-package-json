const requireForbidFieldRules = require("./rules/require-forbid-field");

module.exports = {
  rules: {
    ...requireForbidFieldRules.rules,
  },
};
