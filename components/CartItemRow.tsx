import { Text, View } from "react-native";
import { Icon } from "@/lib/icons";
import { Stepper } from "@/components/Stepper";
import { colors } from "@/constants/theme";
import { tintFor } from "@/lib/productVisuals";
import { rupees, rupeesShort } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import type { CartItem, Product } from "@/types";

interface Props {
  item: CartItem;
  product: Product;
  /** "sm" = tablet cart panel (compact), "lg" = phone sheet (with thumbnail). */
  variant?: "sm" | "lg";
}

// A single order line with a +/- incrementer. Compact on tablet; on phone it
// gains a glyph thumbnail and larger controls.
export function CartItemRow({ item, product, variant = "sm" }: Props) {
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const tint = tintFor(product.icon);
  const lineTotal = item.priceAtAdd * item.qty;

  if (variant === "lg") {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingVertical: 13,
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral.hair,
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            backgroundColor: tint.bg,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={product.icon ?? "coffee"} size={24} color={tint.fg} strokeWidth={1.6} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 15, color: colors.neutral.ink }}>
            {product.name}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12.5, color: colors.neutral.muted }}>
            {rupeesShort(item.priceAtAdd)} each
          </Text>
        </View>
        <Stepper
          qty={item.qty}
          variant="lg"
          onIncrement={() => increment(item.productId)}
          onDecrement={() => decrement(item.productId)}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral.hair,
      }}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 13.5, color: colors.neutral.ink }}>
          {product.name}
        </Text>
        <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 11.5, color: colors.neutral.muted }}>
          {rupeesShort(item.priceAtAdd)} × {item.qty}
        </Text>
      </View>
      <Stepper
        qty={item.qty}
        onIncrement={() => increment(item.productId)}
        onDecrement={() => decrement(item.productId)}
      />
      <Text
        style={{
          fontFamily: "SpaceGrotesk_700Bold",
          fontSize: 13.5,
          minWidth: 54,
          textAlign: "right",
          color: colors.neutral.ink,
        }}
      >
        {rupeesShort(lineTotal)}
      </Text>
    </View>
  );
}
