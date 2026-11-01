import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, StarIcon } from "@/components/icons";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-ink/25 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-ink/35 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-brand-50 via-[#fff8f6] to-white">
        {product.badge ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700 shadow-card">
            {product.badge}
          </span>
        ) : null}
        <span className="absolute right-4 top-4 z-10 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
          {product.brand}
        </span>
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name} in ${product.colorway}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 300px"
          className="object-contain p-6 transition duration-500 group-hover:scale-105 group-hover:-rotate-2 sm:p-8"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            {product.category}
          </p>
          <span className="flex items-center gap-1 text-xs font-medium text-muted">
            <StarIcon className="h-3.5 w-3.5 text-brand-700" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-2 text-base font-bold tracking-tight text-ink sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{product.colorway}</p>

        <div className="mt-5 flex items-center justify-between gap-3 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAt ? (
              <span className="text-xs font-medium text-muted line-through">
                {formatPrice(product.compareAt)}
              </span>
            ) : null}
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-600 transition duration-300 group-hover:bg-brand-600 group-hover:text-white">
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
