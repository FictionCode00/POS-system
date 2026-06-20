import { useBreakpoint } from "@/hooks/useBreakpoint";
import { PosTabletView } from "@/components/pos/PosTabletView";
import { PosPhoneView } from "@/components/pos/PosPhoneView";

// POS Terminal — the cashier's primary workspace. Picks the tablet or phone
// layout; both read from the same Zustand cart store.
export default function PosTerminalScreen() {
  const { layout } = useBreakpoint();
  return layout === "tablet" ? <PosTabletView /> : <PosPhoneView />;
}
