import tomatoes from './assets/tomatoes.webp'
import strawberries from './assets/strawberries.webp'
import avocados from './assets/avocados.webp'
import carrots from './assets/carrots.webp'
import lemons from './assets/lemons.webp'
import kale from './assets/kale.webp'
import ribeye from './assets/ribeye.webp'
import lamb from './assets/lamb.webp'
import chicken from './assets/chicken.webp'
import mince from './assets/mince.webp'
import heroProduce from './assets/hero-produce.webp'
import heroButcher from './assets/hero-butcher.webp'

export const IMG = { heroProduce, heroButcher, tomatoes, strawberries, avocados, carrots, lemons, kale, ribeye, lamb, chicken, mince }

export type Dept = 'produce' | 'butchery'

export type Choice = { label: string; sub?: string; delta?: number }
export type OptionGroup = { id: string; label: string; choices: Choice[] }

export type Product = {
  id: string
  name: string
  dept: Dept
  category: string
  image: string
  price: number
  unit: 'kg' | 'each' | 'bunch' | 'punnet'
  unitNote?: string
  perKg?: number
  origin: string
  distance?: string
  harvested?: string
  rating: number
  reviews: number
  tags: ('Organic' | 'Local' | 'In season' | 'On offer' | 'Dry-aged' | 'Grass-fed' | 'Free-range' | 'Halal')[]
  was?: number
  short: string
  about: string
  storage: string
  nutrition: [string, string][]
  // produce
  weights?: number[]
  piecesPerKg?: string
  ripeness?: boolean
  // butchery
  cutWeights?: { g: number; serves: string }[]
  groups?: OptionGroup[]
  batch?: string
  cooking?: [string, string][]
}

const pack: OptionGroup = {
  id: 'pack',
  label: 'Packaging',
  choices: [
    { label: 'Vacuum sealed', sub: 'Keeps 10 days chilled' },
    { label: 'Butcher paper', sub: 'Cook within 3 days' },
  ],
}
const cert: OptionGroup = {
  id: 'cert',
  label: 'Certification',
  choices: [
    { label: 'Halal certified', sub: 'Certified supplier' },
    { label: 'Standard', sub: 'Conventional process' },
  ],
}

