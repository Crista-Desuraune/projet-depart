import tseslint from 'typescript-eslint'
import nestjsTyped from '@darraghor/eslint-plugin-nestjs-typed'

export default tseslint.config(...tseslint.configs.recommended, {
  ignores: ['dist/**', 'coverage/**']
}, {
  files: ['test/**/*.js'],
  rules: { '@typescript-eslint/no-require-imports': 'off' }
}, {
  files: ['src/**/*.ts'],
  extends: [
    ...nestjsTyped.configs.flatRecommended,
    ...nestjsTyped.configs.flatNoSwagger
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    }
  }
})