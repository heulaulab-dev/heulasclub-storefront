# HEULASCLUB Storefront — SPEC

## 1. Concept & Vision

HEULASCLUB is a premium streetwear/creative-club brand storefront. The site should feel like walking into an underground club that got a luxury rebrand: dark, editorial, kinetic. Not a typical ecom grid. Think editorial magazine meets high-end drop culture — where every scroll feels intentional and every product has a story.

Reference: vidslabstudio.com (dark editorial, cinematic layout, bold typography, strong visual hierarchy, minimal but charged).

---

## 2. Design Language

### Aesthetic Direction
Dark editorial with sharp typographic hierarchy. Cold luxury meets underground club culture. High contrast, restrained palette with one electric accent.

### Color Palette (CSS vars)
```
--bg-base:       #080808   /* near-black warm */
--bg-surface:    #111111   /* card surface */
--bg-elevated:   #1a1a1a   /* elevated surface */
--border:        #2a2a2a   /* subtle borders */
--text-primary:  #f0ede8   /* warm off-white */
--text-secondary:#888884   /* muted text */
--text-tertiary: #555550   /* very muted */
--accent:        #e8ff3c   /* electric lime — ONE accent, locked */
--accent-dim:    #b8cc2a   /* accent pressed state */
```

### Typography
- **Display:** `Geist Display` (sans-serif, tight tracking, high contrast headings)
- **Mono:** `Geist Mono` (labels, prices, metadata)
- **Body:** `Geist` (regular weight, relaxed)
- Scale: `text-6xl md:text-8xl` for hero, `text-sm` for metadata, no size in between that doesn't earn its place

### Spatial System
- Container: `max-w-[1440px] mx-auto px-6 md:px-12`
- Section gap: `py-24 md:py-40`
- Border-radius: `rounded-none` (sharp throughout — no rounded corners)
- Shape rule: all-sharp (radius 0), including buttons → sharp rectangles

### Motion Philosophy
`MOTION_INTENSITY: 7`
- Hero: staggered word-reveal on load (each word fades+slides up, 80ms stagger)
- Scroll reveals: `whileInView` fade+translate, `viewport={{ once: true, amount: 0.2 }}`
- Product cards: `scale(1.02)` + accent border on hover
- CTAs: `-translate-y-px` + shadow lift on active
- Cart: slide-in from right with spring physics
- No infinite loops except ambient grain overlay

### Visual Assets
- Icons: `@phosphor-icons/react`, `strokeWidth={1.5}`
- Images: `picsum.photos/seed/{descriptive-seed}/{w}/{h}` for placeholders
- No AI-purple, no generic gradients
- Grain overlay: fixed `pointer-events-none` SVG noise at 3% opacity

---

## 3. Layout & Structure

### Page Architecture
```
/ (Homepage)
  ├── Navbar (sticky, blurs on scroll)
  ├── Hero (full-viewport, editorial type)
  ├── Featured Drops (horizontal-scroll strip)
  ├── Editorial Split (asymmetric image + text)
  ├── Product Grid (3-col desktop, 1-col mobile)
  ├── Marquee Strip (brand manifesto scroll)
  ├── Newsletter Capture
  └── Footer

/products (Listing)
  └── Filters bar + product grid

/products/[slug] (Detail)
  └── Image gallery + product info + add to cart
```

### Navigation
- Logo left, links center, cart+account right
- Height: `h-16` (64px)
- On scroll: subtle backdrop-blur activates
- Mobile: hamburger → full-screen overlay menu

### Responsive Strategy
- Mobile-first breakpoints: `sm:640 md:768 lg:1024 xl:1280 2xl:1536`
- High-variance layouts collapse to single column below `md:`
- Never `h-screen` — use `min-h-[100dvh]`

---

## 4. Features & Interactions

### Cart
- Global cart state via Zustand
- Drawer slides in from right (not a page)
- Line items with quantity controls
- Subtotal + checkout CTA

### Product Cards
- Hover: scale + accent left-border reveal
- Quick-add button appears on hover
- Tag system: `NEW`, `LOW STOCK`, `SOLD OUT`

### Product Detail
- Image carousel (keyboard + swipe navigable)
- Size selector (radio-style, not dropdown)
- Add to cart with loading state
- Related products strip

### Newsletter
- Single email input + submit
- Success/error inline states
- No modal

### Empty / Loading States
- Skeleton loaders matching layout shape
- Empty cart: illustrated empty state with CTA
- Error: inline retry prompt

---

## 5. Component Inventory

| Component | States |
|---|---|
| `Button` | default, hover (lift), active (press), disabled, loading |
| `ProductCard` | default, hover, sold-out overlay |
| `CartDrawer` | closed, open, empty, loading |
| `Navbar` | default, scrolled (blurred), mobile-open |
| `Input` | default, focus, error, disabled |
| `Badge` | new, low-stock, sold-out |
| `MarqueeStrip` | continuous scroll, hover pauses |
| `HeroSection` | animated load-in, static on reduced-motion |

---

## 6. Technical Approach

### Stack
- **Framework:** Next.js 15 (App Router, RSC default)
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Animation:** `motion/react`
- **State:** Zustand (cart, UI state)
- **Icons:** `@phosphor-icons/react`
- **Fonts:** `next/font/google` (Geist family)

### Architecture
```
src/
  app/
    layout.tsx        # Root layout, nav, cart drawer
    page.tsx          # Homepage
    products/
      page.tsx        # Listing
      [slug]/page.tsx # Detail
  components/
    ui/               # Primitives (Button, Input, Badge)
    layout/           # Navbar, Footer, CartDrawer
    sections/         # Homepage sections
    products/         # ProductCard, ProductGrid, etc.
  lib/
    store.ts          # Zustand cart store
    data.ts           # Mock product data
    utils.ts          # cn(), formatPrice()
  styles/
    globals.css       # Tailwind imports + CSS vars
```

### Data Model (Mock)
```ts
type Product = {
  id: string
  slug: string
  name: string
  price: number
  category: string
  tags: ('new' | 'low-stock' | 'sold-out')[]
  images: string[]
  description: string
  sizes: string[]
}
```

### API Design
- No backend for MVP — all data from `lib/data.ts`
- Cart persisted to `localStorage`
- Future: Medusa.js integration ready

---

## Pre-Flight Checklist
- [x] Zero em-dashes on page
- [x] One theme (dark), no section flips
- [x] One accent color (electric lime), locked
- [x] Shape system: all-sharp (radius 0)
- [x] Button contrast: WCAG AA verified
- [x] No duplicate CTA intent
- [x] Eyebrow count ≤ ceil(sections/3)
- [x] Real images, no div-based fakes
- [x] Reduced-motion honored
- [x] Nav single-line at desktop
- [x] Hero fits viewport