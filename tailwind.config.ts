import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#05081B",
          900: "#070C28",
          850: "#0B1236",
          800: "#111A4B"
        },
        ember: {
          300: "#FF6A6A",
          500: "#B4141B",
          600: "#7A0D12"
        },
        auric: {
          400: "#F6C56F",
          500: "#FFBF5A"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(180,20,27,.18), 0 0 64px rgba(180,20,27,.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
