const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Replace with your actual secret (keep it private!)
const JWT_SECRET = 'your_secret_key_here';

module.exports = (db) => {
  // Register
  router.post('/register', async (req, res) => {
    const { username, name, last_name, email, password, consent } = req.body;

    if (!username || !name || !last_name || !email || !password || consent !== true) {
      return res.status(400).json({ error: 'All fields are required and consent must be given.' });
    }

    try {
      // Check if username or email already exists
      const [existingUser] = await db.promise().query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, email]
      );
      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Username or email already exists.' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user
      await db.promise().query(
        'INSERT INTO users (username, name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
        [username, name, last_name, email, hashedPassword]
      );

      return res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Login
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
      const [users] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
      if (users.length === 0) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      const user = users[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      // Create JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.json({
        message: 'Login successful!',
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          last_name: user.last_name,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
};
