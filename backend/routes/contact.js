const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      await db.promise().query(
        `INSERT INTO messages (name, email, message, created_at)
         VALUES (?, ?, ?, NOW())`,
        [name, email, message]
      );
      res.status(200).json({ message: 'Message received successfully!' });
    } catch (err) {
      console.error('❌ Failed to save message:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
};


