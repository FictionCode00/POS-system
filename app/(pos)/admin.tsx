import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { ReportsPanel } from "@/components/admin/ReportsPanel";
import { StubScreen } from "@/components/StubScreen";

type AdminTab = "overview" | "reports" | "settings";

const TABS: { key: AdminTab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "reports", label: "Reports" },
  { key: "settings", label: "Settings" },
];

// Admin Dashboard (§10). The rail/tab-bar comes from AppShell; this is the
// inner content: header + outlet/date filters + Overview/Reports/Settings
// sub-tabs that switch in place. Reports is the only fully-built tab.
export default function AdminScreen() {
  const [tab, setTab] = useState<AdminTab>("reports");

  return (
    <View style={{ flex: 1, backgroundColor: colors.neutral.white }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 18,
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral.hair,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 11,
                color: colors.neutral.muted,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 4,
              }}
            >
              Admin
            </Text>
            <Text
              style={{
                fontFamily: "BricolageGrotesque_700Bold",
                fontSize: 22,
                letterSpacing: -0.3,
                color: colors.neutral.ink,
              }}
            >
              Dashboard
            </Text>
          </View>

          {/* Filters: All outlets + month */}
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: colors.primary[50],
                borderWidth: 1,
                borderColor: colors.primary[100],
                borderRadius: 10,
                paddingVertical: 8,
                paddingHorizontal: 14,
              }}
            >
              <Icon name="building" size={13} color={colors.primary[600]} strokeWidth={1.8} />
              <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", fontSize: 13, color: colors.primary[600] }}>
                All outlets
              </Text>
              <Icon name="chevron-down" size={12} color={colors.primary[600]} strokeWidth={2} />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: colors.neutral.surface,
                borderWidth: 1,
                borderColor: colors.neutral.line,
                borderRadius: 10,
                paddingVertical: 8,
                paddingHorizontal: 14,
              }}
            >
              <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 13, color: colors.neutral.body }}>
                Jun 2026
              </Text>
              <Icon name="chevron-down" size={12} color={colors.neutral.muted} strokeWidth={2} />
            </View>
          </View>
        </View>

        {/* Sub-tabs */}
        <View style={{ flexDirection: "row", gap: 28 }}>
          {TABS.map((t) => {
            const active = t.key === tab;
            return (
              <Pressable
                key={t.key}
                onPress={() => setTab(t.key)}
                style={{
                  paddingBottom: 13,
                  borderBottomWidth: 2,
                  borderBottomColor: active ? colors.primary[600] : "transparent",
                }}
              >
                <Text
                  style={{
                    fontFamily: active ? "SpaceGrotesk_700Bold" : "SpaceGrotesk_500Medium",
                    fontSize: 14,
                    color: active ? colors.primary[600] : colors.neutral.muted,
                  }}
                >
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {tab === "reports" ? (
          <ReportsPanel />
        ) : tab === "overview" ? (
          <StubScreen
            icon="grid"
            title="Overview"
            blurb="Live sales, open tables, and today's snapshot. This sub-tab lands in a later phase."
          />
        ) : (
          <StubScreen
            icon="sliders"
            title="Settings"
            blurb="Menu management, tax settings, and staff roles. This sub-tab lands in a later phase."
          />
        )}
      </View>
    </View>
  );
}
