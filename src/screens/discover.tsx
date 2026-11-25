import { useState } from 'react'
import { ArrowRight, Bell, Check, ChevronDown, ChevronRight, Clock, Flame, Leaf, MapPin, Mic, Search, ScanLine, ShieldCheck, Sparkles, Truck, X, Beef, Salad, Apple, Carrot, Citrus, Drumstick, Egg, Croissant, Milk, Soup, Tag as TagIcon, History } from 'lucide-react'
import { IMG, PRODUCTS, byId, money } from '../data'
import { useProto } from '../proto'
import { WelcomeScreen } from '../../handoff/screens/01-welcome/WelcomeScreen'
import { mockCheckDelivery } from '../../handoff/screens/01-welcome/mock'
import { ProductCard, QuickAdd, Scroll, SectionHead, TabBar, cx } from '../ui'

/* 01 ------------------------------------------------------------------ */
// Rendered from the developer handoff package so the prototype and the delivered code never drift.
export function Welcome() {
  const { go } = useProto()
  return <WelcomeScreen defaultPostcode="2041" checkDelivery={mockCheckDelivery} onStartShopping={() => go('home')} onSignIn={() => go('account')} onJoinWaitlist={() => {}} />
}

export function Logo({ dark }: { dark?: boolean }) {
  return (
    <div className={cx('flex items-center gap-2', dark ? 'text-ink' : 'text-white')}>
      <span className={cx('grid size-8 place-items-center rounded-full', dark ? 'bg-leaf text-white' : 'bg-white/15 ring-1 ring-white/30 backdrop-blur')}>
        <Leaf size={16} />
      </span>
      <span className="font-display text-[19px] tracking-[-0.01em]">
        Field <span className="italic opacity-70">&</span> Cleaver
      </span>
    </div>
  )
}

/* 02 ------------------------------------------------------------------ */
const shortcuts = [
  { label: 'Vegetables', img: IMG.carrots, to: 'listing' as const },
  { label: 'Fruits', img: IMG.strawberries, to: 'listing' as const },
  { label: 'Greens', img: IMG.kale, to: 'listing' as const },
  { label: 'Citrus', img: IMG.lemons, to: 'listing' as const },
  { label: 'Beef & lamb', img: IMG.ribeye, to: 'butcher' as const },
  { label: 'Poultry', img: IMG.chicken, to: 'butcher' as const },
]

