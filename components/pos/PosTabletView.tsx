import { useState } from "react";
import { Text, View } from "react-native";
import { SearchBar } from "@/components/SearchBar";
import { CategoryPills } from "@/components/CategoryPills";
import { ProductGrid } from "@/components/ProductGrid";
import { CartPanel } from "@/components/CartPanel";
import { OutletSwitcher } from "@/components/OutletSwitcher";
import { colors } from "@/constants/theme";
import { useCartStore } from "@/store/cartStore";

export function PosTabletView() {
  const [query, setQuery] = useState("");
  const hasItems = useCartStore((s) => s.items.length > 0);

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* Center column */}
      <View style={{ flex: 1, minWidth: 0 }}>
        {/* Pinned header */}
        <View
          style={{
            paddingHorizontal: 22,
            paddingTop: 16,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.neutral.hair,
            gap: 14,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <OutletSwitcher />
            <View style={{ flex: 1 }}>
              <SearchBar value={query} onChangeText={setQuery} />
            </View>
            <MetaChip label="Table" value="12" />
            {hasItems ? <MetaChip label="KOT" value="#4821" /> : null}
          </View>
          <CategoryPills />
        </View>

        {/* Internally-scrolling product grid */}
        <View style={{ flex: 1, paddingHorizontal: 22, paddingTop: 14 }}>
          <ProductGrid searchQuery={query} />
        </View>
      </View>

      {/* Persistent cart */}
      <CartPanel />
    </View>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: colors.neutral.white,
        borderWidth: 1,
        borderColor: colors.neutral.edge,
        borderRadius: 12,
        paddingVertical: 9,
        paddingHorizontal: 14,
      }}
    >
      <Text
        style={{
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: 11,
          color: colors.neutral.muted,
          textTransform: "uppercase",
          letterSpacing: 0.9,
        }}
      >
        {label}
      </Text>
      <Text style={{ fontFamily: "SpaceGrotesk_700Bold", fontSize: 15, color: colors.neutral.ink }}>
        {value}
      </Text>
    </View>
  );
}
