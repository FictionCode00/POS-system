import { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/lib/icons";
import { CartItemRow } from "@/components/CartItemRow";
import { BillSummary } from "@/components/BillSummary";
import { PayZone } from "@/components/PayZone";
import { CustomerCrm } from "@/components/CustomerCrm";
import { colors } from "@/constants/theme";
import { PRODUCT_MAP } from "@/data/dummy";
import { computeTotals, useCartStore } from "@/store/cartStore";

// Phone: expanded cart as a bottom sheet with CRM lookup, scrollable items,
// sticky totals, and PAY zone.
export const CartSheet = forwardRef<BottomSheetModal>((_props, ref) => {
  const items = useCartStore((s) => s.items);
  const totals = computeTotals(items);
  const insets = useSafeAreaInsets();

  // Memoized so the modal initialises correctly and present() works on the
  // first tap (an inline array recreated each render can break the first open).
  const snapPoints = useMemo(() => ["92%"], []);

  const localRef = useRef<BottomSheetModal>(null);
  const setRefs = useCallback(
    (node: BottomSheetModal | null) => {
      localRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  useEffect(() => {
    if (items.length === 0) localRef.current?.dismiss();
  }, [items.length]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={setRefs}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: "#E0E0EA", width: 42, height: 5 }}
      backgroundStyle={{ backgroundColor: colors.neutral.white, borderRadius: 26 }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 4,
          paddingBottom: 14,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral.hair,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
          <Text style={{ fontFamily: "BricolageGrotesque_700Bold", fontSize: 19, color: colors.neutral.ink }}>
            Your Order
          </Text>
          <View
            style={{
              borderRadius: 7,
              paddingVertical: 2,
              paddingHorizontal: 8,
              backgroundColor: colors.primary[50],
            }}
          >
            <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 12, color: colors.primary[600] }}>
              Table 12
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => localRef.current?.dismiss()}
          hitSlop={8}
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            backgroundColor: colors.neutral.surface,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="chevron-down" size={15} color={colors.neutral.body} strokeWidth={2.2} />
        </Pressable>
      </View>

      {/* CRM section */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral.hair,
        }}
      >
        <CustomerCrm />
      </View>

      {/* Items — flex:1 so the list scrolls and the totals + PAY stay pinned/visible */}
      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => {
          const product = PRODUCT_MAP[item.productId];
          if (!product) return null;
          return <CartItemRow key={item.productId} item={item} product={product} variant="lg" />;
        })}
      </BottomSheetScrollView>

      {/* Totals */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 13,
          backgroundColor: colors.neutral.canvas,
          borderTopWidth: 1,
          borderTopColor: colors.neutral.line,
        }}
      >
        <BillSummary totals={totals} />
      </View>

      {/* PAY zone — clear the Android gesture bar / iOS home indicator */}
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: Math.max(insets.bottom, 16) + 10 }}>
        <PayZone totals={totals} variant="lg" />
      </View>
    </BottomSheetModal>
  );
});

CartSheet.displayName = "CartSheet";

export type CartSheetRef = BottomSheetModal;
