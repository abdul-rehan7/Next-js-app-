export type Brand = "PUMA";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  price: number;
  compareAt?: number;
  image: string;
  colorway: string;
  category: string;
  rating: number;
  badge?: string;
  featured?: boolean;
  description: string;
  details: string[];
  sizes: string[];
};

const shoeSizes = ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];

export const products: Product[] = [
  {
    id: "puma-suede-classic",
    slug: "suede-classic",
    name: "Suede Classic",
    brand: "PUMA",
    price: 75,
    compareAt: 90,
    image: "/shoes/puma-suede-classic.png",
    colorway: "Black / White",
    category: "Lifestyle",
    rating: 4.8,
    badge: "Best seller",
    featured: true,
    description:
      "A timeless streetwear icon. The PUMA Suede Classic combines premium suede materials, a clean silhouette and everyday comfort to deliver an iconic sneaker that never goes out of style.",
    details: [
      "Premium suede leather upper",
      "PUMA Formstrip side branding",
      "Comfortable padded collar",
      "Durable rubber outsole",
      "Classic lace-up closure",
    ],
    sizes: shoeSizes,
  },
  {
    id: "puma-palermo",
    slug: "palermo",
    name: "Palermo",
    brand: "PUMA",
    price: 85,
    compareAt: 100,
    image: "/shoes/puma-palermo.png",
    colorway: "White / Green",
    category: "Lifestyle",
    rating: 4.7,
    badge: "Trending",
    featured: true,
    description:
      "Inspired by PUMA's football heritage, the Palermo brings retro terrace style into modern streetwear. Its premium materials and distinctive design make it perfect for everyday outfits.",
    details: [
      "Premium leather upper",
      "Suede overlays and T-toe construction",
      "Classic PUMA Formstrip",
      "Rubber gum outsole",
      "Comfortable textile lining",
    ],
    sizes: shoeSizes,
  },
  {
    id: "puma-rs-x",
    slug: "rs-x",
    name: "RS-X",
    brand: "PUMA",
    price: 110,
    compareAt: 130,
    image: "/shoes/puma-rs-x.png",
    colorway: "White / Blue / Red",
    category: "Lifestyle",
    rating: 4.6,
    badge: "Popular",
    featured: true,
    description:
      "Bold design meets modern comfort. The PUMA RS-X features a chunky silhouette, layered materials and advanced cushioning inspired by PUMA's running system heritage.",
    details: [
      "Mesh and synthetic leather upper",
      "RS cushioning technology",
      "Chunky retro-inspired midsole",
      "Padded tongue and collar",
      "Durable rubber outsole",
    ],
    sizes: shoeSizes,
  },
  {
    id: "puma-caven-2-0",
    slug: "caven-2-0",
    name: "Caven 2.0",
    brand: "PUMA",
    price: 65,
    compareAt: 80,
    image: "/shoes/puma-caven-2.png",
    colorway: "White / Black",
    category: "Lifestyle",
    rating: 4.5,
    badge: "Great value",
    featured: false,
    description:
      "A basketball-inspired sneaker designed for everyday wear. The PUMA Caven 2.0 combines vintage court aesthetics with comfortable cushioning and versatile styling.",
    details: [
      "Synthetic leather upper",
      "Perforated toe detailing",
      "SoftFoam+ cushioned footbed",
      "PUMA branding on tongue and heel",
      "Rubber cupsole construction",
    ],
    sizes: shoeSizes,
  },
  {
    id: "puma-future-rider",
    slug: "future-rider",
    name: "Future Rider",
    brand: "PUMA",
    price: 90,
    compareAt: 105,
    image: "/shoes/puma-future-rider.png",
    colorway: "Grey / White / Yellow",
    category: "Lifestyle",
    rating: 4.7,
    badge: "New arrival",
    featured: false,
    description:
      "The PUMA Future Rider brings classic running inspiration into contemporary streetwear. Featuring lightweight construction, retro styling and comfortable cushioning, it is made for everyday adventures.",
    details: [
      "Lightweight nylon and synthetic upper",
      "Suede overlays",
      "Federbein-inspired outsole design",
      "Comfortable cushioned midsole",
      "PUMA Formstrip side branding",
    ],
    sizes: shoeSizes,
  },
];

export const brands: { name: Brand; slug: string; tagline: string }[] = [
  { name: "PUMA", slug: "puma", tagline: "Forever Faster." },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductsByBrand(brand: string | undefined) {
  if (!brand) {
    return products;
  }

  const normalized = brand.toLowerCase();
  return products.filter((product) => product.brand.toLowerCase() === normalized);
}

export function getRelatedProducts(product: Product, limit = 3) {
  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const aMatch = a.brand === product.brand ? 0 : 1;
      const bMatch = b.brand === product.brand ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
}
