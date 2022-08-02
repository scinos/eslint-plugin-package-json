const URL_SAFE = /^[a-z0-9-*._~]+$/;

module.exports = {
  "name-valid": {
    meta: {
      type: "problem",
      fixable: "code",
      schema: [],
    },
    create(context) {
      return {
        "Program > ObjectExpression > Property[key.value=name]"(node) {
          const nameNode = node.value;
          const name = nameNode.value;

          if (name.length > 214) {
            context.report({
              node: nameNode,
              message: `Name can't be longer than 214 characters`,
            });
            return;
          }

          if (name.startsWith("@")) {
            const [scope, packageName] = name.split("/");
            const scopeName = scope.substr(1);

            if (!packageName) {
              context.report({
                node: nameNode,
                message: `Name with a scope must contain a '/' too`,
              });
              return;
            }

            if (scopeName.startsWith(".")) {
              context.report({
                node: nameNode,
                message: `Scope can't start with a dot`,
              });
              return;
            }

            if (scopeName.startsWith("-")) {
              context.report({
                node: nameNode,
                message: `Scope can't start with a dash`,
              });
              return;
            }

            if (!packageName.match(URL_SAFE)) {
              context.report({
                node: nameNode,
                message: `Name must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)`,
              });
              return;
            }

            if (!scopeName.match(URL_SAFE)) {
              context.report({
                node: nameNode,
                message: `Scope must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)`,
              });
              return;
            }
          } else {
            if (name.startsWith(".")) {
              context.report({
                node: nameNode,
                message: `Name can't start with a dot`,
              });
              return;
            }

            if (name.startsWith("-")) {
              context.report({
                node: nameNode,
                message: `Name can't start with a dash`,
              });
              return;
            }

            if (!name.match(URL_SAFE)) {
              context.report({
                node: nameNode,
                message: `Name must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)`,
              });
              return;
            }
          }
        },
      };
    },
  },
};
