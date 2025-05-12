import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
  ],

  imports: {
    dirs: ["./composables/useServices", "./composables/useLogger"],
  },

  css: ["primeicons/primeicons.css"],

  runtimeConfig: {
    public: {
      nodeEnv: process.env.NODE_ENV,
      siteUrl: process.env.SITE_URL,
      apiURL: process.env.API_URL,
    },
  },

  googleFonts: {
    base64: true,
    fontsDir: "assets/fonts",
    overwriting: true,
    families: {
      Inter: [300, 500, 800],
    },
  },

  primevue: {
    options: { unstyled: true },
    importPT: {
      as: "lara",
      from: path.resolve(__dirname, "./assets/presets/lara/"),
    },
  },
});
