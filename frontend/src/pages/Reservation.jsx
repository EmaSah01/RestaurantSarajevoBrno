import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  MenuItem,
  Paper
} from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Reservation = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Brno');

  useEffect(() => {
    if (user) {
      console.log('✅ User is logged in:', user);
      setName(user.name || '');
      setEmail(user.email || '');
    } else {
      console.log('❌ No user logged in');
    }
  }, [user]);

  const availableTimes = [
    '12:00:00', '13:00:00', '14:00:00',
    '18:00:00', '19:00:00', '20:00:00'
  ];

  const cities = ['Brno', 'Prague', 'Sarajevo', 'Mostar'];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = async () => {
    console.log('📝 Submitting reservation for:', { name, email });

    if ((!user && (!name || !email)) || !selectedTime || !city) {
      alert('Please fill in all required fields.');
      return;
    }

    const newReservation = {
      name: user?.name || name,
      email: user?.email || email,
      guests,
      city,
      reservation_date: selectedDate.toISOString().split('T')[0],
      reservation_time: selectedTime
    };

    console.log('📦 Reservation payload:', newReservation);

    try {
      const response = await fetch('http://localhost:5000/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation)
      });

      if (response.ok) {
        alert('Reservation confirmed!');
        setSelectedTime(null);
        setGuests(1);
        setCity('Brno');
        if (!user) {
          setName('');
          setEmail('');
        }
      } else {
        const error = await response.json();
        console.error('❌ Reservation failed:', error);
        alert('Failed to confirm reservation.');
      }
    } catch (error) {
      console.error('⚠️ Error occurred:', error);
      alert('An error occurred.');
    }
  };

  return (
    <Container sx={{ my: 6 }} id="reservation">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#ffffff' }}>
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{ color: '#263238' }}
        >
          Make a Reservation
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <DateCalendar
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
              />
              <TextField
                select
                label="Choose City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              >
                {cities.map((cityName) => (
                  <MenuItem key={cityName} value={cityName}>
                    {cityName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" height="100%">
                <Typography variant="h5" gutterBottom sx={{ color: '#263238' }}>
                  Available Times
                </Typography>
                <List sx={{ flexGrow: 1 }}>
                  {availableTimes.map((time, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        selected={selectedTime === time}
                        onClick={() => handleTimeSelect(time)}
                        sx={{
                          '&.Mui-selected': {
                            backgroundColor: '#ff7043',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#ff8a65',
                            },
                          },
                        }}
                      >
                        <ListItemText primary={time} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

                <Box mt={2}>
                  {user ? (
                    <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
  Booking as: {user.name} {user.last_name} ({user.email})
</Typography>

                  ) : (
                    <>
                      <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                    </>
                  )}

                  <TextField
                    select
                    label="Number of Guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    fullWidth
                  >
                    {[...Array(8)].map((_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {selectedTime && (
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: '#ff7043',
                      '&:hover': { bgcolor: '#ff8a65' },
                    }}
                    onClick={handleConfirm}
                  >
                    Confirm Reservation
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Paper>
    </Container>
  );
};

export default Reservation;
