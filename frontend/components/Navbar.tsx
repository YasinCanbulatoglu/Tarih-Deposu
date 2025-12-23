'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Sayfa yüklendiğinde çalışır (Hydration ve Tema Kontrolü)
  useEffect(() => {
    // ESLint bu satırda "useEffect içinde state değiştirme" diye kızıyor.
    // Ancak Next.js'de window nesnesine erişmek için buna mecburuz.
    // Bu yüzden bir sonraki satırda bu kuralı sadece burası için devre dışı bırakıyoruz.
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Hydration hatasını önlemek için (Server ile Client uyumsuzluğunu engeller)
  if (!mounted) {
    return <div className="h-[73px] bg-white dark:bg-[#1e293b]" />;
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#334EAC]/30 bg-white dark:bg-[#1e293b] transition-colors duration-300">
        <div className="px-4 sm:px-6 lg:px-16 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 md:gap-4">
            
            {/* --- ORTAK ALAN: LOGO --- */}
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#334EAC] text-white font-bold text-xs shadow-lg shadow-[#334EAC]/20 group-hover:rotate-12 transition-all">
                TK
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-[#334EAC] transition-colors font-sans text-black dark:text-white">
                Tarih Deposu
              </span>
            </Link>

            {/* --- SADECE PC (MD ve Üstü) --- */}
            {/* Mobilde görünmez (hidden), PC'de görünür (md:flex) */}
            <div className="hidden md:flex items-center gap-4 flex-1 ml-6">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Tarihte ara..."
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#0f172a] border border-transparent rounded-lg focus:outline-none focus:border-[#334EAC] text-sm font-bold text-black dark:text-white placeholder-gray-500"
                />
              </div>

              <div className="flex items-center gap-6 text-sm font-medium ml-auto">
                <Link href="/" className="text-[#334EAC] font-bold">Ana Sayfa</Link>
                <Link href="/hakkinda" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] font-bold">Hakkında</Link>
                <Link href="/depo" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] font-bold">Depo</Link>
                <Link href="/admin" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] font-bold uppercase">Panel</Link>
                
                <button 
                  onClick={toggleDarkMode} 
                  className="p-2 rounded-full bg-gray-100 dark:bg-[#334EAC] text-black dark:text-white hover:scale-110 transition-transform"
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </div>
            </div>

            {/* --- SADECE MOBİL (MD Altı) --- */}
            {/* PC'de görünmez (md:hidden), Mobilde görünür (flex) */}
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full bg-gray-100 dark:bg-[#334EAC] text-black dark:text-white"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 rounded-full bg-gray-100 dark:bg-[#0f172a] border border-gray-200 dark:border-[#334EAC]/40 text-black dark:text-white"
              >
                {isMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- SADECE MOBİL MENÜ LİSTESİ --- */}
      {isMenuOpen && (
        <div className="md:hidden sticky top-[73px] z-40 w-full border-b border-gray-200 dark:border-[#334EAC]/30 bg-white dark:bg-[#1e293b] px-4 py-3 shadow-xl">
          <div className="flex flex-col space-y-2">
             <Link href="/" onClick={closeMenu} className="block py-2 text-sm font-bold text-[#334EAC] border-b border-gray-100 dark:border-white/5">Ana Sayfa</Link>
             <Link href="/hakkinda" onClick={closeMenu} className="block py-2 text-sm font-bold text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-white/5">Hakkında</Link>
             <Link href="/depo" onClick={closeMenu} className="block py-2 text-sm font-bold text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-white/5">Depo</Link>
             <Link href="/admin" onClick={closeMenu} className="block py-2 text-sm font-bold uppercase text-gray-700 dark:text-gray-200">Panel</Link>
          </div>
        </div>
      )}
    </>
  );
}