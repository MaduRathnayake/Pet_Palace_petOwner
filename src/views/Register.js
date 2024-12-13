import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Button, TextField, Box, Typography, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const registerUser = useStoreActions((actions) => actions.registerUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await registerUser({ name, email, password, phone, city });
      setError('');
      alert('Registration successful! Please login.');
      navigate('/');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f4ff',
        padding: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            padding: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              backgroundColor: '#49416D',
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
              color: '#49416D',
            }}
          >
            Please fill out the form to create your account.
          </Typography>
          {error && (
            <Typography variant="body2" sx={{ color: 'red', marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              placeholder="Enter your name"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Email"
              type='email'
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
  <TextField
    label="Phone Number"
    value={phone}
    onChange={(e) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) { // Allow only numeric values
        setPhone(value);
      }
    }}
    fullWidth
    required
    placeholder="Enter your phone number"
    variant="outlined"
    inputProps={{
      inputMode: 'numeric', // Mobile-friendly numeric keyboard
      pattern: '[0-9]*',    // Numeric pattern for validation
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
      },
    }}
  />
</Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              required
              placeholder="Enter your city name"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Password"
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
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Re-enter Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              placeholder="Re-enter your password"
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
                backgroundColor: '#49416D',
              },
              marginBottom: 2,
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;