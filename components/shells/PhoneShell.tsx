import type { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBar } from "@/components/BottomTabBar";
import { colors } from "@/constants/theme";

// Phone shell: content fills the screen above a fixed bottom tab bar.
export function PhoneShell({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.neutral.white, paddingTop: insets.top }}>
      <View style={{ flex: 1, minHeight: 0 }}>{children}</View>
      <BottomTabBar />
    </View>
  );
}
