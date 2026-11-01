import Link from "next/link";
import { BagIcon } from "@/components/icons";

export function CartButton({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full border border-ink/25 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-card transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <BagIcon className="h-5 w-5 text-brand-600" />
      <span className="hidden sm:inline">Bag</span>
      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1.5 text-[11px] font-bold leading-none text-white">
        {count}
      </span>
    </Link>
  );
}
