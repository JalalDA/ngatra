import BlurImage from "@/components/blur-image";
import type { SelectSite } from "@/lib/schema";
import { placeholderBlurhash, random } from "@/lib/utils";
import { BarChart } from "lucide-react";
import Link from "next/link";

export default function SiteCard({ data }: { data: SelectSite }) {
  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div className="relative flex flex-col rounded-lg border border-gray-200 bg-white shadow-md transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Thumbnail */}
      <Link
        href={`/site/${data.id}`}
        className="overflow-hidden rounded-t-lg"
      >
        <BlurImage
          alt={data.name ?? "Card thumbnail"}
          width={500}
          height={400}
          className="h-44 w-full object-cover"
          src={data.image ?? "/placeholder.png"}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
      </Link>

      {/* Site Information */}
      <div className="flex flex-col p-4">
        <Link href={`/site/${data.id}`}>
          <h3 className="truncate text-lg font-bold text-gray-800 dark:text-gray-200">
            {data.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
          {data.description || "No description available"}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 dark:border-gray-700">
        {/* View Site Link */}
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.subdomain}.localhost:3000`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {url} ↗
        </a>

        {/* Analytics Link */}
        <Link
          href={`/site/${data.id}/analytics`}
          className="flex items-center space-x-1 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
        >
          <BarChart height={16} />
          <p>{random(10, 40)}%</p>
        </Link>
      </div>
    </div>
  );
}
