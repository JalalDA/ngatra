"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    item: {
        url: string;
        name: string;
    }
}

const NavItem = ({ item }: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const currentWeb = pathname.replace('/site/', '')
    return (
        <Link href={`${item.url}`} className={`hover:bg-gray-600 hover:text-white font-bold  rounded-lg p-2 cursor-pointer ${pathname === item.url && 'bg-gray-600 text-white'}`}>{item.name}</Link>
    )
}

export default NavItem