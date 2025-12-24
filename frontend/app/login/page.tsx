'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Backend'e isteği gönder
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      // 2. Cevabı önce TEXT olarak al (JSON hatasını önlemek için)
      const textData = await res.text();
      let data;

      try {
        data = JSON.parse(textData); // JSON'a çevirmeyi dene
      } catch (jsonError) {
        // jsonError değişkenini kullanmadığımız için konsola basabiliriz veya yoksayabiliriz
        console.error("JSON parse hatası:", jsonError); 
        console.error("Sunucudan gelen veri:", textData);
        throw new Error("Sunucu hatası: Beklenmedik yanıt alındı.");
      }

      // 3. Cevabı kontrol et
      if (res.ok && data.success) {
        // GİRİŞ BAŞARILI - BİLGİLERİ KAYDET
        localStorage.setItem('admin_token', 'true');
        localStorage.setItem('admin_user', data.user.name);
        localStorage.setItem('admin_role', data.user.role);

        // --- ROL TABANLI YÖNLENDİRME ---
        if (data.user.role === 'Yönetici') {
          router.push('/admin');
        } else {
          router.push('/editor');
        }

      } else {
        // Hatalı giriş
        setError(data.message || 'Kullanıcı adı veya şifre hatalı!');
      }
    } catch (err) {
      // --- DÜZELTME BURADA ---
      // 'any' yerine hatanın türünü kontrol ediyoruz
      console.error("Giriş Hatası:", err);
      
      const errorMessage = err instanceof Error ? err.message : 'Sunucuya bağlanılamadı. Backend çalışıyor mu?';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0f172a] p-6 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-[#1e293b] p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#334EAC]/10 text-[#334EAC] rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-4">
            TD
          </div>
          <h1 className="text-3xl font-black text-[#334EAC] tracking-tighter mb-2">Personel Girişi</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Tarih Deposu Yönetim</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Kullanıcı Adı</label>
            <input 
              required
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-2xl font-bold outline-none focus:border-[#334EAC] transition-all text-black dark:text-white"
              placeholder="Kullanıcı Adınız"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">Şifre</label>
            <input 
              required
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-2xl font-bold outline-none focus:border-[#334EAC] transition-all text-black dark:text-white"
              placeholder="••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-500 text-xs font-bold text-center animate-pulse">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-[#334EAC] text-white rounded-2xl font-black text-lg hover:bg-[#283d87] shadow-lg shadow-blue-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'GİRİŞ YAPILIYOR...' : 'SİSTEME GİR'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
           <p className="text-xs font-bold text-gray-300">© 2025 Tarih Deposu</p>
        </div>
      </div>
    </div>
  );
}