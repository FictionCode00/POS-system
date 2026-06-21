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

// Mock CRM lookup: only this number resolves to a known customer.
const MOCK_CUSTOMERS: Record<string, { name: string; points: number }> = {
  "9999999999": { name: "Priya S.", points: 240 },
  "8888888888": { name: "Arjun M.", points: 90 },
};

interface CartState {
  items: CartItem[];
  activeCategory: ProductCategory;
  payment: PaymentMethod | null;

  // CRM / Loyalty
  customerPhone: string;
  customerName: string | null;
  loyaltyPoints: number | null;

  addItem: (product: Product) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  setCategory: (category: ProductCategory) => void;
  setPayment: (method: PaymentMethod) => void;

  setCustomerPhone: (phone: string) => void;
  lookupCustomer: () => void;
  clearCustomer: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  activeCategory: "Coffee",
  payment: "cash",

  customerPhone: "",
  customerName: null,
  loyaltyPoints: null,

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
      items: state.items
        .map((i) => (i.productId === productId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    })),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  clear: () =>
    set({
      items: [],
      customerPhone: "",
      customerName: null,
      loyaltyPoints: null,
    }),

  setCategory: (category) => set({ activeCategory: category }),

  setPayment: (method) => set({ payment: method }),

  setCustomerPhone: (phone) =>
    set({ customerPhone: phone, customerName: null, loyaltyPoints: null }),

  lookupCustomer: () => {
    const { customerPhone } = get();
    const match = MOCK_CUSTOMERS[customerPhone.trim()];
    if (match) {
      set({ customerName: match.name, loyaltyPoints: match.points });
    } else {
      set({ customerName: "", loyaltyPoints: null });
    }
  },

  clearCustomer: () =>
    set({ customerPhone: "", customerName: null, loyaltyPoints: null }),
}));

/**
 * Derive the bill from cart items + the product lookup.
 * Totals are computed, never stored. Rupee math, rounded to paise.
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
