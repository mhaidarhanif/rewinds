/**
 * Feel free to enable/disable the ESLint rules
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "tailwindcss",
    "prettier",
    // "import",
    // "sort-export-all",
  ],
  extends: [
    "eslint:recommended",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
    // "plugin:import/typescript",
    // "plugin:sort-export-all/recommended",
    // "plugin:unicorn/recommended",
  ],
  settings: {
    "import/resolver": { typescript: true, node: true },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
  },
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "object-shorthand": [1, "always"],
    "react/self-closing-comp": 1,
    "tailwindcss/classnames-order": 1, // use prettier-plugin-tailwindcss
    "tailwindcss/no-arbitrary-value": 0,
    "tailwindcss/no-custom-classname": 1,
    // "import/order": [
    //   "warn",
    //   {
    //     alphabetize: {
    //       caseInsensitive: true,
    //       order: "asc",
    //     },
    //     groups: [
    //       "builtin",
    //       "external",
    //       "internal",
    //       "parent",
    //       "sibling",
    //       "index",
    //       "object",
    //       "type",
    //     ],
    //     "newlines-between": "always",
    //     warnOnUnassignedImports: true,
    //   },
    // ],
  },
};
