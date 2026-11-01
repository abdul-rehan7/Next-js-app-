import Link from "next/link";
import {
  ArrowRightIcon,
  GlobeIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";

const shopLinks = [
  { href: "/shop", label: "All sneakers" },
  { href: "/shop?brand=puma", label: "PUMA" },
  { href: "/#brands", label: "Our brands" },
];

const helpLinks = [
  { href: "/account", label: "Your account" },
  { href: "/contact", label: "Contact us" },
  { href: "/contact", label: "Shipping & returns" },
  { href: "/contact", label: "Size guide" },
  { href: "/contact", label: "Track an order" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/25 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col justify-between gap-6 rounded-card border border-ink/25 bg-gradient-to-br from-brand-50 via-white to-brand-50/60 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
              The rotation starts here
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
              Your next pair is waiting.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
              Fresh PUMA silhouettes, authenticated and ready to ship.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Shop the collection
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Sole Studio home">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-xl font-black text-white">
                S
              </span>
              <span className="text-lg font-black tracking-tight text-ink">
                sole<span className="text-brand-600">studio</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A tight edit of the sneakers worth wearing. Curated in New York,
              shipped everywhere.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/25 text-muted transition hover:border-ink/50 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/25 text-muted transition hover:border-ink/50 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <GlobeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Shop</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Help</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Visit us</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <span>
                  42 Mercer Street
                  <br />
                  New York, NY 10013
                </span>
              </li>
              <li>
                <a
                  href="mailto:hello@solestudio.example"
                  className="flex items-center gap-2.5 transition hover:text-brand-700"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-brand-700" />
                  hello@solestudio.example
                </a>
              </li>
              <li>
                <a
                  href="tel:+15550123456"
                  className="flex items-center gap-2.5 transition hover:text-brand-700"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-brand-700" />
                  +1 (555) 012-3456
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/25">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-[11px] leading-relaxed text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Sole Studio. Demo store — no real orders are processed.</p>
          <p>PUMA names and marks belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}
