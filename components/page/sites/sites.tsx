import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import SiteCard from "./site-card";

export default async function Sites({ limit }: { limit?: number }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const sites = await db.query.sites.findMany({
    where: (sites, { eq }) => eq(sites.userId, session.user.id),
    orderBy: (sites, { asc }) => asc(sites.createdAt),
    ...(limit ? { limit } : {}),
  });

  return sites.length > 0 ? (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sites.map((site) => (
        <SiteCard key={site.id} data={site} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-20">
      <Image
        alt="No sites illustration"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={300}
        height={300}
        className="mb-6"
      />
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        No Sites Yet
      </h1>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
        You don't have any sites yet. Create one to get started.
      </p>
    </div>
  );
}
