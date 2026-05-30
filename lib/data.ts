export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // cents
  category: string;
  tags: ("new" | "low-stock" | "sold-out")[];
  images: string[];
  description: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "1",
    slug: "club-uniform-hoodie",
    name: "Club Uniform Hoodie",
    price: 12800,
    category: "Tops",
    tags: ["new"],
    images: [
      "https://picsum.photos/seed/hoodie-black/800/1000",
      "https://picsum.photos/seed/hoodie-detail/800/1000",
    ],
    description:
      "Heavyweight 420gsm French terry. Dropped shoulders, oversized fit. Embroidered HEULASCLUB arch on chest. Made in Portugal.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "2",
    slug: "signal-crewneck",
    name: "Signal Crewneck",
    price: 9800,
    category: "Tops",
    tags: [],
    images: [
      "https://picsum.photos/seed/crewneck-grey/800/1000",
      "https://picsum.photos/seed/crewneck-detail/800/1000",
    ],
    description:
      "Midweight brushed fleece. Boxy silhouette, ribbed cuffs. Screen-printed frequency wave graphic on back.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "3",
    slug: "drop-cargo-pants",
    name: "Drop Cargo Pants",
    price: 18500,
    category: "Bottoms",
    tags: ["low-stock"],
    images: [
      "https://picsum.photos/seed/cargo-washed/800/1000",
      "https://picsum.photos/seed/cargo-detail/800/1000",
    ],
    description:
      "Washed ripstop nylon. 6 utility pockets, adjustable waistband with drawcord. Tapered drop-crotch fit.",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "4",
    slug: "archive-tee",
    name: "Archive Tee",
    price: 5800,
    category: "Tops",
    tags: [],
    images: [
      "https://picsum.photos/seed/tshirt-white/800/1000",
      "https://picsum.photos/seed/tshirt-detail/800/1000",
    ],
    description:
      "220gsm ringspun cotton. Slight boxy cut, flat hem. Debossed HEULASCLUB wordmark on chest. Pre-shrunk, garment-dyed.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "5",
    slug: "transit-jacket",
    name: "Transit Jacket",
    price: 24500,
    category: "Outerwear",
    tags: ["new"],
    images: [
      "https://picsum.photos/seed/jacket-black/800/1000",
      "https://picsum.photos/seed/jacket-detail/800/1000",
    ],
    description:
      "Technical nylon shell with mesh lining. Wind-resistant, water-repellent finish. Dual-zip front, storm collar.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "6",
    slug: "grid-shorts",
    name: "Grid Shorts",
    price: 8400,
    category: "Bottoms",
    tags: [],
    images: [
      "https://picsum.photos/seed/shorts-grey/800/1000",
      "https://picsum.photos/seed/shorts-detail/800/1000",
    ],
    description:
      "Lightweight mesh training shorts. 7-inch inseam, built-in compression liner. Reflective HEULASCLUB wordmark.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "7",
    slug: "void-beanie",
    name: "Void Beanie",
    price: 3600,
    category: "Accessories",
    tags: [],
    images: [
      "https://picsum.photos/seed/beanie-black/800/800",
      "https://picsum.photos/seed/beanie-detail/800/800",
    ],
    description:
      "100% merino wool. Ribbed knit, fold-over cuff. Embroidered void icon on side. One size.",
    sizes: ["One Size"],
  },
  {
    id: "8",
    slug: "phantom-cap",
    name: "Phantom Cap",
    price: 4200,
    category: "Accessories",
    tags: ["sold-out"],
    images: [
      "https://picsum.photos/seed/cap-black/800/800",
      "https://picsum.photos/seed/cap-detail/800/800",
    ],
    description:
      "6-panel structured cap, cotton twill. Low-profile, curved brim. Embroidered HEULASCLUB arch on front.",
    sizes: ["One Size"],
  },
  {
    id: "9",
    slug: "cipher-longsleeve",
    name: "Cipher Longsleeve",
    price: 7200,
    category: "Tops",
    tags: [],
    images: [
      "https://picsum.photos/seed/ls-black/800/1000",
      "https://picsum.photos/seed/ls-detail/800/1000",
    ],
    description:
      "240gsm heavyweight cotton. Raglan sleeves, thumbhole cuffs. All-over cipher grid screen print.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.tags.includes("new"));
}