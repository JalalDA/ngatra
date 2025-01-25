"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";


export default function AddManagersModal() {
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

    const [selectedPayment, setSelectedPayment] = useState(false)
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
            className="w-full max-w-lg mt-12 overflow-scroll rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    Add Managers
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-2">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Username</label>
                        <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Password</label>
                        <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text outline-none" />
                    </div>
                    <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Role</h5>
                    {/* admin */}
                    <div className="border p-4 rounded-lg hover:bg-blue-50 cursor-pointer hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-x-2">
                                    <Checkbox />
                                    <div className="text-md">Admin</div>
                                </div>
                                <div className="text-md">Same rights as of main account</div>
                            </div>
                            <Image src={"/admin-role.png"} alt="admin-role" height={72} width={72} />
                        </div>
                    </div>
                    <div className="border p-4 rounded-lg hover:bg-blue-50 cursor-pointer hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-x-2">
                                    <Checkbox />
                                    <div className="text-md">Moderator</div>
                                </div>
                                <div className="text-md">Cant see balance, providers and
                                    panel settings. Can work with orders,
                                    edit services and answer in support.</div>
                            </div>
                            <Image src={"/moderator-role.png"} alt="admin-role" height={72} width={72} />
                        </div>
                    </div>
                    <div className="border p-4 rounded-lg hover:bg-blue-50 cursor-pointer hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-x-2">
                                    <Checkbox />
                                    <div className="text-md">Agent</div>
                                </div>
                                <div className="text-md">Can only answer in support,
                                    see orders and services but cant edit.
                                    Doesn't see providers and panel settings</div>
                            </div>
                            <Image src={"/agent-role.png"} alt="admin-role" height={72} width={72} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    {`Cancel`}
                </button>
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    {`Save`}
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
