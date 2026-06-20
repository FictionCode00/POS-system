import * as React from "react";
import Svg, { Path, Rect, Circle, G } from "react-native-svg";

// One consistent line-icon set (Lucide/Phosphor style, uniform stroke weight),
// reproducing the inline SVGs from the design spec.

export type IconName =
  // nav
  | "grid"
  | "receipt"
  | "box"
  | "sliders"
  // actions
  | "search"
  | "plus"
  | "minus"
  | "arrow-right"
  | "chevron-up"
  | "chevron-down"
  | "check"
  | "bag"
  // payment
  | "cash"
  | "phone"
  | "qr"
  // product glyphs
  | "coffee"
  | "cup"
  | "leaf"
  | "dosa"
  | "croissant"
  | "cake";

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 22,
  color = "currentColor",
  strokeWidth = 1.8,
}: IconProps) {
  const common = {
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G {...common}>{renderPaths(name)}</G>
    </Svg>
  );
}

function renderPaths(name: IconName): React.ReactNode {
  switch (name) {
    case "grid":
      return (
        <>
          <Rect x="3" y="3" width="7" height="7" rx="1.5" />
          <Rect x="14" y="3" width="7" height="7" rx="1.5" />
          <Rect x="3" y="14" width="7" height="7" rx="1.5" />
          <Rect x="14" y="14" width="7" height="7" rx="1.5" />
        </>
      );
    case "receipt":
      return (
        <>
          <Path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
          <Path d="M9 8h6M9 12h6" />
        </>
      );
    case "box":
      return (
        <>
          <Path d="M3 8 12 3l9 5v8l-9 5-9-5V8Z" />
          <Path d="M3 8l9 5 9-5M12 13v8" />
        </>
      );
    case "sliders":
      return (
        <>
          <Path d="M4 6h8M16 6h4M4 12h2M10 12h10M4 18h8M16 18h4" />
          <Circle cx="14" cy="6" r="2" />
          <Circle cx="8" cy="12" r="2" />
          <Circle cx="14" cy="18" r="2" />
        </>
      );
    case "search":
      return (
        <>
          <Circle cx="11" cy="11" r="7" />
          <Path d="m21 21-4.3-4.3" />
        </>
      );
    case "plus":
      return <Path d="M12 5v14M5 12h14" />;
    case "minus":
      return <Path d="M5 12h14" />;
    case "arrow-right":
      return <Path d="M5 12h14M13 6l6 6-6 6" />;
    case "chevron-up":
      return <Path d="m6 15 6-6 6 6" />;
    case "chevron-down":
      return <Path d="m6 9 6 6 6-6" />;
    case "check":
      return <Path d="M20 6 9 17l-5-5" />;
    case "bag":
      return (
        <>
          <Path d="M6 8h12l-1 12H7L6 8Z" />
          <Path d="M9 8a3 3 0 0 1 6 0" />
        </>
      );
    case "cash":
      return (
        <>
          <Rect x="2" y="6" width="20" height="12" rx="2" />
          <Circle cx="12" cy="12" r="2.5" />
        </>
      );
    case "phone":
      return (
        <>
          <Rect x="7" y="3" width="10" height="18" rx="2" />
          <Path d="M11 18h2" />
        </>
      );
    case "qr":
      return (
        <>
          <Rect x="3" y="3" width="7" height="7" rx="1" />
          <Rect x="14" y="3" width="7" height="7" rx="1" />
          <Rect x="3" y="14" width="7" height="7" rx="1" />
          <Path d="M14 14h3v3" />
        </>
      );
    case "coffee":
      return (
        <>
          <Path d="M4 9h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
          <Path d="M17 10h2a2.5 2.5 0 0 1 0 5h-2" />
        </>
      );
    case "cup":
      return (
        <>
          <Path d="M6 8h12l-1.2 11a1 1 0 0 1-1 1H8.2a1 1 0 0 1-1-1L6 8Z" />
          <Path d="M9 8 8 3M15 8l1-5" />
        </>
      );
    case "leaf":
      return (
        <>
          <Path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 9-5 16-9 16Z" />
          <Path d="M11 13c2-3 5-4 8-5" />
        </>
      );
    case "dosa":
      return (
        <>
          <Path d="M3 11h18a9 9 0 0 1-18 0Z" />
          <Path d="M7 11a5 5 0 0 1 10 0" />
        </>
      );
    case "croissant":
      return <Path d="M4 20h16M5 20l3-12 8 3-2 9" />;
    case "cake":
      return (
        <>
          <Path d="M6 11h12l-1 9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1l-1-9Z" />
          <Path d="M6 11a6 6 0 0 1 12 0" />
        </>
      );
    default:
      return null;
  }
}
