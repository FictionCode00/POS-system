import { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SearchBar } from "@/components/SearchBar";
import { CategoryPills } from "@/components/CategoryPills";
import { ProductGrid } from "@/components/ProductGrid";
import { FloatingCartPill } from "@/components/FloatingCartPill";
import { CartSheet } from "@/components/CartSheet";
import { OutletSwitcher } from "@/components/OutletSwitcher";
import { colors } from "@/constants/theme";

export function PosPhoneView() {
  const [query, setQuery] = useState("");
  const sheetRef = useRef<BottomSheetModal>(null);
  const openCart = useCallback(() => sheetRef.current?.present(), []);

  return (
    <View style={{ flex: 1 }}>
      {/* Pinned header */}
      <View style={{ paddingHorizontal: 18, paddingTop: 6, paddingBottom: 12, gap: 10 }}>
        {/* Outlet switcher + avatar row */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <OutletSwitcher />
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
        {/* Title */}
        <View>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 10.5,
              color: colors.neutral.muted,
              textTransform: "uppercase",
              letterSpacing: 1.05,
            }}
          >
            Table 12 · Dine-in
          </Text>
          <Text style={{ fontFamily: "BricolageGrotesque_700Bold", fontSize: 21, color: colors.neutral.ink }}>
            Menu
          </Text>
        </View>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search dishes…" variant="lg" />
        <CategoryPills variant="lg" />
      </View>

      {/* 2-col scrolling grid */}
      <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 4 }}>
        <ProductGrid variant="lg" searchQuery={query} />
      </View>

      <FloatingCartPill onPress={openCart} bottom={12} />
      <CartSheet ref={sheetRef} />
    </View>
  );
}
