"use client";

import { toast } from "sonner";
import { createSite } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "../../modal/provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function FastOrderModal() {
    const router = useRouter();
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

    const [showOrder, setShowOrder] = useState(false)

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
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Fast Order
                </h2>
                <div className="border p-4 rounded-full flex items-center justify-between">
                    <div className="font-semibold text-md text-gray-600 dark:text-gray-400">Fast Order?</div>
                    <Switch checked={showOrder} onCheckedChange={() => setShowOrder(!showOrder)} />
                </div>

                {
                    showOrder &&
                    <>
                        <div className="border p-4 rounded-full flex items-center justify-between">
                            <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Discount for unregistered users</label>
                            <div className="w-1/4">
                                <Input type="number" className="font-semibold text-md text-gray-600 dark:text-gray-400"/>
                            </div>
                        </div>

                        <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                            <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                                <div className="flex items-center gap-x-2">
                                    <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show order from landing</h5>
                                </div>
                                <Switch />
                            </div>
                            <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                                <div className="flex items-center gap-x-2">
                                    <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show discount widget </h5>
                                </div>
                                <Switch />
                            </div>
                            <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                                <div className="flex items-center gap-x-2">
                                    <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show recent purchase widget </h5>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </>
                }
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
