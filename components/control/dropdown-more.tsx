"use client"
import { ChevronDown, PlusCircle, SwitchCamera, Wallet2Icon } from "lucide-react";
import React, { useState } from "react";

export default function DropdownMore() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left w-20">
            {/* Trigger Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 px-4 py-2 rounded-full font-semibold"
            >
                <div className="font-semibold">More</div>
                <ChevronDown />
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <ul className="py-2">
                    <li className="flex items-center px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                        <PlusCircle className="mr-2 text-gray-500" />
                        <span>Deposit</span>
                    </li>
                    <li className="flex items-center px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                        <Wallet2Icon className="mr-2 text-gray-500" />
                        <span>Riwayat Deposit</span>
                    </li>
                    <li className="flex items-center px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                        <SwitchCamera className="mr-2 text-gray-500" />
                        <span>Ubah mata uang</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
