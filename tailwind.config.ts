import type { Config } from "tailwindcss";

/**
 * Colours are declared as raw RGB channels in `app/globals.css` so that
 * Tailwind's alpha modifiers keep working (`text-ink/60`, `border-line/10`).
 * Type sizes come from the fluid clamp() scale defined alongside them.
 */
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "rgb(var(--canvas) / <alpha-value>)",
          raised: "rgb(var(--canvas-raised) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        line: "rgb(var(--line) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        label: ["var(--step--2)", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        sm: ["var(--step--1)", { lineHeight: "1.6" }],
        base: ["var(--step-0)", { lineHeight: "1.65" }],
        lead: ["var(--step-1)", { lineHeight: "1.5" }],
        h3: ["var(--step-2)", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h2: ["var(--step-3)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        h1: ["var(--step-4)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        display: [
          "var(--step-5)",
          { lineHeight: "0.95", letterSpacing: "-0.04em" },
        ],
      },
      maxWidth: {
        shell: "var(--shell)",
        prose: "68ch",
      },
      spacing: {
        gutter: "var(--gutter)",
        section: "var(--section-gap)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        /* Slow ambient drift for the hero mesh — cheap, compositor-only. */
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%,-4%,0) scale(1.12)" },
        },
      },
      animation: {
        "marquee-x": "marquee-x 40s linear infinite",
        drift: "drift 22s ease-in-out infinite",
        "drift-slow": "drift 34s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
} satisfies Config;
