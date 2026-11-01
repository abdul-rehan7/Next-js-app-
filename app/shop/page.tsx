import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { getProductsByBrand } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop all sneakers",
  description:
    "Shop the full Sole Studio collection of authentic PUMA sneakers.",
};

type ShopSearchParams = Promise<{ brand?: string | string[] }>;

const filters = [
  { label: "All", href: "/shop", value: "all" },
  { label: "PUMA", href: "/shop?brand=puma", value: "puma" },
];

function normalizeBrand(value: string | string[] | undefined) {
  const brand = Array.isArray(value) ? value[0] : value;
  return brand === "puma" ? brand : "all";
}

function ShopSkeleton() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-[420px] animate-pulse rounded-card border border-ink/25 bg-white"
        />
      ))}
    </div>
  );
}

async function ShopResults({ searchParams }: { searchParams: ShopSearchParams }) {
  const params = await searchParams;
  const activeBrand = normalizeBrand(params.brand);
  const items = getProductsByBrand(activeBrand === "all" ? undefined : activeBrand);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <nav
          className="flex items-center gap-1 rounded-full border border-ink/25 bg-white p-1 shadow-card"
          aria-label="Filter by brand"
        >
          {filters.map((filter) => {
            const isActive = filter.value === activeBrand;
            return (
              <Link
                key={filter.value}
                href={filter.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                  isActive
                    ? "bg-brand-600 text-white shadow-card"
                    : "text-muted hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                {filter.label}
              </Link>
            );
          })}
        </nav>

        <p className="text-xs font-medium text-muted">
          {items.length} {items.length === 1 ? "style" : "styles"} available
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </>
  );
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: ShopSearchParams;
}) {
  return (
    <main id="main-content">
      <section className="border-b border-ink/25 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/35 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
            <SparkleIcon className="h-3.5 w-3.5" />
            The full rotation
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Sneakers worth slowing down for.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Authentic PUMA pairs, chosen for comfort and character. Find your
            size, and we&apos;ll handle the rest.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Suspense fallback={<ShopSkeleton />}>
          <ShopResults searchParams={searchParams} />
        </Suspense>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-card border border-ink/25 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-8 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-xl font-black tracking-tight text-ink">
              Not sure which pair?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Tell us how you move and we&apos;ll point you in the right direction.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Ask the team
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
