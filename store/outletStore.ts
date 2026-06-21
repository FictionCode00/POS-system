import { create } from "zustand";

export interface Outlet {
  id: string;
  name: string;
  address: string;
}

const OUTLETS: Outlet[] = [
  { id: "o1", name: "Downtown Café", address: "12 MG Road, Bengaluru" },
  { id: "o2", name: "Airport Kiosk", address: "Terminal 1, BLR Airport" },
  { id: "o3", name: "Mall Food Court", address: "2F, Phoenix Mall, Bengaluru" },
];

interface OutletState {
  outlets: Outlet[];
  activeOutlet: Outlet;
  setActiveOutlet: (id: string) => void;
}

export const useOutletStore = create<OutletState>((set, get) => ({
  outlets: OUTLETS,
  activeOutlet: OUTLETS[0],
  setActiveOutlet: (id) => {
    const outlet = get().outlets.find((o) => o.id === id);
    if (outlet) set({ activeOutlet: outlet });
  },
}));
