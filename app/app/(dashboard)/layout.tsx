import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
        <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
        </Nav>
        <div className="min-h-screen sm:pl-60 dark:bg-black">{children}</div>
    </div>
  );
}
