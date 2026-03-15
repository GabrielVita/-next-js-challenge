"use client"; // Precisa ser client-side para o menu mobile e troca de idioma

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Calendar, Rss, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ dict, lang }: { dict: any; lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: dict.nav.events, href: `/${lang}/events`, icon: Calendar },
    { name: dict.nav.feed, href: `/${lang}/activity`, icon: Rss },
    { name: dict.nav.gifts, href: `/${lang}/gifts`, icon: Gift },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-indigo-400 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Gift<span className="text-indigo-600">Wise</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  pathname.includes(item.href) ? "text-indigo-600" : "text-slate-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={`/${lang}/login`}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-all"
            >
              {dict.nav.login}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 animate-in slide-in-from-top duration-300">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-base font-medium text-slate-600 p-2"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}