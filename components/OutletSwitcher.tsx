import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useOutletStore } from "@/store/outletStore";

/**
 * Multi-outlet selector.
 * Tablet: absolute dropdown below the chip (overlays search bar via zIndex).
 * Phone: in-flow dropdown that pushes content down (spec §07 — no modal on phone).
 */
export function OutletSwitcher() {
  const { layout } = useBreakpoint();
  return layout === "tablet" ? <TabletOutletSwitcher /> : <PhoneOutletSwitcher />;
}

// ─── Tablet: dropdown appears via Modal, positioned below the pill ─────────────

function TabletOutletSwitcher() {
  const [open, setOpen] = useState(false);
  const { outlets, activeOutlet, setActiveOutlet } = useOutletStore();

  return (
    <View>
      <OutletPill
        name={activeOutlet.name}
        open={open}
        onPress={() => setOpen((v) => !v)}
      />

      {/* Dropdown as a Modal so it overlays the search row cleanly */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)}>
          {/* Positioned dropdown — rendered inside the pressable overlay */}
          <View
            style={{
              position: "absolute",
              top: 110, // approx: header top padding + pill height
              left: 22, // matches paddingHorizontal of PosTabletView header
              backgroundColor: colors.neutral.white,
              borderRadius: 13,
              borderWidth: 1,
              borderColor: colors.neutral.edge,
              overflow: "hidden",
              minWidth: 230,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 8,
            }}
          >
            {outlets.map((outlet, idx) => {
              const isActive = outlet.id === activeOutlet.id;
              return (
                <Pressable
                  key={outlet.id}
                  onPress={() => {
                    setActiveOutlet(outlet.id);
                    setOpen(false);
                  }}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    backgroundColor: isActive
                      ? "#FFF2EF"
                      : pressed
                        ? colors.neutral.surface
                        : colors.neutral.white,
                    borderBottomWidth: idx < outlets.length - 1 ? 1 : 0,
                    borderBottomColor: colors.neutral.hair,
                  })}
                >
                  {isActive ? (
                    <Icon name="check" size={13} color={colors.primary[600]} strokeWidth={2.4} />
                  ) : (
                    <Icon name="building" size={13} color={colors.neutral.muted} strokeWidth={1.8} />
                  )}
                  <Text
                    style={{
                      fontFamily: "SpaceGrotesk_600SemiBold",
                      fontSize: 13.5,
                      color: isActive ? colors.primary[600] : "#3a3a44",
                      flex: 1,
                    }}
                  >
                    {outlet.name}
                  </Text>
                  {isActive && (
                    <View
                      style={{
                        backgroundColor: "#FFE4DC",
                        borderRadius: 5,
                        paddingVertical: 2,
                        paddingHorizontal: 7,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "SpaceGrotesk_600SemiBold",
                          fontSize: 10.5,
                          color: "#FF9980",
                        }}
                      >
                        Active
                      </Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
            {/* Add outlet row */}
            <Pressable
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 14,
                paddingVertical: 10,
                backgroundColor: pressed ? colors.neutral.surface : colors.neutral.white,
                borderTopWidth: 1,
                borderTopColor: colors.neutral.hair,
              })}
            >
              <Icon name="plus" size={12} color={colors.neutral.muted} strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_400Regular",
                  fontSize: 13,
                  color: colors.neutral.muted,
                }}
              >
                Add outlet…
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

// ─── Phone: in-flow dropdown pushes content down ──────────────────────────────

function PhoneOutletSwitcher() {
  const [open, setOpen] = useState(false);
  const { outlets, activeOutlet, setActiveOutlet } = useOutletStore();

  return (
    <View>
      <OutletPill
        name={activeOutlet.name}
        open={open}
        onPress={() => setOpen((v) => !v)}
      />

      {/* In-flow dropdown — no modal, pushes content below it */}
      {open && (
        <View
          style={{
            marginTop: 6,
            backgroundColor: colors.neutral.white,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.neutral.edge,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          {outlets.map((outlet, idx) => {
            const isActive = outlet.id === activeOutlet.id;
            return (
              <Pressable
                key={outlet.id}
                onPress={() => {
                  setActiveOutlet(outlet.id);
                  setOpen(false);
                }}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 9,
                  paddingHorizontal: 14,
                  paddingVertical: 11,
                  backgroundColor: isActive
                    ? "#FFF2EF"
                    : pressed
                      ? colors.neutral.surface
                      : colors.neutral.white,
                  borderBottomWidth: idx < outlets.length - 1 ? 1 : 0,
                  borderBottomColor: colors.neutral.hair,
                })}
              >
                {isActive ? (
                  <Icon name="check" size={12} color={colors.primary[600]} strokeWidth={2.4} />
                ) : (
                  <Icon name="building" size={12} color={colors.neutral.muted} strokeWidth={1.8} />
                )}
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_600SemiBold",
                    fontSize: 13.5,
                    color: isActive ? colors.primary[600] : "#3a3a44",
                    flex: 1,
                  }}
                >
                  {outlet.name}
                </Text>
                {isActive && (
                  <View
                    style={{
                      backgroundColor: "#FFE4DC",
                      borderRadius: 5,
                      paddingVertical: 2,
                      paddingHorizontal: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "SpaceGrotesk_600SemiBold",
                        fontSize: 10,
                        color: "#FF9980",
                      }}
                    >
                      Active
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
          <Pressable
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 9,
              paddingHorizontal: 14,
              paddingVertical: 11,
              backgroundColor: pressed ? colors.neutral.surface : colors.neutral.white,
              borderTopWidth: 1,
              borderTopColor: colors.neutral.hair,
            })}
          >
            <Icon name="plus" size={12} color={colors.neutral.muted} strokeWidth={2} />
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 13,
                color: colors.neutral.muted,
              }}
            >
              Add outlet…
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

// ─── Shared pill trigger ──────────────────────────────────────────────────────

function OutletPill({
  name,
  open,
  onPress,
}: {
  name: string;
  open: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: open ? "#FFF2EF" : colors.neutral.white,
        borderWidth: open ? 1.5 : 1,
        borderColor: open ? colors.primary[600] : colors.neutral.edge,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Icon
        name="building"
        size={14}
        color={open ? colors.primary[600] : colors.neutral.muted}
        strokeWidth={1.8}
      />
      <Text
        style={{
          fontFamily: "SpaceGrotesk_600SemiBold",
          fontSize: 13.5,
          color: open ? colors.primary[600] : colors.neutral.ink,
          maxWidth: 160,
        }}
        numberOfLines={1}
      >
        {name}
      </Text>
      <Icon
        name={open ? "chevron-up" : "chevron-down"}
        size={13}
        color={open ? colors.primary[600] : colors.neutral.muted}
        strokeWidth={2.2}
      />
    </Pressable>
  );
}
