import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        deepBlue: "#114B7E", // Name for #114B7E
        lightBlue: "#1F88E4", // Name for #1F88E4
        deepRed: "#770F2E", // Name for #770F2E
        brightRed: "#DD1C55", // Name for #DD1C55
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/typography")],
  darkMode: "class",
};
export default config;
