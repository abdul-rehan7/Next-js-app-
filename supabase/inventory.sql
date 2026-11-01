begin;

create table if not exists public.brands (
  id text primary key,
  name text not null,
  slug text not null unique,
  tagline text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  brand_id text not null references public.brands(id) on update cascade on delete restrict,
  price_cents integer not null check (price_cents > 0),
  compare_at_cents integer check (compare_at_cents is null or compare_at_cents > price_cents),
  image_path text not null,
  colorway text not null,
  category text not null,
  rating numeric(2,1) not null default 0 check (rating >= 0 and rating <= 5),
  badge text,
  featured boolean not null default false,
  description text not null,
  details text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on update cascade on delete cascade,
  sku text not null unique,
  size text not null check (size ~ '^[0-9]+(\.[0-9]+)?$'),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, size)
);

create index if not exists products_brand_id_idx on public.products (brand_id);
create index if not exists products_featured_idx on public.products (featured) where is_active;
create index if not exists product_variants_product_id_idx on public.product_variants (product_id);
create index if not exists product_variants_low_stock_idx on public.product_variants (product_id) where is_active and stock_quantity <= low_stock_threshold;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists brands_set_updated_at on public.brands;
create trigger brands_set_updated_at before update on public.brands
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists product_variants_set_updated_at on public.product_variants;
create trigger product_variants_set_updated_at before update on public.product_variants
for each row execute function public.set_updated_at();

delete from public.product_variants
where product_id in (
  'nike-air-force-1-07',
  'nike-air-max-90',
  'nike-dunk-low',
  'nike-air-jordan-1-low',
  'adidas-samba-og',
  'adidas-gazelle-indoor',
  'adidas-superstar',
  'adidas-ultraboost-5'
);

delete from public.products
where id in (
  'nike-air-force-1-07',
  'nike-air-max-90',
  'nike-dunk-low',
  'nike-air-jordan-1-low',
  'adidas-samba-og',
  'adidas-gazelle-indoor',
  'adidas-superstar',
  'adidas-ultraboost-5'
);

delete from public.brands
where id in ('nike', 'adidas');

insert into public.brands (id, name, slug, tagline)
values ('puma', 'PUMA', 'puma', 'Forever Faster.')
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  tagline = excluded.tagline;

insert into public.products (
  id,
  slug,
  name,
  brand_id,
  price_cents,
  compare_at_cents,
  image_path,
  colorway,
  category,
  rating,
  badge,
  featured,
  description,
  details
)
values
  (
    'puma-suede-classic',
    'suede-classic',
    'Suede Classic',
    'puma',
    7500,
    9000,
    '/shoes/puma-suede-classic.png',
    'Black / White',
    'Lifestyle',
    4.8,
    'Best seller',
    true,
    'A timeless streetwear icon. The PUMA Suede Classic combines premium suede materials, a clean silhouette and everyday comfort to deliver an iconic sneaker that never goes out of style.',
    array[
      'Premium suede leather upper',
      'PUMA Formstrip side branding',
      'Comfortable padded collar',
      'Durable rubber outsole',
      'Classic lace-up closure'
    ]
  ),
  (
    'puma-palermo',
    'palermo',
    'Palermo',
    'puma',
    8500,
    10000,
    '/shoes/puma-palermo.png',
    'White / Green',
    'Lifestyle',
    4.7,
    'Trending',
    true,
    'Inspired by PUMA''s football heritage, the Palermo brings retro terrace style into modern streetwear. Its premium materials and distinctive design make it perfect for everyday outfits.',
    array[
      'Premium leather upper',
      'Suede overlays and T-toe construction',
      'Classic PUMA Formstrip',
      'Rubber gum outsole',
      'Comfortable textile lining'
    ]
  ),
  (
    'puma-rs-x',
    'rs-x',
    'RS-X',
    'puma',
    11000,
    13000,
    '/shoes/puma-rs-x.png',
    'White / Blue / Red',
    'Lifestyle',
    4.6,
    'Popular',
    true,
    'Bold design meets modern comfort. The PUMA RS-X features a chunky silhouette, layered materials and advanced cushioning inspired by PUMA''s running system heritage.',
    array[
      'Mesh and synthetic leather upper',
      'RS cushioning technology',
      'Chunky retro-inspired midsole',
      'Padded tongue and collar',
      'Durable rubber outsole'
    ]
  ),
  (
    'puma-caven-2-0',
    'caven-2-0',
    'Caven 2.0',
    'puma',
    6500,
    8000,
    '/shoes/puma-caven-2.png',
    'White / Black',
    'Lifestyle',
    4.5,
    'Great value',
    false,
    'A basketball-inspired sneaker designed for everyday wear. The PUMA Caven 2.0 combines vintage court aesthetics with comfortable cushioning and versatile styling.',
    array[
      'Synthetic leather upper',
      'Perforated toe detailing',
      'SoftFoam+ cushioned footbed',
      'PUMA branding on tongue and heel',
      'Rubber cupsole construction'
    ]
  ),
  (
    'puma-future-rider',
    'future-rider',
    'Future Rider',
    'puma',
    9000,
    10500,
    '/shoes/puma-future-rider.png',
    'Grey / White / Yellow',
    'Lifestyle',
    4.7,
    'New arrival',
    false,
    'The PUMA Future Rider brings classic running inspiration into contemporary streetwear. Featuring lightweight construction, retro styling and comfortable cushioning, it is made for everyday adventures.',
    array[
      'Lightweight nylon and synthetic upper',
      'Suede overlays',
      'Federbein-inspired outsole design',
      'Comfortable cushioned midsole',
      'PUMA Formstrip side branding'
    ]
  )
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  brand_id = excluded.brand_id,
  price_cents = excluded.price_cents,
  compare_at_cents = excluded.compare_at_cents,
  image_path = excluded.image_path,
  colorway = excluded.colorway,
  category = excluded.category,
  rating = excluded.rating,
  badge = excluded.badge,
  featured = excluded.featured,
  description = excluded.description,
  details = excluded.details,
  is_active = true;

with size_stock (product_id, size, stock_quantity) as (
  values
    ('puma-suede-classic', '7', 6),
    ('puma-suede-classic', '8', 10),
    ('puma-suede-classic', '8.5', 8),
    ('puma-suede-classic', '9', 14),
    ('puma-suede-classic', '9.5', 12),
    ('puma-suede-classic', '10', 16),
    ('puma-suede-classic', '10.5', 8),
    ('puma-suede-classic', '11', 6),
    ('puma-suede-classic', '12', 4),
    ('puma-palermo', '7', 5),
    ('puma-palermo', '8', 8),
    ('puma-palermo', '8.5', 10),
    ('puma-palermo', '9', 12),
    ('puma-palermo', '9.5', 9),
    ('puma-palermo', '10', 14),
    ('puma-palermo', '10.5', 7),
    ('puma-palermo', '11', 5),
    ('puma-palermo', '12', 3),
    ('puma-rs-x', '7', 4),
    ('puma-rs-x', '8', 9),
    ('puma-rs-x', '8.5', 7),
    ('puma-rs-x', '9', 13),
    ('puma-rs-x', '9.5', 11),
    ('puma-rs-x', '10', 15),
    ('puma-rs-x', '10.5', 8),
    ('puma-rs-x', '11', 6),
    ('puma-rs-x', '12', 4),
    ('puma-caven-2-0', '7', 8),
    ('puma-caven-2-0', '8', 12),
    ('puma-caven-2-0', '8.5', 10),
    ('puma-caven-2-0', '9', 16),
    ('puma-caven-2-0', '9.5', 14),
    ('puma-caven-2-0', '10', 18),
    ('puma-caven-2-0', '10.5', 9),
    ('puma-caven-2-0', '11', 7),
    ('puma-caven-2-0', '12', 5),
    ('puma-future-rider', '7', 5),
    ('puma-future-rider', '8', 9),
    ('puma-future-rider', '8.5', 8),
    ('puma-future-rider', '9', 12),
    ('puma-future-rider', '9.5', 10),
    ('puma-future-rider', '10', 14),
    ('puma-future-rider', '10.5', 7),
    ('puma-future-rider', '11', 5),
    ('puma-future-rider', '12', 3)
)
insert into public.product_variants (product_id, sku, size, stock_quantity, low_stock_threshold)
select
  size_stock.product_id,
  upper(size_stock.product_id) || '-' || replace(size_stock.size, '.', ''),
  size_stock.size,
  size_stock.stock_quantity,
  5
from size_stock
on conflict (sku) do nothing;

alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;

drop policy if exists "Public read brands" on public.brands;
create policy "Public read brands"
on public.brands for select
to anon, authenticated
using (true);

drop policy if exists "Public read active products" on public.products;
create policy "Public read active products"
on public.products for select
to anon, authenticated
using (is_active);

drop policy if exists "Public read active variants" on public.product_variants;
create policy "Public read active variants"
on public.product_variants for select
to anon, authenticated
using (
  is_active
  and exists (
    select 1
    from public.products
    where products.id = product_variants.product_id
      and products.is_active
  )
);

grant select on public.brands to anon, authenticated;
grant select on public.products to anon, authenticated;
grant select on public.product_variants to anon, authenticated;

create or replace view public.storefront_products
with (security_invoker = true)
as
select
  products.id,
  products.slug,
  products.name,
  brands.id as brand_id,
  brands.name as brand,
  brands.slug as brand_slug,
  products.price_cents,
  products.compare_at_cents,
  products.image_path,
  products.colorway,
  products.category,
  products.rating,
  products.badge,
  products.featured,
  products.description,
  products.details,
  coalesce(sum(product_variants.stock_quantity) filter (where product_variants.is_active), 0)::integer as total_stock,
  coalesce(
    array_agg(product_variants.size order by product_variants.size::numeric)
      filter (where product_variants.is_active and product_variants.stock_quantity > 0),
    '{}'::text[]
  ) as available_sizes
from public.products
join public.brands on brands.id = products.brand_id
left join public.product_variants on product_variants.product_id = products.id
where products.is_active
group by products.id, brands.id;

grant select on public.storefront_products to anon, authenticated;

commit;
