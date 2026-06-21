# Restaurant OS · POS — Project Handoff

> A restaurant point-of-sale (POS) terminal app built with React Native + Expo.
> This document summarizes the tech stack, what has been built, current state,
> and suggested next steps — for planning the next phase.

_Last updated: 2026-06-21_

---

## 1. What this app is

A touch-first **restaurant billing / POS terminal** ("Direction B · Dense Data-Forward", coral-red accent `#FF5533`). It runs as **one codebase, two layouts**:

- **Tablet (≥768dp):** zero-scroll 3-column counter UI — icon rail, product grid, persistent cart panel.
- **Phone (<768dp):** handheld flow — bottom tab bar, product grid, floating cart pill that opens a slide-up cart sheet.

All data is **mock / in-memory** — there is no backend yet. The domain types are shaped to map onto a future Node.js + MongoDB API.

---

## 2. Tech stack

| Area | Choice | Notes |
|---|---|---|
| Framework | **Expo SDK 56** (`expo ~56.0.12`) | Managed workflow (no `android/`/`ios/` dirs) |
| Runtime | **React Native 0.85.3**, **React 19.2** | **New Architecture enabled** (`newArchEnabled: true`) |
| Language | **TypeScript** (strict) | `tsc --noEmit` clean; path alias `@/*` |
| Navigation | **expo-router ~56** | File-based routing; `expo-router/entry` is the app entry |
| State | **Zustand v5** | Three stores: cart, auth, outlet |
| Styling | **Inline `style` objects only** | Design tokens in `constants/theme.ts`. **No NativeWind/Tailwind** (removed — see §6) |
| Animations | **react-native-reanimated v4** + **Moti** + **react-native-worklets** | Card press, cart pill entrance |
| Icons | **react-native-svg** | Custom Lucide-style set in `lib/icons.tsx` |
| Fonts | **Space Grotesk** + **Bricolage Grotesque** | via `@expo-google-fonts/*`, loaded in `app/_layout.tsx` |
| Sheets/Modals | **React Native `Modal`** | Cart sheet + KOT slip are state-controlled RN Modals (see §6) |
| Gestures | **react-native-gesture-handler** | `GestureHandlerRootView` at root |
| Safe areas | **react-native-safe-area-context** | Edge-to-edge aware (Android 15) |

---

## 3. Project structure

```
app/                         # expo-router routes
  _layout.tsx                # root: fonts, providers, StatusBar, AuthGuard
  (auth)/
    _layout.tsx
    index.tsx                # Login / Register (tablet split + phone)
  (pos)/
    _layout.tsx              # wraps routes in <AppShell>
    index.tsx                # POS terminal (picks tablet/phone view)
    orders.tsx               # stub
    inventory.tsx            # stub
    admin.tsx                # Admin Dashboard (Overview/Reports/Settings tabs)
components/
  AppShell / shells/         # responsive shell: TabletShell | PhoneShell
  IconNavRail / BottomTabBar # tablet rail / phone tabs
  pos/PosTabletView,PosPhoneView
  ProductGrid, ProductCard, CategoryPills, SearchBar
  CartPanel (tablet), CartSheet (phone), CartItemRow, Stepper
  BillSummary, PayZone, PaymentMethodButton
  CustomerCrm                # CRM/loyalty lookup
  KitchenSlip                # KOT print-preview modal
  OutletSwitcher             # multi-outlet picker
  admin/ReportsPanel         # reports charts/lists
  StubScreen, VegDot, FloatingCartPill
store/
  cartStore.ts               # items, payment, CRM state, computeTotals()
  authStore.ts               # mock login/register, session
  outletStore.ts             # mock outlets, active outlet
hooks/useBreakpoint.ts       # 768dp threshold -> "tablet" | "phone"
lib/
  icons.tsx                  # SVG icon set
  format.ts                  # rupees(), rupeesShort() (INR formatting)
  nav.ts                     # NAV_ITEMS, destForPath()
  productVisuals.ts          # per-icon tile tints
data/dummy.ts                # 16 mock products + PRODUCT_MAP
constants/theme.ts           # colors, radius, spacing, elevation, fonts, GST_SPLIT, BREAKPOINT
types/index.ts               # Product, CartItem, BillTotals, PaymentMethod, etc.
```

---

## 4. What has been built

### Phase 1 — POS Terminal
- Responsive shell (`useBreakpoint` at 768dp) → tablet rail + 3 columns, or phone tabs + floating cart.
- Product grid (4-col tablet / 2-col phone), category pills, search, veg/non-veg markers.
- Cart with add / quantity steppers / remove, price snapshot at add time.
- Bill totals computed live (never stored): subtotal + **CGST 2.5% + SGST 2.5%** (5% GST), INR formatting.
- Payment method selection (Cash / Static UPI / Dynamic QR); PAY disabled until items exist.
- Animations: product card press feedback, add pulse, floating cart pill entrance.

