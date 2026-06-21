import { ScrollView, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoint";

// Multi-outlet sales — 3 months, each a vertical stack of 3 outlet bars (§10).
// Heights are illustrative pixel values straight from the design.
const SALES = [
  { month: "Jul", total: "₹58.7k", bars: [96, 62, 40] },
  { month: "Aug", total: "₹72.1k", bars: [120, 76, 50] },
  { month: "Sep", total: "₹64.5k", bars: [106, 66, 44] },
];

const OUTLET_LEGEND = [
  { name: "Downtown Cafe", color: colors.primary[600], outline: false },
  { name: "Airport Kiosk", color: colors.primary[300], outline: false },
  { name: "Central Mall", color: colors.primary[100], outline: true },
];

const TOP_ITEMS = [
  { rank: 1, name: "Cappuccino", category: "Coffee", qty: 127 },
  { rank: 2, name: "Filter Coffee", category: "Coffee", qty: 98 },
  { rank: 3, name: "Masala Dosa", category: "Main Course", qty: 86 },
  { rank: 4, name: "Butter Croissant", category: "Pastries", qty: 74 },
  { rank: 5, name: "Cold Brew", category: "Coffee", qty: 62 },
];

const MAX_QTY = TOP_ITEMS[0].qty;

// The Reports sub-tab content. Tablet: two panels side by side (3:2).
// Phone: stacked cards in a scroll view.
export function ReportsPanel() {
  const { layout } = useBreakpoint();
  const isTablet = layout === "tablet";

  if (isTablet) {
    return (
      <View style={{ flex: 1, flexDirection: "row", gap: 22, padding: 22 }}>
        <View style={{ flex: 3 }}>
          <SalesCard />
        </View>
        <View style={{ flex: 2 }}>
          <TopItemsCard />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 18, gap: 13 }}
      showsVerticalScrollIndicator={false}
    >
      <SalesCard compact />
      <TopItemsCard compact />
    </ScrollView>
  );
}

function CardShell({
  title,
  subtitle,
  children,
  compact,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <View
      style={{
        flex: compact ? undefined : 1,
        backgroundColor: colors.neutral.canvas,
        borderWidth: 1,
        borderColor: colors.neutral.line,
        borderRadius: compact ? 14 : 16,
        padding: compact ? 16 : 22,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: compact ? 12 : 14,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_700Bold",
              fontSize: compact ? 14 : 15,
              color: colors.neutral.ink,
            }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 12,
                color: colors.neutral.muted,
                marginTop: 3,
              }}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        <IllustrativeBadge />
      </View>
      {children}
    </View>
  );
}

function SalesCard({ compact }: { compact?: boolean }) {
  return (
    <CardShell title="Multi-outlet Sales" subtitle={compact ? undefined : "Jul – Sep 2026"} compact={compact}>
      {/* Legend */}
      <View style={{ flexDirection: "row", gap: compact ? 12 : 16, marginBottom: 14, flexWrap: "wrap" }}>
        {(compact ? OUTLET_LEGEND.slice(0, 2) : OUTLET_LEGEND).map((o) => (
          <View key={o.name} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <View
              style={{
                width: compact ? 8 : 10,
                height: compact ? 8 : 10,
                borderRadius: compact ? 2 : 3,
                backgroundColor: o.color,
                borderWidth: o.outline ? 1 : 0,
                borderColor: colors.primary[300],
              }}
            />
            <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 11.5, color: colors.neutral.body }}>
              {o.name}
            </Text>
          </View>
        ))}
      </View>

      {/* Bar columns */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: compact ? 10 : 18,
          paddingHorizontal: 4,
          minHeight: compact ? 96 : 180,
        }}
      >
        {SALES.map((s) => {
          const scale = compact ? 0.46 : 1;
          return (
            <View key={s.month} style={{ flex: 1, alignItems: "center", gap: 3 }}>
              <View
                style={{
                  width: "100%",
                  height: s.bars[0] * scale,
                  backgroundColor: colors.primary[600],
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  borderBottomLeftRadius: 2,
                  borderBottomRightRadius: 2,
                }}
              />
              <View
                style={{
                  width: "100%",
                  height: s.bars[1] * scale,
                  backgroundColor: colors.primary[300],
                  borderRadius: 4,
                }}
              />
              {!compact ? (
                <View
                  style={{
                    width: "100%",
                    height: s.bars[2] * scale,
                    backgroundColor: colors.primary[100],
                    borderWidth: 1,
                    borderColor: colors.primary[300],
                    borderRadius: 4,
                  }}
                />
              ) : null}
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_400Regular",
                  fontSize: compact ? 10 : 11,
                  color: colors.neutral.muted,
                  marginTop: 6,
                }}
              >
                {s.month}
              </Text>
              {!compact ? (
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_600SemiBold",
                    fontSize: 10.5,
                    color: colors.neutral.body,
                  }}
                >
                  {s.total}
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>
    </CardShell>
  );
}

function TopItemsCard({ compact }: { compact?: boolean }) {
  return (
    <CardShell
      title="Top Selling Items"
      subtitle={compact ? undefined : "All outlets · this month"}
      compact={compact}
    >
      <View style={{ gap: compact ? 8 : 3 }}>
        {TOP_ITEMS.map((item) => {
          const barColor =
            item.rank === 1
              ? colors.primary[600]
              : item.rank <= 3
                ? colors.primary[300]
                : colors.primary[100];
          const barWidth = Math.round((item.qty / MAX_QTY) * (compact ? 48 : 58));
          return (
            <View
              key={item.rank}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: compact ? 9 : 12,
                paddingVertical: compact ? 0 : 10,
                paddingHorizontal: compact ? 0 : 12,
                backgroundColor: compact ? "transparent" : colors.neutral.white,
                borderRadius: 10,
                borderWidth: compact ? 0 : 1,
                borderColor: colors.neutral.hair,
              }}
            >
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_700Bold",
                  fontSize: compact ? 11.5 : 11,
                  color: item.rank === 1 ? colors.primary[600] : colors.neutral.muted,
                  minWidth: 14,
                }}
              >
                {item.rank}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: item.rank === 1 ? "SpaceGrotesk_600SemiBold" : compact ? "SpaceGrotesk_500Medium" : "SpaceGrotesk_600SemiBold",
                    fontSize: compact ? 13 : 13.5,
                    color: colors.neutral.ink,
                  }}
                >
                  {item.name}
                </Text>
                {!compact ? (
                  <Text
                    style={{
                      fontFamily: "SpaceGrotesk_400Regular",
                      fontSize: 11,
                      color: colors.neutral.muted,
                    }}
                  >
                    {item.category}
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  width: barWidth,
                  height: 5,
                  borderRadius: 999,
                  backgroundColor: barColor,
                  borderWidth: item.rank > 3 ? 1 : 0,
                  borderColor: colors.primary[300],
                }}
              />
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_700Bold",
                  fontSize: 12,
                  color: colors.neutral.ink,
                  minWidth: 26,
                  textAlign: "right",
                }}
              >
                {item.qty}
              </Text>
            </View>
          );
        })}
      </View>
    </CardShell>
  );
}

function IllustrativeBadge() {
  return (
    <View
      style={{
        backgroundColor: "#FEF3C7",
        borderWidth: 1,
        borderColor: "#FDE68A",
        borderRadius: 6,
        paddingVertical: 3,
        paddingHorizontal: 9,
      }}
    >
      <Text
        style={{
          fontFamily: "SpaceGrotesk_600SemiBold",
          fontSize: 10.5,
          color: colors.status.warning,
        }}
      >
        Illustrative
      </Text>
    </View>
  );
}
