import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["tailwind.config.js", ".angular/*", "**/*.{js}"] },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: "semi",
              requireLast: true,
            },
          },
        },
      }],

      "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
      "comma-dangle": ["error", "always-multiline"],
      "no-shadow": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
      "@typescript-eslint/ban-ts-comment": ["warn", { "ts-expect-error": "allow-with-description" }],
      "@typescript-eslint/semi": ["error", "always"],
      "no-restricted-imports": [ // imports must be absolute path
          "error",
          {
            patterns: [
              {
                group: ["../"], // "./import" is allowed
                message: "Relative imports are only allowed for elements in the same folder.",
              },
            ],
          },
        ],
    }
  }
];
