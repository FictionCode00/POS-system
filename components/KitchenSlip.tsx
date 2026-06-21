import { Alert, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { PRODUCT_MAP } from "@/data/dummy";
import type { CartItem } from "@/types";

interface KOTItem {
  name: string;
  qty: number;
  category: string;
  isVeg: boolean;
}

export interface KOTData {
  orderNumber: string;
  kotNumber: string;
  tableNumber: string;
  timestamp: string;
  outletName: string;
  items: KOTItem[];
}

export function generateKOT(cartItems: CartItem[], outletName: string): KOTData {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const timestamp = `${now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })} · ${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const items: KOTItem[] = cartItems.map((ci) => {
    const p = PRODUCT_MAP[ci.productId];
    return {
      name: p?.name ?? ci.productId,
      qty: ci.qty,
      category: p?.category ?? "—",
      isVeg: p?.isVeg ?? true,
    };
  });

  return {
    orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    kotNumber: `KOT-${Math.floor(1000 + Math.random() * 9000)}`,
    tableNumber: "12",
    timestamp,
    outletName,
    items,
  };
}

interface Props {
  visible: boolean;
  kotData: KOTData | null;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * KOT print-preview bottom sheet (§09).
 * Utilitarian style: dark `#1A1A22` header bar, dashed dividers, ALL-CAPS item names.
 * No prices — kitchen staff only need names, quantities, and modifiers.
 * Footer: Print (secondary, paired thermal) + Send to Kitchen (primary, confirms order).
 */
export function KitchenSlip({ visible, kotData, onConfirm, onClose }: Props) {
  const insets = useSafeAreaInsets();

  const onPrint = () => {
    const msg = "Sent to paired thermal printer (80mm).";
    if (Platform.OS === "web") {
      // eslint-disable-next-line no-alert
      window.alert(msg);
    } else {
      Alert.alert("Printing KOT", msg);
    }
  };

  if (!kotData) return null;

  const totalQty = kotData.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(20,20,30,0.54)", justifyContent: "flex-end" }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: "#FAFAFA",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: "hidden",
            maxHeight: "88%",
            paddingBottom: insets.bottom + 12,
          }}
        >
          {/* Dark header bar */}
          <View
            style={{
              backgroundColor: "#1A1A22",
              paddingHorizontal: 24,
              paddingTop: 20,
              paddingBottom: 16,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_400Regular",
                  fontSize: 9.5,
                  letterSpacing: 2.2,
                  textTransform: "uppercase",
                  color: "#6a6a78",
                  marginBottom: 4,
                }}
              >
                Kitchen Order Ticket
              </Text>
              <Text
                style={{
                  fontFamily: "BricolageGrotesque_700Bold",
                  fontSize: 24,
                  letterSpacing: -0.3,
                  color: colors.neutral.white,
                }}
              >
                #{kotData.kotNumber}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_700Bold",
                  fontSize: 15,
                  color: colors.primary[600],
                }}
              >
                Table {kotData.tableNumber}
              </Text>
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_400Regular",
                  fontSize: 11.5,
                  color: "#9a9aa8",
                  marginTop: 3,
                }}
              >
                Dine-in · {totalQty} {totalQty === 1 ? "item" : "items"}
              </Text>
            </View>
          </View>

          {/* Outlet + timestamp strip with dashed bottom border */}
          <View
            style={{
              backgroundColor: "#222232",
              paddingHorizontal: 24,
              paddingVertical: 9,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 2,
              borderBottomColor: "#3a3a48",
              borderStyle: "dashed",
            }}
          >
            <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 11.5, color: "#9a9aa8" }}>
              {kotData.outletName}
            </Text>
            <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 11.5, color: "#9a9aa8" }}>
              {kotData.timestamp}
            </Text>
          </View>

          {/* Items list */}
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 4 }}
            showsVerticalScrollIndicator={false}
          >
            {kotData.items.map((item, idx) => (
              <View
                key={idx}
                style={{
                  paddingVertical: 9,
                  borderBottomWidth: idx < kotData.items.length - 1 ? 1 : 0,
                  borderBottomColor: "#ECECF3",
                }}
              >
                {/* Qty × Name row */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "baseline", gap: 0 }}>
                    <Text
                      style={{
                        fontFamily: "SpaceGrotesk_700Bold",
                        fontSize: 16,
                        color: colors.neutral.ink,
                      }}
                    >
                      {item.qty}×
                    </Text>
                    <Text
                      style={{
                        fontFamily: "SpaceGrotesk_700Bold",
                        fontSize: 15,
                        color: colors.neutral.ink,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                        marginLeft: 10,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  {/* Veg/Non-veg tag */}
                  <View
                    style={{
                      backgroundColor: "#EEEEEE",
                      borderRadius: 4,
                      paddingVertical: 2,
                      paddingHorizontal: 7,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "SpaceGrotesk_400Regular",
                        fontSize: 10.5,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        color: colors.neutral.muted,
                      }}
                    >
                      {item.isVeg ? "Veg" : "Non-veg"}
                    </Text>
                  </View>
                </View>
                {/* Modifier hint — static placeholder */}
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_400Regular",
                    fontSize: 12,
                    color: "#9a9aa8",
                    marginTop: 4,
                    paddingLeft: 26,
                  }}
                >
                  {"→"} {item.category}
                </Text>
              </View>
            ))}

          </ScrollView>

          {/* Footer: waiter line + Print / Send to Kitchen (§09) */}
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 14,
              borderTopWidth: 2,
              borderTopColor: "#E0E0EA",
              borderStyle: "dashed",
              gap: 12,
            }}
          >
            <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12, color: "#9a9aa8" }}>
              Waiter · Rahul A.
            </Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {/* Print — secondary (sends to paired thermal) */}
              <Pressable
                onPress={onPrint}
                style={({ pressed }) => ({
                  flex: 1,
                  height: 52,
                  backgroundColor: "#F0F0F5",
                  borderRadius: 13,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_600SemiBold",
                    fontSize: 14,
                    color: "#6a6a78",
                  }}
                >
                  Print
                </Text>
              </Pressable>

              {/* Send to Kitchen — primary (confirms + completes payment) */}
              <Pressable
                onPress={onConfirm}
                style={({ pressed }) => ({
                  flex: 2,
                  height: 52,
                  backgroundColor: colors.primary[600],
                  borderRadius: 13,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: pressed ? 0.88 : 1,
                  shadowColor: colors.primary[600],
                  shadowOpacity: 0.28,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 6 },
                })}
              >
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_700Bold",
                    fontSize: 15,
                    color: colors.neutral.white,
                  }}
                >
                  Send to Kitchen
                </Text>
                <Icon name="arrow-right" size={16} color={colors.neutral.white} strokeWidth={2.2} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
