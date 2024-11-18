import { Suspense } from "react";
import db from "@/lib/db";
import Products from "@/components/page/products/products";
import PlaceholderCard from "@/components/placeholder-card";
import CreateProductButton from "@/components/create-product-button";
import CreateProductModal from "@/components/page/products/create-product";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const category = await db.query.category.findMany();
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            All Product
          </h1>
          <CreateProductButton>
            <CreateProductModal category={category}/>
          </CreateProductButton>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          {/* @ts-expect-error Server Component */}
          <Products/>
        </Suspense>
      </div>
    </div>
  );
}
