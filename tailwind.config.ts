import type { Config } from "tailwindcss";
import daisyui from "daisyui"
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui, plugin(({ addUtilities }) => {
    addUtilities({
      /* Chrome, Safari and Opera */
      ".scrollbar-hidden::-webkit-scrollbar": {
        display: "none",
      },

      ".scrollbar-hidden": {
        "scrollbar-width": "none" /* Firefox */,
        "-ms-overflow-style": "none" /* IE and Edge */,
      },
    })
  }),],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#5e548e",
          secondary: "#5e548e",
          accent: "#231942",
          neutral: "#272136",
          "base-100": "#ffffff",
          "base-200": "#231942",
          "base-300": "#ffffff",
          info: "#778ad4",
          success: "#23b893",
          warning: "#f79926",
          error: "#ea535a",
          body: {
            "background-color": "#ffffff",
          },
        },
      },
    ],
  },
} satisfies Config;
