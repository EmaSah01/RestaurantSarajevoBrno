import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


const MyReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load email from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      const parsedUser = storedUser && JSON.parse(storedUser);
      if (parsedUser?.email) {
        setUserEmail(parsedUser.email);
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
    }
  }, []);

  // Fetch reservations
  useEffect(() => {
    if (!userEmail) return;

    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reservations/user/${userEmail}`);
        const data = await response.json();

        console.log("Fetched reservations:", data);

        if (response.ok) {
          setReservations(data);
        } else {
          console.error('Error fetching reservations:', data.error);
        }
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userEmail]);

  // Cancel reservation
  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      const response = await fetch(`http://localhost:5000/reservations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReservations(prev => prev.filter(r => r.id !== id));
      } else {
        console.error('Failed to cancel reservation');
        alert('Could not cancel reservation.');
      }
    } catch (err) {
      console.error('Error cancelling reservation:', err);
    }
  };

  const formatDateTime = (isoDate, time) => {
  try {
    const base = new Date(isoDate);
    const [hours, minutes, seconds] = time.split(':');
    base.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds || 0));
    return base.toLocaleString();
  } catch {
    return 'Invalid Date';
  }
};

const now = new Date();
const upcoming = reservations.filter(r => {
  const base = new Date(r.reservation_date);
  const [h, m, s] = r.reservation_time.split(':');
  base.setHours(+h, +m, +(s || 0));
  return base > now;
});

const past = reservations.filter(r => {
  const base = new Date(r.reservation_date);
  const [h, m, s] = r.reservation_time.split(':');
  base.setHours(+h, +m, +(s || 0));
  return base <= now;
});


  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Reservations</h2>
      {loading ? (
        <p>Loading reservations...</p>
      ) : (
        <>
          <h3>Upcoming Reservations</h3>
          {upcoming.length > 0 ? (
            upcoming.map((res) => (
              <div
                key={res.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <p><strong>Date & Time:</strong> {formatDateTime(res.reservation_date, res.reservation_time)}</p>
                <p><strong>Guests:</strong> {res.guests}</p>
                <p><strong>City:</strong> {res.city}</p>
                <button
                  onClick={() => handleCancel(res.id)}
                  style={{
                    marginTop: '0.5rem',
                    backgroundColor: '#ff7043',
                    color: '#fff',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel Reservation
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming reservations found.</p>
          )}

          <hr style={{ margin: '2rem 0' }} />

          <h3>Past Reservations</h3>
          {past.length > 0 ? (
            past.map((res) => (
              <div
                key={res.id}
                style={{
                  border: '1px solid #ddd',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#f1f1f1'
                }}
              >
                <p><strong>Date & Time:</strong> {formatDateTime(res.reservation_date, res.reservation_time)}</p>
                <p><strong>Guests:</strong> {res.guests}</p>
                <p><strong>City:</strong> {res.city}</p>
              </div>
            ))
          ) : (
            <p>No past reservations found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyReservation;
