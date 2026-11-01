"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction, type AuthFormState } from "@/app/actions/auth";
import { PasswordInput } from "@/components/auth/password-input";
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  UserIcon,
} from "@/components/icons";

const labelClass = "text-[11px] font-bold uppercase tracking-[0.14em] text-ink";
const inputClass =
  "w-full rounded-field border border-ink/30 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/50 focus:border-brand-600 focus:ring-4 focus:ring-brand-200";

type SignupFormProps = {
  nextPath: string;
};

export function SignupForm({ nextPath }: SignupFormProps) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    signUpAction,
    {},
  );

  const loginHref =
    nextPath === "/account"
      ? "/login"
      : `/login?next=${encodeURIComponent(nextPath)}`;

  if (state?.message) {
    return (
      <div>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <MailIcon className="h-6 w-6" />
        </span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
          One more step
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
          Check your inbox.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {state.message}
        </p>
        {state.email ? (
          <p className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-ink/30 bg-brand-50 px-3.5 py-2 text-xs font-semibold text-ink">
            <CheckIcon className="h-3.5 w-3.5 shrink-0 text-brand-700" />
            <span className="truncate">{state.email}</span>
          </p>
        ) : null}
        <p className="mt-4 text-xs leading-relaxed text-muted">
          If an account already exists for this address, use the login page
          instead. Confirmation links can take a minute to arrive.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={loginHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            Back to log in
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border border-ink/30 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/50 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            Use a different email
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
          Join the studio
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
          Create your account.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Keep your details close and make every checkout a little faster.
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
            <span className={labelClass}>Full name</span>
            <span className="relative mt-1.5 block">
              <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-700" />
              <input
                type="text"
                name="fullName"
                required
                minLength={2}
                autoComplete="name"
                placeholder="Alex Morgan"
                className={`${inputClass} pl-11`}
              />
            </span>
          </label>

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
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength={8}
          />

          <PasswordInput
            name="confirmPassword"
            label="Confirm password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            minLength={8}
          />
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-muted">
          By creating an account you agree to this demo store&apos;s terms. No
          real orders or payments are processed.
        </p>

        <button
          type="submit"
          disabled={pending}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Creating account..." : "Create account"}
          {pending ? null : <ArrowRightIcon className="h-4 w-4" />}
        </button>
      </form>

      <div className="mt-6 border-t border-ink/25 pt-5">
        <p className="text-sm text-muted">
          Already have an account?{" "}
          <Link
            href={loginHref}
            className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-800"
          >
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}
