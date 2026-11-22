import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { queryProducts } from "@/lib/catalog";
import ListingView from "@/components/ListingView";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [cat] = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return { title: cat ? cat.name : "دسته‌بندی" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const [cat] = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  if (!cat) notFound();
  const sp = await searchParams;

  // پرفروش‌ترین اثر این دسته → تصویر هیرو
  const top = await queryProducts({ category: slug, sort: "sales", limit: 1 });

  return (
    <ListingView
      title={cat.name}
      subtitle={`خرید مستقیم ${cat.name} از هنرمندان و کارگاه‌های سراسر ایران`}
      breadcrumb={[cat.name]}
      basePath={`/category/${slug}`}
      searchParams={sp}
      fixed={{ category: slug }}
      fixedQuery={{}}
      heroImage={top.products[0]?.image}
    />
  );
}
