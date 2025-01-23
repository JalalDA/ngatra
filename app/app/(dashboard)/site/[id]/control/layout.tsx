import Header from "@/components/header";
import Nav from "@/components/nav";
import { ReactNode } from "react";

export default function ControlLayout({ children, params }: { children: ReactNode, params: { id: string } }) {

    return (
        <div className="flex w-screen flex-col">
            <Nav>
                <div className="flex flex-col space-y-6 p-6">{children}</div>
            </Nav>
        </div>
    );
}
