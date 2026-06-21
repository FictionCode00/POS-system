import { useState } from "react";
import { Text, View } from "react-native";
import { SearchBar } from "@/components/SearchBar";
import { CategoryPills } from "@/components/CategoryPills";
import { ProductGrid } from "@/components/ProductGrid";
import { FloatingCartPill } from "@/components/FloatingCartPill";
import { CartSheet } from "@/components/CartSheet";
import { OutletSwitcher } from "@/components/OutletSwitcher";
import { colors } from "@/constants/theme";

export function PosPhoneView() {
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Pinned header */}
      <View style={{ paddingHorizontal: 18, paddingTop: 6, paddingBottom: 12, gap: 12 }}>
        {/* Title + outlet chip (left column) · avatar (right) — matches design 7.3/7.4 */}
        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={{ fontFamily: "BricolageGrotesque_700Bold", fontSize: 21, color: colors.neutral.ink }}>
              Menu
            </Text>
            {/* Outlet chip sits directly below the title; its dropdown pushes content down */}
            <View style={{ alignSelf: "flex-start" }}>
              <OutletSwitcher />
            </View>
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
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
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search dishes…" variant="lg" />
        <CategoryPills variant="lg" />
      </View>

      {/* 2-col scrolling grid */}
      <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 4 }}>
        <ProductGrid variant="lg" searchQuery={query} />
      </View>

      <FloatingCartPill onPress={() => setCartOpen(true)} bottom={12} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </View>
  );
}
