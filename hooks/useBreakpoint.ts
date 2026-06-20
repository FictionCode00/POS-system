import { useWindowDimensions } from "react-native";
import { BREAKPOINT } from "@/constants/theme";

export type Layout = "tablet" | "phone";

/**
 * Single source of truth for the responsive split.
 * Threshold at 768px width (matches NativeWind's `md` and the design spec):
 * ≥768 → tablet (counter, 3-column zero-scroll shell)
 * <768 → phone  (handheld, collapsible cart)
 */
export function useBreakpoint(): { layout: Layout; width: number; height: number } {
  const { width, height } = useWindowDimensions();
  return {
    layout: width >= BREAKPOINT ? "tablet" : "phone",
    width,
    height,
  };
}
