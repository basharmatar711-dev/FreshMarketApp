import { useEffect, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, BatteryFull, Check, ChevronRight, Leaf, LayoutGrid, Smartphone, Signal, Wifi, Plus, Minus } from 'lucide-react'
import { SCREENS, STAGES, meta, type ScreenId } from './data'
import { ProtoProvider, useProto } from './proto'
import { cx } from './ui'
import { Browse, HomeScreen, SearchScreen, Welcome } from './screens/discover'
import { Listing, ProduceDetail } from './screens/produce'
import { ButcherCounter, CutConfigurator } from './screens/butchery'
import { Cart, Checkout } from './screens/purchase'
import { Account, Tracking } from './screens/after'

const VIEWS: Record<ScreenId, () => ReactNode> = {
  welcome: Welcome,
  home: HomeScreen,
  browse: Browse,
  search: SearchScreen,
  listing: Listing,
  produce: ProduceDetail,
  butcher: ButcherCounter,
  cut: CutConfigurator,
  cart: Cart,
  checkout: Checkout,
  tracking: Tracking,
  account: Account,
}

const STAGE_TONE: Record<string, string> = {
  Onboard: 'bg-[#e9d9b4] text-[#5b4413]',
  Discover: 'bg-leaf-soft text-leaf',
  'Fruit & Veg': 'bg-leaf-soft text-leaf',
  Butchery: 'bg-blood-soft text-blood',
  Purchase: 'bg-saffron-soft text-[#7a5212]',
  Fulfil: 'bg-white text-ink ring-1 ring-line',
  Retain: 'bg-white text-ink ring-1 ring-line',
}

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('home')
  const [mode, setMode] = useState<'proto' | 'overview'>('proto')
  const open = (s: ScreenId) => {
    setScreen(s)
    setMode('proto')
  }
  return (
    <ProtoProvider screen={screen} onScreen={setScreen}>
      <div className="flex h-dvh overflow-hidden">
        <Sidebar screen={screen} mode={mode} setMode={setMode} open={open} />
        {mode === 'proto' ? <Stage screen={screen} /> : <Overview open={open} />}
      </div>
    </ProtoProvider>
  )
}

