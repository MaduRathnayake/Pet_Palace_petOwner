// /views/PetsList.js
import React, { useEffect, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { CircularProgress, Grid, Card, CardContent, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Box, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PetsIcon from '@mui/icons-material/Pets';  // Import the Pets Icon
import { loadPets } from '../controllers/appointmentController';
import axios from 'axios';

const PetsList = () => {
  const { pets, loading_pets, error } = useStoreState((state) => state);  // Get pets from the store
  const [open, setOpen] = useState(false);  // For the dialog box
  const [petDetails, setPetDetails] = useState({ name: '', type: '', breed: '', age: 0 }); // Form data

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    // Load pets when component mounts
    loadPets(userId);
  }, [loadPets, userId]);

  const handleClickOpen = () => {
    setOpen(true);  // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);  // Close the dialog
  };

  const handleChange = (e) => {
    setPetDetails({ ...petDetails, [e.target.name]: e.target.value });
  };

  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const petData = {
      ...petDetails,
      ownerId: userId,  // Use the logged-in user as the pet's owner
    };

    try {
      const token = getAuthToken();
      await axios.post(
        'http://localhost:5001/api/pets/register',  // API URL
        petData,  // Payload (pet data)
        {
          headers: {
            'Content-Type': 'application/json',  // Ensure correct content type
            'Authorization': 'Bearer ' + token,  // Add the Authorization header with Bearer token
          },
        }
      );

      loadPets(userId);  // Reload pets after creating a new one
      handleClose();  // Close the dialog after submission
    } catch (error) {
      console.error('Error creating pet', error);
    }
  };

  if (loading_pets) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ backgroundColor: '#f8f4ff', minHeight: '100vh', padding: '40px' }}>
      {/* Header Section */}
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: '#6a1b9a',
            width: 60,
            height: 60,
            margin: '0 auto',
            mb: 2,
          }}
        >
          <PetsIcon sx={{ fontSize: 40, color: 'white' }} />
        </Avatar>
        <Typography
          variant="h4"
          sx={{
            color: '#4a148c',
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          My Pets
        </Typography>
        <Typography variant="body1" sx={{ color: '#6a1b9a' }}>
          View and manage your Pets with ease.
        </Typography>
      </Box>

      {/* Pets Grid */}
      <Grid container spacing={3}>
        {Array.isArray(pets) && pets.length > 0 ? (
          pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet._id}>
              <Card sx={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', borderRadius: 3, backgroundColor: '#fff' }}>
                <CardContent sx={{ padding: 3 }}>
                  <Typography variant="h6" sx={{ color: '#4a148c', fontWeight: 'bold', marginBottom: 1 }}>
                    {pet.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 0.5 }}>
                    <strong>Type:</strong> {pet.type}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 0.5 }}>
                    <strong>Breed:</strong> {pet.breed}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Age:</strong> {pet.age} years old
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" sx={{ color: '#6a1b9a', fontSize: '1.2rem' }}>
              No pets found. Please add a pet.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#49416D',
          '&:hover': { backgroundColor: '#6a1b9a' },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Dialog Box for Creating Pet */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: '#49416D', color: '#fff' }}>Create a New Pet</DialogTitle>
        <DialogContent>
          <TextField
            label="Pet Name"
            name="name"
            value={petDetails.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            name="type"
            value={petDetails.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Breed"
            name="breed"
            value={petDetails.breed}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            value={petDetails.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PetsList;
