


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Veri Tipi Tanımlaması
interface HistoricalEvent {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  details: string;
  date_day: number;
  date_month: string;
  date_year: number;
  era: string;
  category: string;
  cover_image: string;
}

export default function OlayDetay() {
  const params = useParams();
  const [event, setEvent] = useState<HistoricalEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.slug) return;

    fetch(`http://localhost:5000/api/events/${params.slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Veri bulunamadı");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hata:", err);
        setLoading(false);
      });
  }, [params?.slug]);

  // --- İÇERİK İÇİNDE RESİM VE PARAGRAF RENDER FONKSİYONU ---
  const renderContent = (text: string) => {
    if (!text) return null;

    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      const isImageUrl = trimmedLine.match(/^https?:\/\/.*?\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i);

      if (isImageUrl) {
        return (
          <div key={index} className="my-10 group relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={trimmedLine} 
              alt={`${event?.title} detay görseli`} 
              className="w-full rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 object-cover max-h-[500px]"
            />
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              İçerik Görseli
            </div>
          </div>
        );
      }

      return trimmedLine ? (
        <p key={index} className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-lg">
          {trimmedLine}
        </p>
      ) : <br key={index} />;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f172a] text-[#334EAC]">
        <div className="text-xl font-bold animate-pulse tracking-tighter">Tarih Yükleniyor...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0f172a] text-black dark:text-white">
        <h1 className="text-3xl font-black mb-4">Olay Bulunamadı</h1>
        <Link href="/" className="px-6 py-3 bg-[#334EAC] text-white rounded-lg font-bold hover:bg-blue-700 transition">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const validImage = event.cover_image && event.cover_image.startsWith("http")
    ? event.cover_image
    : "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=1920";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white font-sans pb-20 transition-colors duration-500">
      
      {/* Navbar */}
      <nav className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#334EAC] transition-colors">
          <span>←</span> GERİ DÖN
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        
        {/* Üst Bilgi */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md bg-[#334EAC]/10 text-[#334EAC] text-xs font-black uppercase tracking-widest">
              {event.category || "Tarih"}
            </span>
            <span className="text-gray-400 text-sm font-bold">
              {event.date_day} {event.date_month} {event.date_year} ({event.era || "MS"})
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">
            {event.title}
          </h1>
        </div>

        {/* Ana Kapak Görseli */}
        <div className="relative h-[40vh] sm:h-[65vh] w-full rounded-3xl overflow-hidden mb-16 shadow-2xl border border-gray-100 dark:border-white/10">
          <Image 
            src={validImage} 
            alt={event.title} 
            fill 
            className="object-cover"
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sol Kolon (SABİTLENDİ - Sayfayla birlikte yukarı kayar) */}
          <div className="lg:col-span-4">
            <div className="space-y-6"> {/* sticky ve top-10 sınıfları kaldırıldı */}
               <div className="bg-gray-50 dark:bg-[#1e293b]/50 p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                <h3 className="text-[10px] font-black text-[#334EAC] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-3 h-[1.5px] bg-[#334EAC]"></span>
                  Özet
                </h3>
                <p className="text-sm font-bold leading-relaxed text-gray-600 dark:text-gray-300">
                  {event.short_description}
                </p>
              </div>
              <div className="px-6 py-4 bg-[#334EAC] rounded-2xl text-white shadow-lg shadow-blue-900/20">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">Tarihsel Dönem</p>
                <p className="text-lg font-black">{event.era} {event.date_year}</p>
              </div>
            </div>
          </div>

          {/* Sağ Kolon (Dinamik Detaylar) */}
          <div className="lg:col-span-8">
            <article className="max-w-none prose prose-lg dark:prose-invert">
              {renderContent(event.details || event.short_description)}
            </article>

            {/* Alt Bilgi */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/5">
              <p className="text-sm font-bold text-gray-400 italic">
                Bu içerik Tarih Deposu arşivinden derlenmiştir.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}