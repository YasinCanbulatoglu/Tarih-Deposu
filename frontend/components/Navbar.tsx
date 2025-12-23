'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ESLint hatası giderildi: requestAnimationFrame kullanıldı.
  useEffect(() => {
    requestAnimationFrame(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
      setMounted(true);
    });
  }, []);

  // Tema değişince <html> üzerinde dark class'ını güncelle
  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, mounted]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Hydration hatasını engellemek için ikon kontrolü
  const themeIcon = mounted ? (darkMode ? "☀️" : "🌙") : "🌙";

  return (
    <>
      {/* Üst Navbar */}
      <nav className="px-4 sm:px-6 lg:px-16 py-3 sm:py-4 border-b border-gray-200 dark:border-[#334EAC]/30 bg-white dark:bg-[#1e293b] sticky top-0 z-50">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          
          {/* Logo (Sola yaslı) */}
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform flex-shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#334EAC] text-white font-bold text-xs shadow-lg shadow-[#334EAC]/20 group-hover:rotate-12 transition-all">
              TK
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-[#334EAC] transition-colors dark:text-white">
              Tarih Deposu
            </span>
          </Link>

          {/* DESKTOP ARAMA (TAM ORTAYA ALINDI) */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="Tarihte ara..."
                className="w-full px-4 py-2 bg-gray-100 dark:bg-[#0f172a] border border-transparent rounded-lg focus:outline-none focus:border-[#334EAC] text-sm font-bold dark:text-white"
              />
            </div>
          </div>

          {/* DESKTOP LİNKLER (Sağa yaslı) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium flex-shrink-0">
            <Link href="/" className="text-[#334EAC] font-bold">
              Ana Sayfa
            </Link>
            <Link
              href="/hakkinda"
              className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] transition-colors font-bold"
            >
              Hakkında
            </Link>
            <Link
              href="/depo"
              className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] transition-colors font-bold"
            >
              Depo
            </Link>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-full bg-gray-100 dark:bg-[#334EAC] text-black dark:text-white transition-all shadow-md active:scale-90 hover:scale-110"
            >
              {themeIcon}
            </button>
          </div>

          {/* MOBILE: dark mode + hamburger (sadece < md) */}
          <div className="flex items-center gap-2 md:hidden ml-auto">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-full bg-gray-100 dark:bg-[#334EAC] text-black dark:text-white transition-all shadow-md active:scale-90 hover:scale-110"
              aria-label="Tema değiştir"
            >
              {themeIcon}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-gray-100 dark:bg-[#0f172a] border border-gray-200 dark:border-[#334EAC]/40 text-black dark:text-white transition-all active:scale-90"
              aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {isMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENÜ */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-[#334EAC]/30 bg-white dark:bg-[#1e293b] px-4 sm:px-6 lg:px-16 py-3 space-y-2">
          <Link
            href="/"
            onClick={closeMenu}
            className="block text-sm font-bold text-[#334EAC]"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/hakkinda"
            onClick={closeMenu}
            className="block text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-[#334EAC] transition-colors"
          >
            Hakkında
          </Link>
          <Link
            href="/depo"
            onClick={closeMenu}
            className="block text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-[#334EAC] transition-colors"
          >
            Depo
          </Link>
        </div>
      )}
    </>
  );
}