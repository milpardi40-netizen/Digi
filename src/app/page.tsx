import Link from "next/link";
import {
  Scroll,
  Amphora,
  Shapes,
  Layers,
  LampCeiling,
  Scissors,
  Handbag,
  Brush,
  Gem,
  TreePine,
  Hammer,
  Gift,
  Sparkles,
  Store,
  ChevronLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  HeartHandshake,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { asc, desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { categories, shops, products } from "@/db/schema";
import { queryProducts, type ProductRow } from "@/lib/catalog";
import { toFaDigits } from "@/lib/format";
import Stories from "@/components/Stories";
import HeroSlider from "@/components/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel";
import ShopCard from "@/components/ShopCard";
import type { ProductCardData } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  carpet: Scroll,
  pottery: Amphora,
  textile: Scissors,
  leather: Handbag,
  painting: Brush,
  jewelry: Gem,
  wood: TreePine,
  metal: Hammer,
  decor: Gift,
  pattern: Shapes,
  felt: Layers,
  lighting: LampCeiling,
};

const toCard = (p: ProductRow): ProductCardData => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  image: p.image,
  price: p.price,
  originalPrice: p.originalPrice,
  rating: p.rating,
  ratingsCount: p.ratingsCount,
  isFeatured: p.isFeatured,
  salesCount: p.salesCount,
  shopName: p.shopName,
  shopSlug: p.shopSlug,
});

export default async function HomePage() {
  const [cats, shopRows, featuredRes, newestRes, salesRes, discountRes, topRes] = await Promise.all([
    db.select().from(categories).orderBy(asc(categories.sort)),
    db
      .select({
        id: shops.id,
        name: shops.name,
        slug: shops.slug,
        city: shops.city,
        story: shops.story,
        avatarColor: shops.avatarColor,
        verified: shops.verified,
        productsCount: sql<number>`count(${products.id})::int`,
      })
      .from(shops)
      .leftJoin(products, sql`${products.shopId} = ${shops.id}`)
      .groupBy(shops.id)
      .orderBy(desc(shops.verified), desc(sql`count(${products.id})`)),
    queryProducts({ featured: true, limit: 12 }),
    queryProducts({ sort: "newest", limit: 12 }),
    queryProducts({ sort: "sales", limit: 12 }),
    queryProducts({ sort: "discount", limit: 12 }),
    queryProducts({ sort: "sales", limit: 48 }),
  ]);

  // پرفروش‌ترین اثر هر دسته به‌عنوان تصویر کارت دسته‌بندی
  const catImage = new Map<string, string>();
  for (const p of topRes.products) {
    if (p.categorySlug && !catImage.has(p.categorySlug)) catImage.set(p.categorySlug, p.image);
  }

  return (
    <div className="container-digi space-y-3 py-3 md:space-y-4 md:py-4">
      {/* استوری فروشگاه‌های هنرمندان */}
      <Stories />

      {/* اسلایدر + ستون کناری */}
      <div className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-9">
          <HeroSlider />
        </div>
        <aside className="hidden flex-col gap-3 md:col-span-3 md:flex">
          <Link
            href="/sell"
            className="group flex flex-1 flex-col justify-between rounded-2xl border border-brand/25 bg-gradient-to-br from-orange-50 to-amber-50 p-4 transition-shadow hover:shadow-lg"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                <Store size={22} />
              </div>
              <h3 className="mt-3 text-[13px] font-extrabold text-brand-deep">شما هم هنرمند هستید؟</h3>
              <p className="mt-1 text-[10.5px] leading-5 text-digi-muted">
                اثرتان را در هنربازار بفروشید؛ بدون هزینه عضویت، تنها ۱۰٪ کمیسیون از فروش واقعی.
              </p>
            </div>
            <span className="mt-3 flex items-center gap-1 text-[11px] font-bold text-brand">
              شروع فروشندگی
              <ChevronLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            </span>
          </Link>
          <Link
            href="/featured"
            className="group flex flex-1 flex-col justify-between rounded-2xl border border-digi-border/60 bg-white p-4 transition-shadow hover:shadow-lg"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Sparkles size={22} />
              </div>
              <h3 className="mt-3 text-[13px] font-extrabold">منتخب سردبیر</h3>
              <p className="mt-1 text-[10.5px] leading-5 text-digi-muted">
                آثار دست‌چین‌شده توسط کارشناسان هنربازار از بهترین کارگاه‌های ایران
              </p>
            </div>
            <span className="mt-3 flex items-center gap-1 text-[11px] font-bold text-brand">
              دیدن منتخب‌ها
              <ChevronLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            </span>
          </Link>
        </aside>
      </div>

      {/* بنر مأموریت و آمار — با تصویر بازارچه سنتی */}
      <section className="relative flex flex-col items-center justify-between gap-3 overflow-hidden rounded-2xl px-5 py-6 text-center md:flex-row md:text-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-kilim.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-l from-[#160f07]/90 via-[#160f07]/65 to-[#160f07]/35" />
        <div className="relative flex items-center gap-3">
          <HeartHandshake size={36} className="shrink-0 text-saffron" strokeWidth={1.4} />
          <div>
            <p className="font-display text-[16px] leading-7 text-[#fbf7ee]">با خرید شما، هنر زنده می‌ماند</p>
            <p className="text-[10px] text-white/80">۹۰٪ مبلغ هر اثر مستقیماً به هنرمند می‌رسد</p>
          </div>
        </div>
        <div className="relative flex items-center gap-5 text-[#fbf7ee] md:gap-7">
          {[
            { v: "۱۲", l: "کارگاه هنرمند" },
            { v: "۴۶+", l: "اثر دست‌ساز" },
            { v: "۱۲", l: "دسته‌بندی هنری" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-xl leading-7 text-saffron">{s.v}</div>
              <div className="text-[9px] text-white/80">{s.l}</div>
            </div>
          ))}
          <Link href="/shops" className="hidden rounded-xl border border-saffron/60 bg-[#160f07]/40 px-4 py-2.5 text-[11px] font-bold text-saffron backdrop-blur-sm transition hover:bg-saffron hover:text-[#160f07] md:block">
            بازدید از فروشگاه‌ها
          </Link>
        </div>
      </section>

      {/* دسته‌بندی آثار — کارت‌های تصویری */}
      <section id="categories" className="rounded-2xl border border-digi-border/60 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[13px] font-extrabold">
            <LayoutGrid size={16} className="text-brand" />
            دسته‌بندی آثار هنری
          </h2>
          <Link href="/shops" className="flex items-center gap-0.5 text-[10.5px] font-bold text-brand hover:underline">
            همه فروشگاه‌ها
            <ChevronLeft size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
          {cats.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] ?? Amphora;
            const image = catImage.get(cat.slug);
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-digi-border"
              >
                {image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#160f07]/85 via-[#160f07]/15 to-transparent" />
                <span
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-white/95 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{ color: cat.color }}
                >
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className="absolute bottom-2 right-2 left-2 text-[11px] font-extrabold leading-5 text-[#fbf7ee]">
                  {cat.name}
                </span>
              </Link>
            );
          })}
          {/* میانبرها */}
          <Link href="/featured" className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-digi-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-lighting.jpg"
              alt="منتخب سردبیر"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#160f07]/85 via-[#160f07]/15 to-transparent" />
            <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-amber-600 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
              <Sparkles size={16} />
            </span>
            <span className="absolute bottom-2 right-2 left-2 text-[11px] font-extrabold leading-5 text-[#fbf7ee]">منتخب سردبیر</span>
          </Link>
          <Link href="/shops" className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-digi-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/18161370/pexels-photo-18161370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="فروشگاه‌های هنرمندان"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#160f07]/85 via-[#160f07]/15 to-transparent" />
            <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-brand shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
              <Store size={16} />
            </span>
            <span className="absolute bottom-2 right-2 left-2 text-[11px] font-extrabold leading-5 text-[#fbf7ee]">فروشگاه‌ها</span>
          </Link>
        </div>
      </section>

      {/* منتخب سردبیر */}
      <ProductCarousel title="منتخب سردبیر هنربازار" href="/featured" products={featuredRes.products.map(toCard)} />

      {/* فروشگاه‌های برگزیده */}
      <section className="rounded-2xl border border-digi-border/60 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[14px] font-extrabold">
            <Store size={17} className="text-brand" />
            فروشگاه‌های برگزیده هنرمندان
          </h2>
          <Link href="/shops" className="flex items-center gap-0.5 text-[10.5px] font-bold text-brand hover:underline">
            همه {toFaDigits(shopRows.length)} فروشگاه
            <ChevronLeft size={13} />
          </Link>
        </div>
        <div className="scrollbar-hide snap-x-container flex gap-3 overflow-x-auto pb-1">
          {shopRows.map((shop) => (
            <div key={shop.id} className="snap-card">
              <ShopCard shop={shop} productsCount={shop.productsCount} />
            </div>
          ))}
        </div>
      </section>

      {/* پرفروش‌ترین‌ها */}
      <ProductCarousel title="پرفروش‌ترین آثار" href="/search?sort=sales" products={salesRes.products.map(toCard)} />

      {/* آثار با تخفیف */}
      <ProductCarousel title="آثار با تخفیف ویژه" href="/search?sort=discount" products={discountRes.products.map(toCard)} />

      {/* تازه‌های کارگاه‌ها */}
      <ProductCarousel title="تازه‌های کارگاه‌ها" href="/search?sort=newest" products={newestRes.products.map(toCard)} />

      {/* خدمات هنربازار */}
      <section className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {[
          { icon: HeartHandshake, title: "خرید مستقیم از هنرمند", sub: "بدون واسطه و با قیمت کارگاه", color: "#b4532a" },
          { icon: ShieldCheck, title: "ضمانت اصالت اثر", sub: "گواهی دست‌ساز بودن برای هر اثر", color: "#2e7d4f" },
          { icon: Truck, title: "بسته‌بندی مطمئن", sub: "ارسال با جعبه محافظ و بیمه", color: "#0f766e" },
          { icon: RotateCcw, title: "۷ روز مهلت بازگشت", sub: "در صورت مغایرت اثر با توضیحات", color: "#d9a441" },
        ].map(({ icon: Icon, title, sub, color }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-2xl border border-digi-border/60 bg-white p-3 md:p-4"
          >
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: `${color}14`, color }}
            >
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-[11px] font-extrabold text-digi-text">{title}</span>
              <span className="mt-0.5 block text-[9px] leading-4 text-digi-muted">{sub}</span>
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
