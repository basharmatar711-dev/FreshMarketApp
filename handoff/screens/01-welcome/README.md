# Screen 01: Welcome & delivery check

| | |
|---|---|
| **Journey stage** | Onboard |
| **Shown to** | First launch, or signed-out users |
| **Leads to** | 02 Home (via *Start shopping*), Sign-in flow |
| **Files** | `WelcomeScreen.tsx` (UI), `mock.ts` (demo API), `assets/hero-produce.webp` |
| **Depends on** | `../../shared/Logo.tsx`, `../../shared/cx.ts`, `../../foundation/theme.css`, `lucide-react` |

## Goal
Set expectations within five seconds and answer the first question every grocery shopper has: *“Do you deliver to me, and when?”* This happens **before** any account is created, and browsing never requires one.

## Anatomy (top to bottom)

| # | Region | Spec |
|---|---|---|
| 1 | **Hero photo + logo** | Top 38% of the screen (min 240 px), `object-cover` anchored left. Gradient from `black/30` to `leaf-deep`. Logo is 24 px from the left and 12 px below the safe-area top. |
| 2 | **Positioning** | Overline 11 px, uppercase, tracking 0.18em, `sprout`. Headline Fraunces 34/1.05, tracking −0.02em, with the second phrase in italic `wheat`. The content panel overlaps the hero by 40 px. |
| 3 | **Value pillars** | 3 rows: 36 px circular icon chip (`white/10`, 1 px `white/15` ring), title 14 px semibold, body 12 px `white/60`. 12 px gap between rows. Copy lives in `VALUE_PILLARS`. |
| 4 | **Delivery check** | Card `white/7%`, radius 16, padding 12. Label 11 px uppercase. Input 44 px tall, white, radius 12, map-pin icon. *Check* button 44 px, `wheat` background, `leaf-deep` text, min-width 76 px. Result notice sits below. |
| 5 | **Primary CTA** | Full width, white, pill, 52 px tall, text `leaf-deep` 15 px semibold, with an arrow icon. |
| 6 | **Sign-in link** | 13 px, centred, `white/60` with the “Sign in” link in white and underlined. |

Spacing: 24 px horizontal padding; 20–24 px between regions. Bottom padding is 32 px plus the safe-area inset.

## States

| State | Trigger | UI |
|---|---|---|
| **Idle** | Initial, or the input is edited after a result | No notice. *Check* is disabled while the input is empty. |
| **Invalid** | Submitted value fails `postcodePattern` | Input gets a coral ring and the warning “Enter a valid postcode, e.g. 2041.” No API call is made. |
| **Checking** | API in flight | *Check* shows a spinner and is disabled. |
| **Available** | API returns `available` | Green notice: “Great news, we deliver to **2041**. Next slot: **Today, 4–6 PM**.” |
| **Unavailable** | API returns `unavailable` | Coral notice saying the area isn’t covered yet and the user can still browse, plus an optional “Notify me” link if `onJoinWaitlist` is passed. |
| **Error** | API throws or rejects | Coral notice: “We couldn’t check right now. Please try again.” |

*Start shopping* is **always enabled**, whatever the state (guest browsing).

## Interactions
- **Enter / Go on the keyboard** submits the check (it is a real `<form>`).
- Editing the input after a result clears the result back to *Idle*.
- *Start shopping* calls `onStartShopping(result?)`. Store the postcode and area so Home can show the right slot.
- *Sign in* calls `onSignIn()`.

## Props

```ts
checkDelivery(postcode): Promise<DeliveryCheckResult>   // required
onStartShopping(result?: DeliveryCheckResult): void      // required
onSignIn(): void                                         // required
onJoinWaitlist?(postcode): void                          // shows the waitlist link when provided
defaultPostcode?: string                                 // e.g. from device location
postcodePattern?: RegExp                                 // default /^[A-Za-z0-9 -]{3,10}$/
heroImage?: string                                       // default ./assets/hero-produce.webp
className?: string                                       // parent must give the screen a height (e.g. h-dvh)
```

## API contract (suggested)

`GET /api/delivery/coverage?postcode=2041`

```json
{ "status": "available", "postcode": "2041", "nextSlot": "Today, 4–6 PM" }
{ "status": "unavailable", "postcode": "9999" }
```
Format `nextSlot` on the server, in the store’s timezone, so the client never has to work out dates.

## Accessibility
- The input has a visible `<label>`, `autoComplete="postal-code"` and `aria-invalid` when the value is invalid.
- The result region is `aria-live="polite"`, so screen readers announce the outcome.
- Decorative icons and the hero photo are `aria-hidden` or have `alt=""`.
- White text on `leaf-deep` passes WCAG AA. All touch targets are at least 44 px.

## Analytics events (suggested)
`welcome_viewed` · `delivery_check_submitted {postcode}` · `delivery_check_result {status}` · `start_shopping_tapped {checked: bool, status?}` · `sign_in_tapped` · `waitlist_tapped {postcode}`

## Acceptance criteria
- [ ] Hero, logo and headline render without overlapping the notch or status bar on iPhone SE through Pro Max.
- [ ] Submitting an empty or invalid postcode shows the *Invalid* state and makes no network call.
- [ ] All six states can be reproduced with `mock.ts` (2041 = available, 9999 = unavailable, 0000 = error).
- [ ] *Start shopping* works without a postcode check.
- [ ] Editing the postcode after a result clears the notice.
- [ ] The screen scrolls on short devices, and the CTA can always be reached.

## Usage

```tsx
import { WelcomeScreen } from './screens/01-welcome/WelcomeScreen'
import { mockCheckDelivery } from './screens/01-welcome/mock'

<div className="h-dvh">
  <WelcomeScreen
    checkDelivery={mockCheckDelivery}
    onStartShopping={(r) => navigate('/home', { state: r })}
    onSignIn={() => navigate('/sign-in')}
    onJoinWaitlist={(pc) => openWaitlist(pc)}
  />
</div>
```
