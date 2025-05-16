import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Auth from './pages/Auth';
import Coupons from './pages/Coupons';
import MyReservations from './pages/MyReservations';

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser);
      console.log("✅ Loaded user from localStorage:", parsed);
      setUser(parsed);
    } catch (err) {
      console.error("❌ Failed to parse user:", err);
    }
  } else {
    console.log("❌ No user found in localStorage.");
  }

  setLoadingUser(false);

  const handleUnload = () => {
    console.log("🚪 Logging out user on page unload...");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  window.addEventListener('beforeunload', handleUnload);
  return () => {
    window.removeEventListener('beforeunload', handleUnload);
  };
}, []);



  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
<Route path="/" element={<Landing user={user} />} />
        <Route path="/menu" element={<Menu />} />
<Route path="/contact" element={<Contact user={user} />} />

        {/* ✅ Delay Reservation rendering until loadingUser is false */}
        <Route
          path="/reservation"
          element={
            loadingUser
              ? <div style={{ padding: '2rem' }}>Loading...</div>
              : <Reservation user={user} />
          }
        />

        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/my-reservations" element={<MyReservations user={user} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
