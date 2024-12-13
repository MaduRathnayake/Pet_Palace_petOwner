import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy'; // Easy Peasy store actions and state
import { useNavigate } from 'react-router-dom'; // For navigation
import { Button, TextField, Box, Typography, Avatar } from '@mui/material'; // Material-UI components
import PetsIcon from '@mui/icons-material/Pets'; // Icon for branding

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = useStoreActions((actions) => actions.loginUser);
  const error = useStoreState((state) => state.error);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser({ email, password });

    if (result.success) {
      navigate('/appointments');
    } else {
      console.log('Login failed: Invalid credentials or server error');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '100vh',
    //     backgroundColor: '#f8f4ff', // Light pastel purple for a welcoming feel
    //     padding: 2,
    //   }}
    // >
      <form onSubmit={handleSubmit} 
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f8f4ff', // Light pastel purple for a welcoming feel
          padding: 2,
        }
      }>
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            padding: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              backgroundColor: '#6a1b9a',
              width: 60,
              height: 60,
              mb: 2,
              margin: '0 auto',
            }}
          >
            <PetsIcon sx={{ fontSize: 40, color: 'white' }} />
          </Avatar>
          <Typography
            variant="h4"
            sx={{
              marginBottom: 1,
              color: '#4a148c',
              fontWeight: 'bold',
            }}
          >
            Welcome to Pet Palace
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 3,
              color: '#6a1b9a',
            }}
          >
            Please login with your email to get started.
          </Typography>
          {error && (
            <Typography variant="body2" sx={{ color: 'red', marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant="body1"
              sx={{
                marginBottom: 1,
                fontWeight: 'bold',
                color: '#6a1b9a',
              }}
            >
              Email Address
            </Typography>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              placeholder="Enter your email"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant="body1"
              sx={{
                marginBottom: 1,
                fontWeight: 'bold',
                color: '#6a1b9a',
              }}
            >
              Password
            </Typography>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              placeholder="Enter your password"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              padding: '10px',
              backgroundColor: '#49416D',
              '&:hover': {
                backgroundColor: '#6a1b9a',
              },
              marginBottom: 2,
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              padding: '10px',
              borderColor: '#49416D',
              color: '#49416D',
              '&:hover': {
                borderColor: '#6a1b9a',
                color: '#6a1b9a',
              },
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            onClick={handleRegisterRedirect}
          >
            Register
          </Button>
        </Box>
      </form>
    // </Box>
  );
};

export default Login;
