'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  date_year: number;
  slug: string;
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    title: "", slug: "", short_description: "", details: "",
    date_day: 1, date_month: 0, date_year: 2024,
    era: "Yakın Çağ", category: "Savaş", cover_image: ""
  });

  const fetchEvents = () => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Veri çekme hatası:", err));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) { 
      alert("Olay başarıyla eklendi!"); 
      fetchEvents();
      // Formu temizle
      setFormData({
        title: "", slug: "", short_description: "", details: "",
        date_day: 1, date_month: 0, date_year: 2024,
        era: "Yakın Çağ", category: "Savaş", cover_image: ""
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bu olayı silmek istediğine emin misin?")) {
      await fetch(`http://localhost:5000/api/events/${id}`, { method: 'DELETE' });
      fetchEvents();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] p-6 md:p-12 text-black dark:text-white font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ÜST BAŞLIK VE GERİ DÖNÜŞ */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-6">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            YAZAR <span className="text-[#334EAC]">PANELİ</span>
          </h1>
          <Link href="/" className="px-6 py-2 bg-gray-200 dark:bg-[#1e293b] rounded-full text-sm font-bold hover:bg-[#334EAC] hover:text-white transition-all">
            ← SİTEYE DÖN
          </Link>
        </div>

        {/* 1. YENİ OLAY EKLEME FORMU (ŞİMDİ DAHA GENİŞ) */}
        <section className="bg-white dark:bg-[#1e293b] p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5">
          <h2 className="text-2xl font-black mb-8 border-l-4 border-[#334EAC] pl-4 uppercase">Yeni Olay Kaydı</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1 opacity-60">Olay Başlığı</label>
                <input type="text" value={formData.title} placeholder="Örn: Fransız İhtilali" className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a] outline-none focus:ring-2 focus:ring-[#334EAC] transition-all" 
                  onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1 opacity-60">Slug (URL Yolu)</label>
                <input type="text" value={formData.slug} placeholder="örn: fransiz-ihtilali" className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a] outline-none focus:ring-2 focus:ring-[#334EAC] transition-all" 
                  onChange={e => setFormData({...formData, slug: e.target.value})} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1 opacity-60">Gün</label>
                <input type="number" value={formData.date_day} className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a]" onChange={e => setFormData({...formData, date_day: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1 opacity-60">Ay (0-11)</label>
                <input type="number" value={formData.date_month} className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a]" onChange={e => setFormData({...formData, date_month: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1 opacity-60">Yıl</label>
                <input type="number" value={formData.date_year} className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a]" onChange={e => setFormData({...formData, date_year: Number(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase ml-1 opacity-60">Dönem</label>
                <select className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a]" onChange={e => setFormData({...formData, era: e.target.value})}>
                  <option>İlk Çağ</option>
                  <option>Orta Çağ</option>
                  <option>Yeni Çağ</option>
                  <option selected>Yakın Çağ</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase ml-1 opacity-60">Kapak Görseli URL</label>
              <input type="text" value={formData.cover_image} placeholder="https://..." className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a]" onChange={e => setFormData({...formData, cover_image: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase ml-1 opacity-60">Kısa Özet</label>
              <textarea value={formData.short_description} placeholder="Ana sayfada görünecek kısa metin..." className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a] h-24" onChange={e => setFormData({...formData, short_description: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase ml-1 opacity-60">Detaylı İçerik (HTML)</label>
              <textarea value={formData.details} placeholder="Olayın tüm detayları..." className="w-full p-4 rounded-2xl border dark:border-white/10 dark:bg-[#0f172a] h-64 font-mono text-sm" onChange={e => setFormData({...formData, details: e.target.value})} />
            </div>

            <button type="submit" className="w-full py-5 bg-[#334EAC] text-white font-black rounded-2xl hover:bg-[#283d87] hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-[#334EAC]/20 uppercase tracking-widest">
              OLAYI ARŞİVE KAYDET VE YAYINLA
            </button>
          </form>
        </section>

        {/* 2. MEVCUT OLAYLAR LİSTESİ */}
        <section className="bg-white dark:bg-[#1e293b] p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-white/5">
          <h2 className="text-2xl font-black mb-8 border-l-4 border-red-500 pl-4 uppercase">Arşiv Yönetimi</h2>
          <div className="grid grid-cols-1 gap-4">
            {events.length > 0 ? events.map(ev => (
              <div key={ev.id} className="group flex items-center justify-between p-6 bg-gray-50 dark:bg-[#0f172a] rounded-3xl border border-transparent hover:border-[#334EAC]/30 transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-full bg-[#334EAC]/10 flex items-center justify-center font-black text-[#334EAC]">
                    {ev.date_year.toString().slice(-2)}
                  </div>
                  <div>
                    <h3 className="font-black text-lg group-hover:text-[#334EAC] transition-colors">{ev.title}</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{ev.slug}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(ev.id)} className="px-6 py-2 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-full text-xs font-black transition-all uppercase">
                  SİL
                </button>
              </div>
            )) : (
              <p className="text-center py-10 text-gray-400 italic font-bold">Arşivde henüz bir olay bulunmuyor.</p>
            )}
          </div>
        </section>

      </div>
      
      <footer className="mt-20 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.5em] pb-10">
        Tarih Deposu • Yönetim Arabirimi v2.0
      </footer>
    </div>
  );
}