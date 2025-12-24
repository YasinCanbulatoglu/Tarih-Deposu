'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Backend'den gelen event tipi
interface HistoricalEvent {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  details: string;
  date_day: number;
  date_month: number;
  date_year: number;
  era: string;
  category: string;
  cover_image: string | null;
}

// UI'da kullandığımız kart tipi
interface StoryCard {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string | null;
}

export default function Home() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("En Yeni");
  const [recentStories, setRecentStories] = useState<StoryCard[]>([]);

  // Backend API'den veriyi çek
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data: HistoricalEvent[]) => {
        const formattedData: StoryCard[] = data.map((event) => {
          let cleanExcerpt = event.short_description || "";
          if (cleanExcerpt.length > 50) {
            cleanExcerpt = cleanExcerpt.substring(0, 50) + "...";
          }

          return {
            title: event.title,
            slug: event.slug,
            category: event.category || "Tarih",
            excerpt: cleanExcerpt, 
            date: `${event.date_day}.${event.date_month}.${event.date_year}`,
            readTime: "5 dk",
            imageUrl: event.cover_image,
          };
        });
        setRecentStories(formattedData);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  // --- İSTEK 2: SIRALAMA MENÜSÜNÜ ÇALIŞTIR ---
  const getSortedStories = () => {
    const sorted = [...recentStories]; 
    
    return sorted.sort((a, b) => {
      const dateA = a.date.split('.').reverse().join('-');
      const dateB = b.date.split('.').reverse().join('-');

      if (sortBy === 'A-Z') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'En Eski') {
        return dateA.localeCompare(dateB);
      } else if (sortBy === 'En Yeni') {
        // Varsayılan: En yeni tarih en üstte
        return dateB.localeCompare(dateA);
      }
      return 0;
    });
  };

  const sortedStoriesList = getSortedStories();
  // ---------------------------------------------

  const historicalEras = [
    {
      title: "İlk Çağ",
      description: "Yazının icadından Roma'nın çöküşüne; antik siteler ve ilk kanunlar.",
      tag: "M.Ö. 3200 - M.S. 476",
    },
    {
      title: "Orta Çağ",
      description: "Feodalizm, şövalyeler ve büyük imparatorlukların yükseliş dönemi.",
      tag: "476 - 1453",
    },
    {
      title: "Yeni Çağ",
      description: "Coğrafi keşifler, Rönesans ve matbaanın dünyayı değiştiren etkisi.",
      tag: "1453 - 1789",
    },
    {
      title: "Yakın Çağ",
      description: "Fransız İhtilali'nden günümüze; endüstri, teknolojic ve uzay yarışı.",
      tag: "1789 - Günümüz",
    },
  ];

  const fallbackImage = "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=800";

  const getSafeImageSrc = (url: string | null): string => {
    if (!url) return fallbackImage;
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/")
    ) {
      return url;
    }
    return fallbackImage;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-500 font-sans scroll-smooth">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 font-sans">
        {/* 1. Hero Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] p-6 sm:p-8 md:p-10 lg:p-14 rounded-xl border border-gray-100 dark:border-white/5 shadow-xl">
          <div className="absolute -top-24 -right-24 h-64 sm:h-80 w-64 sm:w-80 bg-[#334EAC]/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 text-[#334EAC]">
              <span className="cursor-default px-3 sm:px-4 py-1.5 rounded-full bg-[#334EAC]/10 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-[#334EAC]/20 transition-all duration-300 hover:-translate-y-1">
                Günün Tarihi Notu
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 sm:mb-8 leading-[1.1]">
              Tarih Deposu&apos;na <br />
              <span className="text-[#334EAC]">Hoş Geldiniz</span>
            </h1>
            <div className="relative mt-6 sm:mt-8">
              <div className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-1 bg-[#334EAC] rounded-full opacity-50" />
              <blockquote className="pl-6 sm:pl-8 py-1">
                <p className="text-base sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 italic font-medium leading-relaxed">
                  &quot;Gelecek, tarihine sahip çıkanlarındır. Kendi geçmişini
                  bilmeyen, başkasının yazdığı tarihin figüranı olur.&quot;
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-[1px] w-8 sm:w-10 bg-gray-300 dark:bg-zinc-700" />
                    <cite className="text-[10px] sm:text-xs font-bold text-[#334EAC] not-italic tracking-widest uppercase">
                      Motive Edici Bir Başlangıç
                    </cite>
                  </div>
                  <Link
                    href="/depo"
                    className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#334EAC] text-white text-xs sm:text-sm font-bold hover:bg-[#283d87] transition-all shadow-lg shadow-[#334EAC]/20 active:scale-95 text-nowrap hover:-translate-y-1"
                  >
                    Arşivi Keşfet
                  </Link>
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* 2. Popüler Olaylar Bandı - MARQUEE */}
        <div
          id="populer-olaylar"
          className="mt-10 px-4 sm:px-6 py-6 sm:py-8 bg-[#334EAC]/5 dark:bg-[#334EAC]/10 border border-[#334EAC]/10 rounded-xl relative shadow-sm text-black dark:text-white"
        >
          <div className="mb-4 px-1 sm:px-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight font-sans">
              Popüler Olaylar
            </h2>
            <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-[#334EAC] to-transparent rounded-full mt-2" />
          </div>

          {/* Marquee container */}
          <div className="relative overflow-hidden py-6 sm:py-10">
            {/* Hareket eden satır */}
            <div className="animate-marquee flex flex-row gap-4 md:gap-6">
              {}
              {[...recentStories, ...recentStories].map((story, index) => (
                <Link key={index} href={`/olay/${story.slug}`}>
                  <div className="mx-2 min-w-[280px] sm:min-w-[320px] p-5 sm:p-6 rounded-xl bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-white/5 shadow-md hover:shadow-2xl hover:-translate-y-4 hover:border-[#334EAC]/40 transition-all duration-500 cursor-pointer group flex flex-col justify-between h-48 sm:h-52">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-md bg-[#334EAC]/10 text-[10px] sm:text-[11px] font-black text-[#334EAC] uppercase tracking-[0.1em] mb-2 sm:mb-3 group-hover:bg-[#334EAC] group-hover:text-white transition-all">
                        {story.date}
                      </span>
                      <h3 className="text-base sm:text-lg font-black group-hover:text-[#334EAC] transition-colors leading-tight mb-2">
                        {story.title}
                      </h3>
                      <p className="text-[11px] sm:text-[12px] text-gray-500 dark:text-gray-400 leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {story.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[#334EAC] mt-3">
                      <span className="text-[9px] sm:text-[10px] font-black tracking-wider italic">
                        GÖRÜNTÜLE
                      </span>
                      <span className="text-lg font-bold transition-transform group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Tarihsel Dönemler */}
        <div className="mt-12 mb-6 px-1 sm:px-4">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight font-sans">
            Tarihsel Dönemler
          </h2>
          <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-[#334EAC] to-transparent rounded-full mt-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {historicalEras.map((era, index) => (
            <Link 
              key={index}
              href={`/depo?era=${era.title}`}
              className="p-5 sm:p-6 rounded-xl bg-gray-50 dark:bg-[#1e293b]/50 border border-transparent dark:border-white/5 shadow-sm flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-[#334EAC]/40 group active:scale-95"
            >
              <div>
                <span className="text-[9px] font-bold text-[#334EAC] opacity-80 uppercase tracking-widest bg-[#334EAC]/5 px-2 py-1 rounded-md transition-colors group-hover:bg-[#334EAC] group-hover:text-white">
                  {era.tag}
                </span>
                <h3 className="text-lg font-black mt-4 mb-2 tracking-tight group-hover:text-[#334EAC] transition-colors font-sans">
                  {era.title}
                </h3>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 font-medium">
                  {era.description}
                </p>
              </div>
              <button className="mt-6 text-[12px] font-bold text-[#334EAC] flex items-center gap-2 transition-all group-hover:gap-4">
                Keşfet <span>→</span>
              </button>
            </Link>
          ))}
        </div>

        {/* 4. Son Eklenen Olaylar */}
        <div className="mt-16 mb-8 px-1 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 relative">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight font-sans">
              Son Eklenen Olaylar
            </h2>
            <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-[#334EAC] to-transparent rounded-full mt-2" />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-white/5 rounded-lg text-xs sm:text-sm font-bold hover:border-[#334EAC] transition-all"
            >
              <span>Sırala: {sortBy}</span>
              <span
                className={`transition-transform duration-300 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-white/5 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
                {["En Yeni", "En Eski", "Popüler", "A-Z"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-[#334EAC]/10 hover:text-[#334EAC] transition-colors font-bold"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Son Eklenen Olaylar grid'i */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-1 sm:px-2 text-black dark:text-white">
          {/* Burada sortedStoriesList kullanıyoruz ki sıralama çalışsın */}
          {sortedStoriesList.length > 0 ? (
            sortedStoriesList.map((story, index) => {
              const imageSrc = getSafeImageSrc(story.imageUrl ?? null);
              return (
                <Link key={index} href={`/olay/${story.slug}`}>
                  <div className="group cursor-pointer bg-white dark:bg-[#1e293b]/30 rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-2 h-full">
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <span className="px-4 sm:px-5 py-2 bg-white text-black text-[11px] sm:text-xs font-black rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          Devamını Oku
                        </span>
                      </div>
                      <span className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 py-1 rounded-lg bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md text-[#334EAC] text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {story.category}
                      </span>
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="text-[10px] sm:text-[11px] text-gray-400 font-bold mb-2 uppercase tracking-tight">
                        {story.date}
                      </div>
                      <h3 className="text-base sm:text-lg font-black mb-3 group-hover:text-[#334EAC] transition-colors leading-tight font-sans">
                        {story.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4 sm:mb-6 font-medium">
                        {story.excerpt}
                      </p>
                      <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[10px] sm:text-[11px]">
                        <span className="text-gray-400 font-bold italic">
                          {story.readTime} okuma
                        </span>
                        <span className="text-[#334EAC] font-bold group-hover:underline">
                          İncele →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-400 italic font-bold py-10">
              Arşivden veriler getiriliyor...
            </p>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-gray-200 dark:border-[#334EAC]/20 bg-gray-50 dark:bg-[#1e293b] pt-10 sm:pt-16 pb-8 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 text-black dark:text-white">
          <div className="col-span-1 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 sm:mb-6 cursor-pointer group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#334EAC] text-white font-bold text-xs shadow-lg shadow-[#334EAC]/20 group-hover:rotate-12 transition-all">
                TK
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight font-sans">
                Tarih Deposu
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Geçmişin tozlu sayfalarını dijital dünyaya taşıyoruz. Tarihin her
              anını keşfetmek için buradayız.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 sm:mb-6 uppercase tracking-widest text-[#334EAC]">
              Hızlı Erişim
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#334EAC] transition-colors font-sans"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkinda"
                  className="hover:text-[#334EAC] transition-colors font-sans"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/depo"
                  className="hover:text-[#334EAC] transition-colors font-sans"
                >
                  Depo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 sm:mb-6 uppercase tracking-widest text-[#334EAC]">
              Topluluk
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-[#334EAC] transition-colors"
                >
                  Yazar Ol
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#334EAC] transition-colors"
                >
                  İletişim
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 sm:mb-6 uppercase tracking-widest text-[#334EAC]">
              Bültene Katıl
            </h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="E-posta"
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-[#334EAC] font-bold"
              />
              <button className="bg-[#334EAC] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#283d87] transition-all shadow-md">
                Kaydol
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          <p>© 2024 Tarih Deposu. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}