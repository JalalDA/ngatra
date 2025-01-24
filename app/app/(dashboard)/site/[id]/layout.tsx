import Header from "@/components/header";
import { ReactNode } from "react";

export default function SiteLayout({ children, params }: { children: ReactNode, params: { id: string } }) {

  return (
    <div className="flex w-screen flex-col">
      <Header id={params.id} />
      <div className="flex flex-col space-y-6 p-6">
        {params.id}
        {children}
      </div>
    </div>
  );
}
