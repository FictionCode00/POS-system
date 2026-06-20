import { Text, View } from "react-native";
import { Icon, type IconName } from "@/lib/icons";
import { colors } from "@/constants/theme";

// Placeholder for the non-POS destinations. Phase 1 only builds the POS
// Terminal in full; these are route stubs reachable from the rail / tab bar.
export function StubScreen({
  icon,
  title,
  blurb,
}: {
  icon: IconName;
  title: string;
  blurb: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 32,
        backgroundColor: colors.neutral.canvas,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 22,
          backgroundColor: colors.primary[50],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={36} color={colors.primary[600]} strokeWidth={1.7} />
      </View>
      <View style={{ alignItems: "center", gap: 6 }}>
        <Text style={{ fontFamily: "BricolageGrotesque_700Bold", fontSize: 24, color: colors.neutral.ink }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 14,
            color: colors.neutral.body,
            textAlign: "center",
            maxWidth: 320,
            lineHeight: 21,
          }}
        >
          {blurb}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 999,
          paddingVertical: 6,
          paddingHorizontal: 14,
          backgroundColor: colors.neutral.white,
          borderWidth: 1,
          borderColor: colors.neutral.stroke,
        }}
      >
        <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 12, color: colors.primary[700] }}>
          Phase 1 · coming soon
        </Text>
      </View>
    </View>
  );
}
