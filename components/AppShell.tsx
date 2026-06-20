import type { ReactNode } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { TabletShell } from "@/components/shells/TabletShell";
import { PhoneShell } from "@/components/shells/PhoneShell";

// One shell, two genuinely different layouts sharing the same store. The split
// is driven entirely by `useBreakpoint()` (threshold 768px).
export function AppShell({ children }: { children: ReactNode }) {
  const { layout } = useBreakpoint();
  return layout === "tablet" ? (
    <TabletShell>{children}</TabletShell>
  ) : (
    <PhoneShell>{children}</PhoneShell>
  );
}
