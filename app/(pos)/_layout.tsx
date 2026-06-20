import { Slot } from "expo-router";
import { AppShell } from "@/components/AppShell";

// Wraps the four destinations in the responsive shell (rail/tab bar).
export default function PosGroupLayout() {
  return (
    <AppShell>
      <Slot />
    </AppShell>
  );
}
