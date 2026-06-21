import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/lib/icons";
import { colors } from "@/constants/theme";
import { useOutletStore } from "@/store/outletStore";

// Compact outlet-selector chip. Tapping opens a modal picker.
// Used in both PosTabletView and PosPhoneView — one component, two placements.
export function OutletSwitcher() {
  const [open, setOpen] = useState(false);
  const { outlets, activeOutlet, setActiveOutlet } = useOutletStore();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: colors.neutral.white,
          borderWidth: 1,
          borderColor: colors.neutral.edge,
          borderRadius: 10,
          paddingVertical: 7,
          paddingHorizontal: 11,
          opacity: pressed ? 0.75 : 1,
        })}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 99,
            backgroundColor: colors.status.success,
          }}
        />
        <Text
          style={{
            fontFamily: "SpaceGrotesk_600SemiBold",
            fontSize: 13,
            color: colors.neutral.ink,
            maxWidth: 160,
          }}
          numberOfLines={1}
        >
          {activeOutlet.name}
        </Text>
        <Icon name="chevron-down" size={13} color={colors.neutral.muted} strokeWidth={2.2} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "flex-end",
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)} />

          <View
            style={{
              backgroundColor: colors.neutral.white,
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              paddingBottom: insets.bottom + 16,
            }}
          >
            {/* Handle */}
            <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 4 }}>
              <View
                style={{
                  width: 38,
                  height: 4,
                  borderRadius: 99,
                  backgroundColor: colors.neutral.line,
                }}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 10,
                paddingBottom: 14,
                borderBottomWidth: 1,
                borderBottomColor: colors.neutral.hair,
              }}
            >
              <Text
                style={{
                  fontFamily: "BricolageGrotesque_700Bold",
                  fontSize: 18,
                  color: colors.neutral.ink,
                }}
              >
                Switch Outlet
              </Text>
            </View>

            <View style={{ paddingHorizontal: 16, paddingTop: 10, gap: 6 }}>
              {outlets.map((outlet) => {
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
                      gap: 14,
                      padding: 14,
                      borderRadius: 14,
                      backgroundColor: isActive
                        ? colors.primary[50]
                        : pressed
                          ? colors.neutral.surface
                          : "transparent",
                    })}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 11,
                        backgroundColor: isActive ? colors.primary[100] : colors.neutral.surface,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        name="building"
                        size={19}
                        color={isActive ? colors.primary[600] : colors.neutral.muted}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: "SpaceGrotesk_600SemiBold",
                          fontSize: 15,
                          color: isActive ? colors.primary[600] : colors.neutral.ink,
                        }}
                      >
                        {outlet.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "SpaceGrotesk_400Regular",
                          fontSize: 12.5,
                          color: colors.neutral.muted,
                          marginTop: 2,
                        }}
                      >
                        {outlet.address}
                      </Text>
                    </View>
                    {isActive ? (
                      <Icon
                        name="check"
                        size={17}
                        color={colors.primary[600]}
                        strokeWidth={2.5}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
