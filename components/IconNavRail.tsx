import { Pressable, Text, View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { NAV_ITEMS, destForPath } from "@/lib/nav";
import { useCartStore } from "@/store/cartStore";

// Tablet: thin icon-only nav rail. Brand mark on top, four destinations,
// cashier avatar pinned to the bottom. Active destination = coral tile.
export function IconNavRail() {
  const router = useRouter();
  const pathname = usePathname();
  const activeDest = destForPath(pathname);
  const hasItems = useCartStore((s) => s.items.length > 0);

  return (
    <View
      style={{
        width: 72,
        backgroundColor: "#F7F7FB",
        borderRightWidth: 1,
        borderRightColor: colors.neutral.line,
        alignItems: "center",
        paddingVertical: 16,
        gap: 6,
      }}
    >
      {/* Brand mark */}
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: colors.primary[600],
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <Text style={{ fontFamily: "SpaceGrotesk_700Bold", fontSize: 17, color: colors.neutral.white }}>
          k
        </Text>
      </View>

      {NAV_ITEMS.map((item) => {
        const isActive = item.dest === activeDest;
        const showBadge = item.dest === "orders" && hasItems;
        return (
          <Pressable
            key={item.dest}
            onPress={() => router.navigate(item.href as never)}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: isActive ? colors.primary[600] : "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name={item.icon}
              size={21}
              color={isActive ? colors.neutral.white : colors.neutral.muted}
            />
            {showBadge ? (
              <View
                style={{
                  position: "absolute",
                  top: 8,
                  right: 10,
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: colors.status.danger,
                  borderWidth: 1.5,
                  borderColor: "#F7F7FB",
                }}
              />
            ) : null}
          </Pressable>
        );
      })}

      {/* Cashier avatar */}
      <View
        style={{
          marginTop: "auto",
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: colors.primary[100],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: "SpaceGrotesk_700Bold", fontSize: 13, color: colors.primary[600] }}>
          RA
        </Text>
      </View>
    </View>
  );
}
