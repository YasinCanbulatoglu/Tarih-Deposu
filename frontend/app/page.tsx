'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("En Yeni");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const popularEvents = [
    { title: "İstanbul'un Fethi", date: "1453", desc: "Doğu Roma'nın sonu, yeni bir çağın başlangıcı." },
    { title: "Fransız İhtilali", date: "1789", desc: "Mutlak monarşinin devrildiği modern dönüm noktası." },
    { title: "Ay'a İlk Adım", date: "1969", desc: "İnsanlığın dünya dışındaki en büyük başarısı." },
    { title: "Cumhuriyetin İlanı", date: "1923", desc: "Modern Türkiye Cumhuriyeti'nin kuruluşu." },
    { title: "Rönesans", date: "14. Yüzyıl", desc: "Sanat ve bilimde yeniden doğuşun simgesi." },
    { title: "Sanayi Devrimi", date: "1760", desc: "Üretim ve teknolojinin dünyayı değiştirdiği an." },
    { title: "Malazgirt Savaşı", date: "1071", desc: "Anadolu'nun kapılarının Türklere açıldığı zafer." },
    { title: "Magna Carta", date: "1215", desc: "Hukukun üstünlüğüne giden yolun ilk adımı." }
  ];

  const historicalEras = [
    { title: "İlk Çağ", description: "Yazının icadından Roma'nın çöküşüne; antik siteler ve ilk kanunlar.", tag: "M.Ö. 3200 - M.S. 476" },
    { title: "Orta Çağ", description: "Feodalizm, şövalyeler ve büyük imparatorlukların yükseliş dönemi.", tag: "476 - 1453" },
    { title: "Yeni Çağ", description: "Coğrafi keşifler, Rönesans ve matbaanın dünyayı değiştiren etkisi.", tag: "1453 - 1789" },
    { title: "Yakın Çağ", description: "Fransız İhtilali'nden günümüze; endüstri, teknolojic ve uzay yarışı.", tag: "1789 - Günümüz" }
  ];

  const recentStories = [
    { title: "Truva Savaşı: Efsane mi Gerçek mi?", category: "Arkeoloji", excerpt: "Homeros'un destanlarındaki Truva'nın peşinde, antik keşifler ve Schliemann'ın tartışmalı mirası.", date: "12 Aralık 2024", readTime: "5 dk", imageUrl: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?q=80&w=800&auto=format&fit=crop" },
    { title: "Büyük Selçuklu Devleti'nin Kuruluşu", category: "Siyasi Tarih", excerpt: "Dandanakan Savaşı'ndan imparatorluğun zirvesine Selçuklu Türklerinin Orta Asya'dan Anadolu'ya uzanan hikayesi.", date: "10 Aralık 2024", readTime: "8 dk", imageUrl: "https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?q=80&w=800&auto=format&fit=crop" },
    { title: "Antikythera: Tarihin İlk Bilgisayarı", category: "Bilim Tarihi", excerpt: "Eski Yunanlıların astronomik hesaplamalar için kullandığı bu inanılmaz karmaşık cihazın sırları hala çözülüyor.", date: "08 Aralık 2024", readTime: "6 dk", imageUrl: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop" },
    { title: "Samurayların Sonu: Meiji Restorasyonu", category: "Uzak Doğu", excerpt: "Japonya'nın feodal düzenden modern bir world gücüne dönüşümü ve samuray kültürünün hazin sonu.", date: "05 Aralık 2024", readTime: "10 dk", imageUrl: "https://images.unsplash.com/photo-1528164344705-4754268799af?q=80&w=800&auto=format&fit=crop" },
    { title: "Piri Reis'in Haritası ve Sırları", category: "Denizcilik", excerpt: "1513 tarihli haritanın bugünkü modern kıyı çizgilerine olan şaşırtıcı benzerliği ve gizemli notlar.", date: "03 Aralık 2024", readTime: "7 dk", imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop" },
    { title: "Büyük İskender: Dünyanın Ucuna Yolculuk", category: "Biyografi", excerpt: "Genç bir kralın 13 yılda bilinen dünyayı fethedişi ve kurduğu devasa Helenistik miras.", date: "01 Aralık 2024", readTime: "12 dk", imageUrl: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=800&auto=format&fit=crop" },
    { title: "Mısır Piramitlerinin İnşasındaki Mühendislik", category: "Mimarlık", excerpt: "Binlerce yıl önce devasa taş blokların nasıl taşındığı ve matematiksel kusursuzluğun arkasındaki deha.", date: "28 Kasım 2024", readTime: "9 dk", imageUrl: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=800&auto=format&fit=crop" },
    { title: "Cengiz Han ve Moğol İmparatorluğu", category: "Savaş Tarihi", excerpt: "Bozkırın ortasından doğan ve tarihin bitişik sınırlara sahip en büyük imparatorluğunu kuran strateji.", date: "25 Kasım 2024", readTime: "11 dk", imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop" },
    { title: "Vikinglerin Amerika Keşfi: Leif Erikson", category: "Keşifler", excerpt: "Kristof Kolomb'dan yüzyıllar önce Amerika kıtasına ayak basan kuzeyli savaşçıların hikayesi.", date: "20 Kasım 2024", readTime: "6 dk", imageUrl: "https://images.unsplash.com/photo-1552176545-64416fd8211b?q=80&w=800&auto=format&fit=crop" },
    { title: "Sanayi Devrimi: Buharlı Makinelerin Gücü", category: "Modern Tarih", excerpt: "İngiltere'de başlayan ve insan emeğinin yerini makinelerin aldığı, dünyayı değiştiren dönüşüm.", date: "18 Kasım 2024", readTime: "13 dk", imageUrl: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=800&auto=format&fit=crop" },
    { title: "Maya Uygarlığı ve Astronomik Deha", category: "Kültür Tarihi", excerpt: "Ormanların derinliklerinde yükselen piramitler ve gökyüzünü bir bilim insanı hassasiyetiyle izleyen Mayalar.", date: "15 Kasım 2024", readTime: "8 dk", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop" },
    { title: "Rönesans'ın Doğuşu: Floransa", category: "Sanat Tarihi", excerpt: "Medici ailesinin himayesinde Da Vinci ve Michelangelo gibi dâhilerin sanatın kurallarını yeniden yazdığı dönem.", date: "12 Kasım 2024", readTime: "10 dk", imageUrl: "https://images.unsplash.com/photo-1569429593410-b498b3fb3387?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white transition-colors duration-500 font-sans scroll-smooth">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-16 py-4 border-b border-gray-200 dark:border-[#334EAC]/30 bg-white dark:bg-[#1e293b] sticky top-0 z-50 transition-all duration-500">
        <Link href="/" className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#334EAC] text-white font-bold text-xs shadow-lg shadow-[#334EAC]/20 group-hover:rotate-12 transition-all">TK</div>
          <span className="text-xl font-bold tracking-tight group-hover:text-[#334EAC] transition-colors font-sans">Tarih Deposu</span>
        </Link>
        <div className="flex-1 max-w-md mx-4">
          <input type="text" placeholder="Tarihte ara..." className="w-full px-4 py-2 bg-gray-100 dark:bg-[#0f172a] border border-transparent rounded-lg focus:outline-none focus:border-[#334EAC] text-sm transition-all font-bold" />
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-[#334EAC] font-bold">Ana Sayfa</Link>
          <Link href="/hakkinda" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] transition-colors font-bold">Hakkında</Link>
          {/* DEPO LİNKİ BAĞLANDI */}
          <Link href="/depo" className="text-gray-600 dark:text-gray-300 hover:text-[#334EAC] transition-colors font-bold">Depo</Link>
          <button onClick={() => setDarkMode(!darkMode)} className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-[#334EAC] text-black dark:text-white transition-all shadow-md active:scale-90 hover:scale-110">{darkMode ? "☀️" : "🌙"}</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-8 pb-16 font-sans">
        
        {/* 1. Hero Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-[#1e293b] dark:to-[#0f172a] p-10 md:p-14 rounded-xl border border-gray-100 dark:border-white/5 shadow-xl">
          <div className="absolute -top-24 -right-24 h-80 w-80 bg-[#334EAC]/10 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 text-[#334EAC]">
              <span className="cursor-default px-4 py-1.5 rounded-full bg-[#334EAC]/10 text-xs font-bold uppercase tracking-widest border border-[#334EAC]/20 transition-all duration-300 hover:-translate-y-1">Günün Tarihi Notu</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">Tarih Deposu&apos;na <br /><span className="text-[#334EAC]">Hoş Geldiniz</span></h1>
            <div className="relative mt-8">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-[#334EAC] rounded-full opacity-50"></div>
              <blockquote className="pl-8 py-1">
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 italic font-medium leading-relaxed">&quot;Gelecek, tarihine sahip çıkanlarındır. Kendi geçmişini bilmeyen, başkasının yazdığı tarihin figüranı olur.&quot;</p>
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-10 bg-gray-300 dark:bg-zinc-700"></div>
                    <cite className="text-xs font-bold text-[#334EAC] not-italic tracking-widest uppercase font-bold">Motive Edici Bir Başlangıç</cite>
                  </div>
                  {/* HERO BUTONU DA DEPOYA GİTSİN */}
                  <Link href="/depo" className="px-8 py-3 rounded-xl bg-[#334EAC] text-white font-bold hover:bg-[#283d87] transition-all shadow-lg shadow-[#334EAC]/20 active:scale-95 text-sm text-nowrap hover:-translate-y-1">Arşivi Keşfet</Link>
                </div>
              </blockquote>
            </div>
          </div>
        </section>

        {/* 2. Popüler Olaylar Bandı */}
        <div id="populer-olaylar" className="mt-10 px-6 py-8 bg-[#334EAC]/5 dark:bg-[#334EAC]/10 border border-[#334EAC]/10 rounded-xl relative shadow-sm overflow-hidden text-black dark:text-white">
          <div className="mb-4 px-4">
            <h2 className="text-2xl font-black tracking-tight font-sans">Popüler Olaylar</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#334EAC] to-transparent rounded-full mt-2"></div>
          </div>
          <div className="relative overflow-visible py-10"> 
            <div className="flex animate-marquee overflow-visible">
              {[...popularEvents, ...popularEvents].map((event, index) => (
                <div key={index} className="mx-4 min-w-[320px] p-7 rounded-xl bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-white/5 shadow-md hover:shadow-2xl hover:-translate-y-4 hover:border-[#334EAC]/40 transition-all duration-500 cursor-pointer group relative z-10 flex flex-col justify-between h-52">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md bg-[#334EAC]/10 text-[11px] font-black text-[#334EAC] uppercase tracking-[0.1em] mb-3 group-hover:bg-[#334EAC] group-hover:text-white transition-all font-bold">{event.date}</span>
                    <h3 className="text-lg font-black group-hover:text-[#334EAC] transition-colors leading-tight mb-2 font-bold">{event.title}</h3>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{event.desc}</p>
                  </div>
                  <div className="flex items-center justify-between text-[#334EAC]">
                    <span className="text-[10px] font-black tracking-wider italic">GÖRÜNTÜLE</span>
                    <span className="text-lg font-bold transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Tarihsel Dönemler */}
        <div className="mt-12 mb-6 px-4">
          <h2 className="text-2xl font-black tracking-tight font-sans">Tarihsel Dönemler</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#334EAC] to-transparent rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {historicalEras.map((era, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-50 dark:bg-[#1e293b]/50 border border-transparent dark:border-white/5 shadow-sm flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-[#334EAC]/40 group active:scale-95">
              <div>
                <span className="text-[9px] font-bold text-[#334EAC] opacity-80 uppercase tracking-widest bg-[#334EAC]/5 px-2 py-1 rounded-md transition-colors group-hover:bg-[#334EAC] group-hover:text-white font-bold">{era.tag}</span>
                <h3 className="text-lg font-black mt-4 mb-2 tracking-tight group-hover:text-[#334EAC] transition-colors font-bold font-sans">{era.title}</h3>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">{era.description}</p>
              </div>
              <button className="mt-6 text-[12px] font-bold text-[#334EAC] flex items-center gap-2 transition-all group-hover:gap-4 font-bold">Keşfet <span>→</span></button>
            </div>
          ))}
        </div>

        {/* 4. Son Eklenen Olaylar + Sıralama Menüsü */}
        <div className="mt-16 mb-8 px-4 flex items-center justify-between relative">
          <div>
            <h2 className="text-2xl font-black tracking-tight font-sans">Son Eklenen Olaylar</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#334EAC] to-transparent rounded-full mt-2"></div>
          </div>
          <div className="relative">
            <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#1e293b] border border-gray-200 dark:border-white/5 rounded-lg text-sm font-bold hover:border-[#334EAC] transition-all">
              <span>Sırala: {sortBy}</span>
              <span className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-white/5 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
                {["En Yeni", "En Eski", "Popüler", "A-Z"].map((option) => (
                  <button key={option} onClick={() => { setSortBy(option); setIsSortOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-[#334EAC]/10 hover:text-[#334EAC] transition-colors font-bold">
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 text-black dark:text-white">
          {recentStories.map((story, index) => (
            <div key={index} className="group cursor-pointer bg-white dark:bg-[#1e293b]/30 rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-2">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={story.imageUrl} alt={story.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-5 py-2 bg-white text-black text-xs font-black rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-bold">Devamını Oku</span>
                </div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md text-[#334EAC] text-[10px] font-black uppercase tracking-wider shadow-sm font-bold">
                  {story.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-gray-400 text-[10px] font-bold mb-2 uppercase tracking-tight">{story.date}</div>
                <h3 className="text-lg font-black mb-3 group-hover:text-[#334EAC] transition-colors leading-tight font-bold font-sans">{story.title}</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-6 font-medium">{story.excerpt}</p>
                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400 font-medium italic font-bold">{story.readTime} okuma</span>
                  <span className="text-[#334EAC] font-bold group-hover:underline font-bold">İncele →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="mt-20 border-t border-gray-200 dark:border-[#334EAC]/20 bg-gray-50 dark:bg-[#1e293b] pt-16 pb-8 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-black dark:text-white">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 cursor-pointer group">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#334EAC] text-white font-bold text-xs shadow-lg shadow-[#334EAC]/20 group-hover:rotate-12 transition-all">TK</div>
              <span className="text-xl font-bold tracking-tight font-sans">Tarih Deposu</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Geçmişin tozlu sayfalarını dijital dünyaya taşıyoruz. Tarihin her anını keşfetmek için buradayız.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#334EAC] font-bold">Hızlı Erişim</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="hover:text-[#334EAC] transition-colors font-bold font-sans">Ana Sayfa</Link></li>
              <li><Link href="/hakkinda" className="hover:text-[#334EAC] transition-colors font-bold font-sans">Hakkımızda</Link></li>
              {/* FOOTER DEPO LİNKİ BAĞLANDI */}
              <li><Link href="/depo" className="hover:text-[#334EAC] transition-colors font-bold font-sans">Depo</Link></li>
              <li><a href="#populer-olaylar" className="hover:text-[#334EAC] transition-colors font-bold font-sans">Popüler Olaylar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#334EAC] font-bold">Topluluk</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400 font-bold">
              <li><a href="#" className="hover:text-[#334EAC] transition-colors font-bold">Yazar Ol</a></li>
              <li><Link href="/hakkinda" className="hover:text-[#334EAC] transition-colors font-bold">Hakkımızda</Link></li>
              <li><a href="#" className="hover:text-[#334EAC] transition-colors font-bold">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-[#334EAC] font-bold">Bültene Katıl</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="E-posta adresi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/5 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-[#334EAC] font-bold" />
              <button className="bg-[#334EAC] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#283d87] transition-all shadow-md font-bold">Kaydol</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-16 mt-16 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <p>© 2024 Tarih Deposu. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#334EAC]">Gizlilik Politikası</a>
            <a href="#" className="hover:text-[#334EAC]">Kullanım Şartları</a>
          </div>
        </div>
      </footer>
    </div>
  );
}