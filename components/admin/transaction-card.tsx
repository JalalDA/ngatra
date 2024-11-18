"use client"
import BlurImage from "@/components/blur-image";
import type { SelectSite } from "@/lib/schema";
import { placeholderBlurhash, random } from "@/lib/utils";
import { BarChart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { updateTransactionStatus } from "@/lib/actions";
export default function SiteCard({ data }: { data: SelectSite }) {
  const router=useRouter();
  const updateStatus=async(status)=>{
    updateTransactionStatus(data.id,status).then((res: any) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        const { id } = res;
        router.refresh();
        toast.success(`Successfully updating status!`);
      }
    })
  }
  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
            {data.name}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.phone}
          </p>
          <div
          
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {data.status}
        </div>
        {
          data.status=="waiting_payment"
          &&
          <>
            <button
            onClick={()=>{updateStatus('processed')}}
              className="flex items-center justify-center w-full rounded-lg bg-blue-600 px-4 py-2 my-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              mark as processed
            </button>
            <button
            onClick={()=>{updateStatus('failed')}}
              className="flex items-center justify-center w-full rounded-lg bg-red-600 px-4 py-2 my-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              mark as failed/canceled
            </button>
          </>
        }
        {
          data.status=="processed"
          &&
          <>
            <button
            onClick={()=>{updateStatus('completed')}}
              className="flex items-center justify-center w-full rounded-lg bg-blue-600 px-4 my-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              mark as completed
            </button>
            <button
            onClick={()=>{updateStatus('failed')}}
              className="flex items-center justify-center w-full rounded-lg bg-red-600 px-4 my-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              mark as failed/canceled
            </button>
          </>
        }
      </div>
    </div>
  );
}
