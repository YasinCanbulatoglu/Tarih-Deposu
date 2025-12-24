const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- VERİTABANI BAĞLANTISI ---
const pool = new Pool({
  user: 'postgres.vighilgfyzxdjjyqqesr', 
  host: 'aws-1-eu-central-1.pooler.supabase.com', 
  database: 'postgres',
  password: '12345', 
  port: 6543, 
  ssl: {
    rejectUnauthorized: false
  }
});

// --- BAĞLANTI TESTİ ---
pool.connect()
  .then(client => {
    console.log("✅ Supabase Bağlantısı Başarılı!");
    client.release();
  })
  .catch(err => {
    console.error("❌ BAĞLANTI HATASI:", err.message);
  });

// --- ROTALAR ---

// 1. Tüm olayları çek
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// 2. Yeni olay ekle
app.post('/api/events', async (req, res) => {
  try {
    const { 
      title, slug, short_description, details, 
      date_day, date_month, date_year, era, 
      category, cover_image, created_by 
    } = req.body;

    await pool.query(
      `INSERT INTO events 
      (title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image, created_by) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, 
      [title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image, created_by || 'Anonim']
    );
    res.json({ success: true, message: "Olay eklendi" });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// 3. Olay Sil
app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM events WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Olay bulunamadı" });
    }
    res.json({ success: true, message: "Olay silindi" });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// 4. Tekil Olay Çek
app.get('/api/events/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE slug = $1', [slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Bulunamadı" });
    res.json(result.rows[0]);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// 5. Olay Güncelle
app.put('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, slug, short_description, details, 
      date_day, date_month, date_year, era, 
      category, cover_image, created_by 
    } = req.body;

    await pool.query(
      `UPDATE events SET 
       title=$1, slug=$2, short_description=$3, details=$4, 
       date_day=$5, date_month=$6, date_year=$7, era=$8, 
       category=$9, cover_image=$10, created_by=$11 
       WHERE id=$12`,
      [title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image, created_by, id]
    );

    res.json({ success: true, message: "Güncellendi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------------
// --- GÜNCELLENEN EDİTÖR YÖNETİMİ VE GİRİŞ SİSTEMİ ---
// --------------------------------------------------------

// 6. Editörleri Listele
app.get('/api/editors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM editors ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 7. Yeni Editör Ekle (ŞİFRE DESTEKLİ)
app.post('/api/editors', async (req, res) => {
  try {
    const { name, role, password } = req.body; 
    
    // Şifre boşsa varsayılan '123456' ata
    const finalPassword = password || '123456';

    await pool.query(
      'INSERT INTO editors (name, role, password) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING', 
      [name, role || 'Editör', finalPassword] 
    );
    
    res.json({ success: true });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// 8. Editör Sil
app.delete('/api/editors/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM editors WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 9. YENİ: Giriş Yap (Login)
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Supabase'den kullanıcıyı bul
    const result = await pool.query(
      'SELECT * FROM editors WHERE name = $1 AND password = $2', 
      [username, password]
    );

    if (result.rows.length > 0) {
      // Kullanıcı bulundu
      const user = result.rows[0];
      res.json({ success: true, user: { id: user.id, name: user.name, role: user.role } });
    } else {
      // Hatalı giriş
      res.status(401).json({ success: false, message: "Kullanıcı adı veya şifre hatalı!" });
    }
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// --------------------------------------------------------

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 BACKEND ${PORT} PORTUNDA HAZIR!`));