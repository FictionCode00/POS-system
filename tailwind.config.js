/** @type {import('tailwindcss').Config} */
// Design tokens mirror `constants/theme.ts` and Section 01 of the design spec
// (Direction B · Dense Data-Forward · Coral Red accent).
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF2EF",
          100: "#FFE4DC",
          300: "#FF9980",
          600: "#FF5533",
          700: "#CC3311",
          ink: "#3D0A00",
          DEFAULT: "#FF5533",
        },
        neutral: {
          white: "#FFFFFF",
          canvas: "#FAFAFD",
          surface: "#F4F4F9",
          line: "#ECECF3",
          // softer hairline variants used across cards/dividers in the spec
          hair: "#F0F0F5",
          border: "#EAEAF1",
          stroke: "#E4E4ED",
          edge: "#E8E8EE",
          muted: "#9A9AA8",
          body: "#6A6A78",
          ink: "#1A1A22",
        },
        status: {
          success: "#16A34A",
          warning: "#D97706",
          danger: "#DC2626",
        },
        veg: "#22A65A",
        nonveg: "#C53A2B",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "14px",
        xl: "16px",
        "2xl": "20px",
      },
      fontFamily: {
        sans: ["SpaceGrotesk_400Regular"],
        medium: ["SpaceGrotesk_500Medium"],
        semibold: ["SpaceGrotesk_600SemiBold"],
        bold: ["SpaceGrotesk_700Bold"],
        display: ["BricolageGrotesque_700Bold"],
        "display-semi": ["BricolageGrotesque_600SemiBold"],
      },
    },
  },
  plugins: [],
};
