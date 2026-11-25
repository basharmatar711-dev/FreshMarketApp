/**
 * Screen 01: Welcome & delivery check
 * Stage: Onboard · Next: 02 Home
 *
 * First screen for new or signed-out users. It answers "Do you deliver to me, and when?"
 * before anything else. Browsing is allowed without checking the postcode or signing in.
 *
 * See README.md in this folder for anatomy, states, API contract and acceptance criteria.
 */
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, ArrowRight, Beef, Check, Clock, Leaf, Loader2, MapPin, type LucideIcon } from 'lucide-react'
import { Logo } from '../../shared/Logo'
import { cx } from '../../shared/cx'
import defaultHero from './assets/hero-produce.webp'

/* Types ---------------------------------------------------------------- */

export type DeliveryCheckResult =
  | { status: 'available'; postcode: string; /** Human-readable, e.g. "Today, 4–6 PM" */ nextSlot: string }
  | { status: 'unavailable'; postcode: string }

export type WelcomeScreenProps = {
  /** Calls the delivery-coverage API. Reject or throw to show the error state. */
  checkDelivery: (postcode: string) => Promise<DeliveryCheckResult>
  /** Primary CTA. Receives the last successful check result, if any, so the app can store the area. */
  onStartShopping: (result?: DeliveryCheckResult) => void
  /** "Sign in" link for returning customers. */
  onSignIn: () => void
  /** Shown when the area is not covered. Omit to hide the waitlist link. */
  onJoinWaitlist?: (postcode: string) => void
  /** Prefill, e.g. from device location or a previous session. */
  defaultPostcode?: string
  /** Client-side format check before calling the API. Default: 3–10 letters, digits, spaces or dashes. */
  postcodePattern?: RegExp
  heroImage?: string
  className?: string
}

type CheckState = { kind: 'idle' } | { kind: 'invalid' } | { kind: 'checking' } | { kind: 'error' } | { kind: 'done'; result: DeliveryCheckResult }

/* Content -------------------------------------------------------------- */

export const VALUE_PILLARS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Leaf, title: 'Picked within 48 hours', body: 'From 30 farms, all within 150 km' },
  { icon: Beef, title: 'Cut to your order', body: 'By master butchers, the morning it ships' },
  { icon: Clock, title: '2-hour delivery slots', body: '7 days a week, chilled all the way' },
]

const DEFAULT_PATTERN = /^[A-Za-z0-9 -]{3,10}$/

/* Component ------------------------------------------------------------ */

