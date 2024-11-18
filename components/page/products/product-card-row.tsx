import Image from "next/image";
import Link from "next/link";

export default function ProductCardRow({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md hover:shadow-lg">
      {/* Product Image */}
      <div className="flex items-center space-x-4">
        <Image
          src={data.imageUrl || "/placeholder.png"}
          alt={data.productName}
          width={50}
          height={50}
          className="rounded"
        />
        <h3 className="text-lg font-medium text-white">{data.productName}</h3>
      </div>

      {/* Product Price */}
      <span className="text-lg font-semibold text-white">
        Rp {data.price.toLocaleString("id-ID")}
      </span>

      {/* Action Button */}
      <div>
        <Link
          href={`/product/${data.id}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
