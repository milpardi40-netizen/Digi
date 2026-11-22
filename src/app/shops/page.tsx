import type { Metadata } from "next";
import Link from "next/link";
import { Store, BadgeCheck, ChevronLeft } from "lucide-react";
import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { shops, products } from "@/db/schema";
import ShopCard from "@/components/ShopCard";
import { toFaDigits } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "فروشگاه‌های هنرمندان",
  description: "همه کارگاه‌ها و فروشگاه‌های هنرمندان هنربازار؛ از سفال لالجین تا خاتم اصفهان و سوزن‌دوزی بلوچستان.",
};

export default async function ShopsPage() {
  const shopRows = await db
    .select({
      id: shops.id,
      name: shops.name,
      slug: shops.slug,
      city: shops.city,
      story: shops.story,
      avatarColor: shops.avatarColor,
      verified: shops.verified,
      productsCount: sql<number>`count(${products.id})::int`,
      salesCount: sql<number>`coalesce(sum(${products.salesCount}), 0)::int`,
    })
    .from(shops)
    .leftJoin(products, sql`${products.shopId} = ${shops.id}`)
    .groupBy(shops.id)
    .orderBy(desc(shops.verified), desc(sql`coalesce(sum(${products.salesCount}), 0)`));

  const totalProducts = shopRows.reduce((acc, s) => acc + s.productsCount, 0);

  return (
    <div className="container-digi py-4">
      {/* سربرگ */}
      <div className="flex flex-col items-center gap-2 rounded-3xl border border-digi-border/60 bg-white px-6 py-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-50 text-brand">
          <Store size={28} strokeWidth={1.6} />
        </span>
        <h1 className="font-display text-2xl text-digi-text">فروشگاه‌های هنرمندان هنربازار</h1>
        <p className="max-w-xl text-[11px] leading-6 text-digi-muted">
          {toFaDigits(shopRows.length)} فروشگاه فعال با {toFaDigits(totalProducts)} اثر دست‌ساز؛<br />
          خرید مستقیم از کارگاه، بدون واسطه و با گواهی اصالت.
        </p>
        <p className="flex items-center gap-1 text-[10px] text-emerald-700">
          <BadgeCheck size={13} />
          فروشگاه‌های دارای نشان آبی توسط تیم هنربازار اعتبارسنجی شده‌اند
        </p>
      </div>

      {/* گرید فروشگاه‌ها */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shopRows.map((shop) => (
          <Link
            key={shop.id}
            href={`/shop/${shop.slug}`}
            className="group flex flex-col rounded-2xl border border-digi-border/60 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(41,36,31,0.14)]"
          >
            <div className="flex items-center gap-3">
              <span
                className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl font-black text-white shadow-sm"
                style={{ backgroundColor: shop.avatarColor }}
              >
                {shop.name.trim().charAt(0)}
              </span>
              <div className="min-w-0">
                <h2 className="flex items-center gap-1 text-[13px] font-extrabold leading-5">
                  <span className="line-clamp-1">{shop.name}</span>
                  {shop.verified && <BadgeCheck size={15} className="shrink-0 text-accent" />}
                </h2>
                <p className="mt-1 text-[10px] text-digi-muted">{shop.city}</p>
              </div>
            </div>
            <p className="mt-3 h-14 text-[10.5px] leading-6 text-digi-muted line-clamp-2">{shop.story}</p>
            <div className="mt-auto flex items-center justify-between border-t border-digi-border/60 pt-3">
              <div className="flex items-center gap-3 text-[9.5px] text-digi-muted">
                <span><strong className="text-digi-text">{toFaDigits(shop.productsCount)}</strong> اثر</span>
                <span><strong className="text-digi-text">{toFaDigits(shop.salesCount)}</strong> فروش</span>
              </div>
              <span className="flex items-center gap-0.5 text-[10.5px] font-bold text-brand transition-all group-hover:gap-1.5">
                بازدید
                <ChevronLeft size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
