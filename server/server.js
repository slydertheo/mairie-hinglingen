require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { pool, init } = require('./db');

const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!ADMIN_PASSWORD || !JWT_SECRET) {
  console.error('ADMIN_PASSWORD et JWT_SECRET doivent être définis (voir .env.example).');
  process.exit(1);
}

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d', immutable: true }));

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Non authentifié' });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Session invalide ou expirée' });
  }
}

app.post('/api/login', (req, res) => {
  const { password } = req.body || {};
  if (typeof password !== 'string' || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token });
});

// Clé alphanumérique simple (+ tiret/underscore) pour éviter toute injection de chemin.
const KEY_PATTERN = /^[a-zA-Z0-9_-]+$/;

app.get('/api/content/:key', async (req, res) => {
  if (!KEY_PATTERN.test(req.params.key)) return res.status(400).json({ error: 'Clé invalide' });
  try {
    const { rows } = await pool.query('SELECT value FROM content WHERE key = $1', [req.params.key]);
    res.json({ value: rows.length ? rows[0].value : null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.put('/api/content/:key', requireAuth, async (req, res) => {
  if (!KEY_PATTERN.test(req.params.key)) return res.status(400).json({ error: 'Clé invalide' });
  const { value } = req.body || {};
  if (value === undefined) return res.status(400).json({ error: 'Champ "value" manquant' });
  try {
    await pool.query(
      `INSERT INTO content (key, value, updated_at) VALUES ($1, $2, now())
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = now()`,
      [req.params.key, JSON.stringify(value)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, '') || '.jpg';
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Seules les images sont acceptées'));
    cb(null, true);
  },
});

app.post('/api/upload', requireAuth, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });
    res.json({ url: `/uploads/${req.file.filename}` });
  });
});

init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API mairie-hinglingen à l'écoute sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Impossible d\'initialiser la base de données :', err);
    process.exit(1);
  });
