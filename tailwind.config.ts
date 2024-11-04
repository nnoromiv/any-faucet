import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        default: "#000000",
        primary: "#ffffff"
      },
    },
  },
  plugins: [
    nextui(),
    nextui({
      themes: {
        light: {
          colors:  {
            default: "#000000"
          }
        }
      }
    }),
  ],
};
export default config;
