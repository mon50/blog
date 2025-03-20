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
        primary: "#3b82f6", // Blue-500
        secondary: "#f59e0b", // Amber-500
        accent: "#10b981", // Emerald-500
        dark: "#1f2937", // Gray-800
        light: "#f9fafb", // Gray-50
        gadget: {
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
          },
          yellow: {
            50: "#fefce8",
            100: "#fef9c3",
            200: "#fef08a",
            300: "#fde047",
            400: "#facc15",
            500: "#eab308",
            600: "#ca8a04",
            700: "#a16207",
            800: "#854d0e",
            900: "#713f12",
          },
          red: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-mplus-rounded)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1f2937", // Gray-800
            maxWidth: "100ch",
            a: {
              color: "#2563eb", // Blue-600
              "&:hover": {
                color: "#1d4ed8", // Blue-700
              },
              textDecoration: "none",
              fontWeight: "500",
            },
            h1: {
              fontWeight: "800",
              color: "#1f2937", // Gray-800
            },
            h2: {
              fontWeight: "700",
              color: "#1f2937", // Gray-800
              borderBottom: "1px solid #e5e7eb", // Gray-200
              paddingBottom: "0.5rem",
              marginTop: "2em",
            },
            h3: {
              fontWeight: "600",
              color: "#1f2937", // Gray-800
              marginTop: "1.5em",
            },
            h4: {
              fontWeight: "600",
              color: "#1f2937", // Gray-800
            },
            blockquote: {
              fontWeight: "500",
              fontStyle: "italic",
              color: "#4b5563", // Gray-600
              borderLeftColor: "#3b82f6", // Blue-500
              borderLeftWidth: "0.25rem",
              borderRadius: "0.125rem",
              backgroundColor: "#f3f4f6", // Gray-100
              padding: "1rem 1.5rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            code: {
              color: "#ef4444", // Red-500
              backgroundColor: "#f3f4f6", // Gray-100
              borderRadius: "0.25rem",
              paddingLeft: "0.25rem",
              paddingRight: "0.25rem",
              paddingTop: "0.125rem",
              paddingBottom: "0.125rem",
              fontWeight: "500",
            },
            pre: {
              color: "#e5e7eb", // Gray-200
              backgroundColor: "#1f2937", // Gray-800
              borderRadius: "0.375rem",
              border: "1px solid #374151", // Gray-700
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            },
            "pre code": {
              color: "inherit",
              backgroundColor: "transparent",
              padding: "0",
            },
            "ol > li::marker": {
              color: "#6b7280", // Gray-500
              fontWeight: "600",
            },
            "ul > li::marker": {
              color: "#6b7280", // Gray-500
            },
            strong: {
              color: "#111827", // Gray-900
              fontWeight: "600",
            },
            hr: {
              borderColor: "#e5e7eb", // Gray-200
              marginTop: "2.5rem",
              marginBottom: "2.5rem",
            },
            table: {
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            },
            thead: {
              borderBottomColor: "#e5e7eb", // Gray-200
            },
            "tbody tr": {
              borderBottomColor: "#f3f4f6", // Gray-100
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontSize: "2.25rem",
            },
            h2: {
              fontSize: "1.875rem",
            },
            h3: {
              fontSize: "1.5rem",
            },
            h4: {
              fontSize: "1.25rem",
            },
          },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
export default config;
