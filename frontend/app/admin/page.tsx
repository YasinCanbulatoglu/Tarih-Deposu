'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Event {
  id: number;
  title: string;
  date_year: number;
  category: string;
  created_by: string;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/events');
      const data = await res.json();
      setEvents(data);
    } catch {
      console.error('Veri çekme hatası');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  // SİLME İŞLEMİ BURADA
  const handleDelete = async (id: number) => {
    if (!confirm('Bu olayı silmek istediğine emin misin?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Silinen olayı listeden anında çıkart
        setEvents(events.filter((event) => event.id !== id));
      } else {
        alert('Silme işlemi başarısız oldu.');
      }
    } catch {
      alert('Backend bağlantı hatası.');
    }
  };

  // Performans Takibi: Hangi editör kaç içerik girdi?
  const stats = events.reduce((acc: { [key: string]: number }, event) => {
    const name = event.created_by || 'Anonim';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-black dark:text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#334EAC]">Yönetim Paneli</h1>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Editör Performans Sistemi</p>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="px-4 py-2 font-bold text-gray-500 hover:text-black transition-colors">Siteye Dön</Link>
            <Link href="/admin/ekle" className="px-6 py-3 bg-[#334EAC] text-white rounded-xl font-bold hover:bg-[#283d87] shadow-lg transition-all active:scale-95">
              + Yeni Olay Ekle
            </Link>
          </div>
        </div>

        {/* PERFORMANS KARTLARI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {Object.entries(stats).map(([name, count]) => (
            <div key={name} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-[#334EAC]/10 shadow-sm transition-transform hover:-translate-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase">EDİTÖR</p>
              <h3 className="text-lg font-bold mb-2">{name}</h3>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-black text-[#334EAC]">{count}</span>
                <span className="text-xs font-bold text-gray-400 mb-1">Toplam İçerik</span>
              </div>
            </div>
          ))}
        </div>

        {/* OLAY TABLOSU */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-white/5">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-[#0f172a] border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="p-5 font-black text-xs text-gray-400 uppercase tracking-wider">Olay / Yıl</th>
                <th className="p-5 font-black text-xs text-gray-400 uppercase tracking-wider">Kategori</th>
                <th className="p-5 font-black text-xs text-gray-400 uppercase tracking-wider">Ekleyen</th>
                <th className="p-5 text-right font-black text-xs text-gray-400 uppercase tracking-wider">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  <td className="p-5">
                    <div className="font-bold text-base">{event.title}</div>
                    <div className="text-xs text-gray-400 font-medium">{event.date_year}</div>
                  </td>
                  <td className="p-5">
                    <span className="px-2 py-1 text-[10px] font-black bg-[#334EAC]/10 text-[#334EAC] rounded uppercase">{event.category}</span>
                  </td>
                  <td className="p-5 font-bold text-sm text-[#334EAC]">{event.created_by}</td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="text-red-500 font-bold text-xs hover:bg-red-50 p-2 rounded transition-colors"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length === 0 && !loading && (
            <div className="p-10 text-center text-gray-400 font-bold italic">Henüz içerik eklenmemiş.</div>
          )}
        </div>
      </div>
    </div>
  );
}