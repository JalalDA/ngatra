import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import { Button } from "@tremor/react";

export default async function SiteProvider({
    params,
}: {
    params: { id: string };
}) {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }
    const data = await db.query.sites.findFirst({
        where: (sites, { eq }) => eq(sites.id, decodeURIComponent(params.id)),
    });

    if (!data || data.userId !== session.user.id) {
        notFound();
    }

    const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

    return (
        <div className="flex items-center flex-col justify-center">
            <div className="flex justify-start w-full">
                <h1 className="font-cal text-xl font-bold sm:text-3xl dark:text-white text-gray-800">
                    Payment Methods
                </h1>
            </div>
            <div className="border flex flex-col mt-8 items-center justify-start w-[80%] border-gray-900 rounded-lg">
                <div className="h-[240px] flex items-center justify-center">
                    <p className="dark:text-white text-gray-800">Add payment system so your users can add funds automaticly</p>
                </div>
                <div className="p-4 border-t w-full flex items-center justify-center border-gray-900">
                    <Button>
                        Add Payment Method
                    </Button>
                </div>
            </div>
        </div>
    );
}
