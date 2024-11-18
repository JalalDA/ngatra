import { ReactNode } from "react";
import EditProduct from "@/components/page/products/edit-product";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { updateProduct } from "@/lib/actions";
import db from "@/lib/db";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await db.query.product.findFirst({
    where: (product, { eq }) => eq(product.id, decodeURIComponent(params.id)),
  });
  if (!data) {
    notFound();
  }
  const category = await db.query.category.findMany();
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Product Detail
        </h1>
        <EditProduct
         initialData={data}
         handleSubmit={updateProduct}
         category={category}/>
      </div>
    </div>
  );
}
