import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ user, setUser }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLogoutSnackbar, setShowLogoutSnackbar] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setLogoutDialogOpen(false);
    setDrawerOpen(false);
    setShowLogoutSnackbar(true); // Show flash message
    navigate('/'); // Redirect to landing
  };

  const navLinks = (
    <>
      <Button component={Link} to="/" sx={navBtnStyle}>Home</Button>
      <Button component={Link} to="/menu" sx={navBtnStyle}>Menu</Button>
      <Button component={HashLink} smooth to="/#reservation" sx={navBtnStyle}>Reservation</Button>
<Button component={Link} to="/contact" sx={navBtnStyle}>Contact</Button>

      {user ? (
        <>
          <Button component={Link} to="/my-reservations" sx={navBtnStyle}>My Reservations</Button>
          <Button component={Link} to="/coupons" sx={navBtnStyle}>🏷️</Button>
          <Button onClick={() => setLogoutDialogOpen(true)} sx={{ ...navBtnStyle, ml: 2 }}>🚪</Button>
        </>
      ) : (
        <Button component={Link} to="/auth" sx={{ ...navBtnStyle, ml: 2 }}>👤</Button>
      )}
    </>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#6b4f3b' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontFamily: 'serif' }}>
            Sarajevo-Brno
          </Typography>

          {isSmallScreen ? (
            <>
              <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box
  sx={{
    width: 250,
    p: 2,
    height: '100%',
    backgroundColor: '#f5f5f5', // light background
    color: '#263238',            // dark text color
    fontFamily: 'serif'
  }}
>

                  <List>
                    <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={HashLink} smooth to="/#reservation" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Reservation" />
                    </ListItem>
                    <ListItem button component={HashLink} smooth to="/#contact" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Contact" />
                    </ListItem>
                    <ListItem button component={Link} to="/menu" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Menu" />
                    </ListItem>
                    {user ? (
                      <>
                        <ListItem button component={Link} to="/my-reservations" onClick={() => setDrawerOpen(false)}>
                          <ListItemText primary="My Reservations" />
                        </ListItem>
                        <ListItem button component={Link} to="/coupons" onClick={() => setDrawerOpen(false)}>
                          <ListItemText primary="Coupons" />
                        </ListItem>
                        <ListItem button onClick={() => {
                          setDrawerOpen(false);
                          setLogoutDialogOpen(true);
                        }}>
                          <ListItemText primary="Logout" />
                        </ListItem>
                      </>
                    ) : (
                      <ListItem button component={Link} to="/auth" onClick={() => setDrawerOpen(false)}>
                        <ListItemText primary="👤 Login" />
                      </ListItem>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box>{navLinks}</Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>Yes, log out</Button>
        </DialogActions>
      </Dialog>

      {/* Flash Message Snackbar */}
      <Snackbar
        open={showLogoutSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowLogoutSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowLogoutSnackbar(false)} severity="info" sx={{ width: '100%' }}>
          You have been logged out.
        </Alert>
      </Snackbar>
    </>
  );
};

const navBtnStyle = {
  color: 'white',
  '&:hover': { bgcolor: '#8b6a4b' }
};

export default Navbar;