export function WelcomeScreen({
  checkDelivery,
  onStartShopping,
  onSignIn,
  onJoinWaitlist,
  defaultPostcode = '',
  postcodePattern = DEFAULT_PATTERN,
  heroImage = defaultHero,
  className,
}: WelcomeScreenProps) {
  const inputId = useId()
  const statusId = useId()
  const [postcode, setPostcode] = useState(defaultPostcode)
  const [check, setCheck] = useState<CheckState>({ kind: 'idle' })

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const value = postcode.trim()
    if (!postcodePattern.test(value)) return setCheck({ kind: 'invalid' })
    setCheck({ kind: 'checking' })
    try {
      setCheck({ kind: 'done', result: await checkDelivery(value) })
    } catch {
      setCheck({ kind: 'error' })
    }
  }

  const result = check.kind === 'done' ? check.result : undefined
  const busy = check.kind === 'checking'

  return (
    <div className={cx('relative flex h-full flex-col overflow-hidden bg-leaf-deep text-white', className)}>
      {/* 1. Hero photograph + logo */}
      <div className="relative h-[38%] min-h-[240px] shrink-0">
        <img src={heroImage} alt="" className="size-full object-cover object-left" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-leaf-deep" />
        {/* Sits below the status bar / notch on every device. */}
        <div className="absolute left-6" style={{ top: 'calc(max(env(safe-area-inset-top), 44px) + 12px)' }}>
          <Logo tone="light" />
        </div>
      </div>

      <div className="no-scrollbar relative z-10 -mt-10 flex-1 overflow-y-auto px-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 2rem)' }}>
        {/* 2. Positioning */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sprout">Market · Butcher · Delivered</p>
        <h1 className="mt-2 font-display text-[34px] leading-[1.05] tracking-[-0.02em]">
          The market and the butcher, <em className="text-wheat">at your door.</em>
        </h1>

        {/* 3. Value pillars */}
        <ul className="mt-5 space-y-3">
          {VALUE_PILLARS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                <Icon size={17} aria-hidden />
              </span>
              <div>
                <div className="text-[14px] font-semibold">{title}</div>
                <div className="text-[12px] text-white/60">{body}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* 4. Delivery check */}
        <form onSubmit={submit} noValidate className="mt-6 rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">
          <label htmlFor={inputId} className="px-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">
            Check delivery to your area
          </label>
          <div className="mt-2 flex gap-2">
            <div className={cx('flex h-11 flex-1 items-center gap-2 rounded-xl bg-white px-3 text-ink ring-2 transition', check.kind === 'invalid' ? 'ring-[#f0a08f]' : 'ring-transparent')}>
              <MapPin size={16} className="shrink-0 text-muted" aria-hidden />
              <input
                id={inputId}
                value={postcode}
                onChange={(e) => {
                  setPostcode(e.target.value)
                  if (check.kind !== 'idle') setCheck({ kind: 'idle' })
                }}
                inputMode="text"
                autoComplete="postal-code"
                placeholder="Postcode"
                aria-invalid={check.kind === 'invalid'}
                aria-describedby={statusId}
                className="w-full min-w-0 bg-transparent text-[15px] font-medium outline-none placeholder:text-muted"
              />
            </div>
            <button type="submit" disabled={busy || !postcode.trim()} className="flex h-11 min-w-[76px] items-center justify-center rounded-xl bg-wheat px-4 text-[14px] font-semibold text-leaf-deep transition active:scale-95 disabled:opacity-50">
              {busy ? <Loader2 size={17} className="animate-spin" aria-label="Checking" /> : 'Check'}
            </button>
          </div>

          {/* Result. Announced to screen readers via aria-live. */}
          <div id={statusId} aria-live="polite">
            {check.kind === 'invalid' && <Notice tone="warn">Enter a valid postcode, e.g. 2041.</Notice>}
            {check.kind === 'error' && <Notice tone="warn">We couldn’t check right now. Please try again.</Notice>}
            {result?.status === 'available' && (
              <Notice tone="ok">
                Great news, we deliver to <b>{result.postcode}</b>. Next slot: <b>{result.nextSlot}</b>.
              </Notice>
            )}
            {result?.status === 'unavailable' && (
              <Notice tone="warn">
                We don’t deliver to <b>{result.postcode}</b> yet. You can still browse.
                {onJoinWaitlist && (
                  <>
                    {' '}
                    <button type="button" onClick={() => onJoinWaitlist(result.postcode)} className="font-semibold underline underline-offset-2">
                      Notify me when you do
                    </button>
                  </>
                )}
              </Notice>
            )}
          </div>
        </form>

        {/* 5. Primary CTA. Always enabled: guests can browse before checking. */}
        <button type="button" onClick={() => onStartShopping(result)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[15px] font-semibold text-leaf-deep transition active:scale-[0.98]">
          Start shopping <ArrowRight size={17} aria-hidden />
        </button>

        {/* 6. Returning customers */}
        <p className="mt-3 text-center text-[13px] text-white/60">
          Have an account?{' '}
          <button type="button" onClick={onSignIn} className="font-semibold text-white underline underline-offset-2">
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

function Notice({ tone, children }: { tone: 'ok' | 'warn'; children: ReactNode }) {
  const Icon = tone === 'ok' ? Check : AlertCircle
  return (
    <div className={cx('mt-2 flex items-start gap-2 rounded-xl px-3 py-2 text-[12px] leading-snug', tone === 'ok' ? 'bg-sprout/20' : 'bg-[#f0a08f]/15')}>
      <Icon size={15} className={cx('mt-0.5 shrink-0', tone === 'ok' ? 'text-sprout' : 'text-[#f0a08f]')} aria-hidden />
      <span>{children}</span>
    </div>
  )
}
