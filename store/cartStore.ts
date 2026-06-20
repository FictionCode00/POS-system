import { create } from "zustand";
import type {
  BillTotals,
  CartItem,
  PaymentMethod,
  Product,
  ProductCategory,
} from "@/types";
import { PRODUCT_MAP } from "@/data/dummy";
import { GST_SPLIT } from "@/constants/theme";

interface CartState {
  items: CartItem[];
  activeCategory: ProductCategory;
  payment: PaymentMethod | null;

  addItem: (product: Product) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  setCategory: (category: ProductCategory) => void;
  setPayment: (method: PaymentMethod) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  activeCategory: "Coffee",
  payment: "cash", // Cash is pre-highlighted once the cart has items (per spec 2.2)

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === product._id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === product._id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { productId: product._id, qty: 1, priceAtAdd: product.price },
        ],
      };
    }),

  increment: (productId) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, qty: i.qty + 1 } : i,
      ),
    })),

  decrement: (productId) =>
    set((state) => ({
      // Drops to zero → row is removed.
      items: state.items
        .map((i) => (i.productId === productId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  clear: () => set({ items: [] }),

  setCategory: (category) => set({ activeCategory: category }),

  setPayment: (method) => set({ payment: method }),
}));

/**
 * Derive the bill from cart items + the product lookup.
 * Totals are computed, never stored (per spec). Rupee math, rounded to paise.
 */
export function computeTotals(items: CartItem[]): BillTotals {
  let subtotal = 0;
  let tax = 0;
  let qtyCount = 0;

  for (const item of items) {
    const product = PRODUCT_MAP[item.productId];
    const rate = product?.taxRate ?? 0;
    const line = item.priceAtAdd * item.qty;
    subtotal += line;
    tax += line * rate;
    qtyCount += item.qty;
  }

  const cgst = round2(tax * GST_SPLIT);
  const sgst = round2(tax * GST_SPLIT);
  const sub = round2(subtotal);

  return {
    itemCount: items.length,
    qtyCount,
    subtotal: sub,
    cgst,
    sgst,
    total: round2(sub + cgst + sgst),
  };
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** Quantity in cart for a given product (0 if absent). Used for card badges. */
export function selectQty(productId: string) {
  return (state: CartState) =>
    state.items.find((i) => i.productId === productId)?.qty ?? 0;
}
