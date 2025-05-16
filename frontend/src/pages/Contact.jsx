import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';

const Contact = ({ user }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (user) {
      setForm({
        name: `${user.name} ${user.last_name}`,
        email: user.email,
        message: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = form;
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log('📩 Contact response:', data);

      if (res.ok) {
        alert(data.message);
        setForm({
          name: user ? `${user.name} ${user.last_name}` : '',
          email: user?.email || '',
          message: ''
        });
      } else {
        alert(data.error || 'Failed to send message.');
      }
    } catch (err) {
      console.error('❌ Server error:', err);
      alert('Server error.');
    }
  };

  return (
    <Container sx={{ my: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#ffffff' }}>
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ color: '#263238' }}
        >
          Contact Us
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: { xs: '100%', sm: '70%', md: '50%' },
            mx: 'auto'
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            disabled={!!user}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            disabled={!!user}
          />
          <TextField
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: '#ff7043',
              '&:hover': { bgcolor: '#ff8a65' }
            }}
            type="submit"
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;