export function HomeScreen() {
  const { go, cart } = useProto()
  const again = ['avocados', 'lemons', 'kale', 'carrots'].map(byId)
  const season = ['tomatoes', 'strawberries', 'carrots', 'kale'].map(byId)
  const roastInCart = cart.some((c) => c.key === 'roast-box')
  const { add, notify } = useProto()
  return (
    <div className="flex h-full flex-col bg-cream">
      <Scroll className="pb-6">
        {/* Context header */}
        <div className="flex items-center justify-between px-5">
          <button className="text-left">
            <div className="text-[11px] font-medium text-muted">Deliver to</div>
            <div className="flex items-center gap-1 text-[15px] font-semibold">
              Home · 14 Elm Street <ChevronDown size={15} />
            </div>
          </button>
          <button aria-label="Notifications" className="relative grid size-10 place-items-center rounded-full bg-white ring-1 ring-line">
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-blood ring-2 ring-white" />
          </button>
        </div>
        <div className="mt-3 px-5">
          <div className="flex items-center gap-2 rounded-full bg-leaf-soft px-3 py-1.5 text-[12px] font-medium text-leaf">
            <Truck size={14} />
            Next delivery <b className="font-semibold">Today, 4–6 PM</b>
            <span className="ml-auto flex items-center text-[11px] font-semibold">
              Change <ChevronRight size={13} />
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-3 px-5">
          <button onClick={() => go('search')} className="flex h-12 w-full items-center gap-3 rounded-2xl bg-white px-4 text-left text-[14px] text-muted ring-1 ring-line">
            <Search size={18} className="text-ink" />
            Search tomatoes, ribeye, herbs…
            <span className="ml-auto flex items-center gap-3 text-ink">
              <Mic size={17} />
              <ScanLine size={17} />
            </span>
          </button>
        </div>

        {/* Hero */}
        <div className="mt-4 px-5">
          <div className="relative h-[184px] overflow-hidden rounded-3xl">
            <img src={IMG.heroProduce} alt="" className="absolute inset-0 size-full object-cover object-left" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#f1e9da] via-[#f1e9da]/85 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-start justify-center pl-[44%] pr-4">
              <span className="w-fit rounded-full bg-saffron-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-saffron">This week</span>
              <h2 className="mt-2 font-display text-[21px] leading-[1.05] tracking-[-0.01em]">Late-summer<br />harvest</h2>
              <p className="mt-1 text-[12px] leading-snug text-muted">Heirloom tomatoes, figs & stone fruit, up to 20% off</p>
              <button onClick={() => go('listing')} className="mt-3 flex w-fit items-center gap-1 rounded-full bg-ink px-3.5 py-2 text-[12px] font-semibold text-white">
                Shop the harvest <ArrowRight size={13} />
              </button>
            </div>
          </div>
          <div className="mt-2 flex justify-center gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-ink" />
            <span className="size-1.5 rounded-full bg-line" />
            <span className="size-1.5 rounded-full bg-line" />
          </div>
        </div>

        {/* Shortcuts */}
        <div className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4 px-5">
          {shortcuts.map((s) => (
            <button key={s.label} onClick={() => go(s.to)} className="flex flex-col items-center gap-1.5">
              <span className={cx('size-[76px] overflow-hidden rounded-full ring-1', s.to === 'butcher' ? 'bg-blood-soft ring-blood/15' : 'bg-[#f3ece0] ring-line')}>
                <img src={s.img} alt="" className="size-full scale-110 object-cover" />
              </span>
              <span className="text-[12px] font-semibold">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Order again */}
        <SectionHead title="Order again" action="See all" className="mt-7" />
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5">
          {again.map((p) => (
            <div key={p.id} className="flex w-[172px] shrink-0 items-center gap-2 rounded-2xl bg-white p-2 ring-1 ring-line">
              <img src={p.image} alt="" className="size-12 rounded-xl bg-[#f3ece0] object-cover" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-semibold">{p.name}</div>
                <div className="text-[11px] text-muted tabular-nums">{money(p.price)}</div>
              </div>
              <QuickAdd id={p.id} />
            </div>
          ))}
        </div>

        {/* Butcher feature */}
        <div className="mt-7 px-5">
          <button onClick={() => go('butcher')} className="relative block h-[200px] w-full overflow-hidden rounded-3xl bg-blood-deep text-left text-white">
            <img src={IMG.heroButcher} alt="" className="absolute inset-0 size-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-blood-deep via-blood-deep/40 to-transparent" />
            <div className="absolute inset-x-5 bottom-4">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e9c2b6]">
                <Beef size={13} /> The Butcher’s Counter
              </div>
              <div className="mt-1 font-display text-[24px] leading-tight">Cut to your order</div>
              <div className="mt-1 flex items-center justify-between text-[12px] text-white/75">
                <span>Thickness, trim & pack, your way</span>
                <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 font-semibold text-white backdrop-blur">
                  <Clock size={12} /> Order by 2 PM
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* In season */}
        <SectionHead title="In season now" action="See all" onAction={() => go('listing')} className="mt-7" />
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-5">
          {season.map((p) => (
            <ProductCard key={p.id} p={p} width="w-[150px] shrink-0" />
          ))}
        </div>

        {/* Bundle */}
        <SectionHead title="Ready-made boxes" className="mt-7" />
        <div className="mt-3 px-5">
          <div className="flex gap-3 rounded-3xl bg-paper p-3 ring-1 ring-line">
            <div className="grid size-[96px] shrink-0 grid-cols-2 gap-1 overflow-hidden rounded-2xl">
              {[IMG.lamb, IMG.carrots, IMG.lemons, IMG.kale].map((s, i) => (
                <img key={i} src={s} alt="" className="size-full bg-[#f3ece0] object-cover" />
              ))}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-saffron">Serves 4 · Save 15%</div>
              <div className="font-display text-[17px] leading-tight">Sunday Roast Box</div>
              <div className="mt-0.5 text-[11px] leading-snug text-muted">Lamb rack, rainbow carrots, kale, Meyer lemons & a recipe card</div>
              <div className="mt-auto flex items-center justify-between pt-1">
                <span className="text-[14px] font-bold tabular-nums">
                  {money(38.9)} <span className="text-[11px] font-normal text-muted line-through">{money(45.8)}</span>
                </span>
                <button
                  onClick={() => {
                    if (roastInCart) return go('cart')
                    add({ key: 'roast-box', productId: 'lamb', unitPrice: 38.9, summary: 'Sunday Roast Box · serves 4', estimated: false })
                    notify('Sunday Roast Box added')
                  }}
                  className="rounded-full bg-leaf px-3 py-1.5 text-[12px] font-semibold text-white"
                >
                  {roastInCart ? 'In basket' : 'Add box'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-5 mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-line px-4 py-3 text-[12px] text-muted">
          <ShieldCheck size={18} className="shrink-0 text-leaf" />
          Freshness guarantee: not happy with something? Refund in one tap, no photos needed.
        </div>
      </Scroll>
      <TabBar active="home" />
    </div>
  )
}

/* 03 ------------------------------------------------------------------ */
export function Browse() {
  const { go } = useProto()
  const produce: [typeof Carrot, string, number][] = [
    [Carrot, 'Vegetables', 128],
    [Apple, 'Fruits', 94],
    [Salad, 'Leafy greens & salad', 36],
    [Leaf, 'Fresh herbs', 22],
    [Citrus, 'Citrus', 18],
    [Soup, 'Pre-cut & ready to cook', 27],
  ]
  const meat: [typeof Carrot, string, number][] = [
    [Beef, 'Beef', 42],
    [Beef, 'Lamb & goat', 24],
    [Drumstick, 'Poultry', 31],
    [Flame, 'Marinated & BBQ', 16],
    [Beef, 'Mince, kofta & sausages', 19],
    [Soup, 'Bones, stock & offal', 11],
  ]
  const Row = ({ icon: I, label, n, onClick, tone }: { icon: typeof Carrot; label: string; n: number; onClick: () => void; tone: 'leaf' | 'blood' }) => (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3 text-left">
      <span className={cx('grid size-8 place-items-center rounded-full', tone === 'leaf' ? 'bg-leaf-soft text-leaf' : 'bg-blood-soft text-blood')}>
        <I size={15} />
      </span>
      <span className="flex-1 text-[14px] font-medium">{label}</span>
      <span className="text-[12px] text-muted tabular-nums">{n}</span>
      <ChevronRight size={16} className="text-muted" />
    </button>
  )
  return (
    <div className="flex h-full flex-col bg-cream">
      <Scroll className="pb-6">
        <div className="px-5">
          <h1 className="font-display text-[30px] tracking-[-0.02em]">Browse</h1>
          <button onClick={() => go('search')} className="mt-3 flex h-11 w-full items-center gap-3 rounded-2xl bg-white px-4 text-[14px] text-muted ring-1 ring-line">
            <Search size={17} className="text-ink" /> Search 640 products
          </button>
          <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
            {[
              [Leaf, 'Organic'],
              [MapPin, 'Local'],
              [ShieldCheck, 'Halal'],
              [TagIcon, 'Offers'],
              [Sparkles, 'New in'],
            ].map(([I, l]) => {
              const Icon = I as typeof Leaf
              return (
                <button key={l as string} onClick={() => go('listing')} className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-[12px] font-semibold ring-1 ring-line">
                  <Icon size={14} /> {l as string}
                </button>
              )
            })}
          </div>
        </div>

        {/* Produce dept */}
        <div className="mx-5 mt-5 overflow-hidden rounded-3xl bg-white ring-1 ring-line">
          <button onClick={() => go('listing')} className="relative block h-28 w-full text-left">
            <img src={IMG.heroProduce} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-leaf-deep/85 to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <div className="font-display text-[21px] leading-tight">Fruit & Vegetables</div>
              <div className="text-[12px] text-white/75">325 products · 30 local farms</div>
            </div>
          </button>
          <div className="divide-y divide-line">
            {produce.map(([I, l, n]) => (
              <Row key={l} icon={I} label={l} n={n} tone="leaf" onClick={() => go('listing')} />
            ))}
          </div>
        </div>

        {/* Butchery dept */}
        <div className="mx-5 mt-4 overflow-hidden rounded-3xl bg-white ring-1 ring-line">
          <button onClick={() => go('butcher')} className="relative block h-28 w-full text-left">
            <img src={IMG.heroButcher} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-blood-deep/90 to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <div className="font-display text-[21px] leading-tight">Butcher’s Counter</div>
              <div className="text-[12px] text-white/75">143 cuts · cut to order daily</div>
            </div>
          </button>
          <div className="divide-y divide-line">
            {meat.map(([I, l, n]) => (
              <Row key={l} icon={I} label={l} n={n} tone="blood" onClick={() => go('butcher')} />
            ))}
          </div>
        </div>

        <SectionHead title="Pantry pairings" className="mt-6" />
        <div className="mt-3 grid grid-cols-4 gap-2 px-5">
          {[
            [Egg, 'Eggs'],
            [Milk, 'Dairy'],
            [Croissant, 'Bakery'],
            [Sparkles, 'Spices'],
          ].map(([I, l]) => {
            const Icon = I as typeof Egg
            return (
              <div key={l as string} className="flex flex-col items-center gap-1.5 rounded-2xl bg-paper py-3 text-[12px] font-semibold ring-1 ring-line">
                <Icon size={20} className="text-saffron" />
                {l as string}
              </div>
            )
          })}
        </div>
      </Scroll>
      <TabBar active="browse" />
    </div>
  )
}

/* 04 ------------------------------------------------------------------ */
export function SearchScreen() {
  const { back, go } = useProto()
  const [q, setQ] = useState('')
  const [recent, setRecent] = useState(['ribeye', 'avocado', 'chicken thighs', 'mint'])
  const term = q.trim().toLowerCase()
  const hits = term ? PRODUCTS.filter((p) => (p.name + ' ' + p.category + ' ' + p.short).toLowerCase().includes(term)) : []
  const groups = [
    { label: 'Fruit & Vegetables', items: hits.filter((p) => p.dept === 'produce') },
    { label: 'Butcher’s Counter', items: hits.filter((p) => p.dept === 'butchery') },
  ].filter((g) => g.items.length)

  const hl = (s: string) => {
    const i = s.toLowerCase().indexOf(term)
    if (!term || i < 0) return s
    return (
      <>
        {s.slice(0, i)}
        <mark className="bg-saffron-soft text-ink">{s.slice(i, i + term.length)}</mark>
        {s.slice(i + term.length)}
      </>
    )
  }

  return (
    <div className="flex h-full flex-col bg-cream">
      <div className="flex items-center gap-2 px-4 pb-3 pt-12">
        <div className="flex h-11 flex-1 items-center gap-2 rounded-2xl bg-white px-3 ring-2 ring-leaf">
          <Search size={17} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, cuts, recipes" className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted" />
          {q ? (
            <button aria-label="Clear" onClick={() => setQ('')} className="grid size-5 place-items-center rounded-full bg-muted/20">
              <X size={12} />
            </button>
          ) : (
            <Mic size={17} className="text-muted" />
          )}
        </div>
        <button onClick={back} className="px-1 text-[14px] font-semibold text-leaf">
          Cancel
        </button>
      </div>
      <Scroll top={false} className="pb-8">
        {!term && (
          <>
            <div className="flex items-center justify-between px-5">
              <h4 className="text-[12px] font-semibold uppercase tracking-wider text-muted">Recent</h4>
              {recent.length > 0 && (
                <button onClick={() => setRecent([])} className="text-[12px] font-semibold text-leaf">
                  Clear
                </button>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2 px-5">
              {recent.length === 0 && <span className="text-[13px] text-muted">No recent searches</span>}
              {recent.map((r) => (
                <span key={r} className="flex h-9 items-center gap-1.5 rounded-full bg-white pl-3 pr-1.5 text-[13px] ring-1 ring-line">
                  <History size={13} className="text-muted" />
                  <button onClick={() => setQ(r.split(' ')[0])}>{r}</button>
                  <button aria-label={`Remove ${r}`} onClick={() => setRecent(recent.filter((x) => x !== r))} className="grid size-6 place-items-center rounded-full text-muted">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            <h4 className="mt-6 px-5 text-[12px] font-semibold uppercase tracking-wider text-muted">Trending this week</h4>
            <ol className="mt-1 px-5">
              {['tomato', 'lamb', 'strawberries', 'mince', 'kale'].map((t, i) => (
                <li key={t}>
                  <button onClick={() => setQ(t)} className="flex w-full items-center gap-3 border-b border-line py-3 text-left text-[14px]">
                    <span className="w-4 text-[12px] font-bold text-saffron tabular-nums">{i + 1}</span>
                    <span className="flex-1 capitalize">{t}</span>
                    <ArrowRight size={15} className="-rotate-45 text-muted" />
                  </button>
                </li>
              ))}
            </ol>

            <h4 className="mt-6 px-5 text-[12px] font-semibold uppercase tracking-wider text-muted">Shop by occasion</h4>
            <div className="mt-2 grid grid-cols-2 gap-2 px-5">
              {[
                ['Weekend BBQ', IMG.ribeye, 'bg-blood-soft'],
                ['Quick weeknight', IMG.chicken, 'bg-paper'],
                ['Smoothie bar', IMG.strawberries, 'bg-saffron-soft'],
                ['Big salad', IMG.kale, 'bg-leaf-soft'],
              ].map(([l, img, bg]) => (
                <button key={l} onClick={() => setQ(l === 'Weekend BBQ' ? 'beef' : l === 'Big salad' ? 'kale' : l === 'Smoothie bar' ? 'berr' : 'chicken')} className={cx('flex h-16 items-center gap-2 overflow-hidden rounded-2xl pl-3 text-left text-[13px] font-semibold', bg)}>
                  <span className="flex-1">{l}</span>
                  <img src={img} alt="" className="h-full w-16 object-cover" />
                </button>
              ))}
            </div>
          </>
        )}

        {term && groups.length > 0 && (
          <div className="px-5">
            <div className="text-[12px] text-muted">
              {hits.length} result{hits.length > 1 && 's'} for “{q}”
            </div>
            {groups.map((g) => (
              <div key={g.label} className="mt-4">
                <h4 className="text-[12px] font-semibold uppercase tracking-wider text-muted">{g.label}</h4>
                <ul className="mt-1 divide-y divide-line">
                  {g.items.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 py-2.5">
                      <button onClick={() => go(p.dept === 'butchery' ? 'cut' : 'produce', p.id)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                        <img src={p.image} alt="" className="size-12 rounded-xl bg-[#f3ece0] object-cover" />
                        <div className="min-w-0">
                          <div className="truncate text-[14px] font-semibold">{hl(p.name)}</div>
                          <div className="truncate text-[12px] text-muted">
                            {money(p.price)}
                            {p.unit === 'kg' ? '/kg' : ` ${p.unit}`} · {p.short}
                          </div>
                        </div>
                      </button>
                      <QuickAdd id={p.id} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {term && groups.length === 0 && (
          <div className="flex flex-col items-center px-8 pt-10 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-paper">
              <Search size={22} className="text-muted" />
            </span>
            <div className="mt-3 font-display text-[20px]">Nothing for “{q}” yet</div>
            <p className="mt-1 text-[13px] text-muted">Check the spelling, or try one of these:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {['tomato', 'lamb', 'lemon'].map((t) => (
                <button key={t} onClick={() => setQ(t)} className="h-9 rounded-full bg-white px-3 text-[13px] font-semibold ring-1 ring-line">
                  {t}
                </button>
              ))}
            </div>
            <button className="mt-5 text-[13px] font-semibold text-leaf underline underline-offset-2">Request this product</button>
          </div>
        )}
      </Scroll>
    </div>
  )
}
