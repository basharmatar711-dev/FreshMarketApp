import type { ReactNode } from 'react'
import { ChevronLeft, Heart, Home, LayoutGrid, Minus, Plus, ShoppingBasket, User, Beef } from 'lucide-react'
import { useProto, quickLine } from './proto'
import { byId, money, unitLabel, type Product, type ScreenId } from './data'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

/** Scrollable screen body that clears the status bar. */
export function Scroll({ children, className, top = true }: { children: ReactNode; className?: string; top?: boolean }) {
  return <div className={cx('no-scrollbar flex-1 overflow-y-auto overscroll-contain', top && 'pt-12', className)}>{children}</div>
}

export function TopBar({ title, sub, right, onBack, className }: { title?: string; sub?: string; right?: ReactNode; onBack?: () => void; className?: string }) {
  const { back } = useProto()
  return (
    <div className={cx('flex items-center gap-2 px-4 pb-3 pt-12', className)}>
      <IconBtn label="Back" onClick={onBack ?? back}>
        <ChevronLeft size={20} />
      </IconBtn>
      <div className="min-w-0 flex-1 text-center">
        {title && <div className="truncate text-[15px] font-semibold">{title}</div>}
        {sub && <div className="truncate text-[11px] text-muted">{sub}</div>}
      </div>
      <div className="flex min-w-9 justify-end gap-1">{right}</div>
    </div>
  )
}

export function IconBtn({ children, label, onClick, className }: { children: ReactNode; label: string; onClick?: () => void; className?: string }) {
  return (
    <button aria-label={label} onClick={onClick} className={cx('grid size-9 shrink-0 place-items-center rounded-full bg-white/90 text-ink shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-line transition active:scale-95', className)}>
      {children}
    </button>
  )
}

export function Stepper({ value, onChange, size = 'md', tone = 'leaf', min = 0, format }: { value: number; onChange: (n: number) => void; size?: 'sm' | 'md'; tone?: 'leaf' | 'blood' | 'light'; min?: number; format?: (n: number) => string }) {
  const h = size === 'sm' ? 'h-8' : 'h-11'
  const btn = size === 'sm' ? 'w-8' : 'w-11'
  const tones = { leaf: 'bg-leaf text-white', blood: 'bg-blood text-white', light: 'bg-white text-ink ring-1 ring-line' }
  return (
    <div className={cx('flex items-center rounded-full', h, tones[tone])}>
      <button aria-label="Decrease" onClick={() => onChange(Math.max(min, value - 1))} className={cx('grid h-full place-items-center rounded-full active:scale-90', btn)}>
        <Minus size={size === 'sm' ? 14 : 16} />
      </button>
      <span className={cx('min-w-6 text-center font-semibold tabular-nums', size === 'sm' ? 'text-[13px]' : 'text-[15px]')}>{format ? format(value) : value}</span>
      <button aria-label="Increase" onClick={() => onChange(value + 1)} className={cx('grid h-full place-items-center rounded-full active:scale-90', btn)}>
        <Plus size={size === 'sm' ? 14 : 16} />
      </button>
    </div>
  )
}

const tagTone: Record<string, string> = {
  Organic: 'bg-leaf-soft text-leaf',
  Local: 'bg-white text-ink ring-1 ring-line',
  'In season': 'bg-saffron-soft text-saffron',
  'On offer': 'bg-blood text-white',
  'Dry-aged': 'bg-blood-soft text-blood',
  'Grass-fed': 'bg-leaf-soft text-leaf',
  'Free-range': 'bg-leaf-soft text-leaf',
  Halal: 'bg-white text-ink ring-1 ring-line',
}
export function Tag({ t, className }: { t: string; className?: string }) {
  return <span className={cx('inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold tracking-wide', tagTone[t] ?? 'bg-paper text-muted', className)}>{t}</span>
}

export function SectionHead({ title, action, onAction, className }: { title: string; action?: string; onAction?: () => void; className?: string }) {
  return (
    <div className={cx('flex items-end justify-between px-5', className)}>
      <h3 className="font-display text-[20px] leading-tight tracking-[-0.01em]">{title}</h3>
      {action && (
        <button onClick={onAction} className="text-[13px] font-semibold text-leaf">
          {action}
        </button>
      )}
    </div>
  )
}

/** In-place add control: "+" becomes a stepper once the item is in the basket. */
export function QuickAdd({ id, tone = 'leaf' }: { id: string; tone?: 'leaf' | 'blood' }) {
  const { cart, add, setQty, notify, go } = useProto()
  const p = byId(id)
  const line = cart.find((i) => i.key === id)
  if (p.dept === 'butchery')
    return (
      <button onClick={() => go('cut', id)} className="h-8 rounded-full bg-blood px-3 text-[12px] font-semibold text-white active:scale-95">
        Customise
      </button>
    )
  if (line) return <Stepper size="sm" tone={tone} value={line.qty} onChange={(n) => setQty(id, n)} />
  return (
    <button
      aria-label={`Add ${p.name}`}
      onClick={() => {
        add(quickLine(id))
        notify(`${p.name} added`)
      }}
      className={cx('grid size-8 place-items-center rounded-full text-white active:scale-90', tone === 'leaf' ? 'bg-leaf' : 'bg-blood')}
    >
      <Plus size={16} />
    </button>
  )
}

