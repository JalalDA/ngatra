"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  LayoutDashboard,
  Settings,
  ListIcon,
  BoxIcon,
  DollarSign,
  PhoneCall,
  Newspaper,
  Globe,
} from "lucide-react";
import { useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";

const externalLinks = [
  {
    name: "Contact Support",
    href: "https://wa.me/6281266235940",
    icon: <PhoneCall width={18} />,
  },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const { id } = useParams() as { id?: string };
  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        {
          name: "Back to All Sites",
          href: "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Analytics",
          href: `/site/${id}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Site Settings",
          href: `/site/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
        {
          name: "Transactions",
          href: `/site/${id}/transactions`,
          isActive: segments.includes("transactions"),
          icon: <DollarSign width={18} />,
        },
      ];
    }
    return [
      {
        name: "Overview",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "All Sites",
        href: "/sites",
        icon: <Globe width={18} />,
      },
      // {
      //   name: "My Sites",
      //   href: "/mySite",
      //   icon: <Globe  width={18} />,
      // },
      {
        name: "Product Categories",
        href: "/categories",
        isActive: segments[0] === "categories",
        icon: <ListIcon width={18} />,
      },
      {
        name: "Products",
        href: "/products",
        isActive: segments[0] === "products",
        icon: <BoxIcon width={18} />,
      },
      {
        name: "Transactions",
        href: `/transactions`,
        isActive: segments[0] === "transactions",
        icon: <DollarSign width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments]);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(false); // Hide sidebar on path change
  }, [pathname]);

  return (
    <>
      {/* Toggle Sidebar Button */}
      <button
        className="fixed z-20 top-5 right-5 sm:hidden p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <LayoutDashboard width={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-10 h-full transform transition-transform sm:w-60 ${showSidebar ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 bg-gray-900 text-gray-300 border-r border-gray-700`}
      >
        {/* Logo and Navigation Links */}
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="rounded"
                />
                <span className="text-lg font-bold text-white">
                  Admin Panel
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              {tabs.map(({ name, href, isActive, icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-all ${isActive
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-800 hover:text-white"
                    }`}
                >
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div className="space-y-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md transition-all hover:bg-gray-800 hover:text-white"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <span className="text-xs">↗</span>
              </a>
            ))}
            <div className="my-2 border-t border-dark-200 dark:border-dark-700 opacity-5" />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
