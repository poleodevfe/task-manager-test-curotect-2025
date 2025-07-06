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
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  }
);
