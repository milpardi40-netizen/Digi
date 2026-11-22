import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = { title: "ورود | ثبت‌نام" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = process.env.GITHUB_PAGES === "true" ? {} : await searchParams;
  return <AuthForm mode="login" next={sp.next ?? "/"} />;
}
