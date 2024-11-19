import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <Image
        width={512}
        height={512}
        src="/logo.png"
        alt="Platforms on Vercel"
        className="w-48"
      />
      <h1 className="text-white">
        Wellcome to ngatra
        <Link href={"https://app.ngatrapanel.my.id"}>
          <InlineSnippet className="ml-2 bg-blue-900 text-blue-100">
            login
          </InlineSnippet>
        </Link>
      </h1>
    </div>
  );
}
