import Link from "next/link";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main id="main-content" className="flex flex-1 items-center">
      <div className="mx-auto w-full max-w-xl px-5 py-20 text-center sm:px-8">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand-50 text-brand-600">
          <SparkleIcon className="h-7 w-7" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
          404 — off the shelf
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-ink sm:text-5xl">
          This pair walked away.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          The page you&apos;re looking for isn&apos;t here. Head back to the
          shop and find something that fits.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Shop sneakers
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-ink/35 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
