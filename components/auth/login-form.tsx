"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthFormState } from "@/app/actions/auth";
import { PasswordInput } from "@/components/auth/password-input";
import { ArrowRightIcon, MailIcon } from "@/components/icons";

const labelClass = "text-[11px] font-bold uppercase tracking-[0.14em] text-ink";
const inputClass =
  "w-full rounded-field border border-ink/30 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/50 focus:border-brand-600 focus:ring-4 focus:ring-brand-200";

type LoginFormProps = {
  nextPath: string;
  initialError?: string;
};

export function LoginForm({ nextPath, initialError }: LoginFormProps) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    loginAction,
    { error: initialError },
  );

  const signupHref =
    nextPath === "/account"
      ? "/signup"
      : `/signup?next=${encodeURIComponent(nextPath)}`;

  return (
    <>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
          Welcome back
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
          Sign in to your account.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Pick up where you left off. Your bag stays saved on this device.
        </p>
      </div>

      {state?.error ? (
        <div
          role="alert"
          className="mt-5 rounded-2xl border border-ink/35 bg-brand-50 px-4 py-3.5 text-sm font-medium text-brand-800"
        >
          {state.error}
        </div>
      ) : null}

      <form action={formAction} className="mt-6">
        <input type="hidden" name="next" value={nextPath} />

        <div className="grid gap-4">
          <label>
            <span className={labelClass}>Email address</span>
            <span className="relative mt-1.5 block">
              <MailIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-700" />
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="jordan@example.com"
                className={`${inputClass} pl-11`}
              />
            </span>
          </label>

          <PasswordInput
            name="password"
            label="Password"
            autoComplete="current-password"
            placeholder="Your password"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Signing in..." : "Sign in"}
          {pending ? null : <ArrowRightIcon className="h-4 w-4" />}
        </button>
      </form>

      <div className="mt-6 border-t border-ink/25 pt-5">
        <p className="text-sm text-muted">
          New to Sole Studio?{" "}
          <Link
            href={signupHref}
            className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-800"
          >
            Create an account
          </Link>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Trouble signing in?{" "}
          <Link
            href="/contact"
            className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition hover:text-brand-700"
          >
            Contact the studio
          </Link>
          .
        </p>
      </div>
    </>
  );
}
