'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Depo() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Takvim Durumları - Varsayılan olarak İstanbul'un Fethi (29 Mayıs 1453)
  const [currentDate, setCurrentDate] = useState(new Date(1453, 4, 29)); 
  const [selectedDay, setSelectedDay] = useState(29);

  useEffect(() => {
    const initPage = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
      setMounted(true);
    };
    window.requestAnimationFrame(initPage);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode, mounted]);

  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const daysShort = ["Pz", "Pt", "Sa", "Çar", "Per", "Cum", "Cmt"];

  // Örnek Olay Verileri - Sluglar Eklendi
  const allEvents = [
    { id: 1, day: 29, month: 4, year: 1453, slug: "istanbulun-fethi", title: "İstanbul'un Fethi", date: "29 Mayıs 1453", era: "Yeni Çağ", category: "Savaş", img: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=400" },
    { id: 2, day: 14, month: 6, year: 1789, slug: "fransiz-ihtilali", title: "Fransız İhtilali", date: "14 Temmuz 1789", era: "Yakın Çağ", category: "Devrim", img: "https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?q=80&w=400" },
    { id: 3, day: 20, month: 6, year: 1969, slug: "aya-ilk-adim", title: "Ay'a Ayak Basış", date: "20 Temmuz 1969", era: "Modern Tarih", category: "Bilim", img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=400" },
    { id: 4, day: 26, month: 7, year: 1071, slug: "malazgirt-savasi", title: "Malazgirt Zaferi", date: "26 Ağustos 1071", era: "Orta Çağ", category: "Savaş", img: "https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?q=80&w=400" },
  ];

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
    if (selectedDay > daysInNewMonth) {
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

  const filteredEvents = allEvents.filter(e => 
    e.day === selectedDay && 
    e.month === currentDate.getMonth() && 
    e.year === currentDate.getFullYear()
  );

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

      {/* Navbar */}
      <nav className="flex items-center justify-between px-16 py-4 border-b border-gray-200 dark:border-[#334EAC]/30 bg-white dark:bg-[#1e293b] sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#334EAC] text-white font-bold text-xs shadow-lg shadow-[#334EAC]/20 group-hover:rotate-12 transition-all font-bold">TK</div>
          <span className="text-xl font-bold tracking-tight group-hover:text-[#334EAC] transition-colors font-sans">Tarih Deposu</span>
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] font-bold">Ana Sayfa</Link>
          <Link href="/hakkinda" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] font-bold">Hakkında</Link>
          <Link href="/depo" className="text-[#334EAC] font-bold">Depo</Link>
          <button onClick={() => setDarkMode(!darkMode)} className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-[#334EAC] text-black dark:text-white transition-all shadow-md">{darkMode ? "☀️" : "🌙"}</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* SOL: TAKVİM */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="p-6 rounded-3xl bg-[#334EAC]/5 dark:bg-[#1e293b] border border-[#334EAC]/10 shadow-2xl">
              
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={() => handleMonthChange(-1)} 
                  className="p-2 hover:bg-[#334EAC]/20 rounded-xl transition-all font-black text-[#334EAC] text-lg select-none"
                >
                  {"<"}
                </button>
                
                <div className="text-center group">
                  <div className="text-[10px] font-black text-[#334EAC] uppercase tracking-[0.2em] mb-1">
                    {months[currentDate.getMonth()]}
                  </div>
                  <input 
                    type="number" 
                    value={currentDate.getFullYear()} 
                    onChange={changeYear}
                    className="bg-transparent text-center font-black text-2xl w-24 outline-none focus:text-[#334EAC] transition-all cursor-text"
                  />
                  <div className="h-0.5 w-8 group-hover:w-full bg-[#334EAC]/30 mx-auto transition-all duration-300"></div>
                </div>

                <button 
                  onClick={() => handleMonthChange(1)} 
                  className="p-2 hover:bg-[#334EAC]/20 rounded-xl transition-all font-black text-[#334EAC] text-lg select-none"
                >
                  {">"}
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {daysShort.map(d => <div key={d} className="text-[10px] font-black text-gray-400 uppercase mb-3">{d}</div>)}
                {calendarGrid.map((day, idx) => {
                  const isEventDay = day && allEvents.some(e => e.day === day && e.month === currentDate.getMonth() && e.year === currentDate.getFullYear());
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => day && setSelectedDay(day)}
                      className={`relative h-11 w-full rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center
                        ${!day ? 'invisible' : 'hover:bg-[#334EAC]/10 hover:text-[#334EAC]'}
                        ${day === selectedDay ? 'bg-[#334EAC] text-white shadow-lg shadow-[#334EAC]/30 scale-105 font-black' : 'text-gray-600 dark:text-gray-300'}
                      `}
                    >
                      <span>{day}</span>
                      {day && isEventDay && (
                        <span className={`absolute bottom-1.5 h-1 w-1 rounded-full ${day === selectedDay ? 'bg-white' : 'bg-[#334EAC]'}`}></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
                <div className="text-[10px] text-[#334EAC] font-black uppercase tracking-widest mb-1 italic">Zaman Dilimi</div>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-bold tracking-tight">
                  {eraText} dönemini inceliyorsun
                </span>
              </div>
            </div>
          </aside>

          {/* SAĞ: OLAY LİSTESİ */}
          <section className="flex-1 min-w-0">
             <div className="mb-12">
                <h1 className="text-5xl font-black tracking-tighter mb-4 italic uppercase">TARİH <span className="text-[#334EAC]">ARŞİVİ</span></h1>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-[#334EAC] rounded-full animate-pulse"></div>
                    <p className="text-gray-500 dark:text-gray-400 font-bold italic uppercase tracking-widest text-xs">
                        {selectedDay} {months[currentDate.getMonth()]} {eraText} Kayıtları
                    </p>
                </div>
             </div>

            <div className="space-y-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  // BURASI DEĞİŞTİ: Kartın tamamı artık Link ile sarmalandı
                  <Link href={`/olay/${event.slug}`} key={event.id} className="block">
                    <div className="group flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-white dark:bg-[#1e293b]/30 border border-gray-100 dark:border-white/5 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:border-[#334EAC]/30 hover:-translate-y-1">
                      <div className="relative h-40 w-full md:w-64 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                        <Image src={event.img} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <div className="flex items-center gap-3 mb-3 text-[10px] font-black uppercase text-[#334EAC] tracking-widest">
                          <span className="bg-[#334EAC]/10 px-3 py-1 rounded-full">{event.era}</span>
                          <span className="text-gray-400 italic font-bold">{event.category}</span>
                        </div>
                        <h3 className="text-2xl font-black mb-3 group-hover:text-[#334EAC] transition-colors leading-tight">{event.title}</h3>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-xs font-bold text-gray-400 italic font-medium">📅 {event.date}</span>
                            <span className="text-[10px] font-black text-[#334EAC] uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">İncele →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-20 text-center rounded-3xl border-2 border-dashed border-gray-100 dark:border-white/5 animate-in fade-in zoom-in duration-500">
                  <span className="text-4xl mb-4 block opacity-50">⌛</span>
                  <p className="text-gray-400 font-bold italic">Bu tarihte ({selectedDay} {months[currentDate.getMonth()]}) henüz bir olay kaydı bulunamadı.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}