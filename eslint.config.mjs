import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  // Ignores globais
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'coverage/'],
  },
  // Arquivos Astro — parser e regras específicas (deve vir antes do TypeScript)
  ...eslintPluginAstro.configs['flat/recommended'],
  // TypeScript — aplicado SOMENTE em arquivos .ts/.tsx (não sobrescreve parser do Astro)
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: tseslint.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      // Triple-slash references são necessárias em .d.ts do Astro
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  // Arquivos JS/MJS de config
  {
    files: ['*.config.{js,mjs}', 'eslint.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