export const PRODUCTS: Product[] = [
  {
    id: 'tomatoes',
    name: 'Heirloom Tomatoes',
    dept: 'produce',
    category: 'Vegetables',
    image: tomatoes,
    price: 6.9,
    was: 8.6,
    unit: 'kg',
    origin: 'Valley Farm',
    distance: '42 km',
    harvested: 'Picked Monday',
    rating: 4.8,
    reviews: 212,
    tags: ['Local', 'In season', 'On offer'],
    weights: [0.5, 1, 1.5, 2],
    piecesPerKg: '6–8 tomatoes per kg',
    short: 'Mixed varieties, vine-ripened',
    about: 'A mix of Brandywine, Green Zebra and Golden Jubilee, picked when fully coloured for deep, sweet-acid flavour. Each box is a little different.',
    storage: 'Keep at room temperature, stem-side down, away from sunlight. Refrigerate only once fully ripe; eat within 4 days.',
    nutrition: [['Energy', '18 kcal'], ['Carbs', '3.9 g'], ['Fibre', '1.2 g'], ['Vitamin C', '23% RI']],
  },
  {
    id: 'strawberries',
    name: 'Strawberries',
    dept: 'produce',
    category: 'Fruits',
    image: strawberries,
    price: 4.5,
    unit: 'punnet',
    unitNote: '400 g',
    perKg: 11.25,
    origin: 'Hollis Berry Co.',
    distance: '18 km',
    harvested: 'Picked today',
    rating: 4.9,
    reviews: 486,
    tags: ['Local', 'In season'],
    short: 'Albion variety, sweet & firm',
    about: 'Day-neutral Albion strawberries, hand-picked at dawn and on our shelves by noon. Sweet, glossy and firm enough for tarts.',
    storage: 'Refrigerate unwashed in the punnet. Rinse just before eating. Best within 2–3 days.',
    nutrition: [['Energy', '32 kcal'], ['Carbs', '7.7 g'], ['Fibre', '2 g'], ['Vitamin C', '73% RI']],
  },
  {
    id: 'avocados',
    name: 'Hass Avocados',
    dept: 'produce',
    category: 'Fruits',
    image: avocados,
    price: 1.6,
    unit: 'each',
    unitNote: '≈ 200 g',
    perKg: 8.0,
    origin: 'Michoacán, Mexico',
    harvested: 'Ripened in store',
    rating: 4.6,
    reviews: 931,
    tags: ['Organic'],
    ripeness: true,
    short: 'Creamy, nutty, ripened by us',
    about: 'Organic Hass avocados ripened in our own rooms and hand-graded every morning, so you can choose exactly when you want to eat them.',
    storage: 'Ripen at room temperature. Once it yields to gentle pressure, refrigerate to hold for 2 more days.',
    nutrition: [['Energy', '160 kcal'], ['Fat', '14.7 g'], ['Fibre', '6.7 g'], ['Potassium', '24% RI']],
  },
  {
    id: 'carrots',
    name: 'Rainbow Carrots',
    dept: 'produce',
    category: 'Vegetables',
    image: carrots,
    price: 2.8,
    unit: 'bunch',
    unitNote: '≈ 600 g',
    perKg: 4.67,
    origin: 'Oakridge Organics',
    distance: '65 km',
    harvested: 'Picked Sunday',
    rating: 4.7,
    reviews: 154,
    tags: ['Organic', 'Local'],
    short: 'Purple, yellow & orange, tops on',
    about: 'Bunched with their greens still on—a sign of freshness. Roast whole, or blitz the tops into a bright pesto.',
    storage: 'Twist off tops and store separately. Keep carrots in the crisper in a damp cloth for up to 2 weeks.',
    nutrition: [['Energy', '41 kcal'], ['Carbs', '9.6 g'], ['Fibre', '2.8 g'], ['Vitamin A', '104% RI']],
  },
  {
    id: 'lemons',
    name: 'Meyer Lemons',
    dept: 'produce',
    category: 'Citrus',
    image: lemons,
    price: 0.7,
    unit: 'each',
    unitNote: '≈ 120 g',
    perKg: 5.83,
    origin: 'Sunridge Grove',
    distance: '120 km',
    harvested: 'Picked Friday',
    rating: 4.5,
    reviews: 98,
    tags: ['Local'],
    short: 'Fragrant, sweeter than Eureka',
    about: 'A cross between lemon and mandarin with thin, fragrant skin. Gentler acidity—lovely in dressings and with grilled meats.',
    storage: 'Keep in the fridge in a sealed bag for up to 3 weeks.',
    nutrition: [['Energy', '29 kcal'], ['Carbs', '9.3 g'], ['Fibre', '2.8 g'], ['Vitamin C', '66% RI']],
  },
  {
    id: 'kale',
    name: 'Curly Kale',
    dept: 'produce',
    category: 'Leafy greens',
    image: kale,
    price: 2.2,
    unit: 'bunch',
    unitNote: '≈ 250 g',
    perKg: 8.8,
    origin: 'Oakridge Organics',
    distance: '65 km',
    harvested: 'Picked Monday',
    rating: 4.4,
    reviews: 76,
    tags: ['Organic', 'Local'],
    short: 'Tender leaves, deep green',
    about: 'Young curly kale with tender stems. Massage with lemon and salt for salads or crisp in the oven.',
    storage: 'Wrap in a damp towel and refrigerate. Best within 5 days.',
    nutrition: [['Energy', '49 kcal'], ['Protein', '4.3 g'], ['Fibre', '3.6 g'], ['Vitamin K', '>100% RI']],
  },
  {
    id: 'ribeye',
    name: 'Dry-aged Ribeye',
    dept: 'butchery',
    category: 'Beef',
    image: ribeye,
    price: 42,
    unit: 'kg',
    origin: 'Hillcrest Farm · Black Angus',
    distance: '90 km',
    batch: 'HC-2291 · aged 28 days',
    rating: 4.9,
    reviews: 318,
    tags: ['Dry-aged', 'Grass-fed', 'Halal'],
    short: '28-day dry-aged, grass-fed Angus',
    about: 'Cut from the rib section and dry-aged on the bone for 28 days in our Himalayan-salt chamber for a deep, nutty flavour and buttery tenderness.',
    storage: 'Keep at 0–4 °C. Bring to room temperature 30 minutes before cooking.',
    nutrition: [['Energy', '291 kcal'], ['Protein', '24 g'], ['Fat', '22 g'], ['Iron', '15% RI']],
    cutWeights: [
      { g: 250, serves: 'Light' },
      { g: 300, serves: 'Classic' },
      { g: 400, serves: 'Hearty' },
      { g: 500, serves: 'To share' },
    ],
    groups: [
      {
        id: 'thick',
        label: 'Thickness',
        choices: [
          { label: '2 cm', sub: 'Quick sear' },
          { label: '2.5 cm', sub: 'Classic' },
          { label: '3 cm', sub: 'Thick-cut' },
          { label: '4 cm', sub: 'Reverse sear' },
        ],
      },
      {
        id: 'bone',
        label: 'Bone',
        choices: [
          { label: 'Boneless', sub: 'Easy to carve' },
          { label: 'Bone-in', sub: 'More flavour', delta: 1.5 },
        ],
      },
      {
        id: 'trim',
        label: 'Trim',
        choices: [
          { label: 'Standard' },
          { label: 'Lean trim' },
          { label: 'Fat cap on' },
        ],
      },
      {
        id: 'prep',
        label: 'Preparation',
        choices: [
          { label: 'As is' },
          { label: 'Garlic & rosemary', delta: 1.5 },
          { label: 'Coffee-salt rub', delta: 1 },
        ],
      },
      pack,
      cert,
    ],
    cooking: [
      ['Rare', '52 °C'],
      ['Medium-rare', '57 °C'],
      ['Medium', '63 °C'],
    ],
  },
  {
    id: 'lamb',
    name: 'Rack of Lamb',
    dept: 'butchery',
    category: 'Lamb',
    image: lamb,
    price: 36,
    unit: 'kg',
    origin: 'Ridgeline Pastures · Dorper',
    distance: '140 km',
    batch: 'RP-0817 · aged 7 days',
    rating: 4.8,
    reviews: 142,
    tags: ['Grass-fed', 'Halal'],
    short: '8-bone, frenched, pasture-raised',
    about: 'A full 8-bone rack from pasture-raised Dorper lamb, frenched by hand. Mild, sweet and wonderfully tender.',
    storage: 'Keep at 0–4 °C. Cook within 3 days or freeze for up to 3 months.',
    nutrition: [['Energy', '282 kcal'], ['Protein', '25 g'], ['Fat', '20 g'], ['Zinc', '32% RI']],
    cutWeights: [
      { g: 400, serves: 'Serves 2' },
      { g: 600, serves: 'Serves 3' },
      { g: 800, serves: 'Serves 4' },
      { g: 1000, serves: 'Serves 5' },
    ],
    groups: [
      {
        id: 'cut',
        label: 'Cut',
        choices: [
          { label: 'Whole rack', sub: 'Roast & carve' },
          { label: 'Single cutlets', sub: 'Grill' },
          { label: 'Double cutlets', sub: 'Pan-roast' },
        ],
      },
      {
        id: 'trim',
        label: 'Trim',
        choices: [{ label: 'Frenched' }, { label: 'Not frenched' }],
      },
      {
        id: 'prep',
        label: 'Preparation',
        choices: [{ label: 'As is' }, { label: 'Mint & garlic', delta: 1.5 }, { label: 'Herb crust', delta: 2 }],
      },
      pack,
      cert,
    ],
    cooking: [
      ['Medium-rare', '57 °C'],
      ['Medium', '63 °C'],
      ['Well done', '71 °C'],
    ],
  },
  {
    id: 'chicken',
    name: 'Free-range Chicken Breast',
    dept: 'butchery',
    category: 'Poultry',
    image: chicken,
    price: 16.5,
    unit: 'kg',
    origin: 'Meadowbrook Farm',
    distance: '55 km',
    batch: 'MB-1140 · packed today',
    rating: 4.7,
    reviews: 604,
    tags: ['Free-range', 'Halal'],
    short: 'Air-chilled, slow-grown',
    about: 'Slow-grown, free-range birds, air-chilled rather than water-chilled for firmer texture, crisper skin and no added water.',
    storage: 'Keep at 0–4 °C on the bottom shelf. Cook within 2 days.',
    nutrition: [['Energy', '165 kcal'], ['Protein', '31 g'], ['Fat', '3.6 g'], ['B6', '46% RI']],
    cutWeights: [
      { g: 250, serves: '1 breast' },
      { g: 500, serves: '2 breasts' },
      { g: 1000, serves: '4 breasts' },
    ],
    groups: [
      { id: 'skin', label: 'Skin', choices: [{ label: 'Skin on' }, { label: 'Skin off' }] },
      {
        id: 'cut',
        label: 'Cut',
        choices: [
          { label: 'Whole', sub: 'Roast' },
          { label: 'Diced', sub: 'Curries' },
          { label: 'Strips', sub: 'Stir-fry' },
          { label: 'Butterflied', sub: 'Grill' },
        ],
      },
      {
        id: 'prep',
        label: 'Marinade',
        choices: [{ label: 'As is' }, { label: 'Lemon & herb', delta: 1.2 }, { label: 'Shawarma spice', delta: 1.2 }],
      },
      pack,
      cert,
    ],
    cooking: [['Safe internal', '74 °C']],
  },
  {
    id: 'mince',
    name: 'Beef Mince',
    dept: 'butchery',
    category: 'Mince & sausages',
    image: mince,
    price: 12.9,
    unit: 'kg',
    origin: 'Hillcrest Farm · Angus',
    distance: '90 km',
    batch: 'HC-2302 · ground to order',
    rating: 4.8,
    reviews: 877,
    tags: ['Grass-fed', 'Halal'],
    short: 'Ground fresh when you order',
    about: 'Chuck and brisket trim, ground the morning your order is packed—never pre-ground. Choose your fat ratio and grind.',
    storage: 'Keep at 0–4 °C. Cook within 2 days or freeze flat.',
    nutrition: [['Energy', '217 kcal'], ['Protein', '26 g'], ['Fat', '12 g'], ['Iron', '14% RI']],
    cutWeights: [
      { g: 250, serves: 'Serves 1–2' },
      { g: 500, serves: 'Serves 3–4' },
      { g: 1000, serves: 'Serves 6–8' },
    ],
    groups: [
      {
        id: 'fat',
        label: 'Fat ratio',
        choices: [
          { label: '5%', sub: 'Extra lean', delta: 0.8 },
          { label: '10%', sub: 'Lean' },
          { label: '20%', sub: 'Burgers' },
        ],
      },
      { id: 'grind', label: 'Grind', choices: [{ label: 'Fine', sub: 'Kofta, sauces' }, { label: 'Coarse', sub: 'Burgers, chili' }] },
      { id: 'shape', label: 'Shape', choices: [{ label: 'Loose' }, { label: 'Patties', sub: '125 g each' }] },
      pack,
      cert,
    ],
    cooking: [['Safe internal', '71 °C']],
  },
]

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!