### Phase 2 — MVP features
- **Auth** (`(auth)/index.tsx`, `authStore`): tabbed Login/Register, Register has Restaurant/Brand name; mock auth; `AuthGuard` in root layout redirects signed-out users to `(auth)` and signed-in users to `(pos)`.
- **Multi-outlet switcher** (`OutletSwitcher`, `outletStore`): in the POS header on both layouts; tablet uses an anchored dropdown, phone uses an in-flow dropdown; mock outlets.
- **CRM / Loyalty** (`CustomerCrm`): phone-number lookup at the top of the cart (panel + sheet); "Customer Found" green banner with initials avatar + loyalty points; mock lookup (`9999999999`, `8888888888`).
- **KOT slip** (`KitchenSlip`, `generateKOT()`): utilitarian kitchen ticket (dark header, dashed dividers, ALL-CAPS items, **no prices**); opened from PAY as a print-preview; "Print" + "Send to Kitchen" (which completes the order and clears the cart).
- **Reports** (`admin.tsx` → `admin/ReportsPanel`): Admin Dashboard with **Overview / Reports / Settings** sub-tabs (no new nav icon), All-outlets + month filters, a multi-outlet sales bar chart and a ranked top-selling-items list — all **illustrative** placeholder data.

### Design fidelity
Screens were matched to the Claude Design spec (sections 06–10) at both breakpoints, then corrected against rendered screenshots (e.g. phone keeps the Login/Register tab switcher; KOT footer is Print / Send to Kitchen).

---

## 5. How to run

```bash
npm install
npm run web         # browser (fastest layout checks)
npm run start       # Metro -> scan QR with Expo Go on a device
npm run android     # Android emulator/device
npm run typecheck   # tsc --noEmit
```

Build a shareable APK — see **§7**.

---

## 6. Important implementation notes & gotchas

- **No NativeWind / Tailwind at runtime.** The app styles entirely with inline `style` objects + tokens from `constants/theme.ts`. NativeWind was removed because its JSX transform silently dropped function-form Pressable styles (`style={({pressed}) => ...}`) **on native** — buttons rendered on web but were invisible on device. `tailwind.config.js`, `global.css`, `nativewind-env.d.ts` and the `nativewind`/`tailwindcss` deps are **leftovers and can be deleted**.
- **Cart sheet & KOT are plain RN `Modal`s, state-controlled.** `@gorhom/bottom-sheet`'s `BottomSheetModal.present()` was unreliable on first tap (needed a screen re-mount), so the cart was switched to a `useState`-driven `Modal`. `@gorhom/bottom-sheet` is now **unused** and can be removed from deps.
- **Edge-to-edge / safe areas.** Real Android 15 devices draw under system bars; shells use `useSafeAreaInsets`, modal footers add `insets.bottom`. Web mobile tools report zero insets, so always verify spacing on a real device.
- **ScrollViews inside fixed/maxHeight sheets use `flexShrink: 1`** (not `flex: 1`), which would collapse to 0 height on native and hide content.
- **Everything is mock & in-memory.** No persistence — auth session and cart reset on reload (no AsyncStorage / secure-store / `zustand/persist`).
- **KOT modifiers are placeholders** (shows category, not real modifiers). Reports figures are illustrative.

---

## 7. Building an APK (EAS Build)

The repo includes `eas.json` with a `preview` profile that outputs an installable **APK**. App id: `com.restaurantos.pos`.

```bash
npm install -g eas-cli
eas login                                  # needs a free Expo account
eas build -p android --profile preview     # cloud build; prints an APK download link
```

- The `preview` profile produces a standalone **.apk** for sideloading / sharing.
- `production` profile builds an **.aab** (app bundle) for the Play Store.
- Requires network access to Expo's build servers and an Expo account.

**Local alternative** (needs Android SDK + JDK 17 installed):
```bash
npx expo prebuild -p android
cd android && ./gradlew assembleRelease     # APK at android/app/build/outputs/apk/release/
```

---

## 8. Suggested next steps (for planning)

**Foundation / tech debt**
- Remove unused deps & files: `nativewind`, `tailwindcss`, `@gorhom/bottom-sheet`, `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`.
- Add persistence: `zustand/persist` + `@react-native-async-storage/async-storage` (cart draft) and `expo-secure-store` (auth token).

**Backend & data**
- Stand up a Node.js + MongoDB API matching `types/index.ts` (products, orders, customers, outlets, auth).
- Replace `data/dummy.ts` and mock store actions with real API calls; add loading/error states.
- Wire CRM lookup to a real `GET /customers?phone=` and real loyalty points.

**Features**
- Order lifecycle: build the **Orders** screen (history, statuses), persist placed orders, real KOT/print integration (80mm thermal).
- Inventory screen (stock, low-stock warnings — `Product.stock` already exists).
- Reports: real aggregates + a charting library; date/outlet filters wired to data.
- Phase 3 from the design spec: loyalty **points redemption**, **add outlet** flow, item **modifiers** (feed real modifiers into the KOT).

**Quality**
- Tests (unit for `computeTotals`/formatters; component smoke tests).
- Error boundaries, empty/loading states, and form validation polish.

---

## 9. Repo / build facts

- Git: `main` branch; commits document each phase and fix.
- Entry: `expo-router/entry`; routes under `app/`.
- Config: `app.json` (scheme `restaurantospos`, package `com.restaurantos.pos`, new arch on), `eas.json` (build profiles), `babel.config.js` (plain `babel-preset-expo`), `metro.config.js` (plain).
