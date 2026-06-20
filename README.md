# Restaurant OS — POS Terminal

Phase 1 MVP of the **POS Terminal** screen for an all-in-one Restaurant Operating
System aimed at mid-range Indian cafes. Built as a cross-platform **React Native +
Expo** app from the Claude Design spec (`project/POS Terminal Spec.dc.html`),
Direction **B · Dense Data-Forward** with a **Coral Red** accent.

It is one POS screen designed as two genuinely different layouts that share a
single design language and a single state store:

- **Tablet (≥768px, landscape)** — counter "zero-scroll shell": fixed icon rail,
  pinned search + category pills, an internally-scrolling product grid, and a
  persistent right-hand cart panel with sticky totals and a sticky PAY zone.
- **Phone (<768px, portrait)** — handheld: bottom tab bar, pinned search + pills,
  a 2-column scrolling grid, and a collapsible cart that lives as a floating pill
  and expands into a full-height bottom sheet.

## Tech stack

| Concern        | Choice |
| -------------- | ------ |
| Framework      | React Native + Expo (Expo Router, file-based routing) |
| Language       | TypeScript (strict) |
| Styling        | NativeWind + design tokens (`constants/theme.ts`, `tailwind.config.js`) |
| Animation      | Moti + react-native-reanimated (v4 / worklets) |
| State          | Zustand (`store/cartStore.ts`) — totals are **derived**, never stored |
| Cart drawer    | @gorhom/bottom-sheet (phone) |
| Icons          | react-native-svg, one Lucide-style line set (`lib/icons.tsx`) |
| Fonts          | Space Grotesk (UI) + Bricolage Grotesque (display) |

## Getting started

```bash
npm install
npm run start      # Expo dev server (press w / i / a)
npm run web        # web (react-native-web)
npm run ios        # iOS simulator (macOS)
npm run android    # Android emulator
npm run typecheck  # tsc --noEmit
```

> Note: this environment's network policy blocks the Expo API host, so
> `npx expo install` can't resolve versions here. Dependencies are pinned to the
> Expo SDK 56 bundled versions in `package.json` and install via plain `npm`.

## Project structure

```
app/
  _layout.tsx              Root: fonts + providers (gesture handler, safe area,
                           bottom-sheet) + Stack
  (pos)/
    _layout.tsx            AppShell (breakpoint switch) wrapping a <Slot/>
    index.tsx              POS Terminal screen (tablet/phone)
    orders.tsx             Live Orders   (route stub)
    inventory.tsx          Inventory     (route stub)
    admin.tsx              Admin         (route stub)
components/
  AppShell.tsx             Picks TabletShell / PhoneShell from useBreakpoint()
  shells/                  TabletShell (icon rail) · PhoneShell (tab bar)
  IconNavRail.tsx          Tablet nav rail
  BottomTabBar.tsx         Phone tab bar
  SearchBar.tsx  CategoryPills.tsx  ProductGrid.tsx  ProductCard.tsx
  CartPanel.tsx            Tablet persistent cart
  CartSheet.tsx            Phone bottom-sheet cart
  FloatingCartPill.tsx     Phone collapsed cart
  CartItemRow.tsx  Stepper.tsx  BillSummary.tsx  PayZone.tsx
  PaymentMethodButton.tsx  VegDot.tsx  StubScreen.tsx
  pos/                     PosTabletView · PosPhoneView
constants/theme.ts         Design tokens (colors, radius, spacing, elevation, fonts)
data/dummy.ts              ~16 products + categories
hooks/useBreakpoint.ts     useWindowDimensions threshold at 768px
lib/                       icons.tsx · nav.ts · format.ts · productVisuals.ts
store/cartStore.ts         Zustand store + computeTotals()
types/index.ts             Product / CartItem / BillTotals (API-shaped)
```

## Interactions

- **Add to cart** — card depresses on press (scale 0.96) and springs back with a
  brief pulse; an in-cart card gains a coral ring + a live quantity badge and a
  filled add button.
- **Category switch** — instant, memoized filter of the product list.
- **Search** — filters the grid by name across all categories as you type.
- **Quantity** — +/- steppers in the cart recompute the bill live; dropping to 0
  removes the line.
- **Payment** — Cash / Static UPI / Dynamic QR grid; PAY is disabled until the
  first item is added. PAY confirms and clears the order.
- **Phone cart** — floating pill scales in on first add and expands into the
  bottom sheet over a scrim; the two are never visible at once.

## State shape

`types/index.ts` mirrors a future Node.js + MongoDB API. Cart items snapshot the
price at add time (`priceAtAdd`); subtotal, CGST (2.5%), SGST (2.5%) and total are
computed in `computeTotals()` from the items + product lookup, never stored.

## Design source

- `project/POS Terminal Spec.dc.html` — the implemented spec (tokens + every
  screen/state at both breakpoints).
- `docs/DESIGN_HANDOFF.md` — the original Claude Design handoff notes.
- `chats/` — the design conversation transcripts.
