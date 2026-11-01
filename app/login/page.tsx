import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AuthIntro } from "@/components/auth/auth-intro";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth";
import { safeNextPath } from "@/lib/redirects";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your Sole Studio account.",
};

type LoginSearchParams = Promise<{
  next?: string | string[];
  error?: string | string[];
}>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function AuthFormSkeleton() {
  return (
    <div
      className="h-[540px] animate-pulse rounded-card border border-ink/25 bg-white shadow-card"
      aria-hidden
    />
  );
}

async function LoginContent({
  searchParams,
}: {
  searchParams: LoginSearchParams;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(firstValue(params.next), "/account");
  const user = await getCurrentUser();

  if (user) {
    redirect(nextPath);
  }

  const errorValue = firstValue(params.error);
  const initialError =
    errorValue === "callback"
      ? "That confirmation link is invalid or has expired. Try logging in, or create the account again."
      : undefined;

  return (
    <div className="rounded-card border border-ink/25 bg-white p-5 shadow-card sm:p-8">
      <LoginForm nextPath={nextPath} initialError={initialError} />
    </div>
  );
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams;
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
          <AuthIntro mode="login" />
          <Suspense fallback={<AuthFormSkeleton />}>
            <LoginContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
