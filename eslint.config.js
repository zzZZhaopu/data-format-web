import pluginVue from 'eslint-plugin-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
  },

  ...pluginVue.configs['flat/essential'],
  
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // 可以在这里添加自定义规则
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
] 