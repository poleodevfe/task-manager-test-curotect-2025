import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.pnpm-store/**'],
    extends: [tseslint.configs.recommended, prettierConfig],
  },

  {
    files: ['packages/backend/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: 'packages/backend/tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: ['packages/frontend/**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'react-refresh': refreshPlugin,
    },
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
