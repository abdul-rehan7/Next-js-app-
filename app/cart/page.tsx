import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  clearCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/app/actions/cart";
import {
  ArrowRightIcon,
  BagIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  ShieldIcon,
  TruckIcon,
  XIcon,
} from "@/components/icons";
import {
  FREE_SHIPPING_THRESHOLD,
  MAX_LINE_QUANTITY,
} from "@/lib/cart";
import { getCartSummary } from "@/lib/cart-server";
import { formatPrice } from "@/lib/products";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review the sneakers in your Sole Studio bag and check out.",
};

function CartSkeleton() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]" aria-hidden>
      <div className="h-[380px] animate-pulse rounded-card border border-ink/25 bg-white" />
      <div className="h-[320px] animate-pulse rounded-card border border-ink/25 bg-white" />
    </div>
  );
}

function EmptyBag() {
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-ink/25 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-14 text-center shadow-card sm:px-12">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-brand-600 shadow-card">
        <BagIcon className="h-7 w-7" />
      </span>
      <h2 className="mt-6 text-2xl font-black tracking-tight text-ink">
        Your bag is empty.
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
        No pairs in the rotation yet. Browse the collection and find something
        that feels like you.
      </p>
      <Link
        href="/shop"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        Shop sneakers
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

async function CartContents() {
  const cart = await getCartSummary();

  if (cart.items.length === 0) {
    return <EmptyBag />;
  }

  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cart.subtotal,
  );
  const shippingProgress = Math.min(
    100,
    Math.round((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );

  return (
    <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
      <section className="overflow-hidden rounded-card border border-ink/25 bg-white shadow-card">
        <div className="flex items-center justify-between gap-4 border-b border-ink/25 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-bold tracking-tight text-ink">
              Your bag
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <form action={clearCartAction}>
            <button
              type="submit"
              className="rounded-full border border-ink/25 px-3.5 py-2 text-xs font-semibold text-muted transition hover:border-ink/50 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              Clear bag
            </button>
          </form>
        </div>

        <ul>
          {cart.items.map((item) => (
            <li
              key={`${item.productId}-${item.size}`}
              className="border-b border-ink/25 p-4 last:border-b-0 sm:p-6"
            >
              <div className="flex gap-4">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-ink/25 bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:h-28 sm:w-28"
                >
                  <Image
                    src={item.product.image}
                    alt={`${item.product.brand} ${item.product.name}`}
                    fill
                    sizes="112px"
                    className="object-contain p-2"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                        {item.product.brand}
                      </p>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="mt-1 block text-sm font-bold tracking-tight text-ink transition hover:text-brand-700 sm:text-base"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted">
                        {item.product.colorway}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-ink">
                      {formatPrice(item.lineTotal)}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
                      Size US {item.size}
                    </span>

                    <div className="inline-flex items-center rounded-full border border-ink/30 bg-white p-1">
                      <form action={updateCartQuantityAction}>
                        <input type="hidden" name="productId" value={item.productId} />
                        <input type="hidden" name="size" value={item.size} />
                        <input
                          type="hidden"
                          name="quantity"
                          value={item.quantity - 1}
                        />
                        <button
                          type="submit"
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                      </form>

                      <span className="w-7 text-center text-xs font-bold text-ink">
                        {item.quantity}
                      </span>

                      <form action={updateCartQuantityAction}>
                        <input type="hidden" name="productId" value={item.productId} />
                        <input type="hidden" name="size" value={item.size} />
                        <input
                          type="hidden"
                          name="quantity"
                          value={item.quantity + 1}
                        />
                        <button
                          type="submit"
                          disabled={item.quantity >= MAX_LINE_QUANTITY}
                          aria-label={`Increase quantity of ${item.product.name}`}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </form>
                    </div>

                    <form action={removeFromCartAction} className="ml-auto">
                      <input type="hidden" name="productId" value={item.productId} />
                      <input type="hidden" name="size" value={item.size} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-muted transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                      >
                        <XIcon className="h-3 w-3" />
                        Remove
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-6 lg:sticky lg:top-28">
        <h2 className="text-base font-bold tracking-tight text-ink">
          Order summary
        </h2>

        <div className="mt-4 rounded-2xl bg-brand-50/80 p-3.5">
          {remainingForFreeShipping > 0 ? (
            <p className="text-xs font-medium text-brand-700">
              Add {formatPrice(remainingForFreeShipping)} more for free shipping.
            </p>
          ) : (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-700">
              <CheckIcon className="h-4 w-4" />
              Free shipping unlocked.
            </p>
          )}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Subtotal</dt>
            <dd className="font-semibold text-ink">{formatPrice(cart.subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Shipping</dt>
            <dd className="font-semibold text-ink">
              {cart.shipping === 0 ? "Free" : formatPrice(cart.shipping)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between border-t border-ink/25 pt-5">
          <span className="text-sm font-bold text-ink">Total</span>
          <span className="text-xl font-black tracking-tight text-ink">
            {formatPrice(cart.total)}
          </span>
        </div>

        <Link
          href="/checkout"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Continue to checkout
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link
          href="/shop"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-ink/35 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Keep shopping
        </Link>

        <div className="mt-5 space-y-2 border-t border-ink/25 pt-4 text-[11px] text-muted">
          <p className="flex items-center gap-2">
            <TruckIcon className="h-4 w-4 text-brand-700" />
            Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}
          </p>
          <p className="flex items-center gap-2">
            <RefreshIcon className="h-4 w-4 text-brand-700" />
            30-day easy returns
          </p>
          <p className="flex items-center gap-2">
            <ShieldIcon className="h-4 w-4 text-brand-700" />
            Secure demo checkout
          </p>
        </div>
      </aside>
    </div>
  );
}

export default function CartPage() {
  return (
    <main id="main-content">
      <section className="border-b border-ink/25 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/35 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
            <BagIcon className="h-3.5 w-3.5" />
            Almost yours
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Your bag.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Review your pairs, adjust quantities, and we&apos;ll get them ready
            to ship.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <Suspense fallback={<CartSkeleton />}>
          <CartContents />
        </Suspense>
      </section>
    </main>
  );
}
