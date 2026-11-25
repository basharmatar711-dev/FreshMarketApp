import { useState, type ReactNode } from 'react'
import { ArrowRight, Banknote, Check, ChevronDown, ChevronRight, CreditCard, Home, Info, Leaf, Lock, MapPin, RefreshCw, ShoppingBasket, Smartphone, Tag as TagIcon, Truck, Trash2, Beef, Sprout, DoorOpen } from 'lucide-react'
import { byId, money } from '../data'
import { useProto, type CartItem } from '../proto'
import { BottomBar, QuickAdd, Scroll, Segmented, Stepper, TabBar, TopBar, cx } from '../ui'

const FREE_AT = 60
const SERVICE = 1.5

/* 09 ------------------------------------------------------------------ */
export function Cart() {
  const { cart, setQty, subtotal, go, count } = useProto()
  const [promo, setPromo] = useState('')
  const [applied, setApplied] = useState(false)
  const [subs, setSubs] = useState<Record<string, number>>({})
  const SUBS = ['Best match', 'Ask me', 'No sub']

  const produce = cart.filter((i) => byId(i.productId).dept === 'produce' && i.key !== 'roast-box')
  const meat = cart.filter((i) => byId(i.productId).dept === 'butchery' || i.key === 'roast-box')
  const remaining = Math.max(0, FREE_AT - subtotal)
  const delivery = remaining > 0 ? 4.99 : 0
  const discount = applied ? 5 : 0
  const total = subtotal + delivery + SERVICE - discount
  const hasEstimated = cart.some((i) => i.estimated)

  const line = (i: CartItem) => {
    const p = byId(i.productId)
    const s = subs[i.key] ?? 0
    return (
      <li key={i.key} className="flex gap-3 py-3">
        <button onClick={() => go(p.dept === 'butchery' ? 'cut' : 'produce', p.id)} className="size-16 shrink-0 overflow-hidden rounded-xl bg-[#f3ece0]">
          <img src={p.image} alt="" className="size-full object-cover" />
        </button>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold">{i.key === 'roast-box' ? 'Sunday Roast Box' : p.name}</div>
              <div className="truncate text-[11px] text-muted">{i.summary}</div>
            </div>
            <div className="text-right">
              <div className="text-[14px] font-bold tabular-nums">{money(i.unitPrice * i.qty)}</div>
              {i.estimated && <div className="text-[10px] font-semibold uppercase tracking-wide text-saffron">Est.</div>}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <button onClick={() => setSubs({ ...subs, [i.key]: (s + 1) % 3 })} className="flex items-center gap-1 rounded-full bg-paper px-2 py-1 text-[11px] font-medium text-muted ring-1 ring-line">
              <RefreshCw size={11} /> {SUBS[s]}
            </button>
            <div className="flex items-center gap-2">
              {i.qty === 1 && (
                <button aria-label="Remove" onClick={() => setQty(i.key, 0)} className="grid size-8 place-items-center rounded-full text-muted ring-1 ring-line">
                  <Trash2 size={14} />
                </button>
              )}
              <Stepper size="sm" tone="light" value={i.qty} min={0} onChange={(n) => setQty(i.key, n)} />
            </div>
          </div>
        </div>
      </li>
    )
  }

  if (cart.length === 0)
    return (
      <div className="flex h-full flex-col bg-cream">
        <div className="px-5 pt-12">
          <h1 className="font-display text-[30px] tracking-[-0.02em]">Basket</h1>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-leaf-soft text-leaf">
            <ShoppingBasket size={32} />
          </span>
          <div className="mt-4 font-display text-[22px]">Your basket is empty</div>
          <p className="mt-1 text-[13px] text-muted">Start with this week’s harvest, or rebuild your last order in one tap.</p>
          <button onClick={() => go('home')} className="mt-5 h-12 w-full rounded-full bg-leaf text-[15px] font-semibold text-white">
            Start shopping
          </button>
          <button onClick={() => go('account')} className="mt-2 h-12 w-full rounded-full text-[14px] font-semibold text-leaf ring-1 ring-line">
            Reorder last basket
          </button>
        </div>
        <TabBar active="cart" />
      </div>
    )

  return (
    <div className="flex h-full flex-col bg-cream">
      <Scroll className="pb-4">
        <div className="flex items-end justify-between px-5">
          <h1 className="font-display text-[30px] tracking-[-0.02em]">Basket</h1>
          <span className="pb-1.5 text-[13px] text-muted tabular-nums">{count} items</span>
        </div>

        <button onClick={() => go('checkout')} className="mx-5 mt-3 flex w-[calc(100%-2.5rem)] items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 ring-line">
          <span className="grid size-9 place-items-center rounded-full bg-leaf-soft text-leaf">
            <Truck size={16} />
          </span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold">Today, 4:00 – 6:00 PM</div>
            <div className="text-[11px] text-muted">14 Elm Street · Only 3 slots left</div>
          </div>
          <span className="text-[12px] font-semibold text-leaf">Change</span>
        </button>

        <div className="mx-5 mt-3 rounded-2xl bg-leaf-soft px-4 py-3">
          <div className="flex items-center justify-between text-[12px] font-medium text-leaf">
            {remaining > 0 ? (
              <span>
                Add <b className="tabular-nums">{money(remaining)}</b> for free delivery
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Check size={14} /> You’ve unlocked free delivery
              </span>
            )}
            <span className="tabular-nums">{money(FREE_AT)}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-leaf transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_AT) * 100)}%` }} />
          </div>
        </div>

        {produce.length > 0 && (
          <section className="mx-5 mt-5">
            <h3 className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-muted">
              <Sprout size={14} className="text-leaf" /> Fruit & Vegetables · {produce.length}
            </h3>
            <ul className="divide-y divide-line">{produce.map(line)}</ul>
          </section>
        )}
        {meat.length > 0 && (
          <section className="mx-5 mt-3 rounded-2xl bg-blood-soft/60 px-3 pt-3">
            <h3 className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-blood">
              <Beef size={14} /> Butcher’s Counter · cut to order
            </h3>
            <ul className="divide-y divide-blood/10">{meat.map(line)}</ul>
          </section>
        )}

        {hasEstimated && (
          <div className="mx-5 mt-4 flex gap-2 rounded-2xl bg-saffron-soft px-4 py-3 text-[12px] leading-snug text-[#7a5212]">
            <Info size={15} className="mt-0.5 shrink-0" />
            <span>
              <b>Est.</b> items are weighed when packed. You pay the exact weight, and never more than 10% over the estimate.
            </span>
          </div>
        )}

        <h3 className="mt-6 px-5 font-display text-[19px]">Forgotten something?</h3>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5">
          {['lemons', 'kale', 'carrots'].map((id) => {
            const p = byId(id)
            return (
              <div key={id} className="flex w-[180px] shrink-0 items-center gap-2 rounded-2xl bg-white p-2 ring-1 ring-line">
                <img src={p.image} alt="" className="size-11 rounded-xl bg-[#f3ece0] object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-semibold">{p.name}</div>
                  <div className="text-[11px] text-muted tabular-nums">{money(p.price)}</div>
                </div>
                <QuickAdd id={id} />
              </div>
            )
          })}
        </div>

        <div className="mx-5 mt-5 flex h-12 items-center gap-2 rounded-2xl bg-white pl-4 pr-1.5 ring-1 ring-line">
          <TagIcon size={16} className="text-muted" />
          {applied ? (
            <>
              <span className="flex-1 text-[13px] font-semibold text-leaf">{promo || 'FRESH5'} applied · −$5.00</span>
              <button onClick={() => (setApplied(false), setPromo(''))} className="px-3 text-[12px] font-semibold text-muted">
                Remove
              </button>
            </>
          ) : (
            <>
              <input value={promo} onChange={(e) => setPromo(e.target.value.toUpperCase())} placeholder="Promo code (try FRESH5)" className="w-full bg-transparent text-[13px] uppercase outline-none placeholder:normal-case placeholder:text-muted" />
              <button onClick={() => promo && setApplied(true)} className={cx('h-9 rounded-xl px-4 text-[12px] font-semibold', promo ? 'bg-ink text-white' : 'bg-paper text-muted')}>
                Apply
              </button>
            </>
          )}
        </div>

        <dl className="mx-5 mt-5 space-y-2 text-[13px]">
          <Row k="Subtotal" v={money(subtotal)} />
          <Row k="Delivery" v={delivery ? money(delivery) : 'Free'} accent={!delivery} />
          <Row k="Service fee" v={money(SERVICE)} info />
          {applied && <Row k="Promo" v={`−${money(discount)}`} accent />}
          <div className="flex justify-between border-t border-line pt-3 text-[15px] font-bold">
            <dt>Estimated total</dt>
            <dd className="tabular-nums">{money(total)}</dd>
          </div>
        </dl>
      </Scroll>
      <div className="shrink-0 border-t border-line bg-cream px-5 pt-3">
        <button onClick={() => go('checkout')} className="flex h-12 w-full items-center justify-between rounded-full bg-leaf pl-5 pr-2 text-[15px] font-semibold text-white active:scale-[0.99]">
          Checkout
          <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 tabular-nums">
            {money(total)} <ArrowRight size={15} />
          </span>
        </button>
      </div>
      <TabBar active="cart" />
    </div>
  )
}

function Row({ k, v, accent, info }: { k: string; v: string; accent?: boolean; info?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="flex items-center gap-1 text-muted">
        {k} {info && <Info size={12} />}
      </dt>
      <dd className={cx('font-medium tabular-nums', accent && 'text-leaf')}>{v}</dd>
    </div>
  )
}

/* 10 ------------------------------------------------------------------ */
const DAYS = [
  { d: 'Today', n: 12 },
  { d: 'Tue', n: 13 },
  { d: 'Wed', n: 14 },
  { d: 'Thu', n: 15 },
  { d: 'Fri', n: 16 },
  { d: 'Sat', n: 17 },
]
type Slot = { t: string; fee: number; state?: 'full' | 'few' | 'eco' }
const slotsFor = (day: number): Slot[] =>
  day === 0
    ? [
        { t: '12 – 2 PM', fee: 4.99, state: 'full' },
        { t: '2 – 4 PM', fee: 4.99, state: 'full' },
        { t: '4 – 6 PM', fee: 4.99, state: 'few' },
        { t: '6 – 8 PM', fee: 2.99, state: 'eco' },
        { t: '8 – 10 PM', fee: 4.99 },
      ]
    : [
        { t: '8 – 10 AM', fee: 3.99 },
        { t: '10 – 12 PM', fee: 2.99, state: 'eco' },
        { t: '12 – 2 PM', fee: 3.99 },
        { t: '4 – 6 PM', fee: 4.99, state: day === 2 ? 'full' : 'few' },
        { t: '6 – 8 PM', fee: 4.99 },
        { t: '8 – 10 PM', fee: 3.99 },
      ]

export function Checkout() {
  const { cart, subtotal, go, placeOrder } = useProto()
  const [day, setDay] = useState(0)
  const [slot, setSlot] = useState('4 – 6 PM')
  const [drop, setDrop] = useState('hand')
  const [sub, setSub] = useState<'best' | 'ask' | 'none'>('best')
  const [pay, setPay] = useState('apple')
  const [open, setOpen] = useState(false)
  const slots = slotsFor(day)
  const chosen = slots.find((s) => s.t === slot && s.state !== 'full')
  const fee = subtotal >= FREE_AT ? 0 : (chosen?.fee ?? 0)
  const total = subtotal + fee + SERVICE
  const hold = total * 1.1

  return (
    <div className="flex h-full flex-col bg-cream">
      <TopBar title="Checkout" sub={`${cart.reduce((a, i) => a + i.qty, 0)} items · secure`} right={<Lock size={16} className="mr-2 mt-2.5 text-muted" />} />
      <div className="flex shrink-0 items-center gap-2 px-5 pb-3">
        {['Delivery', 'Payment', 'Review'].map((s, i) => (
          <div key={s} className="flex flex-1 flex-col gap-1.5">
            <div className={cx('h-1 rounded-full', i === 0 ? 'bg-leaf' : i === 1 ? 'bg-leaf/50' : 'bg-line')} />
            <span className={cx('text-[11px] font-semibold', i === 0 ? 'text-leaf' : 'text-muted')}>
              {i + 1}. {s}
            </span>
          </div>
        ))}
      </div>
      <Scroll top={false} className="pb-6">
        <Card title="Deliver to" icon={<MapPin size={15} />} action="Change">
          <div className="flex gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-paper text-leaf">
              <Home size={17} />
            </span>
            <div className="text-[13px]">
              <div className="font-semibold">Home</div>
              <div className="text-muted">14 Elm Street, Apt 3B · 2041</div>
              <div className="text-muted">Layla Haddad · +1 555 0134</div>
            </div>
          </div>
        </Card>

        <Card title="Delivery slot" icon={<Truck size={15} />}>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
            {DAYS.map((d, i) => (
              <button
                key={d.n}
                onClick={() => {
                  setDay(i)
                  setSlot(slotsFor(i).find((s) => s.state !== 'full')!.t)
                }}
                className={cx('flex w-14 shrink-0 flex-col items-center rounded-2xl py-2 transition', i === day ? 'bg-ink text-white' : 'bg-paper ring-1 ring-line')}
              >
                <span className={cx('text-[11px]', i === day ? 'text-white/70' : 'text-muted')}>{d.d}</span>
                <span className="text-[17px] font-bold tabular-nums">{d.n}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {slots.map((s) => {
              const full = s.state === 'full'
              const on = s.t === slot && !full
              return (
                <button
                  key={s.t}
                  disabled={full}
                  onClick={() => setSlot(s.t)}
                  className={cx('rounded-xl px-3 py-2.5 text-left ring-1 transition', full ? 'cursor-not-allowed bg-paper text-muted/60 ring-line' : on ? 'bg-leaf-soft ring-2 ring-leaf' : 'bg-white ring-line')}
                >
                  <div className={cx('text-[13px] font-semibold', full && 'line-through')}>{s.t}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-[11px]">
                    {full ? (
                      'Fully booked'
                    ) : (
                      <>
                        <span className="tabular-nums text-muted">{subtotal >= FREE_AT ? 'Free' : money(s.fee)}</span>
                        {s.state === 'few' && <span className="font-semibold text-saffron">· 3 left</span>}
                        {s.state === 'eco' && (
                          <span className="flex items-center gap-0.5 font-semibold text-leaf">
                            · <Leaf size={10} /> Green
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-[11px] text-muted">
            <Leaf size={12} className="mt-0.5 shrink-0 text-leaf" /> Green slots cost less because a van is already on your street.
          </p>
        </Card>

        <Card title="Drop-off" icon={<DoorOpen size={15} />}>
          <Segmented
            value={drop}
            onChange={setDrop}
            options={[
              { v: 'hand', label: 'Hand to me', sub: 'Best for meat' },
              { v: 'door', label: 'At the door', sub: 'Photo on drop' },
              { v: 'concierge', label: 'Concierge', sub: 'Front desk' },
            ]}
          />
          <input placeholder="Notes for the driver (gate code, parking…)" className="mt-2 h-11 w-full rounded-xl bg-paper px-3 text-[13px] outline-none ring-1 ring-line placeholder:text-muted" />
          {drop === 'door' && (
            <p className="mt-2 flex items-start gap-1.5 text-[11px] text-[#7a5212]">
              <Info size={12} className="mt-0.5 shrink-0" /> Meat is packed with ice for 4 hours. Please refrigerate it as soon as you can.
            </p>
          )}
        </Card>

        <Card title="If something’s unavailable" icon={<RefreshCw size={15} />}>
          <Segmented
            value={sub}
            onChange={setSub}
            options={[
              { v: 'best', label: 'Best match', sub: 'Same or less' },
              { v: 'ask', label: 'Ask me', sub: 'In-app approval' },
              { v: 'none', label: 'Refund', sub: 'No substitutes' },
            ]}
          />
          <p className="mt-2 text-[11px] text-muted">Applies to every item unless you chose otherwise in the basket.</p>
        </Card>

        <Card title="Payment" icon={<CreditCard size={15} />}>
          <div className="space-y-2">
            {(
              [
                ['apple', <Smartphone key="a" size={16} />, 'Apple Pay', 'Default'],
                ['card', <CreditCard key="c" size={16} />, 'Visa •••• 4242', 'Exp 08/27'],
                ['cash', <Banknote key="b" size={16} />, 'Cash or card on delivery', 'Pay the driver'],
              ] as [string, ReactNode, string, string][]
            ).map(([v, icon, l, s]) => (
              <button key={v} onClick={() => setPay(v)} className={cx('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ring-1', pay === v ? 'bg-leaf-soft ring-leaf' : 'bg-white ring-line')}>
                <span className="grid size-8 place-items-center rounded-lg bg-paper">{icon}</span>
                <span className="flex-1">
                  <span className="block text-[13px] font-semibold">{l}</span>
                  <span className="block text-[11px] text-muted">{s}</span>
                </span>
                <span className={cx('grid size-5 place-items-center rounded-full ring-2', pay === v ? 'bg-leaf ring-leaf' : 'ring-line')}>{pay === v && <Check size={12} className="text-white" />}</span>
              </button>
            ))}
          </div>
          {pay !== 'cash' && (
            <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-snug text-muted">
              <Info size={12} className="mt-0.5 shrink-0" />
              <span>
                We place a temporary hold of <b className="text-ink tabular-nums">{money(hold)}</b> to cover weighed items, then charge the exact amount at packing.
              </span>
            </p>
          )}
        </Card>

        <div className="mx-5 mt-3 rounded-2xl bg-white ring-1 ring-line">
          <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between p-4 text-[14px] font-semibold">
            Order summary
            <span className="flex items-center gap-1 text-[13px] text-muted tabular-nums">
              {money(total)} <ChevronDown size={16} className={cx('transition', open && 'rotate-180')} />
            </span>
          </button>
          {open && (
            <div className="space-y-2 border-t border-line px-4 py-3 text-[12px]">
              {cart.map((i) => (
                <div key={i.key} className="flex justify-between gap-3">
                  <span className="truncate text-muted">
                    {i.qty} × {i.key === 'roast-box' ? 'Sunday Roast Box' : byId(i.productId).name}
                  </span>
                  <span className="tabular-nums">{money(i.qty * i.unitPrice)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-line pt-2">
                <span className="text-muted">Delivery · {slot}</span>
                <span className="tabular-nums">{fee ? money(fee) : 'Free'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Service fee</span>
                <span className="tabular-nums">{money(SERVICE)}</span>
              </div>
            </div>
          )}
        </div>
        <p className="mx-5 mt-3 text-center text-[11px] text-muted">You can edit this order until 2:00 PM today.</p>
      </Scroll>
      <BottomBar>
        <button
          disabled={!chosen || cart.length === 0}
          onClick={() => {
            placeOrder()
            go('tracking')
          }}
          className="flex h-12 w-full items-center justify-between rounded-full bg-leaf pl-5 pr-2 text-[15px] font-semibold text-white disabled:opacity-40"
        >
          {cart.length === 0 ? 'Basket is empty' : 'Place order'}
          <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 tabular-nums">
            {money(total)} <ChevronRight size={15} />
          </span>
        </button>
      </BottomBar>
    </div>
  )
}

function Card({ title, icon, action, children }: { title: string; icon: ReactNode; action?: string; children: ReactNode }) {
  return (
    <section className="mx-5 mt-3 rounded-2xl bg-white p-4 ring-1 ring-line">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[14px] font-semibold">
          <span className="text-leaf">{icon}</span>
          {title}
        </h3>
        {action && <button className="text-[12px] font-semibold text-leaf">{action}</button>}
      </div>
      {children}
    </section>
  )
}
