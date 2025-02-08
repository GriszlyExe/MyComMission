import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#9f86c0",
          secondary: "#f4f4a1",
          accent: "#1be885",
          neutral: "#272136",
          "base-100": "#ffffff",
          "base-200": "#5e548e",
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
