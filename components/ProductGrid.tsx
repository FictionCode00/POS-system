import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { PRODUCTS } from "@/data/dummy";
import { useCartStore } from "@/store/cartStore";

interface Props {
  variant?: "sm" | "lg";
  searchQuery?: string;
}

// Product grid that scrolls *inside its own fixed container* (the realistic
// "zero-scroll" behaviour). 4 columns on tablet, 2 on phone. Re-filters
// instantly on category switch or search.
export function ProductGrid({ variant = "sm", searchQuery = "" }: Props) {
  const activeCategory = useCartStore((s) => s.activeCategory);
  const hasItems = useCartStore((s) => s.items.length > 0);
  const [containerW, setContainerW] = useState(0);

  const cols = variant === "lg" ? 2 : 4;
  const gap = variant === "lg" ? 13 : 12;

  // On phone the floating cart pill overlays the bottom of the grid when the
  // cart has items — pad the list so the last row's add buttons aren't hidden.
  const bottomPad = variant === "lg" && hasItems ? 96 : 16;

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = q ? true : p.category === activeCategory;
      const matchesQuery = q ? p.name.toLowerCase().includes(q) : true;
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const itemW =
    containerW > 0 ? (containerW - gap * (cols - 1)) / cols : undefined;

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(e) => setContainerW(e.nativeEvent.layout.width)}
    >
      {filtered.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: 24,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              backgroundColor: colors.primary[50],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="search" size={28} color={colors.primary[300]} />
          </View>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_500Medium",
              fontSize: 14,
              color: colors.neutral.muted,
            }}
          >
            No items match “{searchQuery}”
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottomPad }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap,
            }}
          >
            {itemW
              ? filtered.map((product) => (
                  <View key={product._id} style={{ width: itemW }}>
                    <ProductCard product={product} variant={variant} />
                  </View>
                ))
              : null}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
