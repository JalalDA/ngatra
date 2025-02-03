"use client"
import { TLanguage, TSite } from "@/lib/schema";
import { BaggageClaim } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";


const Navbar = ({ data, language }
  :
  {
    data: TSite | undefined,
    language: TLanguage | undefined;
  }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${isScrolled ? "bg-white/10 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-x-2">
          {data?.image && (
            <img
              src={data?.image}
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            {data?.name}
          </div>
        </h1>



        {/* Sign In Button (Desktop) */}
        <Link href={"/auth"}>
          <button className="hidden md:block rounded-md border border-gray-500 px-4 py-2 text-gray-300 hover:bg-gray-700">
            Sign In
          </button>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-6 text-gray-300">
            <a href="#" className="hover:text-white">
              For performers
            </a>
            <a href="#" className="hover:text-white">
              Direct providers
            </a>
            <a href="#" className="hover:text-white">
              Pricing
            </a>
            <a href="#" className="hover:text-white">
              Blog
            </a>
            <button onClick={() => {
              window.open("https://app.ngatrapanel.my.id")
            }} className="rounded-md border border-gray-500 px-4 py-2 text-gray-300 hover:bg-gray-700">
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
