const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.post('/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  const sql = 'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error('Error inserting contact message:', err);
      return res.status(500).json({ message: 'Failed to save contact message' });
    }
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  const sql = 'INSERT INTO newsletter_subscriptions (email) VALUES (?)';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error inserting subscription:', err);
      return res.status(500).json({ message: 'Failed to subscribe' });
    }
    res.status(200).json({ message: 'Subscribed successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});