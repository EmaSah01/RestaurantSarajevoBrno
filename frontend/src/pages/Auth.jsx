import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleAuth = () => {
    if (isLogin) {
      if (!username || !password) {
        alert('Please fill in all fields.');
        return;
      }
    } else {
      if (!username || !firstName || !lastName || !email || !password || !confirmPassword || !consent) {
        alert('Please fill in all fields and agree to the terms.');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
    }

    const route = isLogin ? 'login' : 'register';

    const payload = isLogin
      ? { username, password }
      : {
          username,
          name: firstName,
          last_name: lastName,
          email,
          password,
          consent
        };

    fetch(`http://localhost:5000/auth/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong.');
        }
        return data;
      })
      .then((data) => {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          if (setUser) setUser(data.user);
          alert('Login successful!');
          navigate('/');
        } else {
          alert(data.message || 'Registration successful!');
          setIsLogin(true);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || 'Error occurred.');
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        pt: 10,
        pb: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Tabs
            value={isLogin ? 0 : 1}
            onChange={(e, newValue) => setIsLogin(newValue === 0)}
            centered
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              {isLogin ? 'Login' : 'Register'}
            </Typography>

            {/* Username */}
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />

            {/* Register Fields */}
            {!isLogin && (
              <>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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

            {/* Password */}
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* Confirm Password */}
            {!isLogin && (
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}

            {/* Consent */}
            {!isLogin && (
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <Typography sx={{ ml: 1 }}>I agree to the terms of service</Typography>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#ff7043',
                '&:hover': { bgcolor: '#ff8a65' }
              }}
              onClick={handleAuth}
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Auth;
