const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = [
  ...tseslint.config(
    {
      files: ["**/*.ts"],
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
        ...angular.configs.tsRecommended,
      ],
      languageOptions: {
        parserOptions: {
          project: "./tsconfig.json",
          tsconfigRootDir: __dirname,
        },
      },
      processor: angular.processInlineTemplates,
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
          },
        ],
      },
    },
    {
      files: ["**/*.html"],
      extends: [
        ...angular.configs.templateRecommended,
        ...angular.configs.templateAccessibility,
      ],
      rules: {},
    },
  ),
];
