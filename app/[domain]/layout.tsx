import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);

  if (!data) {
    return null;
  }

  const { name: title, description, image, logo } = data;

  return {
    title,
    description,
    openGraph: {
      title: title as string,
      description: description as string,
      images: [image as string],
    },
    twitter: {
      card: "summary_large_image",
      title: title as string,
      description: description as string,
      images: [image as string],
    },
    icons: [logo as string],
    metadataBase: new URL(`https://${domain}`),
  };
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  if (!domain) {
    notFound();
  }
  const data = await getSiteData(domain);

  if (!data) {
    notFound();
  }

  // Redirect to custom domain if it exists
  if (
    domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.customDomain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  ) {
    return redirect(`https://${data.customDomain}`);
  }

  return (
    <div className={`${fontMapper[data.font]} min-h-screen bg-[#0f172a]`}>
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center bg-[#0f172a] text-white shadow-md">
        <div className="container mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Site Logo */}
          <Link href="/" className="flex items-center space-x-3">
            {data.logo ? (
              <Image
                src={data.logo}
                alt={data.name || "Site Logo"}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gray-600"></div>
            )}
            <span className="font-title text-lg font-medium text-white">
              {data.name}
            </span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/about"
              className="text-sm font-medium text-gray-400 hover:text-white"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-400 hover:text-white"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-400 hover:text-white"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="block md:hidden text-sm font-medium text-gray-400 hover:text-white">
            Menu
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
