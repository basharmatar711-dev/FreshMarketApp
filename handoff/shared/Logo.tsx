import { Leaf } from 'lucide-react'
import { cx } from './cx'

type LogoProps = {
  /** `light` = white mark for dark/photo backgrounds. `dark` = green mark on light backgrounds. */
  tone?: 'light' | 'dark'
  className?: string
}

/** Field & Cleaver wordmark. Replace the icon with the final brand SVG when available. */
export function Logo({ tone = 'light', className }: LogoProps) {
  const light = tone === 'light'
  return (
    <div className={cx('flex items-center gap-2', light ? 'text-white' : 'text-ink', className)} aria-label="Field & Cleaver">
      <span className={cx('grid size-8 place-items-center rounded-full', light ? 'bg-white/15 ring-1 ring-white/30 backdrop-blur' : 'bg-leaf text-white')}>
        <Leaf size={16} aria-hidden />
      </span>
      <span className="font-display text-[19px] tracking-[-0.01em]" aria-hidden>
        Field <span className="italic opacity-70">&amp;</span> Cleaver
      </span>
    </div>
  )
}
