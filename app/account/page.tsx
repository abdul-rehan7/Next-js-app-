import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { signOutAction } from "@/app/actions/auth";
import {
  ArrowRightIcon,
  BagIcon,
  LogOutIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your Sole Studio account and sign-in details.",
};

function AccountSkeleton() {
  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]" aria-hidden>
      <div className="h-72 animate-pulse rounded-card border border-ink/25 bg-white" />
      <div className="h-72 animate-pulse rounded-card border border-ink/25 bg-white" />
    </div>
  );
}

function firstNameFor(user: { fullName: string | null; email: string }) {
  const name = user.fullName?.trim().split(/\s+/)[0];

  if (name) {
    return name;
  }

  const emailName = user.email.split("@")[0]?.trim();

  return emailName || "there";
}

async function AccountContent() {
  const user = await requireUser("/account");
  const firstName = firstNameFor(user);
  const initial = (user.fullName?.[0] ?? user.email[0] ?? "S").toUpperCase();

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/35 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
            <UserIcon className="h-3.5 w-3.5" />
            Your account
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Hey, {firstName}.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Your Sole Studio account is ready. The bag saved on this device is
            still waiting whenever you are.
          </p>
        </div>
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-brand-600 text-2xl font-black text-white shadow-card">
          {initial}
        </span>
      </div>

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="overflow-hidden rounded-card border border-ink/25 bg-white shadow-card">
          <div className="flex items-center gap-3 border-b border-ink/25 px-5 py-4 sm:px-6">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brand-50 text-brand-700">
              <ShieldIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold tracking-tight text-ink">
                Account details
              </h2>
              <p className="mt-0.5 text-xs text-muted">
                Managed securely by Supabase Auth.
              </p>
            </div>
          </div>

          <dl className="divide-y divide-ink/20">
            <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Full name
              </dt>
              <dd className="text-sm font-semibold text-ink">
                {user.fullName ?? "Not set"}
              </dd>
            </div>
            <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Email
              </dt>
              <dd className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink">
                <MailIcon className="h-4 w-4 shrink-0 text-brand-700" />
                <span className="truncate">{user.email || "Not available"}</span>
              </dd>
            </div>
            <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                Status
              </dt>
              <dd>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                  Signed in
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <div className="grid gap-4">
          <section className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-6">
            <h2 className="text-base font-bold tracking-tight text-ink">
              Quick links
            </h2>
            <div className="mt-4 grid gap-2">
              <Link
                href="/shop"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/25 px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <span className="flex items-center gap-2.5">
                  <ArrowRightIcon className="h-4 w-4 text-brand-700" />
                  Shop the collection
                </span>
                <ArrowRightIcon className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-700" />
              </Link>
              <Link
                href="/cart"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/25 px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <span className="flex items-center gap-2.5">
                  <BagIcon className="h-4 w-4 text-brand-700" />
                  Open your bag
                </span>
                <ArrowRightIcon className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-700" />
              </Link>
            </div>
          </section>

          <section className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-6">
            <h2 className="text-base font-bold tracking-tight text-ink">
              Session
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Signing out only ends this session. Your bag stays on this device.
            </p>
            <form action={signOutAction} className="mt-4">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/30 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <LogOutIcon className="h-4 w-4 text-brand-700" />
                Sign out
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default function AccountPage() {
  return (
    <main id="main-content">
      <section className="border-b border-ink/25 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <Suspense fallback={<AccountSkeleton />}>
            <AccountContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
