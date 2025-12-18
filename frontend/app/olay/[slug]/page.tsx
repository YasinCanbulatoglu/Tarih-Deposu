'use client';

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";

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
  cover_image: string;
}

export default function OlayDetay({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15+ için params'ı 'use' ile açıyoruz
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [event, setEvent] = useState<HistoricalEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) {
      fetch(`http://localhost:5000/api/events/${slug}`)
        .then(res => {
          if (!res.ok) throw new Error("Hata");
          return res.json();
        })
        .then(data => {
          setEvent(data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black">YÜKLENİYOR...</div>;
  
  if (error || !event) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-black text-red-600 uppercase italic">Olay Bulunamadı!</h1>
      <p className="font-bold text-gray-500 underline"><Link href="/">Ana Sayfaya Dön</Link></p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-500 font-sans">
      <nav className="flex items-center justify-between px-10 py-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1e293b] sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-[#334EAC] text-white flex items-center justify-center rounded font-black text-xs">TK</div>
          <span className="text-xl font-bold tracking-tighter">Tarih Deposu</span>
        </Link>
        <Link href="/" className="text-sm font-black hover:text-[#334EAC] transition-colors uppercase italic">← GERİ DÖN</Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="relative h-[50vh] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <Image 
            src={event.cover_image || "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=1920"} 
            alt={event.title} fill className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-10 left-10">
            <span className="px-4 py-1 bg-[#334EAC] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">{event.era}</span>
            <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">{event.title}</h1>
            <p className="text-white font-bold opacity-80 uppercase tracking-widest mt-2">{event.date_day}.{event.date_month + 1}.{event.date_year}</p>
          </div>
        </div>

        <div className="prose prose-xl dark:prose-invert max-w-none">
            <p className="text-2xl font-black italic border-l-8 border-[#334EAC] pl-6 mb-10 text-gray-400">
                {event.short_description}
            </p>
            <div 
              className="text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: event.details }} 
            />
        </div>
      </main>
    </div>
  );
}