# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this repo.

## Project

**Restaurant OS · POS** — a React Native + Expo restaurant point-of-sale app.
One codebase renders two layouts: **tablet** (≥768dp, 3-column counter) and
**phone** (<768dp, floating cart). All data is **mock/in-memory** — no backend.

For a full feature/status overview and next-steps planning, read
[`docs/HANDOFF.md`](docs/HANDOFF.md).

## Commands

```bash
npm run web         # run in browser (fastest visual check)
npm run start       # Metro + Expo Go (scan QR on device)
npm run android     # Android emulator/device
npm run typecheck   # tsc --noEmit  — run this after any change
npm run lint        # expo lint
```

There are no automated tests yet. **`npm run typecheck` is the gate** — keep it clean.

After changing `babel.config.js` / `metro.config.js` / `app.json`, restart Metro
with cache clear: `npx expo start -c`. Pure JS/component edits hot-reload.

## Tech stack (see HANDOFF.md §2 for versions)

Expo SDK 56 · React Native 0.85 · React 19 · New Architecture ON · TypeScript (strict) ·
expo-router (file-based) · Zustand · react-native-reanimated v4 + Moti · react-native-svg.

## Conventions — follow these

### Styling
- **Inline `style` objects ONLY.** Do **not** add NativeWind/Tailwind `className`
  — NativeWind was removed because its JSX transform broke function-form
  Pressable styles on native (invisible buttons). Re-introducing it will
  rebreak the app.
- Pull colors, radius, spacing, elevation, fonts from **`constants/theme.ts`**
  (e.g. `colors.primary[600]` = coral `#FF5533`). Don't hardcode hex when a
  token exists.
- Fonts are explicit family strings: `SpaceGrotesk_400Regular/500Medium/
  600SemiBold/700Bold`, `BricolageGrotesque_600SemiBold/700Bold` (display).

### Components & layout
- Match the surrounding file's style: functional components, hooks, small local
  sub-components at the bottom of the file.
- Responsive split comes from **`useBreakpoint()`** (`"tablet" | "phone"`), not
  ad-hoc width checks.
- **Touch targets ≥44px**; press feedback via `style={({pressed}) => ...}` opacity
  or reanimated scale (consistent with existing buttons).
- Icons: use `<Icon name=... />` from `lib/icons.tsx`. If a needed glyph is
  missing, add it there (SVG path + a name in the `IconName` union).
- Money: format via `rupees()` / `rupeesShort()` in `lib/format.ts`. Never render
  raw numbers as currency.

### Native gotchas (these caused real device-only bugs — don't regress)
- Sheets/modals are **plain RN `Modal`** (state-controlled via `useState`), not
  `@gorhom/bottom-sheet`. Open with a boolean prop, not an imperative ref.
- A `ScrollView` inside a fixed-height / `maxHeight` sheet must use
  **`flexShrink: 1`**, never `flex: 1` (the latter collapses to 0 height on
  native and hides content while looking fine on web).
- Respect safe areas with `useSafeAreaInsets()` (Android 15 edge-to-edge). Add
  `insets.bottom` to bottom-pinned buttons. Web reports zero insets — verify on
  a real device.

### State (Zustand)
- `store/cartStore.ts` — `items`, `payment`, CRM fields; **`computeTotals(items)`
  derives the bill — totals are never stored.** Use `selectQty(id)` for badges.
- `store/authStore.ts` — mock login/register + session.
- `store/outletStore.ts` — mock outlets + active outlet.
- Keep derived values computed, not duplicated in state.

### Types & data
- Domain types live in `types/index.ts` (shaped for a future Node + MongoDB API).
  Prices are in whole rupees; `taxRate` like `0.05`.
- Mock data is `data/dummy.ts` (`PRODUCTS`, `PRODUCT_MAP`). When adding a real
  API, replace the data layer + store actions; keep the types.

## Architecture map

- `app/_layout.tsx` — fonts, providers, `StatusBar`, `AuthGuard` (redirects by auth state).
- `app/(auth)/` — login/register. `app/(pos)/` — POS, orders, inventory, admin (wrapped in `AppShell`).
- `AppShell` → `TabletShell` (IconNavRail + content) or `PhoneShell` (content + BottomTabBar).
- POS screen → `PosTabletView` (grid + persistent `CartPanel`) or `PosPhoneView` (grid + `FloatingCartPill` + `CartSheet`).
- `PayZone` opens `KitchenSlip` (KOT) → "Send to Kitchen" completes payment and clears the cart.

## Working agreements

- Run `npm run typecheck` before considering a change done.
- Commit only when asked. If on `main`, branch first. End commit messages with
  the Co-Authored-By trailer.
- Don't reintroduce removed deps (NativeWind, Tailwind, @gorhom/bottom-sheet) —
  they are intentionally unused (safe to delete; see HANDOFF.md §6/§8).
- Verify layout-affecting changes on **both** breakpoints, and prefer a real
  device for anything touching modals, safe areas, or scrolling.
