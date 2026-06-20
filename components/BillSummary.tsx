import { Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { rupees } from "@/lib/format";
import type { BillTotals } from "@/types";

interface Props {
  totals: BillTotals;
  /** Greyed-out styling for the empty-cart state. */
  muted?: boolean;
}

// Sticky subtotal block: Subtotal, CGST 2.5%, SGST 2.5%, then Total payable.
export function BillSummary({ totals, muted = false }: Props) {
  const lineColor = muted ? "#C2C2CC" : colors.neutral.body;

  return (
    <View style={{ gap: 6 }}>
      <Row label="Subtotal" value={rupees(totals.subtotal)} color={lineColor} bold={!muted} />
      <Row label="CGST 2.5%" value={rupees(totals.cgst)} color={lineColor} />
      <Row label="SGST 2.5%" value={rupees(totals.sgst)} color={lineColor} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingTop: 8,
          marginTop: 3,
          borderTopWidth: 1,
          borderTopColor: "#EFEFF5",
        }}
      >
        <Text
          style={{
            fontFamily: "SpaceGrotesk_700Bold",
            fontSize: 15,
            color: muted ? colors.neutral.muted : colors.neutral.ink,
          }}
        >
          Total payable
        </Text>
        <Text
          style={{
            fontFamily: "SpaceGrotesk_700Bold",
            fontSize: 20,
            color: muted ? colors.neutral.muted : colors.neutral.ink,
          }}
        >
          {rupees(totals.total)}
        </Text>
      </View>
    </View>
  );
}

function Row({
  label,
  value,
  color,
  bold,
}: {
  label: string;
  value: string;
  color: string;
  bold?: boolean;
}) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 13, color }}>
        {label}
      </Text>
      <Text
        style={{
          fontFamily: bold ? "SpaceGrotesk_600SemiBold" : "SpaceGrotesk_400Regular",
          fontSize: 13,
          color,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
