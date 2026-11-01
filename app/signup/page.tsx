import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AuthIntro } from "@/components/auth/auth-intro";
import { SignupForm } from "@/components/auth/signup-form";
import { getCurrentUser } from "@/lib/auth";
import { safeNextPath } from "@/lib/redirects";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a Sole Studio account for a faster checkout.",
};

type SignupSearchParams = Promise<{
  next?: string | string[];
}>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function AuthFormSkeleton() {
  return (
    <div
      className="h-[680px] animate-pulse rounded-card border border-ink/25 bg-white shadow-card"
      aria-hidden
    />
  );
}

async function SignupContent({
  searchParams,
}: {
  searchParams: SignupSearchParams;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(firstValue(params.next), "/account");
  const user = await getCurrentUser();

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-8">
      <SignupForm nextPath={nextPath} />
    </div>
  );
}

export default function SignupPage({
  searchParams,
}: {
  searchParams: SignupSearchParams;
}) {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-ink/25 bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-50 blur-3xl"
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-start gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <AuthIntro mode="signup" />
          <Suspense fallback={<AuthFormSkeleton />}>
            <SignupContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
