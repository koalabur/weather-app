/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "off-white": "#E4E6F5",
        "transparent-blue": "rgba(39, 65, 140, 0.5)",
      },
      fontFamily: {
        body: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
