import Link from "next/link";
import { Suspense } from "react";
import {
  AccountButton,
  AccountButtonSkeleton,
} from "@/components/account-button";
import { CartBadge } from "@/components/cart-badge";
import { CartButton } from "@/components/cart-button";
import { SparkleIcon } from "@/components/icons";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/#brands", label: "Brands" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <>
      <div className="bg-brand-50 text-brand-700">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-5 py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs">
          <SparkleIcon className="h-3.5 w-3.5 shrink-0" />
          <p>Free shipping over $150 · 30-day easy returns · 100% authentic pairs</p>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink/25 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            aria-label="Sole Studio home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-xl font-black leading-none text-white shadow-card transition group-hover:bg-brand-700">
              S
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tight text-ink">
                sole<span className="text-brand-600">studio</span>
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-muted">
                Sneaker boutique
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-ink/25 bg-white/70 p-1 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-brand-50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden text-right text-[11px] font-medium leading-tight text-muted lg:block">
              Free delivery
              <br />
              over $150
            </span>
            <Suspense fallback={<AccountButtonSkeleton />}>
              <AccountButton />
            </Suspense>
            <Suspense fallback={<CartButton count={0} />}>
              <CartBadge />
            </Suspense>
          </div>
        </div>

        <nav
          className="flex items-center justify-center gap-2 border-t border-ink/25 px-5 py-2 md:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
