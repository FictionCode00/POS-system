import type { IconName } from "@/lib/icons";
import type { NavDestination } from "@/types";

export interface NavItem {
  dest: NavDestination;
  href: string;
  icon: IconName;
  label: string;
}

// The four primary destinations, shared by the tablet rail and phone tab bar.
// Only POS Terminal is fully built; the rest are route stubs.
export const NAV_ITEMS: NavItem[] = [
  { dest: "pos", href: "/", icon: "grid", label: "POS" },
  { dest: "orders", href: "/orders", icon: "receipt", label: "Orders" },
  { dest: "inventory", href: "/inventory", icon: "box", label: "Inventory" },
  { dest: "admin", href: "/admin", icon: "sliders", label: "Admin" },
];

/** Map the current pathname to a destination for active-state highlighting. */
export function destForPath(pathname: string): NavDestination {
  if (pathname === "/" || pathname === "") return "pos";
  if (pathname.startsWith("/orders")) return "orders";
  if (pathname.startsWith("/inventory")) return "inventory";
  if (pathname.startsWith("/admin")) return "admin";
  return "pos";
}
