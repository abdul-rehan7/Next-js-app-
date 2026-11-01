import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  ShieldIcon,
  SparkleIcon,
  TruckIcon,
} from "@/components/icons";
import { formatPrice } from "@/lib/products";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your Sole Studio order has been placed.",
  robots: { index: false, follow: false },
};

type SuccessSearchParams = Promise<{
  order?: string | string[];
  total?: string | string[];
}>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function SuccessSkeleton() {
  return (
    <div
      className="mx-auto mt-10 h-[520px] max-w-2xl animate-pulse rounded-[2rem] border border-ink/25 bg-white"
      aria-hidden
    />
  );
}

async function SuccessContent({
  searchParams,
}: {
  searchParams: SuccessSearchParams;
}) {
  const params = await searchParams;
  const orderNumber = firstValue(params.order);
  const totalValue = Number(firstValue(params.total));
  const total = Number.isFinite(totalValue) && totalValue > 0 ? totalValue : null;

  if (!orderNumber) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-ink/25 bg-white px-6 py-14 text-center shadow-card sm:px-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand-50 text-brand-600">
          <SparkleIcon className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-2xl font-black tracking-tight text-ink">
          No order to show.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          This confirmation link is missing an order number. Head back to the
          shop to start a new order.
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

  return (
    <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[2rem] border border-ink/25 bg-white shadow-card">
      <div className="relative overflow-hidden border-b border-ink/25 bg-gradient-to-br from-brand-50 via-white to-brand-100/60 px-6 py-12 text-center sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-14 -right-8 h-44 w-44 rounded-full bg-brand-300/20 blur-3xl"
        />
        <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white text-brand-600 shadow-card">
          <CheckIcon className="h-8 w-8" />
        </span>
        <p className="relative mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-700">
          Order confirmed
        </p>
        <h1 className="relative mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
          You&apos;re all set.
        </h1>
        <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Thanks for shopping with Sole Studio. We&apos;re getting your pair
          checked, packed and on its way.
        </p>
      </div>

      <div className="px-6 py-8 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-ink/25 bg-brand-50/50 px-5 py-4 sm:flex-row">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Order number
            </p>
            <p className="mt-1 text-lg font-black tracking-tight text-ink">
              {orderNumber}
            </p>
          </div>
          {total !== null ? (
            <div className="text-center sm:text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Order total
              </p>
              <p className="mt-1 text-lg font-black tracking-tight text-ink">
                {formatPrice(total)}
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { step: "01", title: "Confirmed", note: "We have your order." },
            { step: "02", title: "Packed", note: "Checked and boxed with care." },
            { step: "03", title: "Shipped", note: "Tracking lands in your inbox." },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-ink/25 bg-white p-4"
            >
              <span className="text-[10px] font-bold tracking-[0.18em] text-brand-700">
                {item.step}
              </span>
              <p className="mt-1 text-sm font-bold text-ink">{item.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 rounded-2xl border border-ink/25 bg-white p-4 text-xs leading-relaxed text-muted">
          <p className="flex items-start gap-2">
            <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            A confirmation email will arrive shortly with your order details.
          </p>
          <p className="flex items-start gap-2">
            <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            Standard delivery takes 2–4 business days after dispatch.
          </p>
          <p className="flex items-start gap-2">
            <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            This is a demo store. No payment was taken and no order will ship.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Keep shopping
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-ink/35 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Need help?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: SuccessSearchParams;
}) {
  return (
    <main id="main-content" className="bg-background">
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <Suspense fallback={<SuccessSkeleton />}>
          <SuccessContent searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
