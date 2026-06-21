import { useEffect } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/lib/icons";
import { CartItemRow } from "@/components/CartItemRow";
import { BillSummary } from "@/components/BillSummary";
import { PayZone } from "@/components/PayZone";
import { CustomerCrm } from "@/components/CustomerCrm";
import { colors } from "@/constants/theme";
import { PRODUCT_MAP } from "@/data/dummy";
import { computeTotals, useCartStore } from "@/store/cartStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

// Phone: expanded cart as a state-controlled slide-up sheet (plain RN Modal —
// opens reliably on the first tap, unlike the imperative bottom-sheet modal).
// Scrollable item list with CRM lookup, sticky totals, and PAY zone.
export function CartSheet({ open, onClose }: Props) {
  const items = useCartStore((s) => s.items);
  const totals = computeTotals(items);
  const insets = useSafeAreaInsets();

  // Auto-close once the cart empties (e.g. after payment clears it).
  useEffect(() => {
    if (open && items.length === 0) onClose();
  }, [open, items.length, onClose]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(20,20,30,0.5)", justifyContent: "flex-end" }}>
        {/* Tap the scrim to dismiss */}
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: colors.neutral.white,
            borderTopLeftRadius: 26,
            borderTopRightRadius: 26,
            maxHeight: "92%",
            overflow: "hidden",
          }}
        >
          {/* Handle */}
          <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 2 }}>
            <View style={{ width: 42, height: 5, borderRadius: 99, backgroundColor: "#E0E0EA" }} />
          </View>

          {/* Header */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 8,
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
              onPress={onClose}
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

          {/* Items — flexShrink so the list scrolls and the totals + PAY stay visible */}
          <ScrollView
            style={{ flexShrink: 1 }}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8 }}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => {
              const product = PRODUCT_MAP[item.productId];
              if (!product) return null;
              return <CartItemRow key={item.productId} item={item} product={product} variant="lg" />;
            })}
          </ScrollView>

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
        </View>
      </View>
    </Modal>
  );
}
