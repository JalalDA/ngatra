import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";
import { BaggageClaim } from "lucide-react";

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
    <div className={``}>
      <main className="">
        {children}
      </main>
    </div>
  );
}
