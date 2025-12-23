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

// 1. Tüm olayları çek (Admin panelinde listeleme için)
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

// 2. Yeni olay ekle (Editör ismi dahil)
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

// 3. Olay Sil (Admin panelindeki silme butonu için)
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

// 4. Tekil Olay Çek (Slug ile detay sayfası için)
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

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 BACKEND ${PORT} PORTUNDA HAZIR!`));