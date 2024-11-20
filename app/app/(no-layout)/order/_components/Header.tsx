import { MenuIcon, PlusCircleIcon, Wallet2 } from "lucide-react";
import React from "react";
import DropdownWallet from "./DropdownWallet";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="w-8 h-8">
          <img
            src="/cat-logo.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Buttons */}
        <nav className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-black font-semibold rounded-full hover:bg-gray-200">
            <PlusCircleIcon className="mr-2 text-black" />
            New Order
          </button>
          <button className="text-black font-medium hover:text-gray-600">
            My orders
          </button>
          <button className="text-black font-medium hover:text-gray-600">
            Drip feed
          </button>
          <button className="text-black font-medium hover:text-gray-600">
            Subscriptions
          </button>
          <button className="text-black font-medium hover:text-gray-600">
            Pesanan ganda
          </button>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Balance Info */}
        {/* <div className="flex items-center bg-green-100 px-4 py-2 rounded-full gap-x-2">
            <Wallet2 className="text-green-700"/>
          <span className="font-semibold text-green-600">Rp 42 000</span>
        </div> */}
        <DropdownWallet/>

        {/* Menu Button */}
        <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <MenuIcon className="text-black" size={24} />
          <span className="ml-2 font-medium text-black">Menu</span>
        </button>
      </div>
    </header>
  );
}
