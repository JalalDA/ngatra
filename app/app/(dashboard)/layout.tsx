import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import Header from "@/components/header";
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
        <div className="min-h-screen bg-white dark:bg-gray-950">{children}</div>
    </div>
  );
}
