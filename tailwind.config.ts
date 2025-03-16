import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        dark: "#2d3748",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#333",
            a: {
              color: "#3490dc",
              "&:hover": {
                color: "#2779bd",
              },
            },
            h2: {
              fontWeight: "700",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "0.5rem",
            },
            h3: {
              fontWeight: "600",
            },
            blockquote: {
              borderLeftColor: "#3490dc",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
