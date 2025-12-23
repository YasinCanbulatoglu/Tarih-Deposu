'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', short_description: '', details: '',
    date_day: '', date_month: '', date_year: '',
    era: 'Yakın Çağ', category: 'Savaş', cover_image: '',
    created_by: '' // Editör takibi için yeni alan
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const finalSlug = formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          slug: finalSlug, 
          date_day: Number(formData.date_day), 
          date_year: Number(formData.date_year) 
        }),
      });
      if (res.ok) router.push('/admin');
      else alert('Kaydedilemedi!');
    } catch { 
      alert('Bağlantı hatası!'); 
    } 
    finally { setLoading(false); }
  };

  const inputStyle = "w-full p-3 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-lg font-bold text-sm outline-none focus:border-[#334EAC] transition-colors";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-black dark:text-white p-10 font-sans">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e293b] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black text-[#334EAC]">Yeni Olay Ekle</h1>
          <Link href="/admin" className="text-sm font-bold text-gray-500 hover:text-black">← Geri Dön</Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Olay Başlığı</label>
              <input required name="title" onChange={handleChange} className={inputStyle} placeholder="Örn: İstanbul'un Fethi" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Senin Adın (Editör)</label>
              <input required name="created_by" onChange={handleChange} className={inputStyle} placeholder="Örn: Ahmet Yılmaz" />
            </div>
          </div>
          
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Kapak Görseli URL</label>
            <input required name="cover_image" onChange={handleChange} className={inputStyle} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input required name="date_day" type="number" onChange={handleChange} className={inputStyle} placeholder="Gün" />
            <input required name="date_month" onChange={handleChange} className={inputStyle} placeholder="Ay" />
            <input required name="date_year" type="number" onChange={handleChange} className={inputStyle} placeholder="Yıl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select name="category" onChange={handleChange} className={inputStyle}>
              <option value="Savaş">Savaş</option>
              <option value="Antlaşma">Antlaşma</option>
              <option value="Bilim">Bilim</option>
              <option value="Sanat">Sanat</option>
              <option value="Devrim">Devrim</option>
            </select>
            <select name="era" onChange={handleChange} className={inputStyle}>
              <option value="Yakın Çağ">Yakın Çağ</option>
              <option value="Yeni Çağ">Yeni Çağ</option>
              <option value="Orta Çağ">Orta Çağ</option>
              <option value="İlk Çağ">İlk Çağ</option>
            </select>
          </div>

          <textarea required name="short_description" onChange={handleChange} className={inputStyle} placeholder="Kısa Özet Açıklama" rows={2}></textarea>
          <textarea required name="details" onChange={handleChange} className={inputStyle} placeholder="Tüm Makale Detayları" rows={5}></textarea>
          
          <button type="submit" disabled={loading} className="w-full py-4 bg-[#334EAC] text-white rounded-lg font-black hover:bg-[#283d87] transition-all active:scale-95 shadow-lg shadow-[#334EAC]/20">
            {loading ? 'KAYDEDİLİYOR...' : 'OLAYI SİSTEME EKLE'}
          </button>
        </form>
      </div>
    </div>
  );
}