'use client';

import { useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- TİP TANIMLAMALARI ---
interface Event {
  id: number;
  title: string;
  date_year: number;
  category: string;
  created_by: string;
}

interface Editor {
  id: number;
  name: string;
  role: string;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editors, setEditors] = useState<Editor[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const [newEditorName, setNewEditorName] = useState(''); 
  const [newEditorRole, setNewEditorRole] = useState('Editör'); 

  const router = useRouter(); 

  const ADMIN_NAME = 'Admin'; 

  const GOALS = {
    editors: 5,   
    content: 100  
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) router.push('/login');
  }, [router]);

  const fetchData = async () => {
    try {
      const [resEvents, resEditors] = await Promise.all([
        fetch('http://localhost:5000/api/events'),
        fetch('http://localhost:5000/api/editors')
      ]);
      
      const dataEvents = await resEvents.json();
      const dataEditors = await resEditors.json();
      
      setEvents(dataEvents);
      setEditors(dataEditors);
    } catch {
      console.error('Veri çekme hatası');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Bu olayı silmek istediğine emin misin?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData(); else alert('Silinemedi.');
    } catch { alert('Hata.'); }
  };

  const handleAddEditor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEditorName.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/editors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEditorName, role: newEditorRole })
      });
      if (res.ok) {
        setNewEditorName('');
        setNewEditorRole('Editör'); 
        fetchData(); 
      }
    } catch { alert('Hata.'); }
  };

  const handleDeleteEditor = async (id: number) => {
    if (!confirm('Bu personeli silmek istediğine emin misin?')) return;
    await fetch(`http://localhost:5000/api/editors/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const totalRegisteredEditors = editors.length;
  const adminPostCount = events.filter(e => e.created_by.toLowerCase() === ADMIN_NAME.toLowerCase()).length;
  const totalContent = events.length;

  const editorPerformance = editors.map(editor => {
    const count = events.filter(e => e.created_by.toLowerCase() === editor.name.toLowerCase()).length;
    return { ...editor, count };
  });

  const CircleProgress = ({ value, max, color, title, subTitle, icon }: { value: number, max: number, color: string, title: string, subTitle: string, icon: ReactNode }) => {
    const radius = 35; 
    const circumference = 2 * Math.PI * radius; 
    const percentage = Math.min((value / max) * 100, 100); 
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:shadow-md transition-shadow duration-300">
        <div>
          <div className={`p-3 rounded-xl w-fit mb-3 ${color.replace('text-', 'bg-').replace('600', '100').replace('500', '100')} dark:bg-opacity-20`}>
            {icon}
          </div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <h2 className={`text-4xl font-black ${color}`}>{value}</h2>
            <span className="text-xs font-bold text-gray-300">{subTitle}</span>
          </div>
        </div>
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-gray-700" />
            <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={`${color} transition-all duration-1000 ease-out`} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-gray-400">
            %{Math.round(percentage)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0f172a] text-black dark:text-white p-6 md:p-12 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#334EAC] tracking-tight mb-1">Yönetim Paneli</h1>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Aktif Oturum: {ADMIN_NAME}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="px-5 py-2.5 font-bold text-gray-500 hover:text-[#334EAC] transition-all rounded-xl hover:bg-white dark:hover:bg-white/5 shadow-sm hover:shadow-md border border-transparent hover:border-gray-100 dark:hover:border-white/10">
              Siteyi Gör
            </Link>
            <Link href="/admin/ekle" className="px-7 py-3 bg-[#334EAC] text-white rounded-xl font-bold hover:bg-[#283d87] shadow-lg shadow-[#334EAC]/20 transition-all active:scale-95 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
              Yeni Olay
            </Link>
          </div>
        </div>

        {/* İSTATİSTİKLER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <CircleProgress title="Kayıtlı Editör" subTitle="/ Ekip" value={totalRegisteredEditors} max={GOALS.editors} color="text-blue-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          />
          <CircleProgress title="Yönetici İşlemi" subTitle="/ Paylaşım" value={adminPostCount} max={totalContent || 1} color="text-purple-500"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
          />
          <CircleProgress title="Toplam İçerik" subTitle="/ Hedef" value={totalContent} max={GOALS.content} color="text-orange-500"
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* --- SOL KUTU: PERSONEL YÖNETİMİ --- */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 h-fit flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex items-center justify-between">
              <h3 className="text-lg font-black flex items-center gap-2 text-[#334EAC]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.25-2.906z" /></svg>
                Personel Yönetimi
              </h3>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{editors.length} Üye</span>
            </div>

            {/* Ekleme Alanı */}
            <div className="p-6 border-b border-gray-100 dark:border-white/5">
              <form onSubmit={handleAddEditor} className="flex flex-col gap-3">
                <input 
                  value={newEditorName} 
                  onChange={(e) => setNewEditorName(e.target.value)} 
                  placeholder="Personel Adı Giriniz" 
                  className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#334EAC] focus:ring-4 focus:ring-blue-500/5 transition-all" 
                />
                <div className="flex gap-2">
                   <select 
                    value={newEditorRole}
                    onChange={(e) => setNewEditorRole(e.target.value)}
                    className="flex-1 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-3 text-sm font-bold outline-none focus:border-[#334EAC] cursor-pointer"
                  >
                    <option value="Editör">Editör</option>
                    <option value="Yönetici">Yönetici</option>
                    <option value="Moderatör">Moderatör</option>
                  </select>
                  <button className="bg-[#334EAC] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#283d87] transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                    Ekle
                  </button>
                </div>
              </form>
            </div>

            {/* Personel Listesi */}
            <div className="p-2 overflow-y-auto max-h-[450px]">
              {editorPerformance.length > 0 ? (
                <div className="space-y-1">
                  {editorPerformance.map((editor) => (
                    <div key={editor.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-base font-black border-2 transition-transform group-hover:scale-110 ${
                            editor.role === 'Yönetici' ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-blue-50 text-[#334EAC] border-blue-100'
                        }`}>
                          {editor.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-black text-sm text-gray-800 dark:text-gray-200 tracking-tight">{editor.name}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-lg font-black uppercase tracking-wider ${
                              editor.role === 'Yönetici' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                              {editor.role}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{editor.count} Paylaşım</span>
                          </div>
                        </div>
                      </div>

                      {editor.name.toLowerCase() !== 'admin' && (
                        <button 
                          onClick={() => handleDeleteEditor(editor.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                          title="Personeli Sil"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-gray-200 dark:text-gray-700 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <p className="text-sm text-gray-400 font-bold">Kayıtlı personel bulunamadı.</p>
                </div>
              )}
            </div>
          </div>

          {/* --- SAĞ KUTU: İÇERİK LİSTESİ --- */}
          <div className="lg:col-span-8 bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex items-center justify-between">
              <h3 className="text-lg font-black flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50"></span> 
                İçerik Arşivi
              </h3>
              <div className="flex gap-2">
                 <div className="bg-white dark:bg-black/20 px-3 py-1 rounded-lg border border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   TOPLAM: {events.length}
                 </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 dark:bg-black/10 border-b border-gray-100 dark:border-white/5">
                  <tr>
                    <th className="p-5 font-black text-[10px] text-gray-400 uppercase tracking-[0.15em]">Olay Detayı</th>
                    <th className="p-5 font-black text-[10px] text-gray-400 uppercase tracking-[0.15em]">Kategori</th>
                    <th className="p-5 font-black text-[10px] text-gray-400 uppercase tracking-[0.15em]">Editör</th>
                    <th className="p-5 text-right font-black text-[10px] text-gray-400 uppercase tracking-[0.15em]">Eylemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors group">
                      <td className="p-5">
                        <div className="font-black text-sm text-gray-800 dark:text-gray-100 mb-0.5 group-hover:text-[#334EAC] transition-colors">{event.title}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{event.date_year} Yılı</div>
                      </td>
                      <td className="p-5">
                        <span className="px-3 py-1 text-[9px] font-black bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-lg uppercase tracking-wider border border-transparent group-hover:border-gray-200 dark:group-hover:border-white/10 transition-all">
                          {event.category}
                        </span>
                      </td>
                      <td className="p-5">
                        {event.created_by === ADMIN_NAME ? (
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                             <span className="text-xs font-black text-purple-600 uppercase tracking-tighter">Yönetici</span>
                           </div>
                        ) : (
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                             <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{event.created_by}</span>
                           </div>
                        )}
                      </td>
                      <td className="p-5">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/duzenle/${event.id}`} 
                            className="p-2 text-[#334EAC] bg-blue-50 dark:bg-blue-500/10 rounded-xl hover:bg-[#334EAC] hover:text-white transition-all shadow-sm"
                            title="Düzenle"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                          </Link>
                          <button 
                            onClick={() => handleDeleteEvent(event.id)} 
                            className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Sil"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {events.length === 0 && !loading && (
               <div className="flex flex-col items-center justify-center p-20 text-center">
                  <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <p className="text-gray-400 font-bold tracking-tight">Henüz hiç içerik eklenmemiş.</p>
               </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}