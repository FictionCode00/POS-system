import { Pressable, Text, TextInput, View } from "react-native";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { useCartStore } from "@/store/cartStore";

/**
 * CRM / Loyalty lookup.
 * Design §08: phone input with integrated coral arrow button inside the field.
 * When found: green banner with circular avatar (initials), name, loyalty pts star.
 */
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

  // Once found, the integrated button turns green; otherwise coral.
  const btnColor = found ? colors.status.success : colors.primary[600];

  // Initials from the found customer name.
  const initials = found
    ? (customerName ?? "")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <View style={{ gap: 10 }}>
      {/* Section label */}
      <Text
        style={{
          fontFamily: "SpaceGrotesk_600SemiBold",
          fontSize: 11,
          color: colors.neutral.muted,
          textTransform: "uppercase",
          letterSpacing: 1.2,
        }}
      >
        Customer Lookup
      </Text>

      {/* Phone input with integrated action button */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F4F4F9",
          borderWidth: 1,
          borderColor: colors.neutral.line,
          borderRadius: 11,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 9,
            paddingHorizontal: 13,
          }}
        >
          <Icon name="phone" size={15} color={colors.neutral.muted} />
          <TextInput
            value={customerPhone}
            onChangeText={(v) => setCustomerPhone(v.replace(/\D/g, "").slice(0, 10))}
            placeholder="Phone number…"
            placeholderTextColor="#9a9aa8"
            keyboardType="phone-pad"
            style={{
              flex: 1,
              height: 42,
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 13,
              color: colors.neutral.ink,
            }}
          />
          {customerPhone.length > 0 && !found ? (
            <Pressable onPress={clearCustomer} hitSlop={8}>
              <Icon name="x" size={13} color={colors.neutral.muted} strokeWidth={2.2} />
            </Pressable>
          ) : null}
        </View>

        {/* Integrated arrow/check button */}
        <Pressable
          onPress={found ? clearCustomer : lookupCustomer}
          disabled={!canSearch && !found}
          style={({ pressed }) => ({
            backgroundColor: canSearch || found ? btnColor : "#DDDDE8",
            paddingHorizontal: 14,
            alignItems: "center",
            justifyContent: "center",
            minHeight: 42,
            alignSelf: "stretch",
            opacity: pressed ? 0.8 : 1,
          })}
        >
          {found ? (
            <Icon name="check" size={14} color="#fff" strokeWidth={2.6} />
          ) : (
            <Icon name="arrow-right" size={14} color={canSearch ? "#fff" : colors.neutral.muted} strokeWidth={2.4} />
          )}
        </Pressable>
      </View>

      {/* Customer Found banner */}
      {found && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#F0FBF4",
            borderWidth: 1,
            borderColor: "#BBF7D0",
            borderRadius: 10,
            padding: 10,
          }}
        >
          {/* Avatar circle with initials */}
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              backgroundColor: colors.status.success,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 11.5,
                color: "#fff",
              }}
            >
              {initials}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 13,
                color: "#16A34A",
              }}
            >
              Customer Found: {customerName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              {/* Star icon inline */}
              <Text style={{ fontSize: 11, color: "#D97706" }}>★</Text>
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_600SemiBold",
                  fontSize: 11.5,
                  color: "#6a6a78",
                }}
              >
                {loyaltyPoints} pts
              </Text>
            </View>
          </View>

          <Pressable onPress={clearCustomer} hitSlop={8}>
            <Icon name="x" size={13} color={colors.neutral.muted} strokeWidth={2.2} />
          </Pressable>
        </View>
      )}

      {/* Not found state */}
      {hasResult && !found && (
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
          <Icon name="search" size={13} color={colors.neutral.muted} />
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
      )}
    </View>
  );
}
