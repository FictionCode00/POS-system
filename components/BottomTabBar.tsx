import { Pressable, Text, View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { NAV_ITEMS, destForPath } from "@/lib/nav";

// Phone: the icon rail becomes a bottom tab bar with the same 4 destinations.
export function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeDest = destForPath(pathname);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: colors.neutral.line,
        backgroundColor: colors.neutral.white,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        paddingTop: 11,
        paddingHorizontal: 8,
        paddingBottom: Math.max(insets.bottom, 8),
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.dest === activeDest;
        const tint = isActive ? colors.primary[600] : colors.neutral.muted;
        return (
          <Pressable
            key={item.dest}
            onPress={() => router.navigate(item.href as never)}
            style={{ alignItems: "center", gap: 4, minWidth: 56 }}
          >
            <Icon name={item.icon} size={23} color={tint} strokeWidth={1.9} />
            <Text
              style={{
                fontFamily: isActive ? "SpaceGrotesk_600SemiBold" : "SpaceGrotesk_500Medium",
                fontSize: 10.5,
                color: tint,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
