# eslint-plugin-package-json

ESLint plugin to lint `package.json` files

## Rules

### `@scinos/package-json/npm-package-json-lint`

Runs [`npm-package-json-lint`](https://www.npmjs.com/package/npm-package-json-lint). Rule can be configured with

```
  rules: {
    "@scinos/package-json/npm-package-json-lint": [
      "error",
      {
        rules: {
          // Rules from https://npmpackagejsonlint.org/docs/rules
          "require-name": "error",
          "require-version": "error",
          "prefer-alphabetical-scripts": "error",
        },
      },
    ],
  },
```