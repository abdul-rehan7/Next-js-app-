"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { safeNextPath } from "@/lib/redirects";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error?: string;
  message?: string;
  email?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function rawText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

async function getRequestOrigin() {
  const headerStore = await headers();
  const origin = headerStore.get("origin");

  if (origin) {
    return origin;
  }

  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "production" ? "https" : "http");

  return `${protocol}://${host}`;
}

function retrySeconds(message: string) {
  const match = message.match(/after\s+(\d+)\s+seconds?/i);
  return match ? Number(match[1]) : undefined;
}

function mapAuthError(
  error: { message: string; code?: string | null },
  mode: "login" | "signup",
) {
  const normalized = error.message.toLowerCase();
  const code = (error.code ?? "").toLowerCase();

  if (
    code === "invalid_credentials" ||
    normalized.includes("invalid login credentials")
  ) {
    return "Email or password is incorrect. Please try again.";
  }

  if (
    code === "email_not_confirmed" ||
    normalized.includes("email not confirmed")
  ) {
    return "Confirm your email first. Check your inbox for the verification link.";
  }

  if (
    code === "user_already_exists" ||
    normalized.includes("user already registered")
  ) {
    return "An account with this email already exists. Log in instead.";
  }

  if (code === "weak_password" || normalized.includes("password should be")) {
    return "Choose a password with at least 8 characters.";
  }

  if (
    code === "over_email_send_rate_limit" ||
    normalized.includes("email rate limit")
  ) {
    return "We've hit the email sending limit. Wait up to an hour, then check your inbox and spam folder before trying again.";
  }

  if (
    code === "over_request_rate_limit" ||
    normalized.includes("rate limit") ||
    normalized.includes("too many") ||
    normalized.includes("security purposes")
  ) {
    const seconds = retrySeconds(error.message);
    return seconds
      ? `Too many attempts. Try again in ${seconds} seconds.`
      : "Too many attempts. Wait a few minutes and try again.";
  }

  if (code === "signup_disabled" || normalized.includes("signups not allowed")) {
    return "New signups are disabled right now. Please contact the studio.";
  }

  if (
    code === "email_address_invalid" ||
    normalized.includes("invalid email") ||
    normalized.includes("email address") ||
    normalized.includes("unable to validate email")
  ) {
    return "Enter a valid email address.";
  }

  return mode === "login"
    ? "We couldn't sign you in. Please try again."
    : "We couldn't create your account. Please try again.";
}

function missingConfigState(): AuthFormState {
  return {
    error:
      "Authentication is unavailable right now. Check your Supabase configuration and try again.",
  };
}

export async function loginAction(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = text(formData, "email").toLowerCase().slice(0, 180);
  const password = rawText(formData, "password").slice(0, 200);
  const nextPath = safeNextPath(text(formData, "next"), "/account");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  if (!emailPattern.test(email)) {
    return { error: "Enter a valid email address." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: mapAuthError(error, "login") };
    }
  } catch {
    return missingConfigState();
  }

  redirect(nextPath);
}

export async function signUpAction(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const fullName = text(formData, "fullName").slice(0, 80);
  const email = text(formData, "email").toLowerCase().slice(0, 180);
  const password = rawText(formData, "password").slice(0, 200);
  const confirmPassword = rawText(formData, "confirmPassword").slice(0, 200);
  const nextPath = safeNextPath(text(formData, "next"), "/account");

  if (!fullName || !email || !password || !confirmPassword) {
    return { error: "Fill in every field to create your account." };
  }

  if (fullName.length < 2) {
    return { error: "Enter your full name." };
  }

  if (!emailPattern.test(email)) {
    return { error: "Enter a valid email address." };
  }

  if (password.length < 8) {
    return { error: "Choose a password with at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Your passwords do not match." };
  }

  let hasSession = false;

  try {
    const origin = await getRequestOrigin();
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    });

    if (error) {
      return { error: mapAuthError(error, "signup") };
    }

    hasSession = Boolean(data.session);
  } catch {
    return missingConfigState();
  }

  if (hasSession) {
    redirect(nextPath);
  }

  return {
    email,
    message:
      "We sent a confirmation link to your inbox. Open it to finish creating your account.",
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/");
}
