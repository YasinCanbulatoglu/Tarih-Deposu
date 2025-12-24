'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface EventData {
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
  created_by: string;
}

export default function EditEvent() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '', slug: '', short_description: '', details: '',
    date_day: '', date_month: '', date_year: '',
    era: '', category: '', cover_image: '', created_by: ''
  });

  // --- GÜVENLİK KONTROLÜ ---
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/login'); // Giriş yapmamışsa at
    }
  }, [router]);

  // 1. Veriyi Çek, Yetkiyi Kontrol Et ve Formu Doldur
  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events`);
        if (!res.ok) throw new Error("API Hatası");
        
        const data: EventData[] = await res.json();
        
        // ID eşleşmesini bul
        const event = data.find((e) => String(e.id) === String(id));
        
        if (event) {
          // --- YETKİ KONTROLÜ (DÜZELTİLDİ: ADMİN HER ŞEYİ YAPAR) ---
          const currentRole = localStorage.getItem('admin_role');
          const currentUser = localStorage.getItem('admin_user');

          // KURAL: 
          // 1. Kullanıcı adı 'Admin' ise VEYA Rolü 'Yönetici' ise -> HER ŞEYİ DÜZENLER.
          // 2. Değilse -> Sadece kendi oluşturduğu içeriği düzenler.
          
          const isAdmin = currentUser === 'Admin' || currentRole === 'Yönetici';
          const isOwner = event.created_by === currentUser;

          if (!isAdmin && !isOwner) {
            alert("Bu içeriği düzenleme yetkiniz yok! Sadece kendi yazılarınızı düzenleyebilirsiniz.");
            router.push('/editor'); // Yetkisizse editör paneline at
            return;
          }
          // --------------------------------------------------------

          setFormData({
            title: event.title || '',
            slug: event.slug || '',
            short_description: event.short_description || '',
            details: event.details || '',
            date_day: event.date_day !== undefined ? String(event.date_day) : '',
            date_month: event.date_month || '',
            date_year: event.date_year !== undefined ? String(event.date_year) : '',
            era: event.era || 'Yakın Çağ',
            category: event.category || 'Savaş',
            cover_image: event.cover_image || '',
            created_by: event.created_by || 'Admin'
          });
        } else {
          console.error("Olay bulunamadı");
          router.push('/admin'); // Bulunamazsa geri dön
        }
      } catch (err) {
        console.error("Veri yükleme hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date_day: Number(formData.date_day),
          date_year: Number(formData.date_year)
        }),
      });

      if (res.ok) {
        // --- İŞLEM BİTİNCE DOĞRU PANELE DÖN ---
        const role = localStorage.getItem('admin_role');
        const user = localStorage.getItem('admin_user');
        
        // Admin veya Yönetici ise Admin paneline dön
        if (user === 'Admin' || role === 'Yönetici') {
          router.push('/admin');
        } else {
          router.push('/editor');
        }
      } else {
        alert('Güncelleme başarısız.');
      }
    } catch {
      alert('Sunucu hatası.');
    } finally {
      setLoading(false);
    }
  };

  // --- Yükleniyor Ekranı ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f172a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#334EAC] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-[#334EAC] animate-pulse">VERİLER KONTROL EDİLİYOR...</p>
        </div>
      </div>
    );
  }

  const inputStyle = "w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-lg font-bold text-sm outline-none focus:border-[#334EAC] transition-all text-black dark:text-white";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-black dark:text-white p-6 md:p-10 font-sans">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-white/5">
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#334EAC] tracking-tight">Olayı Düzenle</h1>
            <button 
              onClick={() => router.back()} // Geri butonu
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              ← Vazgeç ve Dön
            </button>
          </div>
          <div className="text-right bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800">
              <p className="text-[9px] font-black text-[#334EAC] uppercase tracking-widest mb-0.5">Sorumlu Editör</p>
              <p className="text-sm font-black text-gray-700 dark:text-blue-100">{formData.created_by}</p>
          </div>
        </div>
        
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Olay Başlığı</label>
            <input required name="title" value={formData.title} onChange={handleChange} className={inputStyle} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Slug (URL)</label>
              <input required name="slug" value={formData.slug} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Kapak Görseli URL</label>
              <input required name="cover_image" value={formData.cover_image} onChange={handleChange} className={inputStyle} />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-white/5">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Gün</label>
              <input required name="date_day" value={formData.date_day} onChange={handleChange} className={inputStyle} type="number" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Ay</label>
              <input required name="date_month" value={formData.date_month} onChange={handleChange} className={inputStyle} />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Yıl</label>
              <input required name="date_year" value={formData.date_year} onChange={handleChange} className={inputStyle} type="number" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Kategori</label>
              <select name="category" value={formData.category} onChange={handleChange} className={inputStyle}>
                <option value="Savaş">Savaş</option><option value="Antlaşma">Antlaşma</option><option value="Bilim">Bilim</option><option value="Sanat">Sanat</option><option value="Devrim">Devrim</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Dönem</label>
              <select name="era" value={formData.era} onChange={handleChange} className={inputStyle}>
                <option value="Yakın Çağ">Yakın Çağ</option><option value="Yeni Çağ">Yeni Çağ</option><option value="Orta Çağ">Orta Çağ</option><option value="İlk Çağ">İlk Çağ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Kısa Özet</label>
            <textarea required name="short_description" value={formData.short_description} onChange={handleChange} className={inputStyle} rows={2}></textarea>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Olay Detayları</label>
            <textarea required name="details" value={formData.details} onChange={handleChange} className={inputStyle} rows={6}></textarea>
          </div>

          <button type="submit" className="w-full py-4 bg-[#334EAC] text-white rounded-xl font-black text-base hover:bg-[#283d87] shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all">
            DEĞİŞİKLİKLERİ KAYDET
          </button>
        </form>
      </div>
    </div>
  );
}