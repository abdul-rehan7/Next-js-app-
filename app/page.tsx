import Image from "next/image";
import Link from "next/link";
import { ChatWidget } from "@/components/chat-widget";
import { ProductCard } from "@/components/product-card";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  RefreshIcon,
  ShieldIcon,
  SparkleIcon,
  StarIcon,
  TruckIcon,
} from "@/components/icons";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

const perks = [
  {
    title: "Authentic, always",
    description:
      "Every pair is sourced with care and checked by our team before it ships.",
    icon: ShieldIcon,
  },
  {
    title: "Fast, tracked delivery",
    description:
      "Free shipping over $150, with 2-day dispatch on every order placed before 2pm.",
    icon: TruckIcon,
  },
  {
    title: "30-day easy returns",
    description:
      "Tried them on and changed your mind? Send them back, no hard feelings.",
    icon: RefreshIcon,
  },
];

export default function Home() {
  const heroProduct = getProductBySlug("suede-classic") ?? products[0];
  const palermoPick = getProductBySlug("palermo") ?? products[1];
  const rsxPick = getProductBySlug("rs-x") ?? products[2];

  return (
    <main id="main-content">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-50 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
            <div className="animate-rise">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/35 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 shadow-card">
                <SparkleIcon className="h-3.5 w-3.5" />
                New season · 2026
              </span>

              <h1 className="mt-6 text-balance text-[clamp(2.9rem,7vw,5.3rem)] font-black leading-[0.92] tracking-[-0.045em] text-ink">
                Step into your{" "}
                <span className="relative inline-block text-brand-600">
                  next icon
                  <svg
                    aria-hidden
                    viewBox="0 0 220 16"
                    className="absolute -bottom-2 left-0 h-3 w-full text-brand-300"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 11c40-7 88-9 214-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                .
              </h1>

              <p className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                A tightly edited rotation of PUMA icons, picked for the way you
                actually move. Authentic pairs, quick delivery, zero guesswork.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  Shop the collection
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/#brands"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/35 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  Explore brands
                  <ArrowUpRightIcon className="h-4 w-4 text-brand-600" />
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="flex text-brand-700">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon key={index} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                  4.7 from 640+ reviews
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-brand-700" />
                  100% authentic
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-brand-700" />
                  Free returns
                </span>
              </div>
            </div>

            <div className="animate-rise [animation-delay:120ms]">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-[2.5rem] border border-ink/25 bg-gradient-to-br from-brand-100 via-white to-brand-50 p-5 shadow-lift">
                <div
                  aria-hidden
                  className="absolute inset-6 rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#fff1f2_55%,#ffe0e2_100%)]"
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/35"
                />

                <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  <SparkleIcon className="h-3 w-3" />
                  Pick of the week
                </span>

                <Image
                  src={heroProduct.image}
                  alt={`${heroProduct.brand} ${heroProduct.name}`}
                  fill
                  preload
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="animate-float-shoe object-contain p-8 drop-shadow-2xl"
                />

                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between gap-3">
                  <div className="rounded-2xl border border-ink/25 bg-white/90 p-3.5 shadow-card backdrop-blur">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">
                      {heroProduct.brand}
                    </p>
                    <p className="mt-1 text-sm font-bold text-ink">{heroProduct.name}</p>
                    <p className="text-xs text-muted">{heroProduct.colorway}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink shadow-card">
                      {formatPrice(heroProduct.price)}
                    </span>
                    <Link
                      href={`/products/${heroProduct.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                    >
                      View pair
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t border-ink/25 py-6 sm:grid-cols-3">
            {[
              { value: String(products.length), label: "Curated silhouettes" },
              { value: "1", label: "Iconic brand" },
              { value: "30 days", label: "Easy returns" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline justify-center gap-2 rounded-2xl bg-white/60 px-4 py-3 text-center sm:justify-start"
              >
                <span className="text-lg font-black tracking-tight text-brand-600">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="brands" className="scroll-mt-28 border-y border-ink/25 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                The house edit
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                One brand. The whole rotation.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              We keep it focused: the PUMA silhouettes that earn their place in
              your weekly rotation.
            </p>
          </div>

          <Link
            href="/shop?brand=puma"
            className="group mt-8 grid overflow-hidden rounded-card border border-ink/25 bg-gradient-to-br from-brand-50 via-white to-brand-50/50 shadow-card transition hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 md:grid-cols-[1fr_1.05fr]"
          >
            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <p className="text-3xl font-black italic tracking-tight text-brand-700">
                PUMA
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Forever Faster.
              </p>
              <h3 className="mt-5 max-w-md text-2xl font-black leading-tight tracking-tight text-ink sm:text-3xl">
                Terrace heritage, modern comfort.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Suede Classic, Palermo, RS-X, Caven 2.0 and Future Rider —
                archive shapes with everyday ease.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                Shop PUMA
                <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>

            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px]">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-200/40 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute bottom-8 left-10 h-64 w-64 rounded-full border border-ink/25"
              />
              <Image
                src={palermoPick.image}
                alt=""
                fill
                sizes="(max-width: 768px) 92vw, 560px"
                className="object-contain p-8 drop-shadow-xl transition duration-500 group-hover:scale-105 group-hover:-rotate-2 sm:p-10"
              />
              <div className="pointer-events-none absolute -bottom-4 -left-2 h-32 w-32 sm:-left-4 sm:h-40 sm:w-40">
                <Image
                  src={rsxPick.image}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-contain drop-shadow-xl transition duration-500 group-hover:scale-105 group-hover:rotate-3"
                />
              </div>
              <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700 shadow-card">
                {products.length} styles
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section id="shop" className="scroll-mt-28">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                The line-up
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Every pair, in one place.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                Five silhouettes. Zero filler. Each one selected for comfort,
                character and how it wears in the real world.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 self-start rounded-full border border-ink/35 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 sm:self-auto"
            >
              Shop all sneakers
              <ArrowRightIcon className="h-4 w-4 text-brand-600" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/25 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="rounded-card border border-ink/25 bg-gradient-to-br from-white to-brand-50/40 p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <perk.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold tracking-tight text-ink">
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/25 bg-gradient-to-br from-brand-50 via-white to-brand-100/70 px-6 py-12 text-center shadow-card sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-200/40 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-brand-300/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
                <SparkleIcon className="h-3.5 w-3.5" />
                Authenticated in-house
              </span>
              <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-ink sm:text-5xl">
                Good shoes. Better decisions.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                A small, considered collection means you spend less time
                scrolling and more time wearing. Find your pair and get moving.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  Find your pair
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/35 bg-white/80 px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
    </main>
  );
}
