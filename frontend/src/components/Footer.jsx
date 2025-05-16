// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#6b4f3b',
        color: 'white',
        py: 3,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'serif',
          '&:hover': { color: '#d2b48c', cursor: 'pointer' }
        }}
      >
        © 2025 Restaurant. All rights reserved.
      </Typography>
      <MuiLink
        href="#"
        underline="hover"
        sx={{
          color: 'white',
          fontSize: '0.875rem',
          '&:hover': { color: '#d2b48c' }
        }}
      >
        Privacy Policy
      </MuiLink>
    </Box>
  );
};

export default Footer;
