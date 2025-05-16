// src/pages/Landing.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import Slider from '../components/Slider';
import Reservation from './Reservation';
import Contact from './Contact';
import RoomIcon from '@mui/icons-material/Room';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Location from './Location';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Landing = ({ user }) => {
  const restaurantImages = [
    "/images/restaurant1.png",
    "/images/restaurant2.png",
    "/images/restaurant3.png"
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [guests, setGuests] = useState(1);

  const availableTimes = [
    '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    alert(`Reservation confirmed for ${guests} guest(s) on ${selectedDate.toDateString()} at ${selectedTime}`);
  };

  return (
    <Box sx={{ mt: '80px', backgroundColor: '#f5f5f5' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: '#607d8b',
          color: '#fff',
          py: 8,
          textAlign: 'center',
        }}
      >
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Typography variant="h2" gutterBottom fontWeight="bold">
            Welcome to Our Restaurant
          </Typography>
          <Typography variant="h5" gutterBottom>
            Experience the finest cuisine in town
          </Typography>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Box
            mt={4}
            sx={{
              border: '2px solid #e0e0e0',
              borderRadius: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            <Slider id="landing-slider" images={restaurantImages} direction="left" />
          </Box>
        </motion.div>
        <Divider sx={{ mt: 6, backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
      </Box>

      {/* About Us Section */}
      <Container sx={{ my: 6 }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#ffffff' }}>
            <Typography
              variant="h3"
              gutterBottom
              textAlign="center"
              fontWeight="bold"
              sx={{ color: '#263238' }}
            >
              🍽️ About Us
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem', textAlign: 'center', mt: 2, color: '#333' }}
            >
              Welcome to our restaurant! We are passionate about providing delicious food and excellent
              service. Our chefs use only fresh, high-quality ingredients to bring you the best dining
              experience.
            </Typography>
          </Paper>
        </motion.div>
      </Container>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Reservation user={user} />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Location />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Contact user={user} />
      </motion.div>
    </Box>
  );
};

export default Landing;
