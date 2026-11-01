import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { placeOrderAction } from "@/app/actions/checkout";
import {
  ArrowRightIcon,
  BagIcon,
  CheckIcon,
  MailIcon,
  MapPinIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/icons";
import { getCartSummary } from "@/lib/cart-server";
import { formatPrice } from "@/lib/products";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Sole Studio order.",
};

type CheckoutSearchParams = Promise<{ error?: string | string[] }>;

const inputClass =
  "mt-1.5 w-full rounded-field border border-ink/30 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/50 focus:border-brand-600 focus:ring-4 focus:ring-brand-200";
const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.14em] text-ink";

const errorMessages: Record<string, string> = {
  missing: "Please fill in all required fields before placing your order.",
  email: "That email address doesn't look right. Please check it and try again.",
  phone: "Please enter a valid phone number, or leave the field empty.",
  invalid: "Something went wrong with your order. Please try again.",
};

function CheckoutSkeleton() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_400px]" aria-hidden>
      <div className="h-[620px] animate-pulse rounded-card border border-ink/25 bg-white" />
      <div className="h-[430px] animate-pulse rounded-card border border-ink/25 bg-white" />
    </div>
  );
}

function EmptyCheckout() {
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-ink/25 bg-gradient-to-br from-brand-50 via-white to-white px-6 py-14 text-center shadow-card sm:px-12">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-brand-600 shadow-card">
        <BagIcon className="h-7 w-7" />
      </span>
      <h2 className="mt-6 text-2xl font-black tracking-tight text-ink">
        Nothing to check out yet.
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
        Your bag is empty. Add a pair to the rotation and come back when
        you&apos;re ready.
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

async function CheckoutContent({
  searchParams,
}: {
  searchParams: CheckoutSearchParams;
}) {
  const [cart, params] = await Promise.all([getCartSummary(), searchParams]);

  if (cart.items.length === 0) {
    return <EmptyCheckout />;
  }

  const errorValue = Array.isArray(params.error) ? params.error[0] : params.error;
  const errorMessage = errorValue
    ? (errorMessages[errorValue] ?? errorMessages.invalid)
    : null;

  return (
    <form
      action={placeOrderAction}
      className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_400px]"
    >
      <div className="space-y-5">
        {errorMessage ? (
          <div
            role="alert"
            className="rounded-2xl border border-ink/35 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800"
          >
            {errorMessage}
          </div>
        ) : null}

        <section className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <MailIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold tracking-tight text-ink">
                Contact
              </h2>
              <p className="text-xs text-muted">
                We&apos;ll send your order confirmation here.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelClass}>Full name</span>
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Alex Morgan"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Email address</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="jordan@example.com"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>
                Phone <span className="normal-case tracking-normal text-muted">(optional)</span>
              </span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+1 (555) 012-3456"
                className={inputClass}
              />
            </label>
          </div>
        </section>

        <section className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <MapPinIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold tracking-tight text-ink">
                Shipping address
              </h2>
              <p className="text-xs text-muted">
                Physical address for tracked delivery.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelClass}>Street address</span>
              <input
                type="text"
                name="address"
                required
                autoComplete="street-address"
                placeholder="42 Mercer Street, Apt 3"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>City</span>
              <input
                type="text"
                name="city"
                required
                autoComplete="address-level2"
                placeholder="New York"
                className={inputClass}
              />
            </label>
            <label>
              <span className={labelClass}>Postal code</span>
              <input
                type="text"
                name="postalCode"
                required
                autoComplete="postal-code"
                placeholder="10013"
                className={inputClass}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={labelClass}>Country</span>
              <select
                name="country"
                required
                autoComplete="country-name"
                defaultValue="United States"
                className={inputClass}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Germany</option>
                <option>France</option>
                <option>Netherlands</option>
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <TruckIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold tracking-tight text-ink">
                Delivery
              </h2>
              <p className="text-xs text-muted">
                Standard tracked shipping, 2–4 business days.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-start justify-between gap-4 rounded-2xl border border-ink/35 bg-brand-50/60 p-4">
            <div className="flex gap-3">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink">Standard delivery</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  Ships within 2 business days. Free on orders over $150.
                </p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-bold text-brand-700">
              {cart.shipping === 0 ? "Free" : formatPrice(cart.shipping)}
            </span>
          </div>
        </section>

        <section className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <ShieldIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold tracking-tight text-ink">
                Payment
              </h2>
              <p className="text-xs text-muted">
                This is a demo store — no payment will be collected.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/30 p-4 transition has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50/60">
              <input
                type="radio"
                name="payment"
                value="cash-on-delivery"
                defaultChecked
                className="mt-0.5 h-4 w-4 accent-brand-600"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">
                  Cash on delivery
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Pay when your pair arrives.
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/30 p-4 transition has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50/60">
              <input
                type="radio"
                name="payment"
                value="bank-transfer"
                className="mt-0.5 h-4 w-4 accent-brand-600"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">
                  Bank transfer
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Details sent after you order.
                </span>
              </span>
            </label>
          </div>
        </section>
      </div>

      <aside className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-6 lg:sticky lg:top-28">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold tracking-tight text-ink">
            Your order
          </h2>
          <Link
            href="/cart"
            className="text-xs font-semibold text-brand-700 underline-offset-4 transition hover:underline"
          >
            Edit bag
          </Link>
        </div>

        <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
          {cart.items.map((item) => (
            <li
              key={`${item.productId}-${item.size}`}
              className="flex items-center gap-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-ink/25 bg-brand-50">
                <Image
                  src={item.product.image}
                  alt={`${item.product.brand} ${item.product.name}`}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {item.product.name}
                </p>
                <p className="text-xs text-muted">
                  US {item.size} · Qty {item.quantity}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-ink">
                {formatPrice(item.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-3 border-t border-ink/25 pt-4 text-sm">
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

        <div className="mt-5 flex items-center justify-between border-t border-ink/25 pt-4">
          <span className="text-sm font-bold text-ink">Total</span>
          <span className="text-xl font-black tracking-tight text-ink">
            {formatPrice(cart.total)}
          </span>
        </div>

        <button
          type="submit"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Place order
          <ArrowRightIcon className="h-4 w-4" />
        </button>

        <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
          <ShieldIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" />
          Demo checkout. No payment is taken and no real order is fulfilled.
        </p>
      </aside>
    </form>
  );
}

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: CheckoutSearchParams;
}) {
  return (
    <main id="main-content">
      <section className="border-b border-ink/25 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted">
            <Link href="/cart" className="transition hover:text-brand-700">
              1. Bag
            </Link>
            <span aria-hidden>/</span>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">
              2. Details
            </span>
            <span aria-hidden>/</span>
            <span>3. Confirmation</span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Checkout.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            A few details and your pair is on the way. All fields marked as
            required help us deliver without hiccups.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <Suspense fallback={<CheckoutSkeleton />}>
          <CheckoutContent searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
