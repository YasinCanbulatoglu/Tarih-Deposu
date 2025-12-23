'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Veritabanı veri tipi
interface HistoricalEvent {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  date_day: number;
  date_month: number;
  date_year: number;
  era: string;
  category: string;
  cover_image: string;
}

export default function Depo() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // VERİTABANI DURUMU
  const [allEvents, setAllEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ARAMA ÖZELLİĞİ

  // Takvim Durumları - Başlangıçta selectedDay null olursa "Hepsini Göster" demek olur
  const [currentDate, setCurrentDate] = useState(new Date(1453, 4, 29)); 
  const [selectedDay, setSelectedDay] = useState<number | null>(null); // NULL = Filtre Yok

  // 1. Sayfa Yüklendiğinde
  useEffect(() => {
    const initPage = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
      setMounted(true);
    };
    window.requestAnimationFrame(initPage);
    
    // VERİTABANINDAN VERİ ÇEK
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => {
        setAllEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Veri çekme hatası:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode, mounted]);

  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const daysShort = ["Pz", "Pt", "Sa", "Çar", "Per", "Cum", "Cmt"];

  if (!mounted) return null;

  // Takvim Hesaplamaları
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      const newDate = new Date(currentDate);
      newDate.setFullYear(val);
      setCurrentDate(newDate);
    }
  };

  const handleMonthChange = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
    const daysInNewMonth = getDaysInMonth(newDate.getFullYear(), newDate.getMonth());
    if (selectedDay && selectedDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    }
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const calendarGrid = [];
  for (let i = 0; i < firstDay; i++) calendarGrid.push(null); 
  for (let i = 1; i <= daysInMonth; i++) calendarGrid.push(i);

  const displayYear = currentDate.getFullYear();
  const eraText = displayYear < 0 ? `M.Ö. ${Math.abs(displayYear)}` : `M.S. ${displayYear}`;

  // *** GELİŞMİŞ FİLTRELEME MANTIĞI ***
  const filteredEvents = allEvents.filter(e => {
    // 1. Arama Çubuğu Filtresi
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Takvim Filtresi (Eğer gün seçiliyse o güne bak, değilse hepsini geçebilirsin)
    const matchesCalendar = selectedDay 
      ? (Number(e.date_day) === selectedDay &&
         Number(e.date_month) === currentDate.getMonth() &&
         Number(e.date_year) === currentDate.getFullYear())
      : true;

    return matchesSearch && matchesCalendar;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-500 font-sans scroll-smooth">
      
      <style jsx global>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>



      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Mobile-first: sidebar on top, content below; desktop: side-by-side */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* SOL: TAKVİM (Sidebar) */}
          <aside className="w-full lg:w-[320px] shrink-0 order-1">
            <div className="p-4 sm:p-6 rounded-3xl bg-[#334EAC]/5 dark:bg-[#1e293b] border border-[#334EAC]/10 shadow-2xl">
              
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <button
                  onClick={() => handleMonthChange(-1)}
                  className="p-2 hover:bg-[#334EAC]/20 rounded-xl transition-all font-black text-[#334EAC] text-base sm:text-lg select-none"
                >
                  {"<"}
                </button>
                <div className="text-center group">
                  <div className="text-[9px] sm:text-[10px] font-black text-[#334EAC] uppercase tracking-[0.2em] mb-1">
                    {months[currentDate.getMonth()]}
                  </div>
                  <input
                    type="number"
                    value={currentDate.getFullYear()}
                    onChange={changeYear}
                    className="bg-transparent text-center font-black text-xl sm:text-2xl w-20 sm:w-24 outline-none focus:text-[#334EAC] transition-all cursor-text"
                  />
                  <div className="h-0.5 w-8 group-hover:w-full bg-[#334EAC]/30 mx-auto transition-all duration-300"></div>
                </div>
                <button
                  onClick={() => handleMonthChange(1)}
                  className="p-2 hover:bg-[#334EAC]/20 rounded-xl transition-all font-black text-[#334EAC] text-base sm:text-lg select-none"
                >
                  {">"}
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {daysShort.map(d => (
                  <div
                    key={d}
                    className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase mb-2 sm:mb-3"
                  >
                    {d}
                  </div>
                ))}
                {calendarGrid.map((day, idx) => {
                  const isEventDay = day && allEvents.some(e => 
                    Number(e.date_day) === day &&
                    Number(e.date_month) === currentDate.getMonth() &&
                    Number(e.date_year) === currentDate.getFullYear()
                  );
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => day && setSelectedDay(selectedDay === day ? null : day)}
                      className={`
                        relative w-full h-9 sm:h-10 md:h-11 rounded-xl text-[10px] sm:text-xs font-bold
                        transition-all flex flex-col items-center justify-center
                        ${!day ? 'invisible' : 'hover:bg-[#334EAC]/10 hover:text-[#334EAC]'}
                        ${day === selectedDay
                          ? 'bg-[#334EAC] text-white shadow-lg shadow-[#334EAC]/30 scale-105 font-black'
                          : 'text-gray-600 dark:text-gray-300'}
                      `}
                    >
                      <span>{day}</span>
                      {day && isEventDay && (
                        <span
                          className={`
                            absolute bottom-1.5 h-1 w-1 rounded-full
                            ${day === selectedDay ? 'bg-white' : 'bg-[#334EAC]'}
                          `}
                        ></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* FİLTRE TEMİZLEME BUTONU */}
              {selectedDay && (
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="w-full mt-4 sm:mt-6 py-2 bg-red-500/10 text-red-500 text-[10px] font-black rounded-lg hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest"
                >
                  Tarih Filtresini Kaldır
                </button>
              )}
            </div>
          </aside>

          {/* SAĞ: OLAY LİSTESİ */}
          <section className="flex-1 min-w-0 order-2">
            {/* Mobile search bar */}
            <div className="md:hidden mb-6">
              <input
                type="text"
                placeholder="Arşivde ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-[#0f172a] border border-transparent focus:border-[#334EAC] outline-none text-sm transition-all"
              />
            </div>

            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-3 sm:mb-4 italic uppercase text-black dark:text-white">
                TARİH <span className="text-[#334EAC]">ARŞİVİ</span>
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold italic uppercase tracking-widest">
                {selectedDay
                  ? `${selectedDay} ${months[currentDate.getMonth()]} ${eraText} Kayıtları`
                  : "Tüm Arşiv Kayıtları"}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {loading ? (
                <div className="p-8 sm:p-10 text-center font-black animate-pulse uppercase text-xs sm:text-sm">
                  ARŞİV ODASI TARANIYOR...
                </div>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Link href={`/olay/${event.slug}`} key={event.id} className="block">
                    <div className="group flex flex-col md:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#1e293b]/30 border border-gray-100 dark:border-white/5 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:border-[#334EAC]/30 hover:-translate-y-1">
                      <div className="relative h-40 w-full md:w-64 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                        <Image 
                          src={event.cover_image || "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=400"} 
                          alt={event.title} fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-[9px] sm:text-[10px] font-black uppercase text-[#334EAC] tracking-widest">
                          <span className="bg-[#334EAC]/10 px-3 py-1 rounded-full">{event.era}</span>
                          <span className="text-gray-400 italic font-bold">{event.category}</span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3 group-hover:text-[#334EAC] transition-colors leading-tight text-black dark:text-white">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 sm:mb-4 font-medium">
                          {event.short_description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mt-auto">
                          <span className="text-xs font-bold text-gray-400 italic font-medium">
                            📅 {event.date_day} {months[event.date_month]} {event.date_year}
                          </span>
                          <span className="text-[10px] font-black text-[#334EAC] uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform text-right">
                            İncele →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-16 sm:p-20 text-center rounded-3xl border-2 border-dashed border-gray-100 dark:border-white/5">
                  <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block opacity-50">⌛</span>
                  <p className="text-gray-400 font-bold italic text-sm sm:text-base">
                    Aranılan kriterlerde bir olay kaydı bulunamadı.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}