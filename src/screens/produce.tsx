import { useState, type ReactNode } from 'react'
import { ArrowUpDown, ChevronDown, Info, MapPin, Share2, SlidersHorizontal, Sprout, Star, Sun, Timer, ShoppingBasket, ChevronLeft } from 'lucide-react'
import { PRODUCTS, byId, money, unitLabel } from '../data'
import { useProto } from '../proto'
import { BottomBar, FavBtn, IconBtn, ProductCard, QuickAdd, Scroll, Segmented, Stepper, Tag, TopBar, cx } from '../ui'

/* 05 ------------------------------------------------------------------ */
const FILTERS = ['Organic', 'Local', 'In season', 'On offer'] as const

export function Listing() {
  const { go, count } = useProto()
  const [tab, setTab] = useState('All')
  const [on, setOn] = useState<string[]>([])
  const tabs = ['All', 'Vegetables', 'Fruits', 'Leafy greens', 'Citrus', 'Herbs']
  const items = PRODUCTS.filter((p) => p.dept === 'produce')
    .filter((p) => tab === 'All' || p.category === tab)
    .filter((p) => on.every((f) => (p.tags as string[]).includes(f)))
  return (
    <div className="flex h-full flex-col bg-cream">
      <TopBar
        title="Fruit & Vegetables"
        sub="325 products · delivered today"
        right={
          <IconBtn label="Basket" onClick={() => go('cart')} className="relative">
            <ShoppingBasket size={17} />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blood px-1 text-[9px] font-bold text-white">{count}</span>}
          </IconBtn>
        }
      />
      <div className="no-scrollbar flex shrink-0 gap-5 overflow-x-auto border-b border-line px-5">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cx('relative shrink-0 pb-2.5 text-[14px] font-semibold', t === tab ? 'text-ink' : 'text-muted')}>
            {t}
            {t === tab && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-leaf" />}
          </button>
        ))}
      </div>
      <div className="no-scrollbar flex shrink-0 gap-2 overflow-x-auto px-5 py-3">
        <button className="flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 text-[12px] font-semibold text-white">
          <SlidersHorizontal size={13} /> Filter{on.length > 0 && ` (${on.length})`}
        </button>
        {FILTERS.map((f) => {
          const a = on.includes(f)
          return (
            <button key={f} aria-pressed={a} onClick={() => setOn(a ? on.filter((x) => x !== f) : [...on, f])} className={cx('h-8 shrink-0 rounded-full px-3 text-[12px] font-semibold transition', a ? 'bg-leaf text-white' : 'bg-white ring-1 ring-line')}>
              {f}
            </button>
          )
        })}
      </div>
      <Scroll top={false} className="pb-6">
        <div className="flex items-center justify-between px-5 pb-3 text-[12px]">
          <span className="text-muted">
            <b className="text-ink tabular-nums">{items.length}</b> items
          </span>
          <button className="flex items-center gap-1 font-semibold">
            <ArrowUpDown size={13} /> Recommended <ChevronDown size={13} />
          </button>
        </div>
        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-5">
            {items.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="mx-5 flex flex-col items-center rounded-3xl bg-paper px-6 py-10 text-center">
            <Sprout size={26} className="text-leaf" />
            <div className="mt-2 font-display text-[19px]">No matches for these filters</div>
            <p className="mt-1 text-[13px] text-muted">Try removing one, availability changes with the season.</p>
            <button onClick={() => setOn([])} className="mt-4 h-10 rounded-full bg-leaf px-4 text-[13px] font-semibold text-white">
              Clear filters
            </button>
          </div>
        )}
        <div className="mx-5 mt-6 flex items-start gap-2 rounded-2xl bg-leaf-soft px-4 py-3 text-[12px] text-leaf">
          <Info size={15} className="mt-0.5 shrink-0" />
          Prices marked “/kg” are weighed at packing. You only pay for the exact weight you receive.
        </div>
      </Scroll>
    </div>
  )
}

/* 06 ------------------------------------------------------------------ */
type Sub = 'best' | 'choose' | 'refund'

export function ProduceDetail() {
  const { param, back, add, notify, go } = useProto()
  const p = byId(param && byId(param)?.dept === 'produce' ? param : 'avocados')
  const [qty, setQty] = useState(p.unit === 'kg' ? 1 : p.ripeness ? 3 : 1)
  const [weight, setWeight] = useState(p.weights?.[1] ?? 1)
  const [ripe, setRipe] = useState<'today' | 'later'>('today')
  const [sub, setSub] = useState<Sub>('best')
  const [open, setOpen] = useState<string | null>('About')

  const unitPrice = p.unit === 'kg' ? p.price * weight : p.price
  const total = unitPrice * qty
  const summary = p.unit === 'kg' ? `${weight >= 1 ? `${weight} kg` : `${weight * 1000} g`}` : p.ripeness ? (ripe === 'today' ? 'Ready to eat today' : 'Ripe in 2–3 days') : p.unitNote ? `${p.unit} · ${p.unitNote}` : p.unit
  const pairs = PRODUCTS.filter((x) => x.id !== p.id && x.dept === 'produce').slice(0, 3)

  return (
    <div className="flex h-full flex-col bg-cream">
      <Scroll top={false} className="pb-6">
        <div className="relative bg-[#f1eadc] pb-6 pt-12">
          <div className="absolute inset-x-4 top-12 z-10 flex justify-between">
            <IconBtn label="Back" onClick={back}>
              <ChevronLeft size={20} />
            </IconBtn>
            <div className="flex gap-2">
              <IconBtn label="Share">
                <Share2 size={16} />
              </IconBtn>
              <FavBtn id={p.id} className="size-9" />
            </div>
          </div>
          <img src={p.image} alt={p.name} className="mx-auto aspect-square w-[78%] object-cover mix-blend-multiply" />
          <div className="flex justify-center gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-ink" />
            <span className="size-1.5 rounded-full bg-ink/20" />
            <span className="size-1.5 rounded-full bg-ink/20" />
          </div>
        </div>

        <div className="-mt-4 rounded-t-[28px] bg-cream px-5 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <Tag key={t} t={t} />
            ))}
          </div>
          <h1 className="mt-2 font-display text-[28px] leading-tight tracking-[-0.02em]">{p.name}</h1>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
            <Star size={13} className="fill-saffron text-saffron" />
            <b className="text-ink">{p.rating}</b> ({p.reviews} reviews) · {p.short}
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-line rounded-2xl bg-white py-3 text-center ring-1 ring-line">
            <div className="px-2">
              <MapPin size={15} className="mx-auto text-leaf" />
              <div className="mt-1 truncate text-[12px] font-semibold">{p.origin}</div>
              <div className="text-[10px] text-muted">Grower</div>
            </div>
            <div className="px-2">
              <Sprout size={15} className="mx-auto text-leaf" />
              <div className="mt-1 text-[12px] font-semibold">{p.distance ?? 'Imported'}</div>
              <div className="text-[10px] text-muted">Food miles</div>
            </div>
            <div className="px-2">
              <Sun size={15} className="mx-auto text-saffron" />
              <div className="mt-1 truncate text-[12px] font-semibold">{p.harvested}</div>
              <div className="text-[10px] text-muted">Freshness</div>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[24px] font-bold tabular-nums">{money(p.price)}</span>
                <span className="text-[13px] text-muted">{unitLabel(p).trim()}</span>
                {p.was && <span className="text-[13px] text-muted line-through">{money(p.was)}</span>}
              </div>
              {p.perKg && <div className="text-[11px] text-muted tabular-nums">{p.unitNote} · {money(p.perKg)}/kg</div>}
            </div>
            {p.was && <span className="rounded-full bg-blood px-2 py-1 text-[11px] font-bold text-white">Save {Math.round((1 - p.price / p.was) * 100)}%</span>}
          </div>

          {p.ripeness && (
            <Field label="When will you eat them?">
              <Segmented
                value={ripe}
                onChange={setRipe}
                options={[
                  { v: 'today', label: 'Ready today', sub: 'Soft, eat in 1–2 days' },
                  { v: 'later', label: 'Ripen at home', sub: 'Firm, ready in 2–3 days' },
                ]}
              />
            </Field>
          )}

          {p.weights && (
            <Field label="Choose weight" hint={p.piecesPerKg}>
              <Segmented value={String(weight)} onChange={(v) => setWeight(Number(v))} options={p.weights.map((w) => ({ v: String(w), label: w < 1 ? `${w * 1000} g` : `${w} kg`, sub: money(p.price * w) }))} />
            </Field>
          )}

          <Field label="Quantity">
            <div className="flex items-center justify-between rounded-2xl bg-white p-2 pl-4 ring-1 ring-line">
              <span className="text-[13px] text-muted">
                {p.unit === 'kg' ? 'Packs' : p.unit === 'each' ? 'Pieces' : p.unit === 'bunch' ? 'Bunches' : 'Punnets'}
              </span>
              <Stepper value={qty} onChange={setQty} min={1} tone="light" />
            </div>
          </Field>

          <Field label="If it’s unavailable">
            <div className="space-y-2">
              {(
                [
                  ['best', 'Best match', 'Similar item, same or lower price'],
                  ['choose', 'Let me choose', 'We’ll message you before packing'],
                  ['refund', 'Don’t replace', 'Refund this item'],
                ] as [Sub, string, string][]
              ).map(([v, l, s]) => (
                <button key={v} onClick={() => setSub(v)} className={cx('flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left ring-1 transition', sub === v ? 'bg-leaf-soft ring-leaf' : 'bg-white ring-line')}>
                  <span className={cx('grid size-5 place-items-center rounded-full ring-2', sub === v ? 'ring-leaf' : 'ring-line')}>{sub === v && <span className="size-2.5 rounded-full bg-leaf" />}</span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-semibold">{l}</span>
                    <span className="block text-[12px] text-muted">{s}</span>
                  </span>
                </button>
              ))}
            </div>
          </Field>

          <div className="mt-6 divide-y divide-line border-y border-line">
            {[
              ['About', <p key="a">{p.about}</p>],
              ['Storage & freshness', <p key="s" className="flex gap-2"><Timer size={15} className="mt-0.5 shrink-0 text-leaf" />{p.storage}</p>],
              [
                'Nutrition per 100 g',
                <dl key="n" className="grid grid-cols-2 gap-2">
                  {p.nutrition.map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-white px-3 py-2 ring-1 ring-line">
                      <dt className="text-[11px] text-muted">{k}</dt>
                      <dd className="text-[14px] font-semibold tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>,
              ],
            ].map(([title, body]) => (
              <div key={title as string}>
                <button onClick={() => setOpen(open === title ? null : (title as string))} className="flex w-full items-center justify-between py-3.5 text-[15px] font-semibold">
                  {title as string}
                  <ChevronDown size={17} className={cx('transition', open === title && 'rotate-180')} />
                </button>
                {open === title && <div className="pb-4 text-[13px] leading-relaxed text-muted">{body}</div>}
              </div>
            ))}
          </div>

          <h3 className="mt-6 font-display text-[19px]">Pairs well with</h3>
          <div className="mt-3 space-y-2">
            {pairs.map((x) => (
              <div key={x.id} className="flex items-center gap-3 rounded-2xl bg-white p-2 ring-1 ring-line">
                <button onClick={() => go('produce', x.id)} className="flex flex-1 items-center gap-3 text-left">
                  <img src={x.image} alt="" className="size-12 rounded-xl bg-[#f3ece0] object-cover" />
                  <div>
                    <div className="text-[13px] font-semibold">{x.name}</div>
                    <div className="text-[11px] text-muted tabular-nums">
                      {money(x.price)}
                      {unitLabel(x)}
                    </div>
                  </div>
                </button>
                <QuickAdd id={x.id} />
              </div>
            ))}
          </div>
        </div>
      </Scroll>
      <BottomBar>
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[11px] text-muted">{p.unit === 'kg' ? 'Estimated total' : 'Total'}</div>
            <div className="text-[20px] font-bold tabular-nums">{money(total)}</div>
          </div>
          <button
            onClick={() => {
              add({ key: `${p.id}-${summary}`, productId: p.id, unitPrice, summary, estimated: p.unit === 'kg' }, qty)
              notify(`${qty} × ${p.name} added`)
            }}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-leaf text-[15px] font-semibold text-white active:scale-[0.98]"
          >
            <ShoppingBasket size={17} /> Add to basket
          </button>
        </div>
      </BottomBar>
    </div>
  )
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[13px] font-semibold">{label}</span>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  )
}
