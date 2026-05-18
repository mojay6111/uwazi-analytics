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
        background: "#0a0f1e",
        card: "#111827",
        "card-border": "#1e293b",
        primary: {
          DEFAULT: "#10b981",
          dark: "#059669",
        },
        accent: "#3b82f6",
        danger: "#ef4444",
        warning: "#f59e0b",
        muted: "#6b7280",
      },
    },
  },
  plugins: [],
};

export default config;
