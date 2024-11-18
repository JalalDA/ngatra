import Link from "next/link";

export default function ProductCard({
  siteId,
  data,
}: {
  siteId: string;
  data: { id: string; productName: string; price: number };
}) {
  return (
    <div className="relative rounded-lg border border-gray-600 bg-gray-800 p-4 shadow-md transition-all hover:shadow-xl dark:border-gray-700 dark:hover:border-white">
      {/* Product Link */}
      <Link href={`/order/${data.id}`} className="block">
        <h3 className="text-lg font-bold text-white truncate">
          {data.productName}
        </h3>
      </Link>

      {/* Price and Buy Button */}
      <div className="flex items-center justify-between mt-4">
        {/* Product Price */}
        <p className="text-white text-lg">Rp {data.price.toLocaleString()}</p>

        {/* Buy Button */}
        <Link
          href={`/order/${data.id}`}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Buy
        </Link>
      </div>
    </div>
  );
}
