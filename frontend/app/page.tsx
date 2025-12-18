'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Dark mod sınıfını <html> etiketine ekleyip çıkaran mekanizma
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-500">
      
      {/* Üst Menü (Navbar) */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#334EAC]/30 bg-white dark:bg-[#1e293b] sticky top-0 z-50">
        
        {/* Logo ve Başlık */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#334EAC] text-white font-bold text-xs shadow-lg shadow-[#334EAC]/20">
            TK
          </div>
          <span className="text-xl font-bold tracking-tight">
            Tarih Deposu
          </span>
        </div>

        {/* Arama Çubuğu */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Tarihte ara..."
              className="w-full px-4 py-2 bg-gray-100 dark:bg-[#0f172a] border border-transparent rounded-lg focus:outline-none focus:border-[#334EAC] text-sm transition-all"
            />
          </div>
        </div>

        {/* Sağ Menü Linkleri ve Tema Butonu */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] transition-colors">Ana Sayfa</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] transition-colors">Hakkında</a>
          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] transition-colors">Depo</a>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-[#334EAC] text-black dark:text-white hover:rotate-12 transition-all shadow-md active:scale-90"
            aria-label="Tema Değiştir"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* Ana Karşılama Alanı (Hero Section) */}
      <main className="p-8 max-w-5xl mx-auto mt-12 pb-24">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] p-10 md:p-16 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl">
          
          {/* Estetik Arka Plan Parlamaları */}
          <div className="absolute -top-24 -right-24 h-80 w-80 bg-[#334EAC]/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-[#334EAC]/5 rounded-full blur-[60px]"></div>

          <div className="relative z-10">
            
            {/* Günün Tarihi Notu Etiketi (Hover efekti eklendi) */}
            <div className="flex items-center gap-3 mb-10">
              <span className="cursor-default px-4 py-1.5 rounded-full bg-[#334EAC]/10 text-[#334EAC] text-xs font-bold uppercase tracking-widest border border-[#334EAC]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-[#334EAC]/20">
                Günün Tarihi Notu
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[1.1]">
              Tarih Deposu&apos;na <br />
              <span className="text-[#334EAC]">Hoş Geldiniz</span>
            </h1>

            {/* Alıntı ve Arşivi Keşfet Alanı */}
            <div className="relative mt-16">
              <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-[#334EAC] rounded-full shadow-[0_0_15px_rgba(51,78,172,0.4)]"></div>
              <blockquote className="pl-8 py-2">
                <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 italic font-medium leading-relaxed">
                  &quot;Gelecek, tarihine sahip çıkanlarındır. Kendi geçmişini bilmeyen, başkasının yazdığı tarihin figüranı olur.&quot;
                </p>
                
                {/* Alt Kısım: İmza ve Sağdaki Buton */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-gray-300 dark:bg-zinc-700"></div>
                    <cite className="text-sm font-bold text-[#334EAC] not-italic tracking-widest uppercase">
                      Motive Edici Bir Başlangıç
                    </cite>
                  </div>

                  <button className="px-12 py-4 rounded-2xl bg-[#334EAC] text-white font-bold hover:bg-[#283d87] hover:-translate-y-1.5 transition-all shadow-xl shadow-[#334EAC]/30 active:scale-95">
                    Arşivi Keşfet
                  </button>
                </div>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Bilgi Kartları Alt Bölüm */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-[#1e293b]/50 border border-transparent dark:border-white/5 hover:border-[#334EAC]/40 transition-all group">
            <h3 className="text-[#334EAC] font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform">Kütüphane</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Binlerce yıllık belge ve dijital arşiv koleksiyonu.</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-[#1e293b]/50 border border-transparent dark:border-white/5 hover:border-[#334EAC]/40 transition-all group">
            <h3 className="text-[#334EAC] font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform">Zaman Çizelgesi</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">İnsanlık tarihindeki kırılma noktalarını kronolojik izleyin.</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-[#1e293b]/50 border border-transparent dark:border-white/5 hover:border-[#334EAC]/40 transition-all group">
            <h3 className="text-[#334EAC] font-bold text-lg mb-3 group-hover:translate-x-1 transition-transform">Araştırma</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Akademik makaleler, derinlemesine analizler ve yayınlar.</p>
          </div>
        </div>
      </main>
    </div>
  );
}