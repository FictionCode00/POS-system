import { Pressable, ScrollView, Text, View } from "react-native";
import { Icon } from "@/lib/icons";
import { CartItemRow } from "@/components/CartItemRow";
import { BillSummary } from "@/components/BillSummary";
import { PayZone } from "@/components/PayZone";
import { CustomerCrm } from "@/components/CustomerCrm";
import { colors } from "@/constants/theme";
import { PRODUCT_MAP } from "@/data/dummy";
import { computeTotals, useCartStore } from "@/store/cartStore";

// Tablet right column: persistent cart with CRM lookup, scrollable item list,
// sticky totals, and sticky PAY zone.
export function CartPanel() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const totals = computeTotals(items);
  const isEmpty = items.length === 0;

  return (
    <View
      style={{
        width: 340,
        backgroundColor: colors.neutral.canvas,
        borderLeftWidth: 1,
        borderLeftColor: colors.neutral.line,
        flex: 1,
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 18,
          paddingTop: 16,
          paddingBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral.hair,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
          <Text style={{ fontFamily: "SpaceGrotesk_700Bold", fontSize: 16, color: colors.neutral.ink }}>
            Order
          </Text>
          {isEmpty ? (
            <Chip text="0 items" tone="muted" />
          ) : (
            <Chip text={`${totals.itemCount} items · ${totals.qtyCount} qty`} tone="primary" />
          )}
        </View>
        {!isEmpty ? (
          <Pressable onPress={clear} hitSlop={8}>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 12.5,
                color: colors.neutral.muted,
                textDecorationLine: "underline",
              }}
            >
              Clear
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* CRM section */}
      <View
        style={{
          paddingHorizontal: 18,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral.hair,
        }}
      >
        <CustomerCrm />
      </View>

      {/* Items / empty */}
      {isEmpty ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            padding: 24,
          }}
        >
          <View
            style={{
              width: 66,
              height: 66,
              borderRadius: 18,
              backgroundColor: colors.primary[50],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="bag" size={30} color={colors.primary[300]} strokeWidth={1.7} />
          </View>
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 15, color: "#3A3A44" }}>
              No items yet
            </Text>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 13,
                color: colors.neutral.muted,
                textAlign: "center",
                maxWidth: 200,
                lineHeight: 19,
              }}
            >
              Tap a product to start this order. Items appear here with quantity steppers.
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 18 }}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item) => {
            const product = PRODUCT_MAP[item.productId];
            if (!product) return null;
            return <CartItemRow key={item.productId} item={item} product={product} />;
          })}
        </ScrollView>
      )}

      {/* Sticky totals */}
      <View
        style={{
          paddingHorizontal: 18,
          paddingVertical: 12,
          backgroundColor: colors.neutral.white,
          borderTopWidth: 1,
          borderTopColor: colors.neutral.line,
        }}
      >
        <BillSummary totals={totals} muted={isEmpty} />
      </View>

      {/* Sticky PAY zone */}
      <View
        style={{
          paddingHorizontal: 18,
          paddingTop: 12,
          paddingBottom: 16,
          backgroundColor: colors.neutral.white,
        }}
      >
        <PayZone totals={totals} />
      </View>
    </View>
  );
}

function Chip({ text, tone }: { text: string; tone: "muted" | "primary" }) {
  return (
    <View
      style={{
        borderRadius: 7,
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: tone === "primary" ? colors.primary[50] : colors.neutral.surface,
      }}
    >
      <Text
        style={{
          fontFamily: tone === "primary" ? "SpaceGrotesk_600SemiBold" : "SpaceGrotesk_400Regular",
          fontSize: 12,
          color: tone === "primary" ? colors.primary[600] : colors.neutral.muted,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
