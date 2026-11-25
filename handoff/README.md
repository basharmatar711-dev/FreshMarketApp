# Field & Cleaver: developer handoff

A mobile-first grocery app combining a **greengrocer** (fruit & vegetables) and a **butcher’s counter** (cut-to-order meat). The screens are delivered one at a time as standalone, props-driven React components.

## Stack
- **React 19 + TypeScript**
- **Tailwind CSS v4** (tokens in `foundation/theme.css`, no `tailwind.config` needed)
- **lucide-react** for icons
- Fonts: **Fraunces** (display) and **DM Sans** (UI), loaded from Google Fonts in `theme.css`

```bash
npm i react react-dom lucide-react
npm i -D tailwindcss @tailwindcss/vite typescript
```
Then in your global CSS: `@import './handoff/foundation/theme.css';`

## Folder structure
```
handoff/
├─ README.md               ← you are here
├─ foundation/
│  └─ theme.css            ← colors, fonts, utilities (import once)
├─ shared/                 ← components reused across screens (grows with each delivery)
│  ├─ cx.ts
│  └─ Logo.tsx
└─ screens/
   └─ 01-welcome/
      ├─ WelcomeScreen.tsx ← the screen
      ├─ mock.ts           ← demo data / fake API (replace with real calls)
      ├─ README.md         ← spec: anatomy, states, props, API, a11y, acceptance criteria
      └─ assets/
```

## Conventions
- **Screens are pure UI.** No routing, global state or fetching inside. Navigation and data come in through props and callbacks, so they plug into any router or state library.
- **Every screen ships every state:** loading, empty, error and success, as listed in its README.
- **Safe areas:** screens pad for `env(safe-area-inset-*)`. Mount each screen in a full-height container (`h-dvh`).
- **Tokens only:** use theme colors (`bg-leaf`, `text-muted` …) instead of raw hex values. Exceptions are commented.
- **Touch targets ≥ 44 px**, text contrast WCAG AA, `tabular-nums` on all prices and quantities.
- **Prices for weighed items are estimates.** Label them “Est.” and charge the exact weight, capped at +10%. This rule applies on screens 05–11.

## Color tokens
| Token | Hex | Use |
|---|---|---|
| `ink` | #1C211C | Primary text |
| `muted` | #6C7067 | Secondary text |
| `line` | #E6DFD1 | Borders, dividers |
| `paper` | #F4EFE4 | Secondary surfaces |
| `cream` | #FBF8F2 | App background |
| `leaf` | #2F5D3A | Primary CTA (produce) |
| `leaf-deep` | #1F4029 | Dark hero surfaces |
| `leaf-soft` | #E3EBDC | Selected / info backgrounds |
| `sprout` | #7FA35B | Success, accents on dark |
| `wheat` | #E9D9B4 | Highlight on dark |
| `blood` | #7A2418 | Butchery CTA / selection |
| `blood-deep` | #4A160F | Butchery hero |
| `blood-soft` | #F3E3DE | Butchery tint |
| `saffron` | #C9861F | Offers, “Est.”, scarcity |
| `saffron-soft` | #F8EAD1 | Price-policy banners |

**Type scale:** Display (Fraunces) 34 / 30 / 28 / 22 / 19. UI (DM Sans) 15 / 14 / 13 / 12 / 11. Overline 11 px uppercase, tracked 0.16–0.18em.
**Radius:** 12 (inputs, small cards), 16 (cards), 24 (hero cards), full (buttons, chips).

## Delivery tracker
| # | Screen | Status |
|---|---|---|
| 01 | Welcome & delivery check | **Delivered** |
| 02 | Home | Pending |
| 03 | Browse departments | Pending |
| 04 | Search | Pending |
| 05 | Product listing | Pending |
| 06 | Produce detail | Pending |
| 07 | Butcher’s Counter | Pending |
| 08 | Cut-to-order configurator | Pending |
| 09 | Basket | Pending |
| 10 | Checkout | Pending |
| 11 | Order tracking | Pending |
| 12 | Account & preferences | Pending |
