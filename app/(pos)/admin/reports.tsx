import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { rupees } from "@/lib/format";

// Reports — Phase 2 placeholder. Static mock data; no charting library.
// Accessible from the Admin Dashboard; not added to the nav rail.
export default function ReportsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.neutral.canvas }}
      contentContainerStyle={{
        padding: 22,
        paddingBottom: insets.bottom + 24,
        gap: 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Page header */}
      <View style={{ gap: 4 }}>
        <Text style={{ fontFamily: "BricolageGrotesque_700Bold", fontSize: 24, color: colors.neutral.ink }}>
          Reports
        </Text>
        <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 14, color: colors.neutral.muted }}>
          Today · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long" })}
        </Text>
      </View>

      {/* Sales comparison cards */}
      <View style={{ gap: 12 }}>
        <SectionLabel text="Sales Overview" />
        <View style={{ flexDirection: "row", gap: 12 }}>
          <SalesCard
            label="Today"
            value={rupees(18420)}
            delta="+12%"
            positive
            sub="vs. yesterday"
          />
          <SalesCard
            label="This Week"
            value={rupees(94800)}
            delta="+4%"
            positive
            sub="vs. last week"
          />
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <SalesCard
            label="This Month"
            value={rupees(312500)}
            delta="-3%"
            positive={false}
            sub="vs. last month"
          />
          <SalesCard
            label="Orders Today"
            value="74"
            delta="+9"
            positive
            sub="vs. yesterday"
          />
        </View>
      </View>

      {/* Top sellers */}
      <View style={{ gap: 12 }}>
        <SectionLabel text="Top Sellers Today" />
        <View
          style={{
            backgroundColor: colors.neutral.white,
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.neutral.hair,
          }}
        >
          {TOP_SELLERS.map((item, idx) => (
            <TopSellerRow key={item.name} rank={idx + 1} {...item} last={idx === TOP_SELLERS.length - 1} />
          ))}
        </View>
      </View>

      {/* Payment method breakdown */}
      <View style={{ gap: 12 }}>
        <SectionLabel text="Payment Breakdown" />
        <View
          style={{
            backgroundColor: colors.neutral.white,
            borderRadius: 16,
            padding: 18,
            gap: 14,
            borderWidth: 1,
            borderColor: colors.neutral.hair,
          }}
        >
          <PayBar label="Cash" pct={42} value={rupees(7736)} />
          <PayBar label="UPI" pct={35} value={rupees(6447)} />
          <PayBar label="QR" pct={23} value={rupees(4237)} />
        </View>
      </View>
    </ScrollView>
  );
}

const TOP_SELLERS = [
  { name: "Filter Coffee", category: "Coffee", qty: 38, revenue: rupees(5700) },
  { name: "Masala Dosa", category: "Main Course", qty: 22, revenue: rupees(6160) },
  { name: "Croissant", category: "Pastries", qty: 19, revenue: rupees(2850) },
  { name: "Cold Brew", category: "Cold Drinks", qty: 15, revenue: rupees(3375) },
  { name: "Veg Samosa", category: "Snacks", qty: 14, revenue: rupees(1260) },
];

function SectionLabel({ text }: { text: string }) {
  return (
    <Text
      style={{
        fontFamily: "SpaceGrotesk_600SemiBold",
        fontSize: 13,
        color: colors.neutral.muted,
        textTransform: "uppercase",
        letterSpacing: 0.9,
      }}
    >
      {text}
    </Text>
  );
}

function SalesCard({
  label,
  value,
  delta,
  positive,
  sub,
}: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  sub: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.neutral.white,
        borderRadius: 16,
        padding: 16,
        gap: 6,
        borderWidth: 1,
        borderColor: colors.neutral.hair,
      }}
    >
      <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12, color: colors.neutral.muted }}>
        {label}
      </Text>
      <Text style={{ fontFamily: "SpaceGrotesk_700Bold", fontSize: 20, color: colors.neutral.ink }}>
        {value}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <View
          style={{
            borderRadius: 6,
            paddingVertical: 2,
            paddingHorizontal: 6,
            backgroundColor: positive ? "#ECFAF2" : "#FFF0EE",
          }}
        >
          <Text
            style={{
              fontFamily: "SpaceGrotesk_600SemiBold",
              fontSize: 11,
              color: positive ? colors.status.success : colors.status.danger,
            }}
          >
            {delta}
          </Text>
        </View>
        <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 11, color: colors.neutral.muted }}>
          {sub}
        </Text>
      </View>
    </View>
  );
}

function TopSellerRow({
  rank,
  name,
  category,
  qty,
  revenue,
  last,
}: {
  rank: number;
  name: string;
  category: string;
  qty: number;
  revenue: string;
  last: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 13,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.neutral.hair,
        gap: 12,
      }}
    >
      <Text
        style={{
          fontFamily: "SpaceGrotesk_700Bold",
          fontSize: 15,
          color: rank === 1 ? colors.primary[600] : colors.neutral.muted,
          width: 22,
          textAlign: "center",
        }}
      >
        {rank}
      </Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 14, color: colors.neutral.ink }}>
          {name}
        </Text>
        <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12, color: colors.neutral.muted, marginTop: 1 }}>
          {category} · {qty} sold
        </Text>
      </View>
      <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 14, color: colors.neutral.ink }}>
        {revenue}
      </Text>
    </View>
  );
}

function PayBar({ label, pct, value }: { label: string; pct: number; value: string }) {
  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: "SpaceGrotesk_500Medium", fontSize: 13, color: colors.neutral.body }}>
          {label}
        </Text>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12, color: colors.neutral.muted }}>
            {pct}%
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 13, color: colors.neutral.ink }}>
            {value}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 6,
          borderRadius: 99,
          backgroundColor: colors.neutral.surface,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 6,
            borderRadius: 99,
            backgroundColor: colors.primary[600],
            width: `${pct}%`,
          }}
        />
      </View>
    </View>
  );
}
