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
import { colors } from "@/constants/theme";

type Tab = "login" | "register";

export default function AuthScreen() {
  const [tab, setTab] = useState<Tab>("login");
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.neutral.canvas }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 48,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 28,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand */}
        <View style={{ alignItems: "center", marginBottom: 36 }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: colors.primary[600],
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
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
              fontSize: 26,
              color: colors.neutral.ink,
            }}
          >
            RestaurantOS
          </Text>
          <Text
            style={{
              fontFamily: "SpaceGrotesk_400Regular",
              fontSize: 14,
              color: colors.neutral.muted,
              marginTop: 4,
            }}
          >
            POS Terminal
          </Text>
        </View>

        {/* Card */}
        <View
          style={{
            backgroundColor: colors.neutral.white,
            borderRadius: 20,
            padding: 24,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          {/* Tabs */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.neutral.surface,
              borderRadius: 12,
              padding: 3,
              marginBottom: 24,
            }}
          >
            {(["login", "register"] as Tab[]).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={{
                  flex: 1,
                  paddingVertical: 9,
                  borderRadius: 10,
                  alignItems: "center",
                  backgroundColor: tab === t ? colors.neutral.white : "transparent",
                  shadowColor: tab === t ? "#000" : "transparent",
                  shadowOpacity: tab === t ? 0.07 : 0,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      tab === t ? "SpaceGrotesk_600SemiBold" : "SpaceGrotesk_400Regular",
                    fontSize: 14,
                    color: tab === t ? colors.neutral.ink : colors.neutral.muted,
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>

          {tab === "login" ? <LoginForm /> : <RegisterForm />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.replace("/(pos)");
    } else {
      setError(result.error ?? "Login failed. Please try again.");
    }
  };

  return (
    <View style={{ gap: 14 }}>
      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Field
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />
      {error ? <ErrorText text={error} /> : null}
      <SubmitButton label="Log in" loading={loading} onPress={onSubmit} />
    </View>
  );
}

function RegisterForm() {
  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const register = useAuthStore((s) => s.register);
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    setLoading(true);
    const result = await register({ name, email, password, restaurantName });
    setLoading(false);
    if (result.success) {
      router.replace("/(pos)");
    } else {
      setError(result.error ?? "Registration failed. Please try again.");
    }
  };

  return (
    <View style={{ gap: 14 }}>
      <Field label="Your Name" value={name} onChangeText={setName} placeholder="e.g. Rahul Arora" />
      <Field
        label="Restaurant / Brand Name"
        value={restaurantName}
        onChangeText={setRestaurantName}
        placeholder="e.g. Spice Garden"
      />
      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Field
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Create a password"
        secureTextEntry
      />
      {error ? <ErrorText text={error} /> : null}
      <SubmitButton label="Create account" loading={loading} onPress={onSubmit} />
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "email-address" | "phone-pad" | "default";
  autoCapitalize?: "none" | "words" | "sentences";
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text
        style={{
          fontFamily: "SpaceGrotesk_500Medium",
          fontSize: 13,
          color: colors.neutral.body,
        }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral.muted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ?? "default"}
        autoCapitalize={autoCapitalize ?? "words"}
        autoCorrect={false}
        style={{
          height: 48,
          borderWidth: 1.5,
          borderColor: colors.neutral.line,
          borderRadius: 12,
          paddingHorizontal: 14,
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: 15,
          color: colors.neutral.ink,
          backgroundColor: colors.neutral.canvas,
        }}
      />
    </View>
  );
}

function SubmitButton({ label, loading, onPress }: { label: string; loading: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => ({
        height: 52,
        backgroundColor: colors.primary[600],
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
        opacity: pressed || loading ? 0.8 : 1,
        shadowColor: colors.primary[600],
        shadowOpacity: 0.28,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
      })}
    >
      {loading ? (
        <ActivityIndicator color={colors.neutral.white} />
      ) : (
        <Text
          style={{
            fontFamily: "SpaceGrotesk_700Bold",
            fontSize: 16,
            color: colors.neutral.white,
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

function ErrorText({ text }: { text: string }) {
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
