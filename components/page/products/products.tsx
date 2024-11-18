import { getSession } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import ProductCardRow from "./product-card-row";

export default async function Products({ limit }: { limit?: number }) {

  const products = await db.query.product.findMany({
    orderBy: (product, { asc }) => asc(product.productName),
    ...(limit ? { limit } : {}),
  });

  return products.length > 0 ? (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCardRow key={product.id} data={product} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl text-white">No Products Yet</h1>
      <p className="text-lg text-stone-500">
        You do not have any products yet. Create one to get started.
      </p>
    </div>
  );
}
