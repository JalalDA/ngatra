import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import ProviderAds from "@/components/provider/ProviderAds";
import YourProvider from "@/components/provider/your-provider";

export default async function Providers({
  params,
}: {
  params: { id: string };
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
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold sm:text-3xl dark:text-white text-black">
            Providers
          </h1>
        </div>
      </div>
      <ProviderAds/>
      <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold sm:text-3xl dark:text-white">
            Your Providers For {data.name}
          </h1>
        </div>
      <YourProvider/>
    </>
  );
}
