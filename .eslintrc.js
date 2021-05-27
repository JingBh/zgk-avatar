module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'vue'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
