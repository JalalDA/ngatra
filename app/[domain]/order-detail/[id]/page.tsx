import { notFound } from "next/navigation";
import Order from "@/components/public/products/order";
import db from "@/lib/db";
import { useParams, useRouter } from "next/navigation";
import OrderDetail from "@/components/public/products/order-detail";
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const transaction = await db.query.transaction.findFirst({
    where: (transaction, { eq }) => eq(transaction.id, decodeURIComponent(params.id)),
  });
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 mx-auto">
      <OrderDetail transaction={transaction} />
    </div>
  );
}
