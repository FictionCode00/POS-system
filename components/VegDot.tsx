import { View } from "react-native";
import { colors } from "@/constants/theme";

// FSSAI veg/non-veg mark — always top-left of a product (per spec).
// Bordered square with a centered filled dot.
export function VegDot({ isVeg, size = 13 }: { isVeg: boolean; size?: number }) {
  const tint = isVeg ? colors.veg : colors.nonveg;
  const dot = Math.round(size * 0.42);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 3,
        borderWidth: 1.5,
        borderColor: tint,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: dot,
          height: dot,
          borderRadius: 999,
          backgroundColor: tint,
        }}
      />
    </View>
  );
}
