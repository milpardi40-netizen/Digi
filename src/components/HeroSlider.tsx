"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

type Slide = {
  kicker: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    kicker: "هنر دست هنرمند؛ مستقیم از کارگاه",
    title: "هر اثر، یک روایت دست‌ساز",
    subtitle: "سفال لالجین، گلیم کردستان، باتیک ترنج، نمد شیراز و فانوس‌های اصفهان — بدون واسطه، با گواهی اصالت",
    cta: "مشاهده منتخب سردبیر",
    href: "/featured",
    image: "/images/hero-artist.jpg",
  },
  {
    kicker: "سفال لالجین؛ پایتخت سفال ایران",
    title: "گلدان‌های لعاب فیروزه‌ای",
    subtitle: "هر قطعه چرخ‌کاری و نقاشی دستی است؛ شماره‌دار و امضاشده توسط استاد رضایی",
    cta: "خرید از گالری لالجین",
    href: "/shop/laljin-pottery",
    image: "/images/hero-pottery.jpg",
  },
  {
    kicker: "فرش و گلیم کردستان",
    title: "گلیم‌های پشم دست‌ریس",
    subtitle: "رنگ‌های گیاهی روناس و نیل؛ روایت هر روستا روی دیوار خانه شما",
    cta: "مشاهده گلیم‌ها",
    href: "/category/carpet",
    image: "/images/hero-kilim.jpg",
  },
  {
    kicker: "طرح و پترن؛ آتلیه ترنج",
    title: "باتیک دستی روی ابریشم",
    subtitle: "واکس داغ، رنگ گیاهی و ده‌ها ساعت کار؛ شال‌ها و روسری‌های شماره‌دار",
    cta: "کالکشن طرح و پترن",
    href: "/category/pattern",
    image: "/images/hero-batik.jpg",
  },
  {
    kicker: "نمد و نمدمالی؛ نمدینه شیراز",
    title: "نرمی پشم، رنگ طبیعت",
    subtitle: "پشم مرینوس دست‌چیده با رنگرزی گیاهی؛ از کیف و کلاه تا پاپوش عشایری",
    cta: "آثار نمدی",
    href: "/category/felt",
    image: "/images/hero-felt.jpg",
  },
  {
    kicker: "صنایع روشنایی؛ چراغ‌چی اصفهان",
    title: "نورِ رنگ، دستِ استاد",
    subtitle: "لوستر و فانوس موزائیک شیشه‌ای با هزاران قطعه رنگی؛ نور گرم برای خانه شما",
    cta: "کالکشن روشنایی",
    href: "/category/lighting",
    image: "/images/hero-lighting.jpg",
  },
];

const AUTOPLAY_MS = 5000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // فقط اسلایدهایی که دیده‌شده‌اند تصویرشان لود می‌شود
  const [visited, setVisited] = useState<boolean[]>(() => SLIDES.map((_, i) => i === 0));

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    setVisited((v) => (v[index] ? v : v.map((seen, i) => (i === index ? true : seen))));
  }, [index]);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative h-52 w-full select-none overflow-hidden rounded-2xl bg-[#1a1208] shadow-[0_18px_50px_rgba(41,36,31,0.28)] sm:h-64 lg:h-80"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="کالکشن‌های ویژه هنربازار"
    >
      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <Link
            key={slide.href + i}
            href={slide.href}
            aria-hidden={!active}
            tabIndex={active ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            {/* تصویر پس‌زمینه */}
            {visited[i] && (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 75vw"
                className={`object-cover transition-transform duration-[7000ms] ease-out ${active ? "scale-105" : "scale-100"}`}
              />
            )}
            {/* لایه تیره برای خوانایی متن (متن سمت راست است) */}
            <div className="absolute inset-0 bg-linear-to-l from-[#160f07]/88 via-[#160f07]/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#160f07]/60 to-transparent" />

            {/* متن */}
            <div className="relative flex h-full max-w-lg flex-col justify-center gap-1.5 p-5 sm:gap-2 sm:p-8">
              <span className="w-fit rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-bold tracking-wide text-[#fbf7ee] backdrop-blur-sm sm:text-[11px]">
                {slide.kicker}
              </span>
              <h2 className="font-display text-[22px] leading-9 text-[#fbf7ee] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-[30px] sm:leading-[2.9rem]">
                {slide.title}
              </h2>
              <p className="hidden text-[12px] leading-6 text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] sm:block">
                {slide.subtitle}
              </p>
              <span className="mt-2 flex w-fit items-center gap-1.5 rounded-xl bg-[#fbf7ee] px-4 py-2 text-[11px] font-extrabold text-[#29241f] shadow-lg transition-transform duration-200 hover:scale-105 sm:text-xs">
                {slide.cta}
                <ArrowLeft size={14} />
              </span>
            </div>
          </Link>
        );
      })}

      {/* فلش‌ها */}
      <button
        onClick={() => go(-1)}
        aria-label="اسلاید قبلی"
        className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 md:grid"
      >
        <ChevronRight size={20} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="اسلاید بعدی"
        className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 md:grid"
      >
        <ChevronLeft size={20} />
      </button>

      {/* نقطه‌ها */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`اسلاید ${i + 1}: ${s.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-[#fbf7ee]" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
