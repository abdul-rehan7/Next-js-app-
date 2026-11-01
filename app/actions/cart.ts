"use server";

import { redirect } from "next/navigation";
import { addLine, clampQuantity, removeLine, setLineQuantity } from "@/lib/cart";
import { clearCart, getCartLines, saveCartLines } from "@/lib/cart-server";
import { getProductById } from "@/lib/products";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function requestedQuantity(formData: FormData) {
  const value = Number(text(formData, "quantity"));
  return Number.isFinite(value) ? Math.floor(value) : 1;
}

export async function addToCartAction(formData: FormData) {
  const productId = text(formData, "productId");
  const size = text(formData, "size");
  const product = getProductById(productId);

  if (!product || !product.sizes.includes(size)) {
    redirect("/cart");
  }

  const lines = await getCartLines();
  const nextLines = addLine(lines, {
    productId: product.id,
    size,
    quantity: clampQuantity(requestedQuantity(formData)),
  });

  await saveCartLines(nextLines);
  redirect("/cart");
}

export async function updateCartQuantityAction(formData: FormData) {
  const productId = text(formData, "productId");
  const size = text(formData, "size");
  const quantity = requestedQuantity(formData);
  const lines = await getCartLines();

  await saveCartLines(setLineQuantity(lines, productId, size, quantity));
  redirect("/cart");
}

export async function removeFromCartAction(formData: FormData) {
  const productId = text(formData, "productId");
  const size = text(formData, "size");
  const lines = await getCartLines();

  await saveCartLines(removeLine(lines, productId, size));
  redirect("/cart");
}

export async function clearCartAction() {
  await clearCart();
  redirect("/cart");
}
