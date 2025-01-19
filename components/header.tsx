import { getSession } from '@/lib/auth';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import SelectSite from './select/select-site';
import NavItem from './nav-item';
import { PanelLeftClose } from 'lucide-react';
import DropdownWallet from '@/app/app/(no-layout)/order/_components/DropdownWallet';

const Header = async ({ limit, id }: { limit?: number, id : string}) => {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }
    const sites = await db.query.sites.findMany({
        where: (sites, { eq }) => eq(sites.userId, session.user.id),
        orderBy: (sites, { asc }) => asc(sites.createdAt),
        ...(limit ? { limit } : {}),
    });
    
    const topNav = [
        {
            name: "Users",
            url: `/site/${id}/users`,
        },
        {
            name: "Orders",
            url: `/site/${id}/orders`,
        },
        {
            name: "Services",
            url: "/services",
        },
        {
            name: "Support",
            url: "/support",
        },
        {
            name: "Statistics",
            url: "/statistics",
        },
        {
            name: "Top Providers",
            url: "/top-providers",
        },
        {
            name: "More",
            url: "/more",
        },
    ]
    return (
        <div className="sticky top-0 flex dark:text-white text-gray-900 bg-white dark:bg-gray-900 z-50 items-center px-8 py-4 gap-x-8">
            <SelectSite sites={sites}/>
            {
                topNav.map((item, index) => (
                    <NavItem key={index} item={item} />
                ))
            }
            <DropdownWallet/>
            <button className="rounded-md border border-gray-300 p-2 flex items-center gap-x-2">
                <PanelLeftClose/>
                <span className='font-bold'>Control</span>
            </button>
        </div>
    )
}

export default Header