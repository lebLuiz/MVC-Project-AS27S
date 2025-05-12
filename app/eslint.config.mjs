// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
        'vue/multi-word-component-names': 0,
        'no-debugger': 'off'
    }
  }
)
