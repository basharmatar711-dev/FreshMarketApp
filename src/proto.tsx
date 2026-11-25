import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { byId, type ScreenId } from './data'

export type CartItem = {
  key: string
  productId: string
  qty: number
  unitPrice: number
  summary: string
  estimated: boolean
}

type Toast = { id: number; text: string } | null

type Proto = {
  screen: ScreenId
  param: string | undefined
  go: (s: ScreenId, param?: string) => void
  back: () => void
  cart: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  setQty: (key: string, qty: number) => void
  clear: () => void
  order: CartItem[]
  placeOrder: () => void
  count: number
  subtotal: number
  toast: Toast
  notify: (text: string) => void
  favs: Set<string>
  toggleFav: (id: string) => void
}

const Ctx = createContext<Proto | null>(null)
export const useProto = () => useContext(Ctx)!

/** Default "quick add" line for a product (no customisation). */
export function quickLine(id: string): Omit<CartItem, 'qty'> {
  const p = byId(id)
  if (p.dept === 'butchery') {
    const g = p.cutWeights![1]?.g ?? p.cutWeights![0].g
    return { key: id, productId: id, unitPrice: (p.price * g) / 1000, summary: `${g} g · butcher's default`, estimated: true }
  }
  if (p.unit === 'kg') return { key: id, productId: id, unitPrice: p.price * 0.5, summary: '500 g', estimated: true }
  return { key: id, productId: id, unitPrice: p.price, summary: p.unitNote ? `${p.unit} · ${p.unitNote}` : p.unit, estimated: false }
}

const seed: CartItem[] = [
  { key: 'ribeye-seed', productId: 'ribeye', qty: 2, unitPrice: 12.6, summary: '300 g · 2.5 cm · Boneless · Vacuum sealed', estimated: true },
  { key: 'tomatoes', productId: 'tomatoes', qty: 2, unitPrice: 3.45, summary: '500 g', estimated: true },
  { key: 'avocados-seed', productId: 'avocados', qty: 3, unitPrice: 1.6, summary: 'Ready to eat today', estimated: false },
  { key: 'strawberries', productId: 'strawberries', qty: 1, unitPrice: 4.5, summary: 'punnet · 400 g', estimated: false },
]

export function ProtoProvider({ children, screen, onScreen }: { children: ReactNode; screen: ScreenId; onScreen: (s: ScreenId) => void }) {
  const [param, setParam] = useState<string | undefined>()
  const history = useRef<{ s: ScreenId; p?: string }[]>([])
  const [cart, setCart] = useState<CartItem[]>(seed)
  const [toast, setToast] = useState<Toast>(null)
  const [order, setOrder] = useState<CartItem[]>([])
  const [favs, setFavs] = useState<Set<string>>(new Set(['strawberries', 'ribeye']))

  const go = useCallback(
    (s: ScreenId, p?: string) => {
      history.current.push({ s: screen, p: param })
      setParam(p)
      onScreen(s)
    },
    [screen, param, onScreen],
  )
  const back = useCallback(() => {
    const prev = history.current.pop()
    if (prev) {
      setParam(prev.p)
      onScreen(prev.s)
    } else onScreen('home')
  }, [onScreen])

  const notify = useCallback((text: string) => setToast({ id: Date.now(), text }), [])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const add = useCallback((item: Omit<CartItem, 'qty'>, qty = 1) => {
    setCart((c) => {
      const ex = c.find((i) => i.key === item.key)
      if (ex) return c.map((i) => (i.key === item.key ? { ...i, qty: i.qty + qty } : i))
      return [...c, { ...item, qty }]
    })
  }, [])
  const setQty = useCallback((key: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty } : i))))
  }, [])
  const toggleFav = useCallback((id: string) => {
    setFavs((f) => {
      const n = new Set(f)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }, [])

  const value = useMemo<Proto>(
    () => ({
      screen,
      param,
      go,
      back,
      cart,
      add,
      setQty,
      clear: () => setCart([]),
      order,
      placeOrder: () => {
        setOrder(cart)
        setCart([])
      },
      count: cart.reduce((a, i) => a + i.qty, 0),
      subtotal: cart.reduce((a, i) => a + i.qty * i.unitPrice, 0),
      toast,
      notify,
      favs,
      toggleFav,
    }),
    [screen, param, go, back, cart, order, add, setQty, toast, notify, favs, toggleFav],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
