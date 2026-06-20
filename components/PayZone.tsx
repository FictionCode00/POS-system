import { Alert, Platform, Pressable, Text, View } from "react-native";
import { Icon } from "@/lib/icons";
import { PaymentMethodButton } from "@/components/PaymentMethodButton";
import { colors } from "@/constants/theme";
import { rupees } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import type { BillTotals, PaymentMethod } from "@/types";

const METHODS: PaymentMethod[] = ["cash", "upi", "qr"];

interface Props {
  totals: BillTotals;
  variant?: "sm" | "lg";
}

// Sticky PAY zone: Cash / Static UPI / Dynamic QR grid + the primary PAY CTA.
// Both are disabled until the first item is added (per spec 2.1).
export function PayZone({ totals, variant = "sm" }: Props) {
  const payment = useCartStore((s) => s.payment);
  const setPayment = useCartStore((s) => s.setPayment);
  const clear = useCartStore((s) => s.clear);
  const disabled = totals.qtyCount === 0;

  const onPay = () => {
    if (disabled) return;
    const msg = `${rupees(totals.total)} via ${labelFor(payment)} — order placed.`;
    if (Platform.OS === "web") {
      // RN Web's Alert is a no-op; fall back to the browser dialog.
      // eslint-disable-next-line no-alert
      window.alert(msg);
    } else {
      Alert.alert("Payment complete", msg);
    }
    clear();
  };

  return (
    <View style={{ gap: variant === "lg" ? 11 : 10 }}>
      <View
        style={{
          flexDirection: "row",
          gap: variant === "lg" ? 8 : 7,
          opacity: disabled ? 0.45 : 1,
        }}
      >
        {METHODS.map((m) => (
          <PaymentMethodButton
            key={m}
            method={m}
            variant={variant}
            selected={!disabled && payment === m}
            disabled={disabled}
            onPress={() => setPayment(m)}
          />
        ))}
      </View>

      <Pressable
        onPress={onPay}
        disabled={disabled}
        style={({ pressed }) => ({
          backgroundColor: disabled ? colors.neutral.line : colors.primary[600],
          borderRadius: variant === "lg" ? 15 : 13,
          padding: variant === "lg" ? 17 : 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: disabled ? "center" : "space-between",
          opacity: pressed ? 0.9 : 1,
          ...(disabled
            ? {}
            : {
                shadowColor: colors.primary[600],
                shadowOpacity: 0.32,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 8 },
              }),
        })}
      >
        <Text
          style={{
            fontFamily: "SpaceGrotesk_700Bold",
            fontSize: variant === "lg" ? 17 : 16,
            color: disabled ? colors.neutral.muted : colors.neutral.white,
          }}
        >
          {disabled ? "PAY — add items" : `PAY ${rupees(totals.total)}`}
        </Text>
        {!disabled ? (
          <Icon name="arrow-right" size={19} color={colors.neutral.white} strokeWidth={2.2} />
        ) : null}
      </Pressable>
    </View>
  );
}

function labelFor(method: PaymentMethod | null): string {
  switch (method) {
    case "upi":
      return "Static UPI";
    case "qr":
      return "Dynamic QR";
    default:
      return "Cash";
  }
}
