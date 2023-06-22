// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Weather App",
      meta: [
        {
          name: "description",
          content: "Weather App created by Cameron",
        },
        {
          property: "og:title",
          content: "Weather App",
        },
        {
          property: "og:description",
          content: "Vue/ Nuxt.js Portfolio created by Cameron",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://weather.cameronrdesign.com" },
        { property: "og:locale", content: "en_US" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;400;600&display=swap",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/image"],
  css: ["~/assets/scss/main.scss"],
  // Used to access env variables
  runtimeConfig: {
    // Private keys that are exposed to the server
    // Public keys that are exposed to the client
    public: {
      OPENWEATHER_API: process.env.OPENWEATHER_API as string,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
