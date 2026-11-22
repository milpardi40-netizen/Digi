import Link from "next/link";
import { BadgeCheck, MapPin, ArrowLeft } from "lucide-react";
import { toFaDigits } from "@/lib/format";

export default function ShopCard({
  shop,
  productsCount,
  compact = false,
}: {
  shop: {
    name: string;
    slug: string;
    city: string;
    story: string;
    avatarColor: string;
    verified: boolean;
  };
  productsCount?: number;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/shop/${shop.slug}`}
      className="group flex w-56 shrink-0 flex-col rounded-2xl border border-digi-border/60 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(41,36,31,0.16)]"
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-2xl font-black text-white shadow-sm"
          style={{ backgroundColor: shop.avatarColor }}
        >
          {shop.name.trim().charAt(0)}
        </span>
        <div className="min-w-0">
          <h3 className="flex items-center gap-1 text-[12px] font-extrabold leading-5 text-digi-text">
            <span className="line-clamp-1">{shop.name}</span>
            {shop.verified && <BadgeCheck size={15} className="shrink-0 text-accent" aria-label="فروشگاه تأییدشده" />}
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-[9.5px] text-digi-muted">
            <MapPin size={10} />
            {shop.city}
          </p>
        </div>
      </div>
      {!compact && (
        <p className="mt-2.5 h-12 text-[10px] leading-5 text-digi-muted line-clamp-2">{shop.story}</p>
      )}
      <div className="mt-auto flex items-center justify-between border-t border-digi-border/60 pt-2.5">
        {productsCount !== undefined && (
          <span className="text-[9.5px] font-bold text-digi-muted">{toFaDigits(productsCount)} اثر</span>
        )}
        <span className="flex items-center gap-0.5 text-[10px] font-bold text-brand transition-all group-hover:gap-1.5">
          بازدید از فروشگاه
          <ArrowLeft size={12} />
        </span>
      </div>
    </Link>
  );
}
