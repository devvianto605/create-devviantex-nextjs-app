import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

export const H_NAVBAR = "96px";
const customHeight = {
  navbar: `${H_NAVBAR}`,
  "screen-excl-navbar": `calc(100vh - ${H_NAVBAR})`,
  "screen-code-content": `calc(100vh - ${H_NAVBAR} - 124px )`,
};

const customWidth = {};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          // 50: "hsl(var(--primary-50))",
          // 100: "hsl(var(--primary-100))",
          // 200: "hsl(var(--primary-200))",
          // 300: "hsl(var(--primary-300))",
          // 400: "hsl(var(--primary-400))",
          // 500: "hsl(var(--primary-500))",
          // 600: "hsl(var(--primary-600))",
          // 700: "hsl(var(--primary-700))",
          // 800: "hsl(var(--primary-800))",
          // 900: "hsl(var(--primary-900))",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          // 50: "hsl(var(--secondary-50))",
          // 100: "hsl(var(--secondary-100))",
          // 200: "hsl(var(--secondary-200))",
          // 300: "hsl(var(--secondary-300))",
          // 400: "hsl(var(--secondary-400))",
          // 500: "hsl(var(--secondary-500))",
          // 600: "hsl(var(--secondary-600))",
          // 700: "hsl(var(--secondary-700))",
          // 800: "hsl(var(--secondary-800))",
          // 900: "hsl(var(--secondary-900))",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          // 50: "hsl(var(--destructive-50))",
          // 100: "hsl(var(--destructive-100))",
          // 200: "hsl(var(--destructive-200))",
          // 300: "hsl(var(--destructive-300))",
          // 400: "hsl(var(--destructive-400))",
          // 500: "hsl(var(--destructive-500))",
          // 600: "hsl(var(--destructive-600))",
          // 700: "hsl(var(--destructive-700))",
          // 800: "hsl(var(--destructive-800))",
          // 900: "hsl(var(--destructive-900))",
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          // 50: "hsl(var(--muted-50))",
          // 100: "hsl(var(--muted-100))",
          // 200: "hsl(var(--muted-200))",
          // 300: "hsl(var(--muted-300))",
          // 400: "hsl(var(--muted-400))",
          // 500: "hsl(var(--muted-500))",
          // 600: "hsl(var(--muted-600))",
          // 700: "hsl(var(--muted-700))",
          // 800: "hsl(var(--muted-800))",
          // 900: "hsl(var(--muted-900))",
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          // 50: "hsl(var(--accent-50))",
          // 100: "hsl(var(--accent-100))",
          // 200: "hsl(var(--accent-200))",
          // 300: "hsl(var(--accent-300))",
          // 400: "hsl(var(--accent-400))",
          // 500: "hsl(var(--accent-500))",
          // 600: "hsl(var(--accent-600))",
          // 700: "hsl(var(--accent-700))",
          // 800: "hsl(var(--accent-800))",
          // 900: "hsl(var(--accent-900))",
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      minHeight: {
        ...customHeight,
      },
      maxHeight: {
        ...customHeight,
      },
      height: {
        ...customHeight,
      },
      minWidth: {
        ...customHeight,
      },
      maxWidth: {
        ...customHeight,
      },
      width: {
        ...customWidth,
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".center": {
          "@apply flex justify-center items-center": {},
        },
      });
    }),
  ],
} satisfies Config;

export default config;
