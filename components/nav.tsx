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
  CreditCard,
  UserCircle2,
  FilesIcon,
  FolderClosed,
  BadgeDollarSignIcon,
} from "lucide-react";
import { useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import NavItem from "./nav-item";

const externalLinks = [
  {
    name: "Contact Support",
    href: "https://wa.me/6281315805251",
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
          name: "Provider",
          href: `/site/${id}/provider`,
          isActive: segments.includes("provider"),
          icon: <FolderClosed width={18} className="text-purple-500 shadow-md" />
        },
        {
          name: "Payment Method",
          href: `/site/${id}/payment`,
          isActive: segments.includes("payment"),
          icon: <BadgeDollarSignIcon width={18} className="text-green-500 shadow-md" />
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
          name: "Payment Method",
          href: `/site/${id}/paymentMethod`,
          isActive: segments.includes("paymentMethod"),
          icon: <CreditCard width={18} />,
        },
        {
          name: "Vendor",
          href: `/site/${id}/vendor`,
          isActive: segments.includes("vendor"),
          icon: <UserCircle2 width={18} />,
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
      }
    ];
  }, [segments]);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(false); // Hide sidebar on path change
  }, [pathname]);

  const topNav = [
    {
      name : "Users",
      url : "/users",
    },
    {
      name : "Orders",
      url : "/orders",
    },
    {
      name : "Services",
      url : "/services",
    },
    {
      name : "Support",
      url : "/support",
    },
    {
      name : "Statistics",
      url : "/statistics",
    },
    {
      name : "Top Providers",
      url : "/top-providers",
    },
    {
      name : "More",
      url : "/more",
    },
  ]

  return (
    <>
      <div className="sticky top-0 flex bg-gray-900 z-50 items-center px-8 py-4 gap-x-8">
        <Select
          placeholder={"select your sites"}
          options={[
            {
              label: "keren",
              value: "https://keren.com"
            },
            {
              label: "galau",
              value: "Galau.com"
            }
          ]} />
          {
            topNav.map((item, index)=>(
              // <Link key={index} className="hover:bg-gray-600 rounded-lg p-2 cursor-pointer" href={item.url}>{item.name}</Link>
              <NavItem key={index} item={item}/>
            ))
          }
        <div className="flex items-center gap-x-2">
          
        </div>
      </div>

      {/* Sidebar */}
      {/* <div
        className={`fixed z-10 h-full transform transition-transform sm:w-60 ${showSidebar ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 bg-gray-900 text-gray-300 border-r border-gray-700`}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div>

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
      </div> */}
    </>
  );
}
