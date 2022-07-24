const requireRule = (field) => ({
  meta: {
    type: "problem",
    fixable: "code",
    hasSuggestions: true,
    schema: [],
  },
  create(context) {
    return {
      "Program > ObjectExpression"(node) {
        const hasField = node.properties.some((p) => p.key.value === field);
        if (!hasField) {
          context.report({
            node,
            loc: {
              start: node.loc.start,
              end: {
                line: node.loc.start.line,
                column: node.loc.start.column + 1,
              },
            },
            message: `Field '${field}' is missing`,
            fix: function (fixer) {
              return fixer.insertTextAfterRange(
                [node.range[0] + 1, node.range[0] + 1],
                `"${field}": "",\n`
              );
            },
          });
        }
      },
    };
  },
});

const forbidRule = (field) => ({
  meta: {
    type: "problem",
    fixable: "code",
    hasSuggestions: true,
    schema: [],
  },
  create(context) {
    return {
      "Program > ObjectExpression"(node) {
        const fieldNode = node.properties.find((p) => p.key.value === field);
        if (!fieldNode) return;

        context.report({
          node: fieldNode,
          message: `Field '${field}' is forbidden`,
          fix: function (fixer) {
            return fixer.remove(fieldNode);
          },
        });
      },
    };
  },
});

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

const fieldRules = Object.fromEntries(
  FIELDS.flatMap((field) => [
    [`require-${field}`, requireRule(field)],
    [`forbid-${field}`, forbidRule(field)],
  ])
);

module.exports = {
  rules: fieldRules,
  FIELDS,
};
