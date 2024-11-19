import { ReactNode } from "react";
import PaymentMethod from "@/components/page/paymentMethod/paymentMethod";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { updateSitePaymentMethod } from "@/lib/actions";
import db from "@/lib/db";

export default async function PaymentMethodPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const sitePaymentMethod = await db.query.sitePaymentMethod
  .findMany({
    where: (sitePaymentMethod, { eq }) => eq(sitePaymentMethod.siteId, decodeURIComponent(params.id))
  });
  const paymentMethod = await db.query.masterPaymentMethod.findMany();
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Payment Method
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            Please choose your payment method
        </p>
        <PaymentMethod
         handleSubmit={updateSitePaymentMethod}
         sitePaymentMethod={sitePaymentMethod.map(item=>item.masterPaymentMethodId)}
         paymentMethod={paymentMethod}/>
      </div>
    </div>
  );
}
