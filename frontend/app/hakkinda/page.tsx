import Link from "next/link";

export default function Hakkinda() {
  // Buradaki tüm useState, useEffect ve toggleDarkMode fonksiyonlarını sildik.
  // Çünkü tema kontrolü artık ana Layout dosyasından yapılıyor.

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-500 font-sans scroll-smooth">
      
      <main className="max-w-5xl mx-auto px-8 py-20 font-sans animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <section className="text-center mb-20">
          <span className="text-[#334EAC] font-bold text-sm tracking-[0.3em] uppercase mb-4 block italic">Manifestomuz</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-tight font-sans">Geçmişi <span className="text-[#334EAC]">Yeniden</span> Keşfet</h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-[#334EAC] to-transparent rounded-full mx-auto"></div>
        </section>

        <div className="space-y-20">
          <div className="relative p-10 md:p-14 rounded-2xl bg-gray-50 dark:bg-[#1e293b]/50 border border-gray-100 dark:border-white/5 shadow-2xl">
            <h2 className="text-3xl font-black mb-8 text-[#334EAC] font-bold font-sans">Hikayemiz</h2>
            <div className="max-w-2xl font-sans text-black dark:text-white">
                <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed italic mb-8 border-l-4 border-[#334EAC] pl-6 font-medium">
                &quot;Tarih Deposu, geçmişin tozlu raflarında unutulmaya yüz tutmuş bilgileri, modern dünyanın hızına ve estetiğine uyarlamak amacıyla kurulmuş bir dijital kütüphane girişimidir.&quot;
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-bold">
                Tarih sadece sayılardan ve savaşlardan ibaret değildir; o, insanlığın kolektif hafızasıdır. Biz, bu hafızayı sadece saklamakla kalmıyor, aynı zamanda herkes için erişilebilir hale getirmeyi hedefliyoruz.
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center font-sans text-black dark:text-white">
            {[
                { label: "Olay Arşivi", value: "1200+" },
                { label: "Aktif Okuyucu", value: "50K+" },
                { label: "Doğrulanmış Kaynak", value: "100%" }
            ].map((stat) => (
                <div key={stat.label} className="p-8 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0f172a] shadow-lg hover:border-[#334EAC]/40 transition-all duration-300">
                    <div className="text-4xl font-black text-[#334EAC] mb-2 font-bold">{stat.value}</div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-black dark:text-white">
            <div className="p-10 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#1e293b]/30 shadow-xl hover:border-[#334EAC]/40 transition-all group">
              <div className="w-12 h-12 bg-[#334EAC]/10 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold">🎯</div>
              <h3 className="text-2xl font-black mb-4 font-bold font-sans">Misyonumuz</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Tarihsel olayları en doğru kaynaklardan süzerek, karmaşıklıktan uzak, sade ve çarpıcı bir dil ile sunmak.</p>
            </div>
            <div className="p-10 rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#1e293b]/30 shadow-xl hover:border-[#334EAC]/40 transition-all group">
              <div className="w-12 h-12 bg-[#334EAC]/10 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold">🚀</div>
              <h3 className="text-2xl font-black mb-4 font-bold font-sans">Vizyonumuz</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">Dünyanın en kapsamlı ve kullanıcı dostu dijital tarih arşivine dönüşerek, tarih meraklılarının ilk durağı olmak.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-gray-200 dark:border-[#334EAC]/20 bg-gray-50 dark:bg-[#1e293b] pt-16 pb-8 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-black dark:text-white">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 cursor-pointer group">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#334EAC] text-white font-bold text-xs shadow-lg shadow-[#334EAC]/20 group-hover:rotate-12 transition-all font-sans">TK</div>
              <span className="text-xl font-bold tracking-tight font-sans">Tarih Deposu</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Geçmişin tozlu sayfalarını dijital dünyaya taşıyoruz. Tarihin her anını keşfetmek için buradayız.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#334EAC]">Hızlı Erişim</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="hover:text-[#334EAC] transition-colors font-sans">Ana Sayfa</Link></li>
              <li><Link href="/hakkinda" className="hover:text-[#334EAC] transition-colors font-sans">Hakkımızda</Link></li>
              <li><Link href="/depo" className="hover:text-[#334EAC] transition-colors font-sans">Depo</Link></li>
              <li><Link href="/#populer-olaylar" className="hover:text-[#334EAC] transition-colors font-sans">Popüler Olaylar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#334EAC]">Topluluk</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-[#334EAC] transition-colors">Yazar Ol</a></li>
              <li><Link href="/hakkinda" className="hover:text-[#334EAC] transition-colors">Hakkımızda</Link></li>
              <li><a href="#" className="hover:text-[#334EAC] transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#334EAC]">Bültene Katıl</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="E-posta" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-[#334EAC] font-bold" />
              <button className="bg-[#334EAC] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#283d87] transition-all shadow-md">Kaydol</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-16 mt-16 pt-8 border-t border-gray-200 dark:border-white/5 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
          © 2024 Tarih Deposu. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}