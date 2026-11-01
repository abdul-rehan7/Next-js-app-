"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { buildCartSummary } from "@/lib/cart";
import { clearCart, getCartLines } from "@/lib/cart-server";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function placeOrderAction(formData: FormData) {
  const lines = await getCartLines();

  if (lines.length === 0) {
    redirect("/cart");
  }

  const fullName = text(formData, "fullName");
  const email = text(formData, "email");
  const phone = text(formData, "phone");
  const address = text(formData, "address");
  const city = text(formData, "city");
  const postalCode = text(formData, "postalCode");
  const country = text(formData, "country");

  if (!fullName || !email || !address || !city || !postalCode || !country) {
    redirect("/checkout?error=missing");
  }

  if (!emailPattern.test(email)) {
    redirect("/checkout?error=email");
  }

  if (phone && !/^[+\d][\d\s().-]{6,}$/.test(phone)) {
    redirect("/checkout?error=phone");
  }

  const summary = buildCartSummary(lines);
  const orderId = `SS-${randomUUID().slice(0, 8).toUpperCase()}`;

  await clearCart();

  const params = new URLSearchParams({
    order: orderId,
    total: String(summary.total),
  });

  redirect(`/checkout/success?${params.toString()}`);
}
