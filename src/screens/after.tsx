import { useState, type ReactNode } from 'react'
import { Bell, Check, ChevronRight, CreditCard, Gift, Heart, Leaf, LifeBuoy, ListChecks, LogOut, MapPin, MessageCircle, Package, Pencil, Phone, Receipt, RefreshCw, Settings, ShieldCheck, Snowflake, Truck, Beef, Sprout, X, Slice } from 'lucide-react'
import { byId, money } from '../data'
import { useProto, quickLine } from '../proto'
import { Scroll, TabBar, cx } from '../ui'

/* 11 ------------------------------------------------------------------ */
export function Tracking() {
  const { order, go } = useProto()
  const [subState, setSubState] = useState<'pending' | 'ok' | 'no'>('pending')
  const items = order.length
    ? order
    : [
        { key: 'a', productId: 'ribeye', qty: 2, unitPrice: 12.6, summary: '', estimated: true },
        { key: 'b', productId: 'tomatoes', qty: 2, unitPrice: 3.45, summary: '', estimated: true },
        { key: 'c', productId: 'lemons', qty: 4, unitPrice: 0.7, summary: '', estimated: false },
      ]
  const total = items.reduce((a, i) => a + i.qty * i.unitPrice, 0) + 1.5
  const steps: { t: string; s: string; time: string; icon: ReactNode; state: 'done' | 'now' | 'next' }[] = [
    { t: 'Order confirmed', s: 'Payment hold placed', time: '1:12 PM', icon: <Check size={13} />, state: 'done' },
    { t: 'Your butcher is cutting', s: 'Marco is preparing your ribeye, 2 × 300 g', time: 'Now', icon: <Slice size={13} />, state: 'now' },
    { t: 'Picking fresh produce', s: 'Hand-selected and quality checked', time: '~2:30 PM', icon: <Sprout size={13} />, state: 'next' },
    { t: 'Chilled & packed', s: 'Insulated box, ice packs, 0–4 °C', time: '~3:15 PM', icon: <Snowflake size={13} />, state: 'next' },
    { t: 'Out for delivery', s: 'Live driver location appears here', time: '4:00 PM', icon: <Truck size={13} />, state: 'next' },
  ]
  return (
    <div className="flex h-full flex-col bg-cream">
      <Scroll className="pb-6">
        <div className="flex items-center justify-between px-5">
          <button onClick={() => go('home')} aria-label="Close" className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-line">
            <X size={17} />
          </button>
          <span className="text-[12px] font-semibold text-muted">Order #FC-20418</span>
          <button aria-label="Help" className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-line">
            <LifeBuoy size={16} />
          </button>
        </div>

        <div className="mt-5 px-5">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-leaf">
            <span className="grid size-5 place-items-center rounded-full bg-leaf text-white">
              <Check size={12} />
            </span>
            Order placed, thank you, Layla
          </div>
          <h1 className="mt-2 font-display text-[30px] leading-[1.05] tracking-[-0.02em]">
            Arriving today
            <br />
            <span className="text-leaf">4:00 – 6:00 PM</span>
          </h1>
        </div>

        {/* Map */}
        <div className="relative mx-5 mt-4 h-[150px] overflow-hidden rounded-3xl bg-[#e8e2d2] ring-1 ring-line">
          <svg viewBox="0 0 350 150" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
            <g stroke="#f7f3ea" strokeWidth="10" fill="none">
              <path d="M-10 40 H360" />
              <path d="M-10 110 H360" />
              <path d="M70 -10 V160" />
              <path d="M200 -10 V160" />
              <path d="M290 -10 V160" />
            </g>
            <rect x="210" y="52" width="70" height="48" rx="6" fill="#d6dcc6" />
            <rect x="80" y="52" width="110" height="48" rx="6" fill="#ddd5c3" />
            <path d="M70 120 V110 H200 V40 H290" stroke="#2f5d3a" strokeWidth="4" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
          </svg>
          <div className="absolute left-[16%] top-[64%] grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blood text-white shadow-lg ring-4 ring-white">
            <Beef size={15} />
          </div>
          <div className="absolute left-[83%] top-[27%] grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-leaf text-white shadow-lg ring-4 ring-white">
            <MapPin size={15} />
          </div>
          <div className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">Store → you · 6.4 km</div>
        </div>

        {/* Substitution request */}
        <div className={cx('mx-5 mt-4 rounded-2xl p-4 ring-1', subState === 'pending' ? 'bg-saffron-soft ring-saffron/30' : 'bg-white ring-line')}>
          {subState === 'pending' ? (
            <>
              <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-saffron">
                <RefreshCw size={13} /> Action needed · substitution
              </div>
              <div className="mt-2 flex items-center gap-3">
                <img src={byId('lemons').image} alt="" className="size-12 rounded-xl bg-white object-cover" />
                <p className="flex-1 text-[13px] leading-snug">
                  <b>Meyer lemons</b> are running low. Can we send <b>Eureka lemons</b> at the same price?
                </p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => setSubState('no')} className="h-10 rounded-full bg-white text-[13px] font-semibold ring-1 ring-line">
                  Refund instead
                </button>
                <button onClick={() => setSubState('ok')} className="h-10 rounded-full bg-ink text-[13px] font-semibold text-white">
                  Approve
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-[13px]">
              <Check size={16} className="text-leaf" />
              {subState === 'ok' ? 'Eureka lemons approved. Thanks!' : 'Lemons will be refunded to your card.'}
              <button onClick={() => setSubState('pending')} className="ml-auto text-[12px] font-semibold text-leaf">
                Undo
              </button>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="mx-5 mt-4 rounded-2xl bg-white p-4 ring-1 ring-line">
          <h3 className="text-[14px] font-semibold">Order progress</h3>
          <ol className="mt-3">
            {steps.map((s, i) => (
              <li key={s.t} className="relative flex gap-3 pb-4 last:pb-0">
                {i < steps.length - 1 && <span className={cx('absolute left-[13px] top-7 h-[calc(100%-24px)] w-0.5', s.state === 'done' ? 'bg-leaf' : 'bg-line')} />}
                <span className={cx('relative grid size-7 shrink-0 place-items-center rounded-full', s.state === 'done' ? 'bg-leaf text-white' : s.state === 'now' ? 'bg-blood text-white ring-4 ring-blood-soft' : 'bg-paper text-muted ring-1 ring-line')}>{s.icon}</span>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={cx('text-[13px] font-semibold', s.state === 'next' && 'text-muted')}>{s.t}</span>
                    <span className={cx('text-[11px] tabular-nums', s.state === 'now' ? 'font-semibold text-blood' : 'text-muted')}>{s.time}</span>
                  </div>
                  <div className="text-[12px] text-muted">{s.s}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-5 mt-4 grid grid-cols-2 gap-2">
          <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-white text-[13px] font-semibold ring-1 ring-line">
            <Pencil size={15} /> Edit until 2 PM
          </button>
          <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-white text-[13px] font-semibold ring-1 ring-line">
            <MessageCircle size={15} /> Chat with us
          </button>
        </div>

        <div className="mx-5 mt-4 rounded-2xl bg-white p-4 ring-1 ring-line">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold">Your items</h3>
            <span className="text-[12px] text-muted tabular-nums">Est. {money(total)}</span>
          </div>
          <div className="mt-3 flex -space-x-2">
            {items.slice(0, 6).map((i) => (
              <img key={i.key} src={byId(i.productId).image} alt="" className="size-11 rounded-full bg-[#f3ece0] object-cover ring-2 ring-white" />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[12px] text-muted">
            <Phone size={13} /> Driver details appear when your order leaves the store.
          </div>
        </div>
      </Scroll>
    </div>
  )
}

/* 12 ------------------------------------------------------------------ */
export function Account() {
  const { add, notify, go } = useProto()
  const [prefs, setPrefs] = useState({ halal: true, organic: false, local: true, alerts: true })
  const toggle = (k: keyof typeof prefs) => setPrefs({ ...prefs, [k]: !prefs[k] })
  const reorder = () => {
    ;['tomatoes', 'avocados', 'kale', 'lemons'].forEach((id) => add(quickLine(id)))
    notify('4 items from 9 Sep added to basket')
  }
  return (
    <div className="flex h-full flex-col bg-cream">
      <Scroll className="pb-6">
        <div className="flex items-center gap-3 px-5">
          <span className="grid size-14 place-items-center rounded-full bg-leaf font-display text-[20px] text-white">LH</span>
          <div className="flex-1">
            <div className="font-display text-[22px] leading-tight">Layla Haddad</div>
            <div className="text-[12px] text-muted">Member since 2022 · 48 orders</div>
          </div>
          <button aria-label="Settings" className="grid size-10 place-items-center rounded-full bg-white ring-1 ring-line">
            <Settings size={17} />
          </button>
        </div>

        <div className="relative mx-5 mt-4 overflow-hidden rounded-3xl bg-leaf-deep p-4 text-white">
          <Leaf size={120} className="absolute -right-6 -top-6 text-white/[0.06]" />
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sprout">Harvest Club · Gold</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-display text-[34px] leading-none tabular-nums">1,240</span>
            <span className="text-[13px] text-white/70">points</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[82%] rounded-full bg-[#e9d9b4]" />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] text-white/70">
            <span>260 points to a free dry-aged ribeye</span>
            <span>1,500</span>
          </div>
        </div>

        <div className="mx-5 mt-4 grid grid-cols-4 gap-2">
          {[
            [Receipt, 'Orders'],
            [Heart, 'Favourites'],
            [ListChecks, 'Lists'],
            [MapPin, 'Addresses'],
          ].map(([I, l]) => {
            const Icon = I as typeof Receipt
            return (
              <button key={l as string} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3 text-[11px] font-semibold ring-1 ring-line">
                <Icon size={18} className="text-leaf" />
                {l as string}
              </button>
            )
          })}
        </div>

        <h3 className="mt-6 px-5 font-display text-[19px]">Recent orders</h3>
        <div className="mx-5 mt-3 divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
          {[
            { id: 'FC-20391', date: 'Mon, 9 Sep', n: 11, total: 64.3, imgs: ['tomatoes', 'avocados', 'kale', 'ribeye'] },
            { id: 'FC-20277', date: 'Tue, 3 Sep', n: 7, total: 41.85, imgs: ['chicken', 'lemons', 'carrots'] },
          ].map((o) => (
            <div key={o.id} className="p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold">{o.date}</div>
                  <div className="text-[11px] text-muted tabular-nums">
                    #{o.id} · {o.n} items · {money(o.total)}
                  </div>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-leaf-soft px-2 py-0.5 text-[10px] font-bold text-leaf">
                  <Package size={11} /> Delivered
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {o.imgs.map((id) => (
                    <img key={id} src={byId(id).image} alt="" className="size-9 rounded-full bg-[#f3ece0] object-cover ring-2 ring-white" />
                  ))}
                </div>
                <button onClick={reorder} className="flex h-8 items-center gap-1.5 rounded-full bg-leaf px-3 text-[12px] font-semibold text-white">
                  <RefreshCw size={12} /> Reorder
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-6 px-5 font-display text-[19px]">Sourcing preferences</h3>
        <p className="mt-1 px-5 text-[12px] text-muted">Applied automatically to listings and the butcher’s counter.</p>
        <div className="mx-5 mt-3 divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
          <Toggle icon={<ShieldCheck size={16} />} label="Halal meat only" sub="Hide non-certified cuts" on={prefs.halal} onClick={() => toggle('halal')} />
          <Toggle icon={<Sprout size={16} />} label="Show organic first" on={prefs.organic} onClick={() => toggle('organic')} />
          <Toggle icon={<MapPin size={16} />} label="Prefer local farms" sub="Within 150 km" on={prefs.local} onClick={() => toggle('local')} />
          <Link icon={<RefreshCw size={16} />} label="Default substitution" value="Best match" />
          <Link icon={<Beef size={16} />} label="Butcher packaging" value="Vacuum sealed" onClick={() => go('cut', 'ribeye')} />
        </div>

        <h3 className="mt-6 px-5 font-display text-[19px]">Account</h3>
        <div className="mx-5 mt-3 divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
          <Toggle icon={<Bell size={16} />} label="Order & offer alerts" on={prefs.alerts} onClick={() => toggle('alerts')} />
          <Link icon={<CreditCard size={16} />} label="Payment methods" value="2 saved" />
          <Link icon={<MapPin size={16} />} label="Addresses" value="Home, Work" />
          <Link icon={<Gift size={16} />} label="Invite friends" value="Get $10" />
          <Link icon={<LifeBuoy size={16} />} label="Help & freshness guarantee" />
        </div>
        <button className="mx-5 mt-4 flex h-12 w-[calc(100%-2.5rem)] items-center justify-center gap-2 rounded-2xl text-[14px] font-semibold text-blood ring-1 ring-line">
          <LogOut size={16} /> Sign out
        </button>
        <p className="mt-3 text-center text-[11px] text-muted">Field & Cleaver · v2.4.0</p>
      </Scroll>
      <TabBar active="account" />
    </div>
  )
}

function Toggle({ icon, label, sub, on, onClick }: { icon: ReactNode; label: string; sub?: string; on: boolean; onClick: () => void }) {
  return (
    <button role="switch" aria-checked={on} onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3 text-left">
      <span className="text-leaf">{icon}</span>
      <span className="flex-1">
        <span className="block text-[14px] font-medium">{label}</span>
        {sub && <span className="block text-[11px] text-muted">{sub}</span>}
      </span>
      <span className={cx('relative h-6 w-10 rounded-full transition', on ? 'bg-leaf' : 'bg-line')}>
        <span className={cx('absolute top-0.5 size-5 rounded-full bg-white shadow transition-all', on ? 'left-[18px]' : 'left-0.5')} />
      </span>
    </button>
  )
}

function Link({ icon, label, value, onClick }: { icon: ReactNode; label: string; value?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3 text-left">
      <span className="text-leaf">{icon}</span>
      <span className="flex-1 text-[14px] font-medium">{label}</span>
      {value && <span className="text-[12px] text-muted">{value}</span>}
      <ChevronRight size={16} className="text-muted" />
    </button>
  )
}
