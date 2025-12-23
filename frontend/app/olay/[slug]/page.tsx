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
  const params = useParams(); // URL'den slug'ı alıyoruz
  const [event, setEvent] = useState<HistoricalEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Eğer slug yoksa işlem yapma
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f172a] text-[#334EAC]">
        <div className="text-xl font-bold animate-pulse">Yükleniyor...</div>
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

  // Resim kontrolü (Hata Çözümü Burada)
  const validImage = event.cover_image && event.cover_image.startsWith("http")
    ? event.cover_image
    : "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=1920";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white font-sans pb-20 transition-colors duration-500">
      
      {/* Navbar (Geri Dön Butonu) */}
      <nav className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#334EAC] transition-colors">
          <span>←</span> Ana Sayfaya Dön
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        
        {/* Başlık Bölümü */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-md bg-[#334EAC]/10 text-[#334EAC] text-xs font-black uppercase tracking-widest">
              {event.category || "Tarih"}
            </span>
            <span className="text-gray-400 text-sm font-bold">
              {event.date_day} {event.date_month} {event.date_year} ({event.era || "MS"})
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] text-gray-900 dark:text-white">
            {event.title}
          </h1>
        </div>

        {/* Görsel Alanı (Hatanın Çıktığı Yer - DÜZELTİLDİ) */}
        <div className="relative h-[40vh] sm:h-[60vh] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 shadow-2xl border border-gray-100 dark:border-white/10">
          <Image 
            src={validImage} 
            alt={event.title} 
            fill 
            className="object-cover"
            priority // Sayfa açılınca hemen yüklensin
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </div>

        {/* İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sol Kolon (Özet) */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 dark:bg-[#1e293b]/50 p-6 rounded-2xl border border-gray-100 dark:border-white/5 sticky top-10">
              <h3 className="text-sm font-black text-[#334EAC] uppercase tracking-widest mb-4">
                Kısa Özet
              </h3>
              <p className="text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                {event.short_description}
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                  <span>Okuma Süresi</span>
                  <span>5 Dakika</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon (Detaylar) */}
          <div className="lg:col-span-8">
            <article className="prose prose-lg dark:prose-invert prose-headings:font-black prose-p:font-medium prose-p:text-gray-600 dark:prose-p:text-gray-400 max-w-none">
              <p className="text-xl sm:text-2xl font-semibold leading-relaxed text-gray-900 dark:text-white mb-8">
                {event.details || event.short_description}
              </p>
              
              {/* Buraya daha sonra veritabanından gelen uzun HTML içerik eklenebilir */}
              <p>
                Bu olay tarihin akışını değiştiren önemli dönüm noktalarından biridir.
                Detaylı incelemeler ve tarihçilerin yorumları bu olayın etkilerinin günümüze kadar ulaştığını göstermektedir.
              </p>
            </article>
          </div>

        </div>
      </main>
    </div>
  );
}