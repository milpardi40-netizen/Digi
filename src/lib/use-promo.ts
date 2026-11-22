"use client";

import { useEffect, useState } from "react";
import { staticValidatePromo } from "@/lib/static-data";

export type PromoInfo = { code: string; percent: number; maxDiscount: number };

const IS_STATIC = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

export function usePromo() {
  const [promo, setPromo] = useState<PromoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("digi-promo");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as PromoInfo;
      if (IS_STATIC) {
        const valid = staticValidatePromo(parsed.code);
        if (valid) setPromo(valid);
        else localStorage.removeItem("digi-promo");
        return;
      }
      fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: parsed.code }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => (d ? setPromo(d) : localStorage.removeItem("digi-promo")))
        .catch(() => {});
    } catch {
      /* ignore */
    }
  }, []);

  const apply = async (code: string) => {
    setLoading(true);
    setError("");
    if (IS_STATIC) {
      const found = staticValidatePromo(code);
      setLoading(false);
      if (!found) {
        setError("کد تخفیف نامعتبر است (کدهای نمونه: HONAR10، WELCOME15، HANDMADE25)");
        return false;
      }
      setPromo(found);
      localStorage.setItem("digi-promo", JSON.stringify(found));
      return true;
    }
    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "کد تخفیف نامعتبر است");
        return false;
      }
      setPromo(data);
      localStorage.setItem("digi-promo", JSON.stringify(data));
      return true;
    } catch {
      setError("ارتباط با سرور برقرار نشد");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removePromo = () => {
    setPromo(null);
    setError("");
    localStorage.removeItem("digi-promo");
  };

  return { promo, loading, error, apply, removePromo };
}
