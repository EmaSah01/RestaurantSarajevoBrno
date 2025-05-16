import React from 'react';
import '../App.css';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

const Menu = () => {
  const pita = [
    { name: 'Burek', description: 'Meat-filled phyllo pastry – 95 CZK (~8 KM)', image: '/images/menu/burek.png' },
    { name: 'Sirnica', description: 'Cheese-filled phyllo pastry – 95 CZK (~8 KM)', image: '/images/menu/sirnica.png' },
    { name: 'Zeljanica', description: 'Spinach and cheese phyllo pastry – 95 CZK (~8 KM)', image: '/images/menu/zeljanica.png' }
  ];

  const cevapcici = [
    { name: 'Ćevapi (5 pcs)', description: 'Grilled minced meat with flatbread and onion – 100 CZK (~8 KM)', image: '/images/menu/cevapi5.png' },
    { name: 'Ćevapi (10 pcs)', description: 'Grilled minced meat with flatbread and onion – 200 CZK (~16 KM)', image: '/images/menu/cevapi10.png' }
  ];

  const pizza = [
    { name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, and basil – 160 CZK (~13 KM)', image: '/images/menu/margarita.png' },
    { name: 'Pepperoni Pizza', description: 'Spicy pepperoni with cheese and tomato sauce – 160 CZK (~13 KM)', image: '/images/menu/pepperoni.png' }
  ];

  const otherDishes = [
    { name: 'Beef Steak with Potatoes', description: 'Juicy grilled steak served with crispy potatoes – 220 CZK (~18 KM)', image: '/images/menu/steak.png' },
    { name: 'Spaghetti Carbonara', description: 'Classic Italian pasta with creamy sauce – 140 CZK (~11 KM)', image: '/images/menu/carbonara.png' },
    { name: 'Caesar Salad', description: 'Crisp romaine with Caesar dressing – 120 CZK (~10 KM)', image: '/images/menu/salad.png' }
  ];

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: true
        }
      }
    ]
  };

  const renderSection = (title, items) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <Box my={6}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          sx={{ color: '#263238' }}
        >
          {title}
        </Typography>
        <Divider sx={{ mb: 3, bgcolor: '#ccc' }} />
        <Slider {...sliderSettings}>
          {items.map((dish, index) => (
            <Box key={index} px={1}>
              <Card
                sx={{
                  width: 280,
                  height: 370,
                  margin: 'auto',
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  boxShadow: 3,
                  bgcolor: '#fafafa',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={dish.image}
                  alt={dish.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{dish.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{dish.description}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </motion.div>
  );

  return (
    <Box sx={{ mt: '80px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container sx={{ pt: 6, pb: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#ffffff' }}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              fontWeight="bold"
              sx={{ color: '#263238' }}
            >
              Our Menu
            </Typography>
            {renderSection('Pita', pita)}
            {renderSection('Ćevapi', cevapcici)}
            {renderSection('Pizza', pizza)}
            {renderSection('Other Dishes', otherDishes)}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Menu;
