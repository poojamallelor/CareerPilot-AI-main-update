/**
 * ESLint configuration tailored for a mixed JS + TS Next.js app.
 * - Keep strong TS rules for .ts/.tsx
 * - Relax/disable TS plugin rules for plain .js/.jsx to avoid blocking builds
 * - Downgrade noisy UI rules to warnings
 */

module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  plugins: ["@typescript-eslint"],
  rules: {
    // Project-wide relaxations (still report as warnings in editor)
    "react/no-unescaped-entities": "warn",
    "@next/next/no-img-element": "warn",
    // Downgrade display-name to warning to avoid build failure
    "react/display-name": "warn",
  },
  overrides: [
    {
      // Apply TS-specific rules to TS files only
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        // Use untyped rules to avoid requiring TS project type info during builds
        "plugin:@typescript-eslint/stylistic",
      ],
      rules: {
        // Keep strictness for TS, tweak as needed
        "@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }],
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
      },
    },
    {
      // For plain JS/JSX files, turn off TS-plugin rules (they mis-fire on JS)
      files: ["**/*.js", "**/*.jsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        // Use base ESLint rule as a warning for JS
        "no-unused-vars": [
          "warn",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
        ],
        "no-unused-expressions": ["warn", { allowShortCircuit: true, allowTernary: true }],
      },
    },
  ],
};
