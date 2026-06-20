import { TextInput, View } from "react-native";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  variant?: "sm" | "lg";
}

// Pinned search field. Filters the product grid by name as you type.
export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search item or scan barcode…",
  variant = "sm",
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: variant === "lg" ? 9 : 10,
        backgroundColor: colors.neutral.surface,
        borderWidth: 1,
        borderColor: colors.neutral.line,
        borderRadius: variant === "lg" ? 13 : 12,
        paddingVertical: variant === "lg" ? 12 : 11,
        paddingHorizontal: 14,
      }}
    >
      <Icon name="search" size={18} color={colors.neutral.muted} strokeWidth={1.9} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral.muted}
        style={{
          flex: 1,
          padding: 0,
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: variant === "lg" ? 14 : 13.5,
          color: colors.neutral.ink,
        }}
      />
    </View>
  );
}
