import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))"
      },
      borderRadius: {
        xl: "var(--radius)",
        lg: "calc(var(--radius) - 2px)",
        md: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34, 211, 238, 0.15), 0 12px 40px rgba(14, 165, 255, 0.15)",
        neon: "0 0 24px rgba(192, 132, 252, 0.35)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(14,165,255,0.18), transparent 32%), linear-gradient(120deg, rgba(2,6,23,1), rgba(15,23,42,0.95))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 1px rgba(34, 211, 238, 0.15), 0 12px 40px rgba(14, 165, 255, 0.12)" },
          "50%": { boxShadow: "0 0 0 1px rgba(192, 132, 252, 0.25), 0 20px 48px rgba(192, 132, 252, 0.22)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "pulseGlow 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;