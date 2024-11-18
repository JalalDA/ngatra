import { Suspense } from "react";
import Sites from "@/components/page/sites/sites";
import PlaceholderCard from "@/components/placeholder-card";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import Form from "@/components/form/my-site";
export default async function MySite() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await db.query.sites.findFirst({
    where: (sites, { eq }) => eq(sites.userId, session.user.id),
  });
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            My Sites
          </h1>
        </div>
        <Form initialData={data} handleSubmit={null}/>
      </div>
    </div>
  );
}
