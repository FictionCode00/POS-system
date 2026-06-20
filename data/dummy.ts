import type { Product, ProductCategory } from "@/types";

// Ordered list of categories — drives the pill bar.
export const CATEGORIES: ProductCategory[] = [
  "Coffee",
  "Pastries",
  "Main Course",
  "Cold Drinks",
  "Snacks",
];

// ~14 products across the menu, realistic INR pricing, 5% combined GST.
export const PRODUCTS: Product[] = [
  // ── Coffee ──────────────────────────────────────────────
  { _id: "p_filter", name: "Filter Coffee", price: 120, category: "Coffee", icon: "coffee", taxRate: 0.05, isVeg: true, sku: "COF-001" },
  { _id: "p_capp", name: "Cappuccino", price: 180, category: "Coffee", icon: "coffee", taxRate: 0.05, isVeg: true, sku: "COF-002" },
  { _id: "p_flat", name: "Flat White", price: 190, category: "Coffee", icon: "coffee", taxRate: 0.05, isVeg: true, sku: "COF-003" },
  { _id: "p_mocha", name: "Mocha", price: 210, category: "Coffee", icon: "coffee", taxRate: 0.05, isVeg: true, sku: "COF-004" },
  { _id: "p_esp", name: "Espresso", price: 110, category: "Coffee", icon: "coffee", taxRate: 0.05, isVeg: true, sku: "COF-005" },
  { _id: "p_chai", name: "Masala Chai", price: 90, category: "Coffee", icon: "leaf", taxRate: 0.05, isVeg: true, sku: "COF-006" },

  // ── Cold Drinks ─────────────────────────────────────────
  { _id: "p_coldbrew", name: "Cold Brew", price: 220, category: "Cold Drinks", icon: "cup", taxRate: 0.05, isVeg: true, sku: "CLD-001", stock: 6 },
  { _id: "p_iced", name: "Iced Latte", price: 200, category: "Cold Drinks", icon: "cup", taxRate: 0.05, isVeg: true, sku: "CLD-002" },
  { _id: "p_lime", name: "Fresh Lime Soda", price: 80, category: "Cold Drinks", icon: "cup", taxRate: 0.05, isVeg: true, sku: "CLD-003" },

  // ── Pastries ────────────────────────────────────────────
  { _id: "p_croissant", name: "Butter Croissant", price: 150, category: "Pastries", icon: "croissant", taxRate: 0.05, isVeg: true, sku: "PAS-001" },
  { _id: "p_muffin", name: "Chocolate Muffin", price: 140, category: "Pastries", icon: "cake", taxRate: 0.05, isVeg: true, sku: "PAS-002" },
  { _id: "p_danish", name: "Almond Danish", price: 160, category: "Pastries", icon: "croissant", taxRate: 0.05, isVeg: true, sku: "PAS-003" },

  // ── Main Course ─────────────────────────────────────────
  { _id: "p_dosa", name: "Masala Dosa", price: 160, category: "Main Course", icon: "dosa", taxRate: 0.05, isVeg: true, sku: "MAI-001" },
  { _id: "p_thali", name: "Veg Thali", price: 260, category: "Main Course", icon: "dosa", taxRate: 0.05, isVeg: true, sku: "MAI-002", stock: 4 },

  // ── Snacks ──────────────────────────────────────────────
  { _id: "p_samosa", name: "Samosa (2 pcs)", price: 60, category: "Snacks", icon: "cake", taxRate: 0.05, isVeg: true, sku: "SNK-001" },
  { _id: "p_sandwich", name: "Chicken Sandwich", price: 180, category: "Snacks", icon: "cake", taxRate: 0.05, isVeg: false, sku: "SNK-002" },
];

// Quick id → product lookup for derived cart totals.
export const PRODUCT_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p._id, p]),
);
