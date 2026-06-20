import { Pressable, ScrollView, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { CATEGORIES, PRODUCTS } from "@/data/dummy";
import { useCartStore } from "@/store/cartStore";
import type { ProductCategory } from "@/types";

// Count of products per category — shown as a chip on each pill.
const COUNTS: Record<ProductCategory, number> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c] = PRODUCTS.filter((p) => p.category === c).length;
    return acc;
  },
  {} as Record<ProductCategory, number>,
);

interface Props {
  variant?: "sm" | "lg";
}

// Horizontal, pinned category bar. Active pill = coral fill + white text + a
// count chip in 25% white. Switching is instant (no transition); the grid
// re-filters underneath.
export function CategoryPills({ variant = "sm" }: Props) {
  const active = useCartStore((s) => s.activeCategory);
  const setCategory = useCartStore((s) => s.setCategory);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, alignItems: "center" }}
    >
      {CATEGORIES.map((category) => {
        const isActive = category === active;
        const count = COUNTS[category];
        return (
          <Pressable
            key={category}
            onPress={() => setCategory(category)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              paddingVertical: variant === "lg" ? 9 : 8,
              paddingHorizontal: variant === "lg" ? 16 : 15,
              borderRadius: variant === "lg" ? 11 : 10,
              backgroundColor: isActive ? colors.primary[600] : colors.neutral.surface,
            }}
          >
            <Text
              style={{
                fontFamily: isActive
                  ? "SpaceGrotesk_600SemiBold"
                  : "SpaceGrotesk_500Medium",
                fontSize: 13.5,
                color: isActive ? colors.neutral.white : "#5A5A68",
              }}
            >
              {category}
            </Text>
            {count > 0 ? (
              <View
                style={{
                  borderRadius: 6,
                  paddingVertical: 1,
                  paddingHorizontal: 7,
                  backgroundColor: isActive ? "rgba(255,255,255,0.25)" : "#E4E4ED",
                }}
              >
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_500Medium",
                    fontSize: 11.5,
                    color: isActive ? colors.neutral.white : colors.neutral.body,
                  }}
                >
                  {count}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