export const money = (n: number) => `$${n.toFixed(2)}`

export const unitLabel = (p: Product) => (p.unit === 'kg' ? '/kg' : p.unit === 'each' ? ' each' : p.unit === 'bunch' ? ' /bunch' : ' /punnet')

/* ------------------------------------------------------------------ */
/* Screen catalogue: what every screen contains and why               */
/* ------------------------------------------------------------------ */

export type ScreenId =
  | 'welcome'
  | 'home'
  | 'browse'
  | 'search'
  | 'listing'
  | 'produce'
  | 'butcher'
  | 'cut'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'account'

export type Stage = 'Onboard' | 'Discover' | 'Fruit & Veg' | 'Butchery' | 'Purchase' | 'Fulfil' | 'Retain'

export type ScreenMeta = {
  id: ScreenId
  n: string
  title: string
  stage: Stage
  goal: string
  includes: string[]
  ux: { p: string; note: string }[]
  next: ScreenId[]
  lightStatus?: boolean
}

export const STAGES: Stage[] = ['Onboard', 'Discover', 'Fruit & Veg', 'Butchery', 'Purchase', 'Fulfil', 'Retain']

export const SCREENS: ScreenMeta[] = [
  {
    id: 'welcome',
    n: '01',
    title: 'Welcome & delivery check',
    stage: 'Onboard',
    lightStatus: true,
    goal: 'Set expectations in five seconds and answer the first question every grocery shopper has: “Do you deliver to me, and when?”',
    includes: [
      'Brand mark and one-line positioning',
      'Full-bleed seasonal photography',
      'Three value pillars: farm freshness, cut-to-order butchery, 2-hour slots',
      'Postcode check with inline result',
      'Preview of the next available delivery slot',
      'Primary “Start shopping” CTA, guest browsing allowed',
      'Secondary sign-in link for returning customers',
    ],
    ux: [
      { p: 'Reduce uncertainty early', note: 'Coverage is checked before anything else, so nobody fills a basket we cannot deliver.' },
      { p: 'Defer sign-up', note: 'Browsing never requires an account. Registration moves to checkout, which protects first-session conversion.' },
      { p: 'Visibility of system status', note: 'Showing a real next slot turns a vague promise into a concrete time.' },
    ],
    next: ['home'],
  },
  {
    id: 'home',
    n: '02',
    title: 'Home',
    stage: 'Discover',
    goal: 'A launchpad for three intents: restock quickly, see what is good this week, and reach the butcher counter in one tap.',
    includes: [
      'Delivery address and live slot chip (persistent context)',
      'Search entry with voice input',
      'Seasonal hero campaign',
      'Six department shortcuts',
      '“Order again” rail built from purchase history',
      'Butcher’s Counter feature with same-day cut-off',
      '“In season now” rail with quick add',
      'Curated bundle (Sunday roast box)',
      'Bottom tab bar with live basket count',
    ],
    ux: [
      { p: 'Recognition over recall', note: '“Order again” lets regulars rebuild a weekly shop without remembering or searching.' },
      { p: "Hick's law", note: 'Six shortcuts, not twenty. Fewer choices make the first decision faster.' },
      { p: 'Contrast & hierarchy', note: 'The dark butchery block breaks the light page rhythm, so the store’s key differentiator stands out.' },
      { p: "Fitts's law", note: 'Primary navigation sits in the thumb zone at the bottom of the screen.' },
    ],
    next: ['listing', 'butcher', 'search', 'browse'],
  },
  {
    id: 'browse',
    n: '03',
    title: 'Browse departments',
    stage: 'Discover',
    goal: 'A clear map of the store that mirrors the physical layout shoppers already know: produce aisles plus a butcher counter.',
    includes: [
      'Search field',
      'Two primary departments as photo cards',
      'Sub-category rows with item counts',
      'Sourcing shortcuts: Organic, Local, Halal, Offers',
      'Pantry pairings (eggs, dairy, bakery, spices)',
    ],
    ux: [
      { p: 'Match the real world', note: 'The structure follows the physical shop, so shoppers can use the mental model they already have.' },
      { p: 'Information scent', note: 'Item counts set expectations before a tap and cut down on dead-end navigation.' },
      { p: 'Shallow hierarchy', note: 'Two levels at most. Every product is three taps or fewer from this screen.' },
    ],
    next: ['listing', 'butcher'],
  },
  {
    id: 'search',
    n: '04',
    title: 'Search',
    stage: 'Discover',
    goal: 'Get from intent to product as fast as possible, including vague, occasion-based intent like “BBQ” or “quick dinner”.',
    includes: [
      'Auto-focused field with clear and voice controls',
      'Recent searches (removable)',
      'Trending this week',
      'Shop by occasion tiles',
      'Live results grouped by department with match highlighting',
      'Inline add to basket',
      'No-results recovery with suggestions',
    ],
    ux: [
      { p: 'Recall support', note: 'Recent and trending terms mean shoppers can often tap instead of typing.' },
      { p: 'Grouping', note: 'Separating produce from butchery results makes mixed queries like “lemon chicken” easy to scan.' },
      { p: 'Forgiveness', note: 'The empty state always offers a way forward, never a dead end.' },
    ],
    next: ['produce', 'cut'],
  },
  {
    id: 'listing',
    n: '05',
    title: 'Product listing',
    stage: 'Fruit & Veg',
    goal: 'Let shoppers scan, compare and add many items quickly, the way they would sweep through a market stall.',
    includes: [
      'Sub-category tabs',
      'Filter button with active-filter count',
      'Toggle chips: Organic, Local, In season, On offer',
      'Sort control and live result count',
      'Cards: photo, badges, favourite, name, origin and distance',
      'Price with unit and per-kg comparison price',
      'Inline add that becomes a quantity stepper',
      'Empty state when filters exclude everything',
    ],
    ux: [
      { p: 'Unit-price transparency', note: 'A per-kg reference on every card makes bunches, punnets and loose items easy to compare.' },
      { p: 'Efficiency of use', note: 'Add and adjust quantity in place, with no trip to a detail page.' },
      { p: 'Immediate feedback', note: 'Chips filter instantly and the result count updates live.' },
      { p: 'Gestalt similarity', note: 'Every card has the same anatomy, so the eye learns where to look.' },
    ],
    next: ['produce', 'cart'],
  },
  {
    id: 'produce',
    n: '06',
    title: 'Produce detail',
    stage: 'Fruit & Veg',
    lightStatus: false,
    goal: 'Replace the in-store moment of picking up and checking an item: ripeness, origin, freshness and how much to buy.',
    includes: [
      'Large photography with gallery indicator',
      'Name, rating and review count',
      'Provenance: farm, distance, harvest day',
      'Price with unit and per-kg reference',
      'Ripeness selector (eat today / in 2–3 days) or weight selector with piece estimate',
      'Quantity stepper',
      'Substitution preference if out of stock',
      'Expandable About, Storage and Nutrition sections',
      '“Pairs well with” suggestions',
      'Sticky add bar with live total',
    ],
    ux: [
      { p: 'Progressive disclosure', note: 'Storage and nutrition stay folded until needed, keeping the decision area short.' },
      { p: 'Error prevention', note: 'Shoppers choose a substitute up front instead of being surprised at the door.' },
      { p: 'Speak the user’s language', note: '“1 kg ≈ 6–8 tomatoes” turns abstract weight into something easy to picture.' },
    ],
    next: ['cart'],
  },
  {
    id: 'butcher',
    n: '07',
    title: 'Butcher’s Counter',
    stage: 'Butchery',
    lightStatus: true,
    goal: 'A premium, specialist space that builds trust in meat quality and explains the cut-to-order promise.',
    includes: [
      'Distinct visual mode: oxblood palette, moody photography',
      'Same-day cut-off countdown',
      'Category tabs: Beef, Lamb, Poultry, Mince & sausages',
      '“Butcher’s pick” feature',
      'Cut list with ageing and feed descriptors',
      'Per-kg price anchored by a “from” price for a typical portion',
      '“How it works” in three steps, plus cold-chain assurance',
      'Traceability and Halal certification badges',
    ],
    ux: [
      { p: 'Mode shift', note: 'A change of palette signals expertise while keeping the same navigation.' },
      { p: 'Honest urgency', note: 'The countdown is the real cutting deadline, not a fake scarcity timer.' },
      { p: 'Anchoring', note: '“From $12.60” turns an abstract $42/kg into a real plate-sized price.' },
      { p: 'Trust at decision point', note: 'Farm, batch and certification badges sit next to the price.' },
    ],
    next: ['cut'],
  },
  {
    id: 'cut',
    n: '08',
    title: 'Cut-to-order configurator',
    stage: 'Butchery',
    goal: 'Recreate the conversation across the butcher counter: weight, thickness, trim and packing, without overwhelming anyone.',
    includes: [
      'Cut photography and traceability (farm, breed, batch)',
      'Weight-per-piece chips with serving guidance',
      'Pieces stepper',
      'Options that adapt to the cut: thickness, fat ratio, skin, grind',
      'Bone, trim and marinade choices with visible price changes',
      'Packaging choice with stated shelf life',
      'Halal or standard certification',
      'Free-text note to the butcher',
      'Live order summary and estimated price',
      'Weight-variance disclosure and cooking guide',
    ],
    ux: [
      { p: 'Chunking', note: 'Numbered steps break a complex order into small, sequential decisions.' },
      { p: 'Smart defaults', note: 'The most popular choices are preselected, so one tap is enough for most people.' },
      { p: 'No surprises', note: 'Price changes appear on the options themselves, and the total updates live.' },
      { p: 'Plain consequences', note: '“Cook within 3 days” explains what a packaging choice means in practice.' },
    ],
    next: ['cart'],
  },
  {
    id: 'cart',
    n: '09',
    title: 'Basket',
    stage: 'Purchase',
    goal: 'Review, adjust and feel confident about the final price, especially for items sold by weight.',
    includes: [
      'Delivery slot reminder with change option',
      'Free-delivery progress bar',
      'Items grouped by department (Fruit & Veg / Butcher’s Counter)',
      'Configuration summary on each item, e.g. 2 × 300 g · 2.5 cm',
      'Quantity steppers and remove',
      '“Estimated” tags on weighed items and a clear charging policy',
      '“Forgotten something?” suggestions',
      'Promo code and cost breakdown',
      'Sticky checkout CTA and a designed empty state',
    ],
    ux: [
      { p: 'Goal-gradient effect', note: 'The progress bar motivates basket building with a clear, reachable target.' },
      { p: 'Trust through transparency', note: 'Weighed items say exactly how the final charge works.' },
      { p: 'Mirror fulfilment', note: 'Grouping follows how the order is actually picked and cut.' },
    ],
    next: ['checkout'],
  },
  {
    id: 'checkout',
    n: '10',
    title: 'Checkout',
    stage: 'Purchase',
    goal: 'Complete the order in one scrolling page with as few decisions as possible and none of them surprising.',
    includes: [
      'Progress indicator (Delivery, Payment, Review)',
      'Address card',
      'Slot picker: days, 2-hour windows with fee, “few left”, “full” and eco states',
      'Drop-off instructions',
      'Default substitution policy',
      'Payment: Apple Pay, saved card, cash on delivery',
      'Pre-authorisation note for weighed items',
      'Collapsible order summary',
      'Place order button with total',
    ],
    ux: [
      { p: 'Reduce steps', note: 'One page with clear sections beats a multi-page wizard on mobile.' },
      { p: 'Explain constraints', note: 'Full slots stay visible but disabled, so shoppers see the real availability.' },
      { p: 'Sensible defaults', note: 'Address, payment and instructions are prefilled from the last order.' },
    ],
    next: ['tracking'],
  },
  {
    id: 'tracking',
    n: '11',
    title: 'Order confirmation & tracking',
    stage: 'Fulfil',
    goal: 'Reassure after payment and keep shoppers informed and in control until the doorbell rings.',
    includes: [
      'Confirmation with order number',
      'ETA window',
      'Live status timeline that includes butchery steps (cutting, chilling, packing)',
      'Substitution approval request',
      'Delivery map with route',
      'Edit order until the cut-off',
      'Items summary and support entry',
    ],
    ux: [
      { p: 'Visibility of system status', note: 'Each fulfilment stage is named, including the butcher cutting the order.' },
      { p: 'User control', note: 'Shoppers approve or decline substitutions instead of having them imposed.' },
      { p: 'Peak–end rule', note: 'A calm, informative ending shapes how people remember the whole experience.' },
    ],
    next: ['account'],
  },
  {
    id: 'account',
    n: '12',
    title: 'Account & preferences',
    stage: 'Retain',
    goal: 'Make the second order easier than the first: history, reorder and preferences that shape every other screen.',
    includes: [
      'Profile and loyalty points',
      'Shortcuts: Orders, Favourites, Lists, Addresses',
      'Recent orders with one-tap reorder',
      'Sourcing preferences: Halal only, Organic first, Local first',
      'Default substitutions and butcher packaging',
      'Notifications and payment methods',
      'Help and sign out',
    ],
    ux: [
      { p: 'Personalisation', note: 'Preferences set once here apply automatically to listings and the butcher configurator.' },
      { p: 'Habit loop', note: 'One-tap reorder turns a weekly chore into a 20-second task.' },
    ],
    next: ['home'],
  },
]

export const meta = (id: ScreenId) => SCREENS.find((s) => s.id === id)!
