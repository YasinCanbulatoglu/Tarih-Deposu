📜 Tarih Deposu (TK) TÜRKÇE AÇIKLAMA 
Selamlar! Bu proje benim "şu tarih işini düzgün bir yere toplayayım" diyerek başladığım, Next.js ile geliştirdiğim dijital arşiv çalışmam. Öyle sağdan soldan kopyala-yapıştır yapıp bırakmadım; her butonuyla, karanlık moduyla, mobil uyumuyla tek tek uğraştım.

🚀 Mevzu Ne?
Tarih dediğin şey derya deniz ama aradığını bulmak bazen ölüm oluyor. Ben de hem kendim kullanayım hem de başkaları faydalansın diye bu projeyi ayağa kaldırdım. Neler mi yaptım?

Dark Mode Mevzusu: Gözü yormasın diye gece modunu ekledim. Işığı sevene güneş, karanlık sevene ay!

Mobil Uyum: Bilgisayarda güzel duruyor eyvallah ama asıl olay cepte olmasıydı. Oppo A16 telefonumda da çatır çatır çalışır hale getirdim.

Akıllı Arama: "Tarihte ara..." kısmına bir şey yazdığında seni uğraştırmadan sonucu önüne getirsin diye kastık.

Kayan Yazı & Efektler: Sitede biraz aksiyon olsun diye Tailwind ile kayan yazılar ve yukarı doğru açılan tatlı animasyonlar ekledim.

🛠️ Arkada Neler Dönüyor?
Frontend: Next.js (App Router ile en güncel hali neyse o).

Stil: Tailwind CSS (Animasyonları falan buraya gömdüm, tertemiz oldu).

Mobil Taraf: Capacitor (Web projesini telefona taşıyan o gizli kahraman).

Backend: Node.js & Express (Veritabanıyla telefon arasındaki o köprü).

⚙️ Çalıştırmak İsteyenlere
Kodu bilgisayarına çektiysen şu adımları izle, yoksa hata alırsın:

Önce şu meşhur paketleri bir yükle:

Bash

npm install
Frontend'i başlat:

Bash

npm run dev
Backend'i de açmayı unutma, yoksa site boş görünür (sonra bana "veri gelmiyor" diye sorma!):

Bash

node index.js
⚠️ Önemli Not (Tecrübeyle Sabit!)
Eğer Telefon yada sanal bir emülatöre kurulcaksa Vanguard gibi emülatörü bozan şeylerle uğraşma, direkt kabloyu tak. Bir de kodda localhost yazan yerleri bilgisayarının kendi IP'siyle (192.168.x.x gibi) değiştirmeyi ve npx cap sync yapmayı unutma. Yoksa telefon backend'i görmüyor, benden söylemesi.



📜 History Depot (TK)  ENGLISH EXPLANATION
Yo! This is my digital archive project that I built with Next.js because I wanted to gather all this history stuff in one proper place. I didn't just copy-paste some code and call it a day; I spent hours on every single button, dark mode toggle, and mobile responsiveness.

🚀 What’s the Deal?
History is an endless ocean, but finding what you're looking for can be a nightmare. I built this project for myself and for anyone else who's a history geek. Here’s what I’ve done:

Dark Mode Thingy: Added a night mode so your eyes don't burn. Sun for the light lovers, moon for the dark side!

Mobile Ready: It looks great on desktop, sure, but the real deal was having it in my pocket. I finally got it running smoothly on my Oppo A16.

Smart Search: I worked hard on the "Search history..." part so it brings you results instantly without making you sweat.

Marquee & Effects: To add some action, I used Tailwind to create scrolling text and those smooth "fade-in-up" animations.

🛠️ What’s Happening Under the Hood?
Frontend: Next.js (Using App Router—the latest and greatest).

Styling: Tailwind CSS (Buried all the animations and custom styles here, keepin' it clean).

Mobile Bridge: Capacitor (The unsung hero that carries the web project to the phone).

Backend: Node.js & Express (The bridge between the database and the mobile app).

⚙️ How to Run It
If you pulled this code to your machine, follow these steps or you'll run into errors:

First, install those famous packages:

Bash

npm install
Fire up the frontend:

Bash

npm run dev
Don't forget to start the backend, or the site will look empty (don't come asking me "where's the data!" later):

Bash

node index.js
⚠️ Pro Tip (Learned the Hard Way!)
If you’re trying to run this on a phone or an emulator: Don't mess with stuff like Riot Vanguard that breaks emulators. Just plug in the cable. Also, remember to change any localhost links in the code to your computer’s local IP (like 192.168.x.x) and run npx cap sync. Otherwise, the phone won't see the backend. Trust me on this one.
