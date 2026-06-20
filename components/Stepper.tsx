import { Pressable, Text, View } from "react-native";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";

interface StepperProps {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  /** "sm" for the tablet cart rows, "lg" for the phone bottom sheet rows. */
  variant?: "sm" | "lg";
}

// +/- quantity incrementer. Minus is neutral, plus is the coral accent.
export function Stepper({
  qty,
  onIncrement,
  onDecrement,
  variant = "sm",
}: StepperProps) {
  const btn = variant === "lg" ? 30 : 24;
  const icon = variant === "lg" ? 15 : 13;
  const gap = variant === "lg" ? 8 : 7;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap,
        backgroundColor: variant === "lg" ? colors.neutral.surface : colors.neutral.white,
        borderWidth: variant === "lg" ? 0 : 1,
        borderColor: colors.neutral.stroke,
        borderRadius: variant === "lg" ? 11 : 9,
        padding: variant === "lg" ? 4 : 3,
      }}
    >
      <Pressable
        onPress={onDecrement}
        hitSlop={6}
        style={({ pressed }) => ({
          width: btn,
          height: btn,
          borderRadius: variant === "lg" ? 8 : 7,
          backgroundColor: variant === "lg" ? colors.neutral.white : colors.neutral.surface,
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.6 : 1,
          ...(variant === "lg"
            ? {
                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 1 },
              }
            : {}),
        })}
      >
        <Icon name="minus" size={icon} color="#555555" strokeWidth={2.4} />
      </Pressable>

      <Text
        style={{
          fontFamily: "SpaceGrotesk_700Bold",
          fontSize: variant === "lg" ? 15 : 13.5,
          minWidth: variant === "lg" ? 16 : 14,
          textAlign: "center",
          color: colors.neutral.ink,
        }}
      >
        {qty}
      </Text>

      <Pressable
        onPress={onIncrement}
        hitSlop={6}
        style={({ pressed }) => ({
          width: btn,
          height: btn,
          borderRadius: variant === "lg" ? 8 : 7,
          backgroundColor: colors.primary[600],
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Icon name="plus" size={icon} color="#FFFFFF" strokeWidth={2.4} />
      </Pressable>
    </View>
  );
}
