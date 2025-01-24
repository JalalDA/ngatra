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
    Globe,
    CreditCard,
    UserCircle2,
    FolderClosed,
    BadgeDollarSignIcon,
    ChevronRightIcon,
    GalleryThumbnails,
    Settings2,
    Wallet,
    Sparkles,
    Users,
    Layers,
} from "lucide-react";
import { useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

const externalLinks = [
    {
        name: "Contact Support",
        href: "https://wa.me/6281315805251",
        icon: <PhoneCall width={18} />,
    },
];

export default function Sidebar() {
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
                name: "General Settings",
                href: "control/settings",
                isActive: segments.length === 0,
                icon: <Settings width={18} />,
            },
            {
                name: "Providers",
                href: "providers",
                isActive: segments[0] === "providers",
                icon: <FolderClosed width={18} />,
            },
            {
                name: "Payment Methods",
                href: "payments",
                isActive: segments[0] === "payments",
                icon: <Wallet width={18} />,
            },
            {
                name: "Design",
                href: "design",
                isActive: segments[0] === "design",
                icon: <Sparkles width={18} />
            },

            {
                name: "Managers",
                href: "managers",
                isActive: segments[0] === "managers",
                icon: <Users width={18} />,
            },
            {
                name: "Language",
                href: `language`,
                isActive: segments[0] === "language",
                icon: <DollarSign width={18} />,
            },
            {
                name: "Integrations",
                href: "integrations",
                isActive: segments[0] === "integrations",
                icon: <Layers width={18} />,
            }
        ];
    }, [segments]);

    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        setShowSidebar(false); // Hide sidebar on path change
    }, [pathname]);

    return (
        <div className="md:w-1/6 h-[14rem]">
            <div className="flex flex-col gap-y-4 justify-between h-full">
                <div>
                    <div className="space-y-1 flex flex-col gap-y-4">
                        {tabs.map(({ name, href, isActive, icon }) => (
                            <Link
                                key={name}
                                href={href}
                                className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-md transition-all text-black hover:bg-gray-800 hover:text-white ${isActive
                                    ? "bg-gray-100 shadow-md"
                                    : "hover:bg-gray-800 hover:text-white"
                                    }`}>
                                <div className="flex items-center gap-x-4">
                                    {icon}
                                    <span className="text-sm font-medium">{name}</span>
                                </div>
                                <ChevronRightIcon />
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
                            className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-md transition-all text-black hover:bg-gray-800 hover:text-white hover:text-white"
                                }`}>
                            <div className="flex items-center space-x-3">
                                {icon}
                                <span className="text-sm font-medium">{name}</span>
                            </div>
                                <ChevronRightIcon />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
