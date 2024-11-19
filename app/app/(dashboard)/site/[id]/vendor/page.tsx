import { ReactNode } from "react";
import Vendor from "@/components/page/vendor/vendor";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { updateSiteVendor } from "@/lib/actions";
import db from "@/lib/db";

export default async function VendorPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const siteVendor = await db.query.siteVendor
  .findMany({
    where: (siteVendor, { eq }) => eq(siteVendor.siteId, decodeURIComponent(params.id))
  });
  const vendor = await db.query.masterVendor.findMany();
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Site Vendor
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            Please choose your vendor
        </p>
        <Vendor
         handleSubmit={updateSiteVendor}
         siteVendor={siteVendor.map(item=>item.masterVendorId)}
         vendor={vendor}/>
      </div>
    </div>
  );
}
