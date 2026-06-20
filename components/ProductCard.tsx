import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "@/lib/icons";
import { VegDot } from "@/components/VegDot";
import { colors } from "@/constants/theme";
import { tintFor } from "@/lib/productVisuals";
import { rupeesShort } from "@/lib/format";
import { useCartStore, selectQty } from "@/store/cartStore";
import type { Product } from "@/types";

interface Props {
  product: Product;
  variant?: "sm" | "lg"; // sm = tablet (4-up), lg = phone (2-up)
}

// Product card states: default / pressed (scales to 0.96) / in-cart (coral ring
// + qty badge + filled add button). On add it springs with a brief pulse.
export function ProductCard({ product, variant = "sm" }: Props) {
  const qty = useCartStore(selectQty(product._id));
  const addItem = useCartStore((s) => s.addItem);
  const inCart = qty > 0;
  const tint = tintFor(product.icon);

  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  // Pulse whenever the quantity ticks up (covers taps from anywhere).
  const prevQty = useSharedValue(qty);
  useEffect(() => {
    if (qty > prevQty.value) {
      scale.value = withSequence(
        withTiming(1.04, { duration: 120 }),
        withSpring(1, { damping: 12, stiffness: 220 }),
      );
    }
    prevQty.value = qty;
  }, [qty, prevQty, scale]);

  const tileRadius = variant === "lg" ? 11 : 9;
  const addBtn = variant === "lg" ? 34 : 26;
  const cardPad = variant === "lg" ? 11 : 9;

  return (
    <Animated.View style={[{ flex: 1 }, animStyle]}>
      <Pressable
        onPressIn={() => {
          scale.value = withTiming(0.96, { duration: 90 });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 120 });
        }}
        onPress={() => addItem(product)}
        style={{
          backgroundColor: colors.neutral.white,
          borderWidth: inCart ? 1.5 : 1,
          borderColor: inCart ? colors.primary[600] : colors.neutral.border,
          borderRadius: variant === "lg" ? 16 : 14,
          padding: cardPad,
          gap: variant === "lg" ? 9 : 8,
          ...(inCart
            ? {
                shadowColor: colors.primary[600],
                shadowOpacity: 0.13,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
              }
            : {
                shadowColor: "#141428",
                shadowOpacity: 0.04,
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 1 },
              }),
        }}
      >
        {/* Glyph tile */}
        <View
          style={{
            aspectRatio: variant === "lg" ? 1.3 : 1.5,
            borderRadius: tileRadius,
            backgroundColor: tint.bg,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            name={product.icon ?? "coffee"}
            size={variant === "lg" ? 34 : 30}
            color={tint.fg}
            strokeWidth={1.5}
          />
          {/* veg/non-veg dot, top-left */}
          <View style={{ position: "absolute", left: variant === "lg" ? 8 : 7, top: variant === "lg" ? 8 : 7 }}>
            <VegDot isVeg={product.isVeg} size={variant === "lg" ? 12 : 11} />
          </View>
          {/* qty badge, top-right (in-cart) */}
          {inCart ? (
            <View
              style={{
                position: "absolute",
                right: variant === "lg" ? 8 : 6,
                top: variant === "lg" ? 8 : 6,
                minWidth: variant === "lg" ? 22 : 20,
                height: variant === "lg" ? 22 : 20,
                borderRadius: 999,
                backgroundColor: colors.primary[600],
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: variant === "lg" ? 6 : 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_700Bold",
                  fontSize: variant === "lg" ? 12 : 11.5,
                  color: colors.neutral.white,
                }}
              >
                {qty}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Name */}
        <Text
          numberOfLines={1}
          style={{
            fontFamily: "SpaceGrotesk_600SemiBold",
            fontSize: variant === "lg" ? 14 : 13,
            color: colors.neutral.ink,
          }}
        >
          {product.name}
        </Text>

        {/* Price + add */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "SpaceGrotesk_700Bold",
              fontSize: variant === "lg" ? 15 : 14,
              color: colors.neutral.ink,
            }}
          >
            {rupeesShort(product.price)}
          </Text>
          <View
            style={{
              width: addBtn,
              height: addBtn,
              borderRadius: variant === "lg" ? 10 : 8,
              backgroundColor: inCart ? colors.primary[600] : colors.primary[50],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="plus"
              size={variant === "lg" ? 17 : 15}
              color={inCart ? colors.neutral.white : colors.primary[600]}
              strokeWidth={2.2}
            />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
