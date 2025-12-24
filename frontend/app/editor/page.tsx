'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  title: string;
  date_year: number;
  category: string;
  created_by: string;
}

export default function EditorDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // --- GÜVENLİK VE YÖNLENDİRME ---
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    const role = localStorage.getItem('admin_role');

    if (!token) {
      router.push('/login');
    } else if (role === 'Yönetici') {
      router.push('/admin'); 
    } else {
      setCurrentUser(user || '');
    }
  }, [router]);

  // --- VERİ ÇEKME VE FİLTRELEME ---
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/events');
      const data = await res.json();
      
      // SADECE GİRİŞ YAPAN KULLANICININ YAZILARINI FİLTRELE
      const myUser = localStorage.getItem('admin_user');
      const myEvents = data.filter((e: Event) => e.created_by === myUser);
      
      setEvents(myEvents);
    } catch (err) {
      console.error('Hata:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- SİLME İŞLEMİ ---
  const handleDelete = async (id: number) => {
    if (!confirm('Bu içeriği silmek istediğine emin misin?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData(); // Listeyi yenile
      } else {
        alert("Silinemedi.");
      }
    } catch {
      alert("Hata oluştu.");
    }
  };

  // --- ÇIKIŞ YAPMA ---
  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0f172a]">
        <div className="font-bold text-[#334EAC] animate-pulse">PANEL YÜKLENİYOR...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0f172a] text-black dark:text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#334EAC] tracking-tight">Editör Paneli</h1>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Hoş geldin, {currentUser}
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Link 
               href="/admin/ekle" 
               className="px-6 py-3 bg-[#334EAC] text-white rounded-xl font-bold hover:bg-[#283d87] shadow-lg shadow-[#334EAC]/20 transition-all active:scale-95 flex items-center gap-2"
             >
               <span>+</span> Yeni İçerik Ekle
             </Link>
             <button 
               onClick={handleLogout} 
               className="px-5 py-3 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-all border border-red-100"
             >
               Çıkış
             </button>
          </div>
        </div>

        {/* LİSTE */}
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
             <h3 className="font-black text-lg text-gray-800 dark:text-gray-100">Senin Yazıların</h3>
             <span className="text-xs font-bold bg-blue-50 text-[#334EAC] px-3 py-1 rounded-full">{events.length} Adet</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 dark:bg-black/10">
                <tr className="text-gray-400 text-[10px] uppercase font-black tracking-wider border-b border-gray-100 dark:border-white/5">
                  <th className="p-5">Başlık</th>
                  <th className="p-5">Kategori</th>
                  <th className="p-5">Yıl</th>
                  <th className="p-5 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors">
                    <td className="p-5 font-bold text-sm text-gray-800 dark:text-gray-200">
                      {event.title}
                    </td>
                    <td className="p-5">
                      <span className="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-[10px] font-bold uppercase text-gray-500 tracking-wide">
                        {event.category}
                      </span>
                    </td>
                    <td className="p-5 text-sm font-bold text-gray-500">
                      {event.date_year}
                    </td>
                    <td className="p-5 text-right flex justify-end gap-2">
                      <Link 
                        href={`/admin/duzenle/${event.id}`} 
                        className="px-3 py-2 text-[#334EAC] font-bold text-xs bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-[#334EAC] hover:text-white transition-all"
                      >
                        Düzenle
                      </Link>
                      <button 
                        onClick={() => handleDelete(event.id)} 
                        className="px-3 py-2 text-red-500 font-bold text-xs bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {events.length === 0 && (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-full mb-3">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <p className="text-gray-400 font-bold text-sm">Henüz hiç içerik eklemedin.</p>
                <Link href="/admin/ekle" className="mt-2 text-[#334EAC] text-xs font-bold hover:underline">İlk içeriğini ekle</Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}