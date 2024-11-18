import Image from "next/image";
import Link from "next/link";

export default function CategoryCardRow({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md hover:shadow-lg">
      {/* Category Icon */}
      <div className="flex items-center space-x-4">
        <Image
          src={data.iconUrl || "/placeholder.png"}
          alt={data.category_name}
          width={50}
          height={50}
          className="rounded"
        />
        <h3 className="text-lg font-medium text-white">{data.category_name}</h3>
      </div>

      {/* Action Button */}
      <div>
        <Link
          href={`/category/${data.id}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
