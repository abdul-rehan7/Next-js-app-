import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { addToCartAction } from "@/app/actions/cart";
import {
  ArrowRightIcon,
  BagIcon,
  CheckIcon,
  RefreshIcon,
  ShieldIcon,
  SparkleIcon,
  StarIcon,
  TruckIcon,
} from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import {
  formatPrice,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.brand} ${product.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);
  const savings = product.compareAt ? product.compareAt - product.price : 0;

  return (
    <main id="main-content">
      <div className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-brand-700">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/shop" className="transition hover:text-brand-700">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/shop?brand=${product.brand.toLowerCase()}`}
            className="transition hover:text-brand-700"
          >
            {product.brand}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-ink">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-ink/25 bg-gradient-to-br from-brand-50 via-[#fff8f6] to-white shadow-card">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/35"
              />
              <div
                aria-hidden
                className="absolute inset-8 rounded-[1.75rem] border border-white/70 bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#fff1f2_60%,#ffe0e2_100%)]"
              />
              {product.badge ? (
                <span className="absolute left-6 top-6 z-10 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700 shadow-card">
                  {product.badge}
                </span>
              ) : null}
              <span className="absolute right-6 top-6 z-10 rounded-full bg-ink px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                {product.brand}
              </span>
              <Image
                src={product.image}
                alt={`${product.brand} ${product.name} in ${product.colorway}`}
                fill
                preload
                sizes="(max-width: 1024px) 92vw, 560px"
                className="object-contain p-10 drop-shadow-2xl sm:p-14"
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldIcon, label: "Authenticated" },
                { icon: TruckIcon, label: "Ships in 2 days" },
                { icon: RefreshIcon, label: "30-day returns" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-2xl border border-ink/25 bg-white px-3.5 py-3 text-xs font-medium text-muted"
                >
                  <item.icon className="h-4 w-4 text-brand-700" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                {product.brand} · {product.category}
              </p>
              <span className="flex items-center gap-1 text-xs font-medium text-muted">
                <StarIcon className="h-3.5 w-3.5 text-brand-700" />
                {product.rating.toFixed(1)} rating
              </span>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-muted">{product.colorway}</p>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-black text-ink">
                {formatPrice(product.price)}
              </span>
              {product.compareAt ? (
                <>
                  <span className="text-sm font-medium text-muted line-through">
                    {formatPrice(product.compareAt)}
                  </span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700">
                    Save {formatPrice(savings)}
                  </span>
                </>
              ) : null}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted">{product.description}</p>

            <form action={addToCartAction} className="mt-8">
              <input type="hidden" name="productId" value={product.id} />

              <fieldset>
                <div className="flex items-center justify-between gap-3">
                  <legend className="text-xs font-bold uppercase tracking-[0.18em] text-ink">
                    Select size (US)
                  </legend>
                  <Link
                    href="/contact"
                    className="text-xs font-medium text-brand-700 underline-offset-4 transition hover:underline"
                  >
                    Size guide
                  </Link>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {product.sizes.map((size, index) => (
                    <label key={size} className="cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        defaultChecked={index === 2}
                        className="peer sr-only"
                      />
                      <span className="flex h-11 items-center justify-center rounded-2xl border border-ink/30 bg-white text-sm font-semibold text-ink transition peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-600 peer-focus-visible:ring-offset-2 hover:border-ink/50">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <label className="flex items-center gap-3 rounded-2xl border border-ink/30 bg-white px-4 py-2.5 text-sm font-medium text-ink sm:w-36">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Qty
                  </span>
                  <select
                    name="quantity"
                    defaultValue="1"
                    className="w-full rounded-lg bg-transparent py-1 text-sm font-semibold text-ink outline-none"
                    aria-label="Quantity"
                  >
                    {[1, 2, 3, 4, 5].map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  <BagIcon className="h-4 w-4" />
                  Add to bag
                </button>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <CheckIcon className="h-4 w-4 text-brand-700" />
                Free shipping on this pair. Delivery in 2–4 business days.
              </p>
            </form>

            <div className="mt-8 space-y-3">
              <details
                open
                className="group rounded-2xl border border-ink/25 bg-white p-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-ink">
                  The details
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </details>

              <details className="group rounded-2xl border border-ink/25 bg-white p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-ink">
                  Shipping & returns
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  <p>
                    Orders placed before 2pm ET ship the same business day.
                    Standard delivery is 2–4 business days and free over $150.
                  </p>
                  <p>
                    Changed your mind? Return unworn pairs within 30 days for a
                    full refund. Contact our team and we&apos;ll send a label.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/25 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                <SparkleIcon className="h-3.5 w-3.5" />
                Keep looking
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Pairs that play well together.
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 self-start rounded-full border border-ink/35 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 sm:self-auto"
            >
              Shop all
              <ArrowRightIcon className="h-4 w-4 text-brand-600" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