/* ------------------------------------------------------------------ */
function Sidebar({ screen, mode, setMode, open }: { screen: ScreenId; mode: string; setMode: (m: 'proto' | 'overview') => void; open: (s: ScreenId) => void }) {
  const { go } = useProto()
  return (
    <aside className="no-scrollbar hidden w-[280px] shrink-0 flex-col overflow-y-auto border-r border-black/5 bg-paper/70 px-5 py-6 md:flex">
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-full bg-leaf text-white">
          <Leaf size={16} />
        </span>
        <div>
          <div className="font-display text-[17px] leading-tight">
            Field <span className="italic text-muted">&</span> Cleaver
          </div>
          <div className="text-[11px] text-muted">Grocery & butchery · Mobile UX</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-black/5 p-1">
        {(
          [
            ['proto', 'Prototype', <Smartphone key="p" size={14} />],
            ['overview', 'Flow & system', <LayoutGrid key="o" size={14} />],
          ] as const
        ).map(([m, l, i]) => (
          <button key={m} onClick={() => setMode(m)} className={cx('flex h-8 items-center justify-center gap-1.5 rounded-lg text-[12px] font-semibold transition', mode === m ? 'bg-white shadow-sm' : 'text-muted')}>
            {i} {l}
          </button>
        ))}
      </div>

      <nav className="mt-6 space-y-5">
        {STAGES.map((st) => (
          <div key={st}>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{st}</div>
            <ul>
              {SCREENS.filter((s) => s.stage === st).map((s) => {
                const on = mode === 'proto' && s.id === screen
                return (
                  <li key={s.id}>
                    <button onClick={() => (mode === 'proto' ? go(s.id) : open(s.id))} className={cx('flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition', on ? 'bg-ink text-white' : 'hover:bg-black/5')}>
                      <span className={cx('font-mono text-[11px] tabular-nums', on ? 'text-white/60' : 'text-muted')}>{s.n}</span>
                      <span className="flex-1 truncate font-medium">{s.title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
      <p className="mt-auto pt-6 text-[11px] leading-relaxed text-muted">Everything in the phone is interactive: filters, basket, configurator, slot picker and checkout all work.</p>
    </aside>
  )
}

/* ------------------------------------------------------------------ */
function usePhoneScale() {
  const calc = () => Math.min(1, (window.innerHeight - 96) / 864)
  const [s, setS] = useState(calc)
  useEffect(() => {
    const on = () => setS(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return Math.max(0.55, s)
}

function Stage({ screen }: { screen: ScreenId }) {
  const { go } = useProto()
  const scale = usePhoneScale()
  const m = meta(screen)
  const idx = SCREENS.findIndex((s) => s.id === screen)
  const prev = SCREENS[idx - 1]
  const next = SCREENS[idx + 1]
  return (
    <main className="flex min-w-0 flex-1 overflow-hidden">
      <section className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 px-4 py-4">
        <div style={{ width: 410 * scale, height: 864 * scale }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <Phone light={!!m.lightStatus} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button disabled={!prev} onClick={() => prev && go(prev.id)} aria-label="Previous screen" className="grid size-9 place-items-center rounded-full bg-white/70 ring-1 ring-black/5 disabled:opacity-30">
            <ArrowLeft size={16} />
          </button>
          <span className="min-w-[140px] text-center text-[12px] font-medium text-muted">
            <b className="text-ink tabular-nums">{m.n}</b> / 12 · {m.title}
          </span>
          <button disabled={!next} onClick={() => next && go(next.id)} aria-label="Next screen" className="grid size-9 place-items-center rounded-full bg-white/70 ring-1 ring-black/5 disabled:opacity-30">
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <Notes key={screen} id={screen} />
    </main>
  )
}

function Phone({ light }: { light: boolean }) {
  const { screen } = useProto()
  const View = VIEWS[screen]
  return (
    <div className="relative h-[864px] w-[410px] rounded-[60px] bg-[#151815] p-[10px] shadow-[0_40px_80px_-30px_rgba(40,30,10,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
      <div className="relative h-full w-full overflow-hidden rounded-[50px] bg-cream">
        <View />
        {/* status bar */}
        <div className={cx('pointer-events-none absolute inset-x-0 top-0 z-30 flex h-12 items-center justify-between px-8 pt-1 text-[14px] font-semibold', light ? 'text-white' : 'text-ink')}>
          <span className="tabular-nums">9:41</span>
          <span className="flex items-center gap-1.5">
            <Signal size={15} />
            <Wifi size={15} />
            <BatteryFull size={20} />
          </span>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-30 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
        <Toast />
        <div className={cx('pointer-events-none absolute bottom-2 left-1/2 z-30 h-[5px] w-[130px] -translate-x-1/2 rounded-full', light && screen === 'welcome' ? 'bg-white/70' : 'bg-ink/80')} />
      </div>
    </div>
  )
}

function Toast() {
  const { toast, go, screen } = useProto()
  if (!toast) return null
  return (
    <div key={toast.id} className="animate-toast absolute inset-x-4 bottom-[104px] z-40 flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-[13px] text-white shadow-xl">
      <span className="grid size-6 place-items-center rounded-full bg-sprout">
        <Check size={14} />
      </span>
      <span className="flex-1 truncate">{toast.text}</span>
      {screen !== 'cart' && (
        <button onClick={() => go('cart')} className="font-semibold text-[#e9d9b4]">
          View basket
        </button>
      )}
    </div>
  )
}

function Notes({ id }: { id: ScreenId }) {
  const { go } = useProto()
  const m = meta(id)
  return (
    <aside className="no-scrollbar hidden w-[360px] shrink-0 overflow-y-auto border-l border-black/5 bg-cream/60 px-7 py-7 lg:block xl:w-[400px]">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[12px] text-muted">{m.n}</span>
        <span className={cx('rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider', STAGE_TONE[m.stage])}>{m.stage}</span>
      </div>
      <h2 className="mt-2 font-display text-[30px] leading-[1.05] tracking-[-0.02em]">{m.title}</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-muted">{m.goal}</p>

      <h3 className="mt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">What this screen includes</h3>
      <ul className="mt-3 space-y-2">
        {m.includes.map((t) => (
          <li key={t} className="flex gap-2.5 text-[13px] leading-snug">
            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-leaf" />
            {t}
          </li>
        ))}
      </ul>

      <h3 className="mt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">UX decisions</h3>
      <div className="mt-3 space-y-2.5">
        {m.ux.map((u) => (
          <div key={u.p} className="rounded-2xl bg-white p-3.5 ring-1 ring-line">
            <div className="text-[13px] font-semibold">{u.p}</div>
            <div className="mt-1 text-[12px] leading-relaxed text-muted">{u.note}</div>
          </div>
        ))}
      </div>

      <h3 className="mt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Leads to</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {m.next.map((n) => (
          <button key={n} onClick={() => go(n)} className="flex h-8 items-center gap-1 rounded-full bg-white pl-3 pr-2 text-[12px] font-semibold ring-1 ring-line hover:ring-ink">
            {meta(n).n} {meta(n).title} <ChevronRight size={13} />
          </button>
        ))}
      </div>
    </aside>
  )
}

/* ------------------------------------------------------------------ */
const PRINCIPLES = [
  ['Freshness you can verify', 'Every product shows its farm, distance and harvest day, so it is judged on evidence rather than adjectives.'],
  ['Two specialist paths, one basket', 'Fruit & Veg is built for speed (scan, tap, add). Butchery is built for precision (configure, confirm). Both end in the same basket.'],
  ['Honest pricing for weighed goods', '“Est.” labels, a ±10% cap and exact-weight charging appear consistently on product, basket, checkout and receipt.'],
  ['Decide once, apply everywhere', 'Halal, organic, substitution and packaging preferences set in Account carry into listings and the configurator.'],
  ['Thumb-first ergonomics', 'Primary actions sit in sticky bottom bars, touch targets are at least 44 pt, and steppers replace dropdowns.'],
  ['Progressive disclosure', 'Nutrition, storage and cooking guides stay folded. The decision area shows only what changes the purchase.'],
  ['Feedback for every action', 'Toasts, live totals, filter counts and the basket badge confirm each tap within 100 ms.'],
  ['Prevent errors, don’t just recover', 'Coverage check before shopping, substitution choice before packing, full slots shown but disabled.'],
]

const PERSONAS = [
  ['The weekly restocker', 'Layla, 34', 'Wants the same 25 items every Monday with no thinking.', 'Order again, reorder, saved defaults'],
  ['The weekend griller', 'Omar, 41', 'Cares about cut, thickness and ageing. Distrusts supermarket meat.', 'Butcher’s Counter, configurator, traceability'],
  ['The careful planner', 'Grace, 58', 'Budget- and health-aware, compares unit prices and nutrition.', 'Per-kg pricing, filters, nutrition, Est. policy'],
]

function Overview({ open }: { open: (s: ScreenId) => void }) {
  return (
    <main className="no-scrollbar min-w-0 flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[1180px] px-6 py-10 md:px-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-leaf">UX/UI case · iOS mobile app</p>
        <h1 className="mt-2 max-w-[760px] font-display text-[44px] leading-[1.02] tracking-[-0.02em] md:text-[56px]">
          A greengrocer and a butcher, <em className="text-leaf">designed as one store.</em>
        </h1>
        <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-muted">
          Twelve screens across seven journey stages. The produce and butchery paths run in parallel, each tuned to how people actually shop for that food, and they meet in a single basket and checkout.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            ['12', 'screens'],
            ['7', 'journey stages'],
            ['2', 'specialist paths'],
            ['≤3', 'taps to any product'],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl bg-cream px-5 py-3 ring-1 ring-line">
              <div className="font-display text-[28px] leading-none">{n}</div>
              <div className="mt-1 text-[12px] text-muted">{l}</div>
            </div>
          ))}
        </div>

        {/* Flow */}
        <Section k="01" title="User flow" sub="Click any screen to open it in the prototype.">
          <div className="no-scrollbar -mx-2 overflow-x-auto px-2 pb-2">
            <div className="grid min-w-[1040px] grid-cols-7 gap-3">
              {STAGES.map((st, i) => (
                <div key={st} className="relative">
                  <div className={cx('mb-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider', STAGE_TONE[st])}>{st}</div>
                  {i < STAGES.length - 1 && <ArrowRight size={14} className="absolute -right-2.5 top-1.5 text-muted" />}
                  <div className="space-y-2">
                    {SCREENS.filter((s) => s.stage === st).map((s) => (
                      <button key={s.id} onClick={() => open(s.id)} className="block w-full rounded-2xl bg-cream p-3 text-left ring-1 ring-line transition hover:-translate-y-0.5 hover:ring-ink">
                        <div className="font-mono text-[11px] text-muted">{s.n}</div>
                        <div className="mt-0.5 text-[13px] font-semibold leading-tight">{s.title}</div>
                        <div className="mt-2 text-[11px] text-muted">→ {s.next.map((n) => meta(n).n).join(', ')}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ['Fast restock', '02 Home → Order again → 09 Basket → 10 Checkout', '4 screens · ~45 s'],
              ['Produce discovery', '02 Home → 05 Listing → 06 Detail → 09 Basket', 'Scan, compare, add in place'],
              ['Butcher order', '02 Home → 07 Counter → 08 Configurator → 09 Basket', 'Defaults make it one tap'],
            ].map(([t, f, s]) => (
              <div key={t} className="rounded-2xl bg-white/60 p-4 ring-1 ring-line">
                <div className="text-[13px] font-semibold">{t}</div>
                <div className="mt-1 font-mono text-[11px] leading-relaxed text-muted">{f}</div>
                <div className="mt-2 text-[12px] text-leaf">{s}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Personas */}
        <Section k="02" title="Who we design for">
          <div className="grid gap-3 md:grid-cols-3">
            {PERSONAS.map(([t, n, need, serves]) => (
              <div key={t} className="rounded-3xl bg-cream p-5 ring-1 ring-line">
                <div className="text-[11px] font-semibold text-muted">{n}</div>
                <div className="mt-1 font-display text-[21px] leading-tight">{t}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{need}</p>
                <div className="mt-4 border-t border-line pt-3 text-[12px]">
                  <span className="font-semibold">Served by:</span> <span className="text-muted">{serves}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Principles */}
        <Section k="03" title="Design principles">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map(([t, d], i) => (
              <div key={t} className="rounded-3xl bg-cream p-5 ring-1 ring-line">
                <div className="font-mono text-[11px] text-muted">P{i + 1}</div>
                <div className="mt-2 text-[15px] font-semibold leading-snug">{t}</div>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* System */}
        <Section k="04" title="Visual system" sub="Market green for everyday produce, oxblood for the specialist butcher mode, saffron for offers and price notices.">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl bg-cream p-5 ring-1 ring-line">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Colour</div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[
                  ['Leaf', '#2F5D3A', 'Produce, primary CTA'],
                  ['Leaf deep', '#1F4029', 'Hero, loyalty'],
                  ['Oxblood', '#7A2418', 'Butchery mode'],
                  ['Saffron', '#C9861F', 'Offers, notices'],
                  ['Ink', '#1C211C', 'Text'],
                  ['Muted', '#6C7067', 'Secondary text'],
                  ['Paper', '#F4EFE4', 'Surfaces'],
                  ['Cream', '#FBF8F2', 'Background'],
                ].map(([n, h, u]) => (
                  <div key={n}>
                    <div className="h-14 rounded-xl ring-1 ring-black/5" style={{ background: h }} />
                    <div className="mt-1.5 text-[12px] font-semibold">{n}</div>
                    <div className="font-mono text-[10px] text-muted">{h}</div>
                    <div className="text-[10px] text-muted">{u}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-cream p-5 ring-1 ring-line">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Type</div>
              <div className="mt-4 space-y-3">
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <span className="font-display text-[32px] leading-none tracking-[-0.02em]">Fraunces</span>
                  <span className="text-[11px] text-muted">Display · 20–34</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <span className="text-[20px] font-semibold">DM Sans Semibold</span>
                  <span className="text-[11px] text-muted">UI · 13–15</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <span className="text-[14px] tabular-nums">$42.00/kg · 2 × 300 g</span>
                  <span className="text-[11px] text-muted">Tabular figures</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em]">Overline label</span>
                  <span className="text-[11px] text-muted">11 · tracked</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-cream p-5 ring-1 ring-line lg:col-span-2">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Components</div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <button className="h-12 rounded-full bg-leaf px-6 text-[15px] font-semibold text-white">Add to basket</button>
                <button className="h-12 rounded-full bg-blood px-6 text-[15px] font-semibold text-white">Customise cut</button>
                <button className="h-12 rounded-full px-6 text-[14px] font-semibold text-leaf ring-1 ring-line">Secondary</button>
                <div className="flex h-11 items-center rounded-full bg-leaf text-white">
                  <span className="grid w-11 place-items-center"><Minus size={16} /></span>
                  <span className="w-6 text-center font-semibold">2</span>
                  <span className="grid w-11 place-items-center"><Plus size={16} /></span>
                </div>
                <span className="h-8 rounded-full bg-leaf px-3 text-[12px] font-semibold leading-8 text-white">Organic ✓</span>
                <span className="h-8 rounded-full bg-white px-3 text-[12px] font-semibold leading-8 ring-1 ring-line">Local</span>
                <span className="rounded-full bg-saffron-soft px-2 py-0.5 text-[10px] font-semibold text-saffron">In season</span>
                <span className="rounded-full bg-blood px-2 py-0.5 text-[10px] font-semibold text-white">On offer</span>
                <span className="rounded-full bg-blood-soft px-2 py-0.5 text-[10px] font-semibold text-blood">Dry-aged</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-saffron">Est.</span>
              </div>
              <div className="mt-4 grid gap-2 text-[12px] text-muted sm:grid-cols-4">
                <span>Radius: 12 / 16 / 24 / full</span>
                <span>Spacing: 4-pt grid, 20 pt gutters</span>
                <span>Touch targets ≥ 44 pt</span>
                <span>Contrast: AA on all text</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Inventory */}
        <Section k="05" title="Screen inventory" sub="Every screen and what it contains.">
          <div className="grid gap-3 md:grid-cols-2">
            {SCREENS.map((s) => (
              <button key={s.id} onClick={() => open(s.id)} className="group rounded-3xl bg-cream p-5 text-left ring-1 ring-line transition hover:ring-ink">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[12px] text-muted">{s.n}</span>
                  <span className={cx('rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider', STAGE_TONE[s.stage])}>{s.stage}</span>
                  <span className="ml-auto flex items-center gap-1 text-[12px] font-semibold text-leaf opacity-0 transition group-hover:opacity-100">
                    Open <ArrowRight size={13} />
                  </span>
                </div>
                <div className="mt-2 font-display text-[22px] leading-tight">{s.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{s.goal}</p>
                <ul className="mt-3 grid gap-x-4 gap-y-1 text-[12px] sm:grid-cols-2">
                  {s.includes.map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check size={12} className="mt-0.5 shrink-0 text-leaf" />
                      {t}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </Section>
      </div>
    </main>
  )
}

function Section({ k, title, sub, children }: { k: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section className="mt-16">
      <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-black/10 pt-5">
        <span className="font-mono text-[12px] text-muted">{k}</span>
        <h2 className="font-display text-[30px] tracking-[-0.02em]">{title}</h2>
        {sub && <p className="text-[13px] text-muted">{sub}</p>}
      </div>
      {children}
    </section>
  )
}
