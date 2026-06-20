import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { Icon, type IconName } from "@/lib/icons";
import { colors } from "@/constants/theme";
import type { PaymentMethod } from "@/types";

const META: Record<PaymentMethod, { label: string; icon: IconName }> = {
  cash: { label: "Cash", icon: "cash" },
  upi: { label: "Static UPI", icon: "phone" },
  qr: { label: "Dynamic QR", icon: "qr" },
};

interface Props {
  method: PaymentMethod;
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
  /** "sm" tablet cart, "lg" phone sheet. */
  variant?: "sm" | "lg";
}

// One tappable payment tile. Default = hairline outline; selected = coral ring
// + tint + a check badge in the top-right corner.
export function PaymentMethodButton({
  method,
  selected,
  disabled,
  onPress,
  variant = "sm",
}: Props) {
  const { label, icon } = META[method];
  const pad = variant === "lg" ? 11 : 9;
  const radius = variant === "lg" ? 13 : 11;
  const iconSize = variant === "lg" ? 20 : 18;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        flex: 1,
        borderRadius: radius,
        paddingVertical: pad,
        paddingHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
        gap: variant === "lg" ? 5 : 4,
        borderWidth: selected ? 1.5 : 1,
        borderColor: selected ? colors.primary[600] : colors.neutral.stroke,
        backgroundColor: selected ? colors.primary[50] : "transparent",
        opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        ...(selected
          ? {
              shadowColor: colors.primary[600],
              shadowOpacity: 0.16,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
            }
          : {}),
      })}
    >
      <Icon
        name={icon}
        size={iconSize}
        color={
          disabled
            ? colors.neutral.muted
            : selected
              ? colors.primary[700]
              : colors.neutral.body
        }
      />
      <Text
        style={{
          fontFamily: selected ? "SpaceGrotesk_700Bold" : "SpaceGrotesk_600SemiBold",
          fontSize: variant === "lg" ? 11.5 : 11,
          color: disabled
            ? colors.neutral.muted
            : selected
              ? colors.primary[700]
              : colors.neutral.body,
        }}
      >
        {label}
      </Text>

      {selected ? (
        <View
          style={{
            position: "absolute",
            top: -7,
            right: -7,
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: colors.primary[600],
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: colors.neutral.white,
          }}
        >
          <Icon name="check" size={11} color="#FFFFFF" strokeWidth={3} />
        </View>
      ) : null}
    </Pressable>
  );
}
