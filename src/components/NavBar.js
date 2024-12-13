import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const logoutUser = useStoreActions((actions) => actions.logoutUser); // Action to handle logout
  
  const handleLogout = () => {
    // Clear the session or token here
    logoutUser();  // Assuming you have an action for logging out
    
    // Redirect to the login page
    navigate('/');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#49416D', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pet Palace
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: '#f8f4ff',
          paddingTop: '20px',
          boxSizing: 'border-box',
          borderRight: '2px solid #49416D',
        },
      }}>
        <List>
          <ListItem button component={Link} to="/appointments" onClick={toggleDrawer(false)}>
            <CalendarTodayIcon sx={{ color: '#49416D', marginRight: '10px' }} />
            <ListItemText primary="Appointments" sx={{ color: '#49416D' }} />
          </ListItem>
          <ListItem button component={Link} to="/pets" onClick={toggleDrawer(false)}>
            <PetsIcon sx={{ color: '#49416D', marginRight: '10px' }} />
            <ListItemText primary="Pets" sx={{ color: '#49416D' }} />
          </ListItem>
          <Divider sx={{ borderColor: '#49416D', marginY: '10px' }} />
          {/* Logout Button */}
          <ListItem button onClick={handleLogout}>
            <ExitToAppIcon sx={{ color: '#e91e63', marginRight: '10px' }} />
            <ListItemText primary="Logout" sx={{ color: '#e91e63', fontWeight: 'bold' }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
