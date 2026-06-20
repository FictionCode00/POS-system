import type { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconNavRail } from "@/components/IconNavRail";
import { colors } from "@/constants/theme";

// Tablet "zero-scroll shell": fixed icon rail + a content area that fills the
// rest. Chrome never moves; content scrolls inside its own containers.
export function TabletShell({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.neutral.white,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <IconNavRail />
      <View style={{ flex: 1, minWidth: 0 }}>{children}</View>
    </View>
  );
}
