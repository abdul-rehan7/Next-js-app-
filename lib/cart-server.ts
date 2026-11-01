import { cookies } from "next/headers";
import {
  CART_COOKIE,
  buildCartSummary,
  parseCart,
  serializeCart,
  type CartLine,
} from "@/lib/cart";

const CART_MAX_AGE = 60 * 60 * 24 * 30;

function cartCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CART_MAX_AGE,
  };
}

export async function getCartLines() {
  const cookieStore = await cookies();
  return parseCart(cookieStore.get(CART_COOKIE)?.value);
}

export async function getCartSummary() {
  const lines = await getCartLines();
  return buildCartSummary(lines);
}

export async function saveCartLines(lines: CartLine[]) {
  const cookieStore = await cookies();

  if (lines.length === 0) {
    cookieStore.delete(CART_COOKIE);
    return;
  }

  cookieStore.set(CART_COOKIE, serializeCart(lines), cartCookieOptions());
}

export async function clearCart() {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE);
}
