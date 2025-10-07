import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D776C",
        accent: "#3DBA99",
        muted: "#F4F5F7"
      }
    }
  },
  plugins: []
} satisfies Config;
