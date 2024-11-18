import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

const title = "PPOB Panel – Your All-in-One Payment Solution";
const description =
  "PPOB Panel offers seamless multi-tenant management for payment and service transactions. Built with the latest technology for reliability and scalability.";
const image = "https://yourdomain.com/assets/ppob-panel-thumbnail.png";

export const metadata: Metadata = {
  title,
  description,
  icons: ["https://yourdomain.com/favicon.ico"],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@yourhandle",
  },
  metadataBase: new URL("https://yourdomain.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{ backgroundColor: "#1A202C" }} // Updated primary background color
        className={cn(
          cal.variable,
          inter.variable,
          "min-h-screen text-white antialiased"
        )}
      >
        <Providers>
          

          <main className="container mx-auto px-4 py-6">{children}</main>

          <footer className="bg-blue-700 py-4 text-center text-sm text-white"> {/* Updated footer color */}
            &copy; {new Date().getFullYear()} PPOB Panel. All Rights Reserved.
          </footer>

          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
