module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prefer-arrow", "import"],
  rules: {
    "prettier/prettier": ["warn"],
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "prefer-arrow/prefer-arrow-functions": [
      "warn",
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: true,
        allowStandaloneDeclarations: true,
      },
    ],
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "all",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "no-console": [
      "error",
      {
        allow: ["error"],
      },
    ],
    eqeqeq: ["error", "always"],
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          ["index", "sibling", "parent", "internal"],
        ],
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: "+(react|phaser)",
            group: "external",
            position: "before",
          },
          {
            pattern: "^types(/.*)?$",
            group: "index",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
  ignorePatterns: [
    "scripts/",
    "*.config.js",
    "src/assets.ts",
    "src/utils/AssetLoader.ts",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./",
      },
    },
  },
};
