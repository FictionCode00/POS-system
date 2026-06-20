import type { ProductIcon } from "@/types";

// Flat tinted icon tiles stand in for food photography (per the spec note).
// Each glyph gets a soft background + a muted line color.
const TINTS: Record<ProductIcon, { bg: string; fg: string }> = {
  coffee: { bg: "#FFF2EF", fg: "#E08163" },
  cup: { bg: "#FFF2EF", fg: "#E08163" },
  leaf: { bg: "#EAF3EC", fg: "#74B08A" },
  dosa: { bg: "#EAF3EC", fg: "#74B08A" },
  croissant: { bg: "#FBEFE9", fg: "#D09A7C" },
  cake: { bg: "#FBEFE9", fg: "#D09A7C" },
};

export function tintFor(icon: ProductIcon = "coffee") {
  return TINTS[icon] ?? TINTS.coffee;
}
