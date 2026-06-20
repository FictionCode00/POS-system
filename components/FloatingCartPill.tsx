import { Pressable, Text, View } from "react-native";
import { MotiView } from "moti";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { rupeesShort } from "@/lib/format";
import { computeTotals, useCartStore } from "@/store/cartStore";

interface Props {
  onPress: () => void;
  bottom?: number;
}

// Phone: collapsed cart. A floating pill above the tab bar summarising count +
// total. Scales in when the first item lands; the chevron hints it expands into
// the bottom sheet. Renders nothing while the cart is empty.
export function FloatingCartPill({ onPress, bottom = 90 }: Props) {
  const items = useCartStore((s) => s.items);
  const totals = computeTotals(items);
  if (items.length === 0) return null;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.92, translateY: 8 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 16, stiffness: 220 }}
      style={{ position: "absolute", left: 16, right: 16, bottom }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          backgroundColor: colors.primary.ink,
          borderRadius: 18,
          paddingVertical: 14,
          paddingHorizontal: 18,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: pressed ? 0.92 : 1,
          shadowColor: "#1A1633",
          shadowOpacity: 0.34,
          shadowRadius: 28,
          shadowOffset: { width: 0, height: 12 },
          elevation: 10,
        })}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 11 }}>
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 11,
              backgroundColor: colors.primary[600],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="bag" size={18} color={colors.neutral.white} strokeWidth={1.8} />
          </View>
          <View>
            <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 14.5, color: colors.neutral.white }}>
              {totals.itemCount} items · {totals.qtyCount} qty
            </Text>
            <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12, color: "#C9A99E" }}>
              Tap to review &amp; pay
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ fontFamily: "SpaceGrotesk_700Bold", fontSize: 18, color: colors.neutral.white }}>
            {rupeesShort(totals.total)}
          </Text>
          <Icon name="chevron-up" size={18} color={colors.primary[300]} strokeWidth={2.4} />
        </View>
      </Pressable>
    </MotiView>
  );
}
