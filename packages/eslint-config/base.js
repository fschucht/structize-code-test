import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import importPlugin from 'eslint-plugin-import';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      'import': importPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
        },
      ],
      'import/named': ['off'],
      'import/default': ['off'],
      'import/namespace': ['off'],
      'import/no-cycle': ['off'],
      'import/no-unused-modules': ['off'],
      'import/no-deprecated': ['off'],
      'import/no-named-as-default-member': ['off'],
      'import/no-named-as-default': ['off'],
      'import/no-unresolved': ['off'],
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'pathGroups': [
            {
              pattern: "@repo/**",
              group: "external",
              position: "after"
            }
          ],
          'pathGroupsExcludedImportTypes': ['builtin'],
          'newlines-between': 'never',
        },
      ],
    }
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
