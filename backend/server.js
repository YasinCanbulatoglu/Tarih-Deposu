const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345', // Şifren 12345 değilse burayı değiştir
  port: 5432,
});

// Tüm olayları listeleme
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date_year ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tek bir olayı slug ile getirme (Kritik nokta burası)
app.get('/api/events/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE slug = $1', [slug]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Olay bulunamadı" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ekleme ve Silme
app.post('/api/events', async (req, res) => {
  try {
    const { title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image } = req.body;
    await pool.query('INSERT INTO events (title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [title, slug, short_description, details, date_day, date_month, date_year, era, category, cover_image]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(5000, () => console.log("SUNUCU 5000 PORTUNDA ÇALIŞIYOR!"));