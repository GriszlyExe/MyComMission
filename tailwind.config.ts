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
                    "primary-content": "#E53888",
                    "base-200": "#DF0F70",
                    "secondary-content": "rgb(243, 113, 153)",
                    "base-300": "#EFA1B8",
                    primary: "rgb(229, 56, 136)",
                    // secondary: "rgb(243, 113, 153)",
                    secondary: "#FFBACF",
                    accent: "#790055",
                    neutral: "#272136",
                    "base-100": "#ffffff",
                    info: "#778ad4",
                    success: "#23b893",
                    warning: "#f79926",
                    error: "#ea535a",
                    body: {
                        "background-color": "#ffffff",
                    },
                    chat: {

                    }
                },
            },
        ],
    },
} satisfies Config;