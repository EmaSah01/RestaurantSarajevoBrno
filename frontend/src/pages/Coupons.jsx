import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Modal,
  IconButton
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import CloseIcon from '@mui/icons-material/Close';

const Coupons = () => {
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleOpen = (coupon) => {
    setSelectedCoupon(coupon);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Coupon data
  const coupons = [
    {
      id: 'margarita',
      title: 'Pizza Margherita + Coke',
      description: '🍕 Enjoy a delicious Pizza Margherita with a refreshing Coke.',
      price: '150 CZK / 12 KM (Save 50 CZK / 4 KM!)',
      image: 'images/coupons/margarita_coke.png',
      qrValue: 'https://your-restaurant.com/coupons/margarita'
    },
    {
      id: 'burek',
      title: 'Burek + Yogurt',
      description: '🥙 Traditional burek served with refreshing yogurt.',
      price: '100 CZK / 8 KM (Save 30 CZK / 2.5 KM!)',
      image: 'images/coupons/burek_yogurt.png',
      qrValue: 'https://your-restaurant.com/coupons/burek'
    }
  ];

  return (
    <Box sx={{ mt: '80px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#ffffff' }}>
          <Typography
            variant="h3"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
            sx={{ color: '#263238' }}
          >
            🏷️ Special Coupons
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: '1.1rem', textAlign: 'center', mt: 2, color: '#333' }}
          >
            Check out our latest deals and enjoy great savings at our restaurant.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 4, justifyContent: 'center' }}>
  {coupons.map((coupon) => (
    <Grid item xs={12} sm={6} md={5} lg={4} key={coupon.id}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
        onClick={() => handleOpen(coupon)}
      >
        <Box sx={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
  <img
    src={coupon.image}
    alt={coupon.title}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />
</Box>

        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {coupon.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {coupon.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#ff7043', fontWeight: 'bold' }}>
            {coupon.price}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  ))}
</Grid>

        </Paper>
      </Container>

      {/* QR Code Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            width: 300
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedCoupon && (
            <>
              <Typography variant="h6" gutterBottom>
                Scan to redeem: {selectedCoupon.title}
              </Typography>
              <QRCodeCanvas value={selectedCoupon.qrValue} size={200} />
              <Typography variant="body2" sx={{ mt: 2, color: '#888' }}>
                Show this QR code at the counter.
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Coupons;
