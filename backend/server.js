const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- İŞTE ÇALIŞACAK OLAN AYARLAR ---
const pool = new Pool({
  // Kullanıcı adın değişti (Pooler kullandığımız için)
  user: 'postgres.vighilgfyzxdjjyqqesr', 
  
  // Host adresi değişti (IPv4 uyumlu olan bu)
  host: 'aws-1-eu-central-1.pooler.supabase.com', 
  
  database: 'postgres',
  password: '12345', // Şifren
  
  // Port numarası 6543 oldu (Çok önemli!)
  port: 6543, 
  
  ssl: {
    rejectUnauthorized: false
  }
});

// --- BAĞLANTI TESTİ ---
console.log("------------------------------------------------");
console.log("⏳ Supabase'e bağlanılıyor (IPv4 Modu)...");

pool.connect()
  .then(client => {
    console.log("✅✅✅ ZAFER! BAĞLANTI BAŞARILI! ✅✅✅");
    console.log("🚀 Veritabanına eriştik.");
    console.log("------------------------------------------------");
    client.release();
  })
  .catch(err => {
    console.error("❌ HATA:", err.message);
  });

// --- ROTALAR ---

app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date_year ASC');
    res.json(result.rows);
  } catch (err) { 
    // Tablo henüz yoksa bu hatayı verir, normaldir.
    console.error("Sorgu Hatası (Tabloyu kurdun mu?):", err.message);
    res.status(500).json({ error: err.message }); 
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const { title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image } = req.body;
    await pool.query(
      'INSERT INTO events (title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', 
      [title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/events/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const result = await pool.query('SELECT * FROM events WHERE slug = $1', [slug]);
      if (result.rows.length === 0) return res.status(404).json({ error: "Bulunamadı" });
      res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

const PORT = 5000;
app.listen(PORT, () => console.log(`SUNUCU ${PORT} PORTUNDA ÇALIŞIYOR!`));