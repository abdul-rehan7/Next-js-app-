import { getCartSummary } from "@/lib/cart-server";
import { CartButton } from "@/components/cart-button";

export async function CartBadge() {
  const { itemCount } = await getCartSummary();
  return <CartButton count={itemCount} />;
}
