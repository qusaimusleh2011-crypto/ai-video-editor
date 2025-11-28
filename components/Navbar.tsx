"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
              ⚡
            </div>
            <span className="text-2xl font-bold text-white">ClipSpark</span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
            <Link href="/docs" className="hover:text-blue-400 transition">Docs</Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
              ☰
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link href="/" className="block py-2 hover:text-blue-400">Home</Link>
            <Link href="/pricing" className="block py-2 hover:text-blue-400">Pricing</Link>
            <Link href="/docs" className="block py-2 hover:text-blue-400">Docs</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
