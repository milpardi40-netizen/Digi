import Link from "next/link";
import { Server, Home, Sparkles, ShoppingCart } from "lucide-react";

export default function StaticModeNotice({
  title,
  description = "این بخش (احراز هویت، ثبت سفارش واقعی و پنل مدیریت/فروشنده) به سرور Node.js و دیتابیس PostgreSQL نیاز دارد و در نسخه استاتیک GitHub Pages غیرفعال است.",
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="container-digi py-12">
      <div className="mx-auto max-w-xl rounded-3xl border border-digi-border/60 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-orange-50 text-brand">
          <Server size={30} strokeWidth={1.6} />
        </div>
        <h1 className="mt-4 font-display text-2xl text-digi-text">{title}</h1>
        <p className="mt-3 text-[12.5px] leading-7 text-digi-muted">{description}</p>
        <p className="mt-2 text-[11px] leading-6 text-digi-muted">
          می‌توانید تمامی آثار هنری، دسته‌بندی‌ها، فروشگاه‌ها، جستجو و سبد خرید را به‌صورت کامل مرور کنید.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/"
            className="flex h-10 items-center gap-1.5 rounded-xl bg-brand px-5 text-[12px] font-bold text-white transition hover:bg-brand-deep"
          >
            <Home size={15} />
            صفحه اصلی فروشگاه
          </Link>
          <Link
            href="/featured"
            className="flex h-10 items-center gap-1.5 rounded-xl border border-digi-border px-5 text-[12px] font-bold text-digi-text transition hover:border-brand hover:text-brand"
          >
            <Sparkles size={15} />
            منتخب سردبیر
          </Link>
          <Link
            href="/cart"
            className="flex h-10 items-center gap-1.5 rounded-xl border border-digi-border px-5 text-[12px] font-bold text-digi-text transition hover:border-brand hover:text-brand"
          >
            <ShoppingCart size={15} />
            سبد خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
