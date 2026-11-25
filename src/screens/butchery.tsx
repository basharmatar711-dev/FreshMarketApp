import { useState, type ReactNode } from 'react'
import { Award, ChevronLeft, ChevronRight, Clock, Flame, Info, PenLine, Scale, ShieldCheck, Snowflake, Star, Thermometer, Truck, Slice as Knife, ShoppingBasket, Share2 } from 'lucide-react'
import { IMG, PRODUCTS, byId, money } from '../data'
import { useProto } from '../proto'
import { BottomBar, FavBtn, IconBtn, Scroll, Segmented, Stepper, TabBar, Tag, cx } from '../ui'

/* 07 ------------------------------------------------------------------ */
export function ButcherCounter() {
  const { go, back } = useProto()
  const [tab, setTab] = useState('All')
  const tabs = ['All', 'Beef', 'Lamb', 'Poultry', 'Mince & sausages']
  const cuts = PRODUCTS.filter((p) => p.dept === 'butchery' && (tab === 'All' || p.category === tab))
  return (
    <div className="flex h-full flex-col bg-cream">
      <Scroll top={false} className="pb-6">
        <div className="relative h-[290px] bg-blood-deep text-white">
          <img src={IMG.heroButcher} alt="" className="absolute inset-0 size-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-blood-deep/30 to-blood-deep" />
          <div className="absolute left-4 top-12">
            <IconBtn label="Back" onClick={back} className="bg-white/15 text-white ring-white/25 backdrop-blur">
              <ChevronLeft size={20} />
            </IconBtn>
          </div>
          <div className="absolute inset-x-5 bottom-14">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e9c2b6]">
              <Knife size={13} /> Est. 1987 · Master butchers
            </div>
            <h1 className="mt-1 font-display text-[32px] leading-[1.02] tracking-[-0.02em]">The Butcher’s Counter</h1>
            <p className="mt-1.5 text-[13px] text-white/75">Every order is cut by hand the morning it ships.</p>
          </div>
        </div>

        {/* Cut-off */}
        <div className="relative z-10 -mt-9 mx-5 rounded-2xl bg-white p-3.5 shadow-[0_10px_30px_-12px_rgba(74,22,15,0.35)] ring-1 ring-line">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-blood-soft text-blood">
              <Clock size={18} />
            </span>
            <div className="flex-1">
              <div className="text-[13px] font-semibold">Order by 2:00 PM for same-day</div>
              <div className="text-[12px] text-muted">
                <b className="text-blood tabular-nums">3h 12m</b> left · next cut at 6 AM tomorrow
              </div>
            </div>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blood-soft">
            <div className="h-full w-[62%] rounded-full bg-blood" />
          </div>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cx('h-9 shrink-0 rounded-full px-4 text-[13px] font-semibold transition', t === tab ? 'bg-blood text-white' : 'bg-white ring-1 ring-line')}>
              {t}
            </button>
          ))}
        </div>

        {/* Butcher's pick */}
        {(tab === 'All' || tab === 'Beef') && (
          <div className="mx-5 mt-5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blood">
              <Award size={13} /> Butcher’s pick this week
            </div>
            <button onClick={() => go('cut', 'ribeye')} className="mt-2 flex w-full gap-3 overflow-hidden rounded-3xl bg-blood-deep p-3 text-left text-white">
              <img src={IMG.ribeye} alt="" className="size-[108px] shrink-0 rounded-2xl bg-[#f3ece0] object-cover" />
              <div className="flex min-w-0 flex-1 flex-col py-0.5">
                <div className="font-display text-[19px] leading-tight">28-day Dry-aged Ribeye</div>
                <div className="mt-1 text-[12px] leading-snug text-white/65">“Deep, nutty, buttery. Our best batch this season.” · Marco, head butcher</div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[13px] font-semibold tabular-nums">
                    {money(42)}/kg <span className="font-normal text-white/60">· from {money(10.5)}</span>
                  </span>
                  <ChevronRight size={18} />
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Cut list */}
        <div className="mt-6 flex items-end justify-between px-5">
          <h3 className="font-display text-[20px]">{tab === 'All' ? 'All cuts' : tab}</h3>
          <span className="text-[12px] text-muted">{cuts.length} cuts</span>
        </div>
        <ul className="mt-2 space-y-3 px-5">
          {cuts.map((p) => {
            const from = (p.price * p.cutWeights![0].g) / 1000
            return (
              <li key={p.id} className="flex gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-line">
                <button onClick={() => go('cut', p.id)} className="relative size-[92px] shrink-0 overflow-hidden rounded-xl bg-[#f3ece0]">
                  <img src={p.image} alt={p.name} className="size-full object-cover" />
                </button>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <button onClick={() => go('cut', p.id)} className="text-left text-[14px] font-semibold leading-tight">
                      {p.name}
                    </button>
                    <FavBtn id={p.id} className="size-7 -mr-0.5 -mt-0.5" />
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-muted">{p.short}</div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {p.tags.slice(0, 2).map((t) => (
                      <Tag key={t} t={t} />
                    ))}
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-1.5">
                    <div>
                      <div className="text-[14px] font-bold tabular-nums">
                        {money(p.price)}
                        <span className="text-[11px] font-normal text-muted">/kg</span>
                      </div>
                      <div className="text-[10px] text-muted tabular-nums">
                        from {money(from)} for {p.cutWeights![0].g} g
                      </div>
                    </div>
                    <button onClick={() => go('cut', p.id)} className="h-8 rounded-full bg-blood px-3 text-[12px] font-semibold text-white active:scale-95">
                      Customise
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* How it works */}
        <div className="mx-5 mt-7 rounded-3xl bg-paper p-5 ring-1 ring-line">
          <h3 className="font-display text-[19px]">How cut-to-order works</h3>
          <ol className="mt-4 space-y-4">
            {[
              [Scale, 'Choose your cut', 'Weight, thickness, trim and packing, just like at the counter.'],
              [Knife, 'We cut it fresh', 'Your butcher prepares it the morning of delivery. Never pre-packed.'],
              [Snowflake, 'Delivered chilled', 'Insulated, ice-packed and kept at 0–4 °C all the way to your door.'],
            ].map(([I, t, s], i) => {
              const Icon = I as typeof Scale
              return (
                <li key={t as string} className="flex gap-3">
                  <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-blood text-white">
                    <Icon size={16} />
                    <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-white text-[9px] font-bold text-blood ring-1 ring-line">{i + 1}</span>
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold">{t as string}</div>
                    <div className="text-[12px] leading-snug text-muted">{s as string}</div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 px-5 text-center">
          {[
            [ShieldCheck, 'Halal certified options'],
            [Award, 'Traceable to the farm'],
            [Thermometer, 'Cold-chain monitored'],
          ].map(([I, l]) => {
            const Icon = I as typeof Award
            return (
              <div key={l as string} className="rounded-2xl bg-white px-2 py-3 ring-1 ring-line">
                <Icon size={18} className="mx-auto text-blood" />
                <div className="mt-1.5 text-[11px] font-semibold leading-tight">{l as string}</div>
              </div>
            )
          })}
        </div>
      </Scroll>
      <TabBar active="butcher" />
    </div>
  )
}

/* 08 ------------------------------------------------------------------ */
const DEFAULTS: Record<string, number> = { thick: 1, fat: 1 }

export function CutConfigurator() {
  const { param, back, add, notify } = useProto()
  const p = byId(param && byId(param)?.dept === 'butchery' ? param : 'ribeye')
  const groups = p.groups!
  const [g, setG] = useState(p.cutWeights![1]?.g ?? p.cutWeights![0].g)
  const [pieces, setPieces] = useState(2)
  const [sel, setSel] = useState<Record<string, number>>(() => Object.fromEntries(groups.map((gr) => [gr.id, DEFAULTS[gr.id] ?? 0])))
  const [note, setNote] = useState('')

  const deltas = groups.reduce((a, gr) => a + (gr.choices[sel[gr.id]].delta ?? 0), 0)
  const perPiece = (p.price * g) / 1000 + deltas
  const total = perPiece * pieces
  const picked = groups.map((gr) => gr.choices[sel[gr.id]].label).filter((l) => !['As is', 'Standard'].includes(l))
  const summary = [`${g} g`, ...picked].join(' · ')

  return (
    <div className="flex h-full flex-col bg-cream">
      <Scroll top={false} className="pb-6">
        <div className="relative h-[290px] bg-[#f1eadc]">
          <img src={p.image} alt={p.name} className="size-full object-cover" />
          <div className="absolute inset-x-4 top-12 flex justify-between">
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
        </div>

        <div className="-mt-6 rounded-t-[28px] bg-cream px-5 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <Tag key={t} t={t} />
            ))}
          </div>
          <h1 className="mt-2 font-display text-[28px] leading-tight tracking-[-0.02em]">{p.name}</h1>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-muted">
            <Star size={13} className="fill-saffron text-saffron" />
            <b className="text-ink">{p.rating}</b> ({p.reviews}) · <span className="tabular-nums">{money(p.price)}/kg</span>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-line">
            <span className="grid size-10 place-items-center rounded-full bg-blood-soft text-blood">
              <Award size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold">{p.origin}</div>
              <div className="truncate text-[11px] text-muted">
                Batch {p.batch} · {p.distance}
              </div>
            </div>
            <button className="text-[12px] font-semibold text-blood">Trace</button>
          </div>

          {/* Steps */}
          <Step n={1} title="Weight per piece">
            <Segmented tone="blood" value={String(g)} onChange={(v) => setG(Number(v))} options={p.cutWeights!.map((w) => ({ v: String(w.g), label: w.g >= 1000 ? `${w.g / 1000} kg` : `${w.g} g`, sub: w.serves }))} />
          </Step>
          <Step n={2} title="How many pieces?">
            <div className="flex items-center justify-between rounded-2xl bg-white p-2 pl-4 ring-1 ring-line">
              <span className="text-[13px] text-muted tabular-nums">
                {pieces} × {g} g = <b className="text-ink">{((pieces * g) / 1000).toFixed(2).replace(/\.?0+$/, '')} kg</b>
              </span>
              <Stepper value={pieces} onChange={setPieces} min={1} tone="light" />
            </div>
          </Step>
          {groups.map((gr, i) => (
            <Step key={gr.id} n={i + 3} title={gr.label}>
              <Segmented
                tone="blood"
                value={String(sel[gr.id])}
                onChange={(v) => setSel({ ...sel, [gr.id]: Number(v) })}
                options={gr.choices.map((c, ci) => ({ v: String(ci), label: c.label, sub: c.delta ? `+${money(c.delta)}` : c.sub }))}
              />
            </Step>
          ))}
          <Step n={groups.length + 3} title="Note to your butcher" optional>
            <div className="flex gap-2 rounded-2xl bg-white p-3 ring-1 ring-line">
              <PenLine size={16} className="mt-0.5 shrink-0 text-muted" />
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="e.g. Please keep the pieces even in size for the grill" className="w-full resize-none bg-transparent text-[13px] outline-none placeholder:text-muted" />
            </div>
          </Step>

          {/* Summary */}
          <div className="mt-6 rounded-2xl bg-blood-deep p-4 text-white">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e9c2b6]">Your cut</div>
            <div className="mt-1 text-[14px] font-semibold leading-snug">
              {pieces} × {summary}
            </div>
            <div className="mt-3 flex items-start gap-2 border-t border-white/15 pt-3 text-[12px] text-white/70">
              <Info size={14} className="mt-0.5 shrink-0" />
              Hand-cut pieces vary by ±5%. You’re charged for the exact weight, never more than 10% over this estimate.
            </div>
          </div>

          {p.cooking && (
            <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-line">
              <div className="flex items-center gap-2 text-[14px] font-semibold">
                <Flame size={16} className="text-blood" /> Cooking guide
              </div>
              <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${p.cooking.length}, minmax(0,1fr))` }}>
                {p.cooking.map(([k, v], i) => (
                  <div key={k} className="rounded-xl px-2 py-2 text-center" style={{ background: ['#f3d5cd', '#ebc0b4', '#d9a294'][i] ?? '#f3d5cd' }}>
                    <div className="text-[15px] font-bold tabular-nums text-blood-deep">{v}</div>
                    <div className="text-[10px] font-medium text-blood-deep/70">{k}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-muted">{p.storage}</p>
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-[12px] text-muted">
            <Truck size={14} className="text-blood" /> Cut tomorrow 6 AM if ordered after 2 PM today
          </div>
        </div>
      </Scroll>
      <BottomBar>
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[11px] text-muted">Estimated</div>
            <div className="text-[20px] font-bold tabular-nums">{money(total)}</div>
          </div>
          <button
            onClick={() => {
              add({ key: `${p.id}-${summary}-${note}`, productId: p.id, unitPrice: perPiece, summary, estimated: true }, pieces)
              notify(`${pieces} × ${p.name} sent to the counter`)
            }}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-blood text-[15px] font-semibold text-white active:scale-[0.98]"
          >
            <ShoppingBasket size={17} /> Add to basket
          </button>
        </div>
      </BottomBar>
    </div>
  )
}

function Step({ n, title, optional, children }: { n: number; title: string; optional?: boolean; children: ReactNode }) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="grid size-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white tabular-nums">{n}</span>
        <span className="text-[14px] font-semibold">{title}</span>
        {optional && <span className="text-[11px] text-muted">Optional</span>}
      </div>
      {children}
    </section>
  )
}
