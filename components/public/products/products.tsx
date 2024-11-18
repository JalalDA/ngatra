import db from "@/lib/db";
import Image from "next/image";
import ProductCard from "./product-card";

export default async function Products({
  siteId,
  searchQuery,
  category,
}: {
  siteId: any;
  searchQuery?: string;
  category?: string;
}) {
  // Fetch products from the database with filters applied
  const products = await db.query.product.findMany({
    where: (product, { eq, contains, and }) =>
      and(
        eq(product.status, true),
        searchQuery ? contains(product.productName, searchQuery) : true,
        category && category !== "all" ? eq(product.category, category) : true
      ),
    orderBy: (product, { asc }) => asc(product.productName),
  });

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Telegram Premium</h1>
        <div className="relative">
          <form method="get" action="">
            <select
              name="category"
              defaultValue={category || "all"}
              className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="telegram">Telegram</option>
              <option value="instagram">Instagram</option>
            </select>
            <button type="submit" className="hidden"></button>
          </form>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <form method="get" action="">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery || ""}
            placeholder="Search"
            className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="hidden"></button>
        </form>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard siteId={siteId} key={product.id} data={product} />
          ))}
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center space-x-4">
          <h1 className="font-cal text-4xl text-white">No Products Yet</h1>
          <Image
            alt="missing site"
            src="https://illustrations.popsy.co/gray/web-design.svg"
            width={400}
            height={400}
          />
          <p className="text-lg text-stone-500">
            No products at this time, come back later
          </p>
        </div>
      )}
    </div>
  );
}
