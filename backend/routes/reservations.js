const express = require('express');

const router = express.Router();

module.exports = (db) => {
  // POST /reservations
  router.post('/', async (req, res) => {
    const { name, email, guests, city, reservation_date, reservation_time } = req.body;

    if (!name || !reservation_date || !reservation_time || !city) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      // 1️⃣ Find suitable tables
      const [tables] = await db.promise().query(
        'SELECT * FROM tables WHERE city = ? AND size >= ? ORDER BY size ASC',
        [city, guests]
      );

      let foundTable = null;

      for (const table of tables) {
        const [existingReservations] = await db.promise().query(
          `SELECT * FROM reservations
           WHERE table_id = ? AND city = ? AND reservation_date = ?
           AND (
              (reservation_time BETWEEN ? AND SUBTIME(?, '-01:59:59'))
              OR
              (? BETWEEN reservation_time AND ADDTIME(reservation_time, '01:59:59'))
           )`,
          [table.id, city, reservation_date, reservation_time, reservation_time, reservation_time]
        );

        if (existingReservations.length === 0) {
          foundTable = table;
          break;
        }
      }

      // ✅ Book single table if available
      if (foundTable) {
        const insertSql = `
          INSERT INTO reservations
          (name, email, guests, city, reservation_date, reservation_time, table_id)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [name, email, guests, city, reservation_date, reservation_time, foundTable.id];
        await db.promise().query(insertSql, values);

        return res.status(200).json({ message: `Reservation confirmed at table ${foundTable.id}!` });
      }

      // 🔄 Try combinable tables (Brno & Prague only)
      if (city === 'Brno' || city === 'Prague') {
        const [groups] = await db.promise().query(
          `SELECT group_id, SUM(size) as total_size
           FROM tables
           WHERE city = ? AND can_combine = TRUE
           GROUP BY group_id
           HAVING total_size >= ?
           ORDER BY total_size ASC`,
          [city, guests]
        );

        for (const group of groups) {
          const [tablesInGroup] = await db.promise().query(
            `SELECT * FROM tables WHERE city = ? AND group_id = ?`,
            [city, group.group_id]
          );

          let allAvailable = true;
          for (const table of tablesInGroup) {
            const [existingReservations] = await db.promise().query(
              `SELECT * FROM reservations
               WHERE table_id = ? AND city = ? AND reservation_date = ?
               AND (
                  (reservation_time BETWEEN ? AND SUBTIME(?, '-01:59:59'))
                  OR
                  (? BETWEEN reservation_time AND ADDTIME(reservation_time, '01:59:59'))
               )`,
              [
                table.id,
                city,
                reservation_date,
                reservation_time,
                reservation_time,
                reservation_time
              ]
            );

            if (existingReservations.length > 0) {
              allAvailable = false;
              break;
            }
          }

          if (allAvailable) {
            // Book all tables in this group
            for (const table of tablesInGroup) {
              const insertSql = `
                INSERT INTO reservations
                (name, email, guests, city, reservation_date, reservation_time, table_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)
              `;
              const values = [name, email, guests, city, reservation_date, reservation_time, table.id];
              await db.promise().query(insertSql, values);
            }

            return res.status(200).json({
              message: `Reservation confirmed using combined tables (group ${group.group_id})!`
            });
          }
        }
      }

      console.log('Tables found:', tables);


      return res.status(400).json({ error: 'No available tables for the selected time and city.' });
    } catch (err) {
      console.error('Reservation error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });


  // GET /reservations/user/:email
router.get('/user/:email', async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  try {
    const [reservations] = await db.promise().query(
  `SELECT id, reservation_date, reservation_time, guests, city
   FROM reservations
   WHERE email = ?
   ORDER BY reservation_date DESC, reservation_time DESC`,
  [email]
);

    res.status(200).json(reservations);
  } catch (err) {
    console.error('Fetch reservations error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /reservations/:id
router.delete('/:id', async (req, res) => {
  const reservationId = req.params.id;

  try {
    const [result] = await db.promise().query(
      'DELETE FROM reservations WHERE id = ?',
      [reservationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation cancelled' });
  } catch (err) {
    console.error('Cancel reservation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




  return router;
};


