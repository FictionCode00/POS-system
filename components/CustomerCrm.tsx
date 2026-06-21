import { Pressable, Text, TextInput, View } from "react-native";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { useCartStore } from "@/store/cartStore";

// CRM / Loyalty section: phone lookup + customer found banner.
// Shared between CartPanel (tablet) and CartSheet (phone).
export function CustomerCrm() {
  const customerPhone = useCartStore((s) => s.customerPhone);
  const customerName = useCartStore((s) => s.customerName);
  const loyaltyPoints = useCartStore((s) => s.loyaltyPoints);
  const setCustomerPhone = useCartStore((s) => s.setCustomerPhone);
  const lookupCustomer = useCartStore((s) => s.lookupCustomer);
  const clearCustomer = useCartStore((s) => s.clearCustomer);

  const canSearch = customerPhone.trim().length === 10;
  const hasResult = customerName !== null;
  const found = hasResult && customerName !== "";

  return (
    <View style={{ gap: 8 }}>
      {/* Phone input row */}
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            height: 40,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1.5,
            borderColor: colors.neutral.line,
            borderRadius: 10,
            paddingHorizontal: 10,
            backgroundColor: colors.neutral.canvas,
            gap: 7,
          }}
        >
          <Icon name="phone" size={14} color={colors.neutral.muted} />
          <TextInput
            value={customerPhone}
            onChangeText={(v) => setCustomerPhone(v.replace(/\D/g, "").slice(0, 10))}
            placeholder="Customer phone"
            placeholderTextColor={colors.neutral.muted}
            keyboardType="phone-pad"
            style={{
              flex: 1,
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 14,
              color: colors.neutral.ink,
            }}
          />
          {customerPhone.length > 0 ? (
            <Pressable onPress={clearCustomer} hitSlop={6}>
              <Icon name="x" size={13} color={colors.neutral.muted} strokeWidth={2.2} />
            </Pressable>
          ) : null}
        </View>
        <Pressable
          onPress={lookupCustomer}
          disabled={!canSearch}
          style={({ pressed }) => ({
            height: 40,
            paddingHorizontal: 14,
            borderRadius: 10,
            backgroundColor: canSearch ? colors.primary[600] : colors.neutral.surface,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              fontFamily: "SpaceGrotesk_600SemiBold",
              fontSize: 13,
              color: canSearch ? colors.neutral.white : colors.neutral.muted,
            }}
          >
            Search
          </Text>
        </Pressable>
      </View>

      {/* Result banner */}
      {hasResult ? (
        found ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#F0FBF4",
              borderRadius: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: "#C3EDD0",
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#D1F5DF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="user" size={15} color={colors.status.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                  fontSize: 13.5,
                  color: "#1A6635",
                }}
              >
                {customerName}
              </Text>
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_400Regular",
                  fontSize: 12,
                  color: "#2E8048",
                  marginTop: 1,
                }}
              >
                {loyaltyPoints} loyalty pts
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#2E8048",
                borderRadius: 6,
                paddingVertical: 3,
                paddingHorizontal: 7,
              }}
            >
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                  fontSize: 11,
                  color: "#fff",
                }}
              >
                Member
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: colors.neutral.surface,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Icon name="search" size={14} color={colors.neutral.muted} />
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 13,
                color: colors.neutral.muted,
              }}
            >
              No customer found for this number
            </Text>
          </View>
        )
      ) : null}
    </View>
  );
}
