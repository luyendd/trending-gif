module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "simple-import-sort", "unused-imports", "unicorn"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "next/core-web-vitals",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    eqeqeq: "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "enumMember",
        format: ["UPPER_CASE"],
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-types": "off",
    "no-undef": "off",
    "no-console": [
      "warn",
      {
        allow: ["debug", "info", "warn", "error"],
      },
    ],
    "unicorn/no-array-for-each": "error",
    "unicorn/prefer-regexp-test": "error",
  },
  overrides: [
    {
      files: ["**/src/**/*.ts", "**/src/**/*.tsx"],
      plugins: ["simple-import-sort", "formatjs", "unused-imports"],
      extends: ["plugin:@typescript-eslint/recommended", "next"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [["^react$", "^next", "^@?\\w"], ["^src"], ["^"], ["^\\."], ["^\\u0000"]],
          },
        ],
        "simple-import-sort/exports": "error",
        "react/jsx-sort-props": [
          "error",
          {
            ignoreCase: true,
            callbacksLast: true,
            shorthandLast: true,
          },
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "formatjs/enforce-description": "off",
        "formatjs/enforce-default-message": "off",
        "formatjs/enforce-placeholders": "error",
        "formatjs/enforce-id": "error",
        "unused-imports/no-unused-imports": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-useless-catch": "warn",
        "@typescript-eslint/ban-types": "off",
        "no-undef": "off",
      },
    },
    {
      files: ["**/src/**/*.ts", "**/src/**/*.tsx"],
      extends: ["plugin:tailwindcss/recommended", "plugin:@typescript-eslint/recommended"],
      plugins: ["tailwindcss", "@typescript-eslint"],
      settings: {
        tailwindcss: {
          callees: ["cn"],
        },
      },
      rules: {
        "tailwindcss/enforces-negative-arbitrary-values": "off",
        "tailwindcss/no-custom-classname": "off",
        "@typescript-eslint/no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "clsx",
                message: "Please use 'cn' instead.",
                allowTypeImports: true,
              },
            ],
          },
        ],
      },
    },
  ],
};
