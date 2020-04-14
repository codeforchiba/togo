module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'max-len': [2, { code: 120 }],
    'vue/max-attributes-per-line': [
      2,
      {
        'singleline': 20,
        'multiline': {
          'allowFirstLine': true,
          'max': 3
        }
      }
    ]
  }
}
