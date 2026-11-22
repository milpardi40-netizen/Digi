"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, SearchX } from "lucide-react";
import { staticQueryProducts, STATIC_SHOPS } from "@/lib/static-data";
import type { CatalogParams } from "@/lib/catalog";
import { toFaDigits } from "@/lib/format";
import { assetUrl } from "@/lib/assets";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";

const PAGE_SIZE = 12;

export default function ClientListing({
  title,
  subtitle,
  breadcrumb,
  basePath,
  fixed,
  fixedQuery,
  featuredTheme = false,
  heroImage,
  dynamicSearchTitle = false,
}: {
  title: string;
  subtitle?: string;
  breadcrumb: string[];
  basePath: string;
  fixed: CatalogParams;
  fixedQuery: Record<string, string>;
  featuredTheme?: boolean;
  heroImage?: string;
  dynamicSearchTitle?: boolean;
}) {
  const sp = useSearchParams();
  const qParam = sp.get("q")?.trim() ?? "";
  const page = Math.max(1, Number(sp.get("page")) || 1);
  const sort = sp.get("sort") ?? fixed.sort ?? "default";
  const shop = sp.get("shop") ?? undefined;
  const min = sp.get("min") ? Number(sp.get("min")) : undefined;
  const max = sp.get("max") ? Number(sp.get("max")) : undefined;

  const effectiveQ = fixed.q ?? (qParam || undefined);
  const effectiveFixedQuery = dynamicSearchTitle && qParam ? { ...fixedQuery, q: qParam } : fixedQuery;

  const resolvedTitle = dynamicSearchTitle
    ? qParam
      ? `نتایج جستجو برای «${qParam}»`
      : "همه آثار هنربازار"
    : title;
  const resolvedSubtitle = dynamicSearchTitle
    ? qParam
      ? "نتایج بر اساس نام اثر و فروشگاه"
      : "مرور همه آثار دست‌ساز ثبت‌شده در هنربازار"
    : subtitle;

  const { products, total } = staticQueryProducts({
    ...fixed,
    q: effectiveQ,
    sort: sort === "default" ? undefined : sort,
    shop,
    min,
    max,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  const shopRows = [...STATIC_SHOPS].sort((a, b) => a.name.localeCompare(b.name, "fa"));
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const dark = featuredTheme || !!heroImage;

  const pageHref = (p: number) => {
    const q = new URLSearchParams(effectiveFixedQuery);
    if (sort !== "default") q.set("sort", sort);
    if (shop) q.set("shop", shop);
    if (min) q.set("min", String(min));
    if (max) q.set("max", String(max));
    if (p > 1) q.set("page", String(p));
    const s = q.toString();
    return s ? `${basePath}?${s}` : basePath;
  };

  return (
    <div className="container-digi py-3 md:py-4">
      <div
        className={`relative mb-3 overflow-hidden rounded-2xl px-4 py-4 md:px-6 ${
          dark ? "bg-[#160f07]" : "border border-digi-border/60 bg-white"
        }`}
      >
        {heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetUrl(heroImage)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-l from-[#160f07]/88 via-[#160f07]/55 to-[#160f07]/20" />
          </>
        )}
        <div className="relative">
          <nav aria-label="breadcrumb" className="mb-1 flex items-center gap-1 text-[10.5px] opacity-85">
            <Link href="/" className="hover:underline">خانه</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb} className="flex items-center gap-1">
                <ChevronLeft size={11} />
                <span>{crumb}</span>
              </span>
            ))}
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {featuredTheme && <Sparkles size={26} fill="currentColor" className="text-[#fbf7ee]" />}
              <div>
                <h1 className={`font-display text-lg md:text-2xl ${dark ? "text-[#fbf7ee]" : "text-digi-text"}`}>
                  {resolvedTitle}
                </h1>
                {resolvedSubtitle && (
                  <p className={`mt-0.5 text-[11px] ${dark ? "text-white/85" : "text-digi-muted"}`}>
                    {resolvedSubtitle}
                  </p>
                )}
              </div>
            </div>
            <span className={`rounded-lg px-3 py-1.5 text-[11px] font-bold ${dark ? "bg-white/15 text-[#fbf7ee] backdrop-blur-sm" : "text-digi-muted"}`}>
              {toFaDigits(total)} اثر
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-3 xl:col-span-2">
          <FilterSidebar
            shopOptions={shopRows.map((s) => ({ slug: s.slug, name: s.name }))}
            currentShops={shop ? shop.split(",").filter(Boolean) : []}
            currentSort={sort}
            currentMin={min}
            currentMax={max}
            basePath={basePath}
            fixedQuery={effectiveFixedQuery}
          />
        </div>

        <div className="lg:col-span-9 xl:col-span-10">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-digi-border/60 bg-white py-20 text-center">
              <SearchX size={44} className="text-gray-300" />
              <h2 className="text-base font-extrabold text-digi-text">اثری یافت نشد</h2>
              <p className="max-w-sm text-[12px] leading-6 text-digi-muted">
                عبارت دیگری جستجو کنید یا فیلترها را پاک کنید.
              </p>
              <Link href={basePath} className="rounded-lg bg-brand px-5 py-2 text-[12px] font-bold text-white">
                پاک کردن فیلترها
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-digi-border/70 bg-digi-border sm:grid-cols-3 xl:grid-cols-4">
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={{
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
                    }}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="mt-4 flex items-center justify-center gap-1.5" aria-label="صفحه‌بندی">
                  <Link
                    href={pageHref(Math.max(1, page - 1))}
                    aria-label="صفحه قبل"
                    className={`grid h-9 w-9 place-items-center rounded-lg border border-digi-border bg-white transition ${
                      page === 1 ? "pointer-events-none opacity-40" : "hover:border-brand hover:text-brand"
                    }`}
                  >
                    <ChevronRight size={16} />
                  </Link>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={pageHref(p)}
                      aria-current={p === page ? "page" : undefined}
                      className={`grid h-9 w-9 place-items-center rounded-lg border text-[12px] font-bold transition ${
                        p === page
                          ? "border-brand bg-brand text-white"
                          : "border-digi-border bg-white text-digi-text hover:border-brand hover:text-brand"
                      }`}
                    >
                      {toFaDigits(p)}
                    </Link>
                  ))}
                  <Link
                    href={pageHref(Math.min(totalPages, page + 1))}
                    aria-label="صفحه بعد"
                    className={`grid h-9 w-9 place-items-center rounded-lg border border-digi-border bg-white transition ${
                      page === totalPages ? "pointer-events-none opacity-40" : "hover:border-brand hover:text-brand"
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </Link>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
