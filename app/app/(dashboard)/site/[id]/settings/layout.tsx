import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import SiteSettingsNav from "./nav";
import db from "@/lib/db";

export default async function SiteAnalyticsLayout({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await db.query.sites.findFirst({
    where: (sites, { eq }) => eq(sites.id, decodeURIComponent(params.id)),
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 px-4 py-6 sm:flex-row sm:justify-between sm:space-y-0 sm:px-6 lg:px-8 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Settings for <span className="text-indigo-400">{data.name}</span>
        </h1>
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.subdomain}.localhost:3000`
          }
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <span>Visit Site</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      {/* Navigation Section */}
      <SiteSettingsNav />

      {/* Main Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