export function FavBtn({ id, className }: { id: string; className?: string }) {
  const { favs, toggleFav } = useProto()
  const on = favs.has(id)
  return (
    <button aria-label="Favourite" onClick={(e) => (e.stopPropagation(), toggleFav(id))} className={cx('grid size-8 place-items-center rounded-full bg-white/90 ring-1 ring-line active:scale-90', className)}>
      <Heart size={15} className={on ? 'fill-blood text-blood' : 'text-ink'} />
    </button>
  )
}

export function PriceLine({ p, className }: { p: Product; className?: string }) {
  return (
    <div className={cx('flex items-baseline gap-1.5', className)}>
      <span className="text-[15px] font-bold tabular-nums">{money(p.price)}</span>
      <span className="text-[11px] text-muted">{unitLabel(p).trim()}</span>
      {p.was && <span className="text-[11px] text-muted line-through">{money(p.was)}</span>}
    </div>
  )
}

export function ProductCard({ p, width }: { p: Product; width?: string }) {
  const { go } = useProto()
  const open = () => go(p.dept === 'butchery' ? 'cut' : 'produce', p.id)
  return (
    <div className={cx('flex flex-col', width)}>
      <div role="button" onClick={open} className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#f3ece0]">
        <img src={p.image} alt={p.name} className="size-full object-cover" />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {p.tags.includes('On offer') && <Tag t="On offer" />}
          {p.tags.includes('Organic') && <Tag t="Organic" />}
        </div>
        <FavBtn id={p.id} className="absolute right-2 top-2" />
      </div>
      <button onClick={open} className="mt-2 text-left">
        <div className="truncate text-[14px] font-semibold leading-tight">{p.name}</div>
        <div className="mt-0.5 truncate text-[11px] text-muted">
          {p.origin}
          {p.distance && ` · ${p.distance}`}
        </div>
      </button>
      <div className="mt-2 flex items-center justify-between gap-1">
        <div className="min-w-0">
          <PriceLine p={p} />
          <div className="text-[10px] text-muted tabular-nums">{p.unitNote ? `${p.unitNote} · ${money(p.perKg!)}/kg` : p.unit === 'kg' ? 'Sold by weight' : '\u00a0'}</div>
        </div>
        <QuickAdd id={p.id} />
      </div>
    </div>
  )
}

export function TabBar({ active }: { active: ScreenId }) {
  const { go, count } = useProto()
  const tabs: { id: ScreenId; label: string; icon: ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={21} /> },
    { id: 'browse', label: 'Browse', icon: <LayoutGrid size={21} /> },
    { id: 'butcher', label: 'Butcher', icon: <Beef size={21} /> },
    { id: 'cart', label: 'Basket', icon: <ShoppingBasket size={21} /> },
    { id: 'account', label: 'Account', icon: <User size={21} /> },
  ]
  return (
    <nav className="grid shrink-0 grid-cols-5 border-t border-line bg-cream/95 px-2 pb-7 pt-2 backdrop-blur">
      {tabs.map((t) => {
        const on = t.id === active
        return (
          <button key={t.id} onClick={() => !on && go(t.id)} className={cx('relative flex flex-col items-center gap-1 py-1 text-[10px] font-semibold', on ? 'text-leaf' : 'text-muted')}>
            <span className={cx('grid h-7 w-12 place-items-center rounded-full transition', on && 'bg-leaf-soft')}>{t.icon}</span>
            {t.label}
            {t.id === 'cart' && count > 0 && <span className="absolute right-3 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-blood px-1 text-[9px] font-bold text-white">{count}</span>}
          </button>
        )
      })}
    </nav>
  )
}

export function BottomBar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('shrink-0 border-t border-line bg-cream/95 px-5 pb-8 pt-3 backdrop-blur', className)}>{children}</div>
}

export function Segmented<T extends string>({ options, value, onChange, tone = 'leaf' }: { options: { v: T; label: string; sub?: string }[]; value: T; onChange: (v: T) => void; tone?: 'leaf' | 'blood' }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(options.length, 4)}, minmax(0, 1fr))` }}>
      {options.map((o) => {
        const on = o.v === value
        return (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            aria-pressed={on}
            className={cx(
              'rounded-xl px-2 py-2.5 text-center transition active:scale-[0.97]',
              on ? (tone === 'leaf' ? 'bg-leaf text-white' : 'bg-blood text-white') : 'bg-white text-ink ring-1 ring-line',
            )}
          >
            <div className="text-[13px] font-semibold leading-tight">{o.label}</div>
            {o.sub && <div className={cx('mt-0.5 text-[10px] leading-tight', on ? 'text-white/75' : 'text-muted')}>{o.sub}</div>}
          </button>
        )
      })}
    </div>
  )
}
