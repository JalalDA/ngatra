"use client"
import { useEffect, useState } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import DomainStatus from "./domain-status";
import DomainConfiguration from "./domain-configuration";
import Uploader from "./uploader";
import va from "@vercel/analytics";

type SiteData = {
  name: string | null;
  subdomain: string | null;
  description: string | null;
};
export default function MySite({initialData,handleSubmit}:{initialData:SiteData,handleSubmit:any}){
    
  const [data, setData] = useState<SiteData>({
    name: "",
    subdomain: "",
    description: "",
  });
    const router = useRouter();
    const { update } = useSession();
    useEffect(()=>{
        setData(initialData)
    },[])
    return (
        <form action={async (data:FormData)=>{
            handleSubmit(data).then(async (res: any) => {
                if (res.error) {
                  toast.error(res.error);
                } else {
                  toast.success(`Site successfully udpated !`);
                }
              });
            }} className="rounded-lg  border border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
          <div className="p-6">
            <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-stone-500 dark:text-stone-400"
            >
              Site Name
            </label>
            <h2 className="font-cal text-2xl dark:text-white">{initialData.name}</h2>
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="subdomain"
              className="text-sm font-medium text-stone-500"
            >
              Subdomain
            </label>
            <h2 className="font-cal text-2xl dark:text-white">{initialData.subdomain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}</h2>
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-stone-500"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description about why my site is so awesome"
              value={data.description ?? ""}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              maxLength={140}
              rows={3}
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
          </div>
            
        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
        
            <FormButton />
        </div>
        </form>
    )
}

function FormButton() {
    const { pending } = useFormStatus();
    return (
      <button
        className={cn(
          "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
          pending
            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
        )}
        disabled={pending}
      >
        {pending ? <LoadingDots color="#808080" /> : <p>Save Changes</p>}
      </button>
    );
  }