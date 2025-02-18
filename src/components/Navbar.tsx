"use client";
import Image from "next/image";
import logo from "../assets/kathy-logo.webp";
import { useState } from "react";
import { LayoutGrid, Menu, Search, ShoppingBag, User, X } from "lucide-react"; // Import icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    
    <header className="flex flex-col px-2 lg:px-20 bg-white drop-shadow-md h-[17dvh] lg:h-[10dvh]">
      {/* Logo */}
      <div className="flex justify-between items-center text-black">
        <div className="flex gap-8 items-center">
          <a href="https://kathysonline.in/">
            <Image
              width={52}
              height={52}
              alt="Logo"
              src={logo}
              className="cursor-pointer w-[8rem]"
            />
          </a>
          <div className="hidden lg:flex ">KATHYS CLOTHING STORE</div>
        </div>

        {/* Search Bar (Hidden on Small Screens) */}
        <div className="relative hidden lg:flex items-center justify-center gap-3 ">
          <Search className="absolute left-3 text-2xl text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pr-2 w-80 pl-10 rounded-xl bg-slate-100 focus:bg-slate-100 outline-none"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-6 items-center text-sm">
          <li className="flex items-center gap-2 p-2 hover:bg-slate-100 hover:rounded-[2rem] rounded-md transition-all cursor-pointer">
            <LayoutGrid />
            <p>Categories</p>
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-slate-100 hover:rounded-[2rem] rounded-md transition-all cursor-pointer">
            <ShoppingBag />
            <p>Cart</p>
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-slate-100 hover:rounded-[2rem] rounded-md transition-all cursor-pointer">
            <User />
            <p>Account</p>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div
          className="lg:hidden block cursor-pointer text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={`absolute top-[8rem] lg:top-20 lg:hidden left-0 w-full bg-white flex flex-col items-center text-lg transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 visible scale-x-100"
              : "opacity-0 invisible scale-x-0"
          }`}
        >
          <li className="w-full text-center p-4 hover:bg-slate-100 transition-all cursor-pointer">
            Categories
          </li>
          <li className="w-full text-center p-4 hover:bg-slate-100 transition-all cursor-pointer">
            Cart
          </li>
          <li className="w-full text-center p-4 hover:bg-slate-100 transition-all cursor-pointer">
            Account
          </li>
        </ul>
      </div>
      <div className="relative flex w-full lg:hidden items-center justify-center gap-3 px-4 py-2">
        <Search className="absolute left-6 text-2xl text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="py-2 w-full pr-2 w-80 pl-10 rounded-xl bg-slate-100 focus:bg-slate-100 outline-none"
        />
      </div>
    </header>
  );
};

export default Navbar;
