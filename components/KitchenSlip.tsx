import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { PRODUCT_MAP } from "@/data/dummy";
import type { CartItem } from "@/types";

interface KOTItem {
  name: string;
  qty: number;
  category: string;
}

export interface KOTData {
  orderNumber: string;
  kotNumber: string;
  tableNumber: string;
  timestamp: string;
  items: KOTItem[];
}

export function generateKOT(cartItems: CartItem[]): KOTData {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())} · ${now.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}`;

  const items: KOTItem[] = cartItems.map((ci) => {
    const p = PRODUCT_MAP[ci.productId];
    return {
      name: p?.name ?? ci.productId,
      qty: ci.qty,
      category: p?.category ?? "—",
    };
  });

  return {
    orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    kotNumber: `KOT-${Math.floor(10 + Math.random() * 90)}`,
    tableNumber: "12",
    timestamp,
    items,
  };
}

interface Props {
  visible: boolean;
  kotData: KOTData | null;
  onConfirm: () => void;
  onClose: () => void;
}

// Print-preview modal for a Kitchen Order Ticket. Prices are intentionally
// excluded — kitchen staff only need item names and quantities.
export function KitchenSlip({ visible, kotData, onConfirm, onClose }: Props) {
  const insets = useSafeAreaInsets();

  if (!kotData) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          justifyContent: "flex-end",
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: colors.neutral.white,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: insets.bottom + 16,
            maxHeight: "85%",
          }}
        >
          {/* Handle */}
          <View
            style={{
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 6,
            }}
          >
            <View
              style={{
                width: 42,
                height: 5,
                borderRadius: 99,
                backgroundColor: colors.neutral.line,
              }}
            />
          </View>

          {/* Header */}
          <View
            style={{
              paddingHorizontal: 22,
              paddingTop: 6,
              paddingBottom: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: colors.neutral.hair,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "BricolageGrotesque_700Bold",
                  fontSize: 20,
                  color: colors.neutral.ink,
                }}
              >
                Kitchen Order Ticket
              </Text>
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_400Regular",
                  fontSize: 12.5,
                  color: colors.neutral.muted,
                  marginTop: 2,
                }}
              >
                Review before sending to kitchen
              </Text>
            </View>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                backgroundColor: colors.neutral.surface,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="x" size={15} color={colors.neutral.body} strokeWidth={2.2} />
            </Pressable>
          </View>

          {/* KOT slip body */}
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 16, paddingBottom: 4 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Metadata row */}
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <MetaBadge label="Table" value={kotData.tableNumber} />
              <MetaBadge label="KOT" value={kotData.kotNumber} />
              <MetaBadge label="Order" value={kotData.orderNumber} />
              <MetaBadge label="Time" value={kotData.timestamp} />
            </View>

            {/* Divider — dashed ticket style */}
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: colors.neutral.line,
                borderStyle: "dashed",
                marginBottom: 16,
              }}
            />

            {/* Items */}
            <View style={{ gap: 12 }}>
              {kotData.items.map((item, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: colors.primary[50],
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "SpaceGrotesk_700Bold",
                        fontSize: 15,
                        color: colors.primary[600],
                      }}
                    >
                      {item.qty}×
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "SpaceGrotesk_600SemiBold",
                        fontSize: 15,
                        color: colors.neutral.ink,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "SpaceGrotesk_400Regular",
                        fontSize: 12,
                        color: colors.neutral.muted,
                        marginTop: 1,
                      }}
                    >
                      {item.category}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: colors.neutral.line,
                borderStyle: "dashed",
                marginTop: 16,
                marginBottom: 4,
              }}
            />
          </ScrollView>

          {/* Actions */}
          <View
            style={{
              paddingHorizontal: 22,
              paddingTop: 14,
              gap: 10,
            }}
          >
            <Pressable
              onPress={onConfirm}
              style={({ pressed }) => ({
                height: 54,
                backgroundColor: colors.primary[600],
                borderRadius: 14,
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
              <Icon name="check" size={18} color={colors.neutral.white} strokeWidth={2.5} />
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_700Bold",
                  fontSize: 16,
                  color: colors.neutral.white,
                }}
              >
                Confirm &amp; Pay
              </Text>
            </Pressable>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => ({
                height: 46,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_500Medium",
                  fontSize: 14,
                  color: colors.neutral.muted,
                }}
              >
                Edit Order
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function MetaBadge({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        backgroundColor: colors.neutral.surface,
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: 11,
          color: colors.neutral.muted,
          textTransform: "uppercase",
          letterSpacing: 0.7,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: "SpaceGrotesk_600SemiBold",
          fontSize: 12.5,
          color: colors.neutral.ink,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
