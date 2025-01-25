"use client";

import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "../../modal/provider";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function MetaDataModal() {
    const modal = useModal();

    const [data, setData] = useState({
        name: "",
        subdomain: "",
        description: "",
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            subdomain: prev.name
                .toLowerCase()
                .trim()
                .replace(/[\W_]+/g, "-"),
        }));
    }, [data.name]);


    return (
        <form
            action={async (data: FormData) => {

            }
                // createSite(data).then((res: any) => {
                //   if (res.error) {
                //     toast.error(res.error);
                //   } else {
                //     va.track("Created Site");
                //     const { id } = res;
                //     router.refresh();
                //     router.push(`/site/${id}`);
                //     modal?.hide();
                //     toast.success(`Successfully created site!`);
                //   }
                // })
            }
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Meta Data
                </h2>

                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex flex-col gap-y-2 w-1/2">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Page title</label>
                        <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                    </div>
                    <div className="flex flex-col gap-y-2 w-1/2">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Description meta</label>
                        <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-2 md:w-full">
                    <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Meta tags</label>
                    <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                </div>
                <div className="flex flex-col gap-y-2 md:w-full">
                    <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Keywords</label>
                    <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                </div>
                <div className="flex flex-col gap-y-2 md:w-full">
                    <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Footer tags</label>
                    <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-600 bg-gray-800 text-white dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

function CreateSiteFormButton() {
    const { pending } = useFormStatus();
    return (
        <button
            className={cn(
                "flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
                pending
                    ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            )}
            disabled={pending}
        >
            {pending ? <LoadingDots color="#ffffff" /> : "Create Site"}
        </button>
    );
}
