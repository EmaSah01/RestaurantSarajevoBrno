import React, { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  TextField
} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';

const locations = [
  {
    city: 'Brno',
    address: 'Česká Street',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.622728833757!2d16.60536157690544!3d49.1950637713899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712944b7f30829f%3A0x697b4b872dd0b401!2zxb5lc2vDoSwgQnJubywgQ3plY2ggUmVwdWJsaWM!5e0!3m2!1sen!2scz!4v1715079622537!5m2!1sen!2scz'
  },
  {
    city: 'Prague',
    address: 'Wenceslas Square',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2564.049730345194!2d14.420459676863545!3d50.0815710154908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94f33e9724b5%3A0xc3f2ad6b36d6e92c!2sWenceslas%20Square%2C%20110%2000%20Prague%201!5e0!3m2!1sen!2scz!4v1715111111111'
  },
  {
    city: 'Sarajevo',
    address: 'Ferhadija Street',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.962962604564!2d18.414228676878606!3d43.85925407109408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8c263b6cfa9%3A0xd3736eea79bc6a35!2sFerhadija%2C%20Sarajevo%2071000!5e0!3m2!1sen!2sba!4v1715112222222'
  },
  {
    city: 'Mostar',
    address: 'Old Bridge Area',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2930.1938707260086!2d17.80801467688341!3d43.33797297913486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134b4325b99b50b5%3A0x624a5ed28a9c9385!2sMostar%20Old%20Bridge!5e0!3m2!1sen!2sba!4v1715113333333'
  }
];

const Location = () => {
  const [selectedCity, setSelectedCity] = useState('Brno');
  const selectedLocation = locations.find((loc) => loc.city === selectedCity);

  return (
    <Box
      sx={{
        my: 6,
        py: 6,
        textAlign: 'center',
        backgroundColor: '#f5f5f5'
      }}
      id="location"
    >
      <Typography
        variant="h3"
        gutterBottom
        fontWeight="bold"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ color: '#263238' }}
      >
        <RoomIcon sx={{ mr: 1, color: '#ff7043' }} /> Our Locations
      </Typography>
      <Typography variant="body1" mb={3} sx={{ color: '#333' }}>
        Select a location to see details and map:
      </Typography>

      {/* Dropdown to select location */}
      <Box mb={4} display="flex" justifyContent="center">
        <TextField
          select
          label="Choose Location"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {locations.map((loc) => (
            <MenuItem key={loc.city} value={loc.city}>
              {loc.city}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {selectedLocation && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ color: '#263238', mb: 2 }}>
            {selectedLocation.city} – {selectedLocation.address}
          </Typography>
          <Box sx={{ width: '100vw', overflow: 'hidden' }}>
            <iframe
              title={`${selectedLocation.city} Location`}
              src={selectedLocation.mapSrc}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Location;

