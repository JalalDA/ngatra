import Sidebar from "@/components/control/Sidebar";
import { ReactNode } from "react";

export default function ControlLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
    console.log({params});
    return (
        <div className="flex w-full gap-x-8 dark:text-white text-black">
            <Sidebar />
            <div className="flex flex-col space-y-6 md:w-5/6 h-screen overflow-scroll">{children}</div>
        </div>
    );
}
