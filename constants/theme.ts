// Design tokens — Section 01 of the POS Terminal spec.
// Direction B · Dense Data-Forward · Coral Red accent.
// Mirrors tailwind.config.js so we have the same values available in JS
// (for SVG fills, shadow objects, and bottom-sheet config that can't take classes).

export const colors = {
  primary: {
    50: "#FFF2EF",
    100: "#FFE4DC",
    300: "#FF9980",
    600: "#FF5533",
    700: "#CC3311",
    ink: "#3D0A00",
    base: "#FF5533",
  },
  neutral: {
    white: "#FFFFFF",
    canvas: "#FAFAFD",
    surface: "#F4F4F9",
    line: "#ECECF3",
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
  // canvas behind the whole app shell on large screens
  appBg: "#E7E5DF",
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  "2xl": 20,
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
} as const;

// Elevation presets (e1 card · e2 raised · e3 sheet).
export const elevation = {
  e1: {
    shadowColor: "#141428",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  e2: {
    shadowColor: "#141428",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  e3: {
    shadowColor: "#141428",
    shadowOpacity: 0.16,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
} as const;

export const fonts = {
  regular: "SpaceGrotesk_400Regular",
  medium: "SpaceGrotesk_500Medium",
  semibold: "SpaceGrotesk_600SemiBold",
  bold: "SpaceGrotesk_700Bold",
  display: "BricolageGrotesque_700Bold",
  displaySemi: "BricolageGrotesque_600SemiBold",
} as const;

// GST is split evenly into central + state components in the spec (2.5% + 2.5%).
export const GST_SPLIT = 0.5;

export const BREAKPOINT = 768;
