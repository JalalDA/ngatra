import { BaggageClaim, MenuIcon, PlusCircleIcon, Wallet2 } from "lucide-react";
import React from "react";
import DropdownWallet from "./DropdownWallet";
import Link from "next/link";
import { ListItem } from "@tremor/react";

export default function Header({name}:{name? : string}) {
  return (
    <header className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center gap-x-2 text-black">
         <BaggageClaim className="text-black h-8 w-8"/>
         <div className="text-md">{name || ""}</div>
        </div>

        <nav className="flex items-center space-x-4">
          <Link href={"/order"} className="flex items-center px-4 py-2 bg-gray-100 text-black font-semibold rounded-full hover:bg-gray-200">
            <PlusCircleIcon className="mr-2 text-black" />
            New Order
          </Link>
          <Link href={"/order/all"} className="text-black font-medium hover:text-gray-600">
            My orders
          </Link>
          <Link href={"/order/dripfeed"} className="text-black font-medium hover:text-gray-600">
            Drip feed
          </Link>
          <Link href={"/order/subscription"} className="text-black font-medium hover:text-gray-600">
            Subscriptions
          </Link>
          <Link href={"/order/multiple"} className="text-black font-medium hover:text-gray-600">
            Pesanan ganda
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownWallet/>
        <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <MenuIcon className="text-black" size={24} />
          <span className="ml-2 font-medium text-black">Menu</span>
        </button>
      </div>
    </header>
  );
}
