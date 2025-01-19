"use client"
import { TSite } from '@/lib/schema'
import { ChevronDown, PlusCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
    sites: TSite[],
}

const SelectSite = ({ sites }: Props) => {
    const pathname = usePathname()
    console.log({pathname});
    const siteOptions = sites.map((item, index) => ({
        label: item.name,
        value: item
    }))

    const [isOpen, setIsOpen] = useState(false);
    const [selectedSite, setSelectedSite] = useState(siteOptions[0].label)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const router = useRouter()
    
    return (
        <div className="w-1/5 text-gray-900 dark:text-white">
            <div className="relative inline-block text-left">
                {/* Trigger Button */}
                <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 border border-gray-300 shadow-md px-2 py-2 rounded-lg font-semibold md:w-72"
                >
                    <Image src={"/logo.png"} alt='logo' width={40} height={40} />
                    <div className='overflow-hidden'>
                        {`${selectedSite}.ngatrapanel.my.id`}
                    </div>
                    <span className={`text-sm transform transition-all ease-in-out duration-500 ${isOpen && 'rotate-180'}`}><ChevronDown /></span>
                </button>

                {/* Dropdown Menu */}
                <div
                    className={`absolute right-0 mt-2 bg-white w-72 border border-gray-200 rounded-md shadow-lg transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                        }`}
                >
                    <ul className="py-2">
                        {
                            siteOptions.map((item, index) => (
                                <li onClick={() => {
                                    setSelectedSite(item.label || "")
                                    setIsOpen(false)
                                    router.push(`/site/${item.value.id}`)
                                }} key={index} className="flex items-center gap-x-2 px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                                    <Image src={"/logo.png"} alt='logo' width={40} height={40} />
                                    <span className='font-semibold'>{`${item.label}.ngatrapanel.my.id`}</span>
                                </li>
                            ))
                        }
                        <li className="flex items-center px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                            <PlusCircleIcon className="mr-2 text-gray-900 h-10 w-10" />
                            <span className='font-semibold'>Buat Panel</span>
                        </li>
                        {/*
                        <li className="flex items-center px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                            <SwitchCamera className="mr-2 text-gray-500" />
                            <span>Ubah mata uang</span>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SelectSite