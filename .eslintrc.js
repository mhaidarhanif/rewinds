/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "tailwindcss",
    "import",
    // "sort-export-all",
  ],
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:import/typescript",
    "plugin:sort-export-all/recommended",
  ],
  settings: {
    "import/resolver": { typescript: true, node: true },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
  },
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "react/self-closing-comp": "warn",
    "tailwindcss/classnames-order": "off",
    "tailwindcss/no-arbitrary-value": "warn",
    "tailwindcss/no-custom-classname": "off",
    "import/order": [
      "warn",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        warnOnUnassignedImports: true,
      },
    ],
  },
};
