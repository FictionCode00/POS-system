import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { colors } from "@/constants/theme";

type Tab = "login" | "register";

export default function AuthScreen() {
  const { layout } = useBreakpoint();
  return layout === "tablet" ? <TabletAuth /> : <PhoneAuth />;
}

// ─── Tablet: coral left brand panel + white right form ───────────────────────

function TabletAuth() {
  const [tab, setTab] = useState<Tab>("login");
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {/* Left: coral brand panel */}
      <View
        style={{
          width: 480,
          backgroundColor: colors.primary[600],
          padding: 52,
          justifyContent: "space-between",
        }}
      >
        {/* Logo + name */}
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 44 }}>
            <View
              style={{
                width: 44,
                height: 44,
                backgroundColor: colors.neutral.white,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "BricolageGrotesque_700Bold",
                  fontSize: 22,
                  color: colors.primary[600],
                }}
              >
                k
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_600SemiBold",
                fontSize: 14,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Restaurant OS
            </Text>
          </View>

          {/* Headline */}
          <Text
            style={{
              fontFamily: "BricolageGrotesque_700Bold",
              fontSize: 40,
              lineHeight: 43,
              letterSpacing: -0.8,
              color: colors.neutral.white,
              marginBottom: 20,
            }}
          >
            {"Smart billing\nfor every table."}
          </Text>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 14.5,
              lineHeight: 25,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 340,
            }}
          >
            Manage orders, outlets, and loyalty from one POS that moves at kitchen speed.
          </Text>
        </View>

        {/* Carousel dots */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {[0, 1, 2].map((i) => {
            const active = tab === "login" ? i === 0 : i === 1;
            return (
              <View
                key={i}
                style={{
                  width: active ? 32 : 7,
                  height: 7,
                  borderRadius: 99,
                  backgroundColor: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                }}
              />
            );
          })}
        </View>
      </View>

      {/* Right: form panel */}
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.neutral.white }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 56,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", maxWidth: 390 }}>
          <Text
            style={{
              fontFamily: "BricolageGrotesque_700Bold",
              fontSize: 28,
              letterSpacing: -0.4,
              color: colors.neutral.ink,
              marginBottom: 6,
            }}
          >
            {tab === "login" ? "Welcome back" : "Create your account"}
          </Text>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 14,
              color: "#6a6a78",
              marginBottom: 28,
            }}
          >
            {tab === "login"
              ? "Sign in to your Restaurant OS account"
              : "Set up Restaurant OS for your business"}
          </Text>

          {/* Tab switcher */}
          <TabSwitcher tab={tab} onTabChange={setTab} />

          {tab === "login" ? (
            <TabletLoginForm />
          ) : (
            <TabletRegisterForm />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function TabSwitcher({ tab, onTabChange }: { tab: Tab; onTabChange: (t: Tab) => void }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#F4F4F9",
        borderRadius: 12,
        padding: 3,
        gap: 3,
        marginBottom: 26,
      }}
    >
      {(["login", "register"] as Tab[]).map((t) => (
        <Pressable
          key={t}
          onPress={() => onTabChange(t)}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: "center",
            backgroundColor: tab === t ? colors.neutral.white : "transparent",
            shadowColor: tab === t ? "#000" : "transparent",
            shadowOpacity: tab === t ? 0.07 : 0,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 1 },
          }}
        >
          <Text
            style={{
              fontFamily: tab === t ? "SpaceGrotesk_600SemiBold" : "SpaceGrotesk_400Regular",
              fontSize: 14,
              color: tab === t ? colors.neutral.ink : "#9a9aa8",
              textTransform: "capitalize",
            }}
          >
            {t}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function TabletLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) router.replace("/(pos)");
    else setError(res.error ?? "Login failed.");
  };

  return (
    <View style={{ gap: 14 }}>
      <AuthField
        label="Email address"
        value={email}
        onChangeText={setEmail}
        placeholder="rahul@downtowncafe.in"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AuthField
        label="Password"
        labelRight={<ForgotLink />}
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />
      {error ? <ErrorBanner text={error} /> : null}
      <AuthButton label="Sign in" loading={loading} onPress={onSubmit} />
      <SuccessHint />
    </View>
  );
}

function TabletRegisterForm() {
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name] = useState("Admin");
  const register = useAuthStore((s) => s.register);
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    setLoading(true);
    const res = await register({ name, email, password, restaurantName });
    setLoading(false);
    if (res.success) router.replace("/(pos)");
    else setError(res.error ?? "Registration failed.");
  };

  return (
    <View style={{ gap: 13 }}>
      <AuthField
        label="Restaurant / Brand name"
        value={restaurantName}
        onChangeText={setRestaurantName}
        placeholder="Downtown Cafe"
        autoFocus
      />
      <AuthField
        label="Email address"
        value={email}
        onChangeText={setEmail}
        placeholder="you@yourbrand.in"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AuthField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />
      {error ? <ErrorBanner text={error} /> : null}
      <AuthButton label="Create account" loading={loading} onPress={onSubmit} />
      <SuccessHint />
    </View>
  );
}

// ─── Phone: centered single-column layout, link instead of tab switcher ───────

