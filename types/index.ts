// Domain types for the POS Terminal.
// Shaped to map cleanly onto a future Node.js + MongoDB API.

/** A menu item that can be sold. Prices are in whole rupees (INR). */
export interface Product {
  _id: string;
  name: string;
  /** Unit price in rupees (₹). Not paise. */
  price: number;
  category: ProductCategory;
  imageUrl?: string;
  /** Fallback glyph key when no imageUrl is present. See `lib/icons`. */
  icon?: ProductIcon;
  /** Combined GST rate, e.g. 0.05 for 5% (split 2.5% CGST + 2.5% SGST). */
  taxRate: number;
  sku?: string;
  isVeg: boolean;
  /** Optional stock signal used for the "low stock" warning chip. */
  stock?: number;
}

/** A line in the current order. Quantity + a price snapshot taken at add time. */
export interface CartItem {
  productId: string;
  qty: number;
  /** Snapshot of the product price at the moment it was added to the cart. */
  priceAtAdd: number;
}

/** Derived bill, computed from CartItem[] + Product lookup — never stored. */
export interface BillTotals {
  itemCount: number;
  qtyCount: number;
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
}

export type ProductCategory =
  | "Coffee"
  | "Pastries"
  | "Main Course"
  | "Cold Drinks"
  | "Snacks";

export type ProductIcon =
  | "coffee"
  | "croissant"
  | "leaf"
  | "dosa"
  | "cake"
  | "cup";

export type PaymentMethod = "cash" | "upi" | "qr";

/** The four primary nav destinations shared across tablet rail + phone tab bar. */
export type NavDestination = "pos" | "orders" | "inventory" | "admin";
