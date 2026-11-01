import { getProductById, type Product } from "@/lib/products";

export const CART_COOKIE = "sole_studio_cart";
export const MAX_LINE_QUANTITY = 5;
export const FREE_SHIPPING_THRESHOLD = 150;
export const SHIPPING_FEE = 12;

export type CartLine = {
  productId: string;
  size: string;
  quantity: number;
};

export type CartItem = CartLine & {
  product: Product;
  lineTotal: number;
};

export type CartSummary = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
};

export function clampQuantity(value: number) {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.min(MAX_LINE_QUANTITY, Math.max(1, Math.floor(value)));
}

function decodeCookieValue(rawValue: string) {
  if (!rawValue.includes("%")) {
    return rawValue;
  }

  try {
    return decodeURIComponent(rawValue);
  } catch {
    return rawValue;
  }
}

export function parseCart(rawValue: string | undefined): CartLine[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(decodeCookieValue(rawValue));

    if (!Array.isArray(parsed)) {
      return [];
    }

    const lines: CartLine[] = [];

    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") {
        continue;
      }

      const record = entry as Record<string, unknown>;
      const productId = typeof record.productId === "string" ? record.productId : "";
      const size = typeof record.size === "string" ? record.size : "";
      const quantity = typeof record.quantity === "number" ? record.quantity : 0;
      const product = getProductById(productId);

      if (!product || !product.sizes.includes(size) || quantity < 1) {
        continue;
      }

      lines.push({
        productId,
        size,
        quantity: clampQuantity(quantity),
      });
    }

    return lines;
  } catch {
    return [];
  }
}

export function serializeCart(lines: CartLine[]) {
  return JSON.stringify(lines);
}

export function buildCartSummary(lines: CartLine[]): CartSummary {
  const items: CartItem[] = [];

  for (const line of lines) {
    const product = getProductById(line.productId);

    if (!product) {
      continue;
    }

    items.push({
      ...line,
      product,
      lineTotal: product.price * line.quantity,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}

export function addLine(lines: CartLine[], nextLine: CartLine) {
  const existing = lines.find(
    (line) => line.productId === nextLine.productId && line.size === nextLine.size,
  );

  if (existing) {
    return lines.map((line) =>
      line === existing
        ? {
            ...line,
            quantity: clampQuantity(line.quantity + nextLine.quantity),
          }
        : line,
    );
  }

  return [...lines, { ...nextLine, quantity: clampQuantity(nextLine.quantity) }];
}

export function setLineQuantity(
  lines: CartLine[],
  productId: string,
  size: string,
  quantity: number,
) {
  if (quantity < 1) {
    return removeLine(lines, productId, size);
  }

  return lines.map((line) =>
    line.productId === productId && line.size === size
      ? { ...line, quantity: clampQuantity(quantity) }
      : line,
  );
}

export function removeLine(lines: CartLine[], productId: string, size: string) {
  return lines.filter(
    (line) => !(line.productId === productId && line.size === size),
  );
}