function PhoneAuth() {
  const [tab, setTab] = useState<Tab>("login");
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.neutral.white }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 24,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo + title */}
        <View style={{ alignItems: "center", marginBottom: 28, paddingTop: 8 }}>
          <View
            style={{
              width: 52,
              height: 52,
              backgroundColor: colors.primary[600],
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "BricolageGrotesque_700Bold",
                fontSize: 26,
                color: colors.neutral.white,
              }}
            >
              k
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "BricolageGrotesque_700Bold",
              fontSize: 24,
              letterSpacing: -0.3,
              color: colors.neutral.ink,
              marginBottom: 5,
            }}
          >
            {tab === "login" ? "Welcome back" : "Create account"}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 13, color: "#9a9aa8" }}>
            {tab === "login" ? "Sign in to Restaurant OS" : "Set up Restaurant OS"}
          </Text>
        </View>

        {/* Phone tab switcher */}
        <TabSwitcher tab={tab} onTabChange={setTab} />

        {tab === "login" ? (
          <PhoneLoginForm onSwitchToRegister={() => setTab("register")} />
        ) : (
          <PhoneRegisterForm onSwitchToLogin={() => setTab("login")} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function PhoneLoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) router.replace("/(pos)");
    else setError(res.error ?? "Login failed.");
  };

  return (
    <View style={{ gap: 14 }}>
      <AuthField
        label="Email address"
        value={email}
        onChangeText={setEmail}
        placeholder="rahul@downtowncafe.in"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AuthField
        label="Password"
        labelRight={<ForgotLink label="Forgot?" />}
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />
      {error ? <ErrorBanner text={error} /> : null}
      <AuthButton label="Sign in" loading={loading} onPress={onSubmit} />
      <Pressable onPress={onSwitchToRegister} style={{ alignItems: "center", paddingTop: 8 }}>
        <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12.5, color: "#9a9aa8" }}>
          No account?{" "}
          <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", color: colors.primary[600] }}>
            Register
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}

function PhoneRegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name] = useState("Admin");
  const register = useAuthStore((s) => s.register);
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    setLoading(true);
    const res = await register({ name, email, password, restaurantName });
    setLoading(false);
    if (res.success) router.replace("/(pos)");
    else setError(res.error ?? "Registration failed.");
  };

  return (
    <View style={{ gap: 13 }}>
      <AuthField
        label="Restaurant / Brand name"
        value={restaurantName}
        onChangeText={setRestaurantName}
        placeholder="Downtown Cafe"
        autoFocus
      />
      <AuthField
        label="Email address"
        value={email}
        onChangeText={setEmail}
        placeholder="you@yourbrand.in"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <AuthField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />
      {error ? <ErrorBanner text={error} /> : null}
      <AuthButton label="Create account" loading={loading} onPress={onSubmit} />
      <Pressable onPress={onSwitchToLogin} style={{ alignItems: "center", paddingTop: 8 }}>
        <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12.5, color: "#9a9aa8" }}>
          Already have one?{" "}
          <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", color: colors.primary[600] }}>
            Sign in
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}

// ─── Shared field components ──────────────────────────────────────────────────

function AuthField({
  label,
  labelRight,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoFocus,
}: {
  label: string;
  labelRight?: React.ReactNode;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "phone-pad" | "default";
  autoCapitalize?: "none" | "words" | "sentences";
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ gap: 7 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "SpaceGrotesk_600SemiBold",
            fontSize: 12.5,
            color: "#5a5a68",
          }}
        >
          {label}
        </Text>
        {labelRight ?? null}
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9a9aa8"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ?? "default"}
        autoCapitalize={autoCapitalize ?? "words"}
        autoCorrect={false}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: 50,
          backgroundColor: "#F4F4F9",
          borderWidth: focused ? 1.5 : 1,
          borderColor: focused ? colors.primary[600] : "#ECECF3",
          borderRadius: 12,
          paddingHorizontal: 16,
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: secureTextEntry ? 18 : 14,
          letterSpacing: secureTextEntry ? 3 : 0,
          color: colors.neutral.ink,
        }}
      />
    </View>
  );
}

function AuthButton({ label, loading, onPress }: { label: string; loading: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => ({
        height: 52,
        backgroundColor: colors.primary[600],
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        marginTop: 10,
        opacity: pressed || loading ? 0.85 : 1,
        shadowColor: colors.primary[600],
        shadowOpacity: 0.28,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
      })}
    >
      {loading ? (
        <ActivityIndicator color={colors.neutral.white} />
      ) : (
        <>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_700Bold",
              fontSize: 15,
              color: colors.neutral.white,
            }}
          >
            {label}
          </Text>
          <Text style={{ fontFamily: "SpaceGrotesk_700Bold", fontSize: 17, color: colors.neutral.white }}>
            →
          </Text>
        </>
      )}
    </Pressable>
  );
}

function ForgotLink({ label = "Forgot password?" }: { label?: string }) {
  return (
    <Text
      style={{
        fontFamily: "SpaceGrotesk_400Regular",
        fontSize: 12,
        color: colors.primary[600],
      }}
    >
      {label}
    </Text>
  );
}

function ErrorBanner({ text }: { text: string }) {
  return (
    <View
      style={{
        backgroundColor: "#FFF0EE",
        borderRadius: 10,
        padding: 12,
        borderLeftWidth: 3,
        borderLeftColor: colors.primary[600],
      }}
    >
      <Text
        style={{
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: 13,
          color: colors.primary[700],
        }}
      >
        {text}
      </Text>
    </View>
  );
}

function SuccessHint() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 10,
        paddingHorizontal: 14,
        backgroundColor: "#F4F4F9",
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#DDDDE8",
      }}
    >
      <Text style={{ fontFamily: "SpaceGrotesk_400Regular", fontSize: 12, color: "#9a9aa8" }}>
        →{"  "}
        On success →{"  "}
        <Text style={{ fontFamily: "SpaceGrotesk_600SemiBold", color: "#5a5a68" }}>
          POS Terminal (cross-fade 200ms)
        </Text>
      </Text>
    </View>
  );
}
