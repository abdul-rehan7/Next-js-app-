import Link from "next/link";
import { UserIcon } from "@/components/icons";
import { getCurrentUser } from "@/lib/auth";

export function AccountButtonSkeleton() {
  return (
    <span
      className="h-10 w-10 animate-pulse rounded-full border border-ink/25 bg-white sm:w-24"
      aria-hidden
    />
  );
}

export async function AccountButton() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-full border border-ink/25 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-card transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        <UserIcon className="h-4 w-4 text-brand-700" />
        <span className="hidden sm:inline">Log in</span>
      </Link>
    );
  }

  const label =
    user.fullName?.trim().split(/\s+/)[0] ||
    user.email.split("@")[0] ||
    "Account";
  const initial = (user.fullName?.[0] ?? user.email[0] ?? "S").toUpperCase();

  return (
    <Link
      href="/account"
      aria-label={`Open account for ${label}`}
      className="inline-flex items-center gap-2 rounded-full border border-ink/25 bg-white px-2.5 py-2 text-sm font-semibold text-ink shadow-card transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-700">
        {initial}
      </span>
      <span className="hidden max-w-24 truncate pr-1 sm:inline">{label}</span>
    </Link>
  );
}
