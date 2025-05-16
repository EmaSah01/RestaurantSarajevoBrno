const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const reservationRoutes = require('./routes/reservations');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'restaurant_user',
  password: '1234',
  database: 'restaurant'
});

// ✅ Connect DB
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database!');
});

// ✅ Import authRoutes AFTER db is ready
const authRoutes = require('./routes/auth')(db);
const contactRoutes = require('./routes/contact')(db);

// ✅ Routes
app.use('/reservations', reservationRoutes(db));
app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});