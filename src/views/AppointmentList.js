import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const AppointmentList = () => {
  const appointments = useStoreState((state) => state.appointments);
  const fetchAppointments = useStoreActions((actions) => actions.fetchAppointments);
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchAppointments(userId);
    }
  }, [userId, fetchAppointments]);

  const handleCreateAppointment = () => {
    navigate('/create-appointment');
  };

  const groupedAppointments = appointments.reduce((groups, appointment) => {
    const status = appointment.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(appointment);
    return groups;
  }, {});

  const statusColors = {
    Pending: 'warning',
    Confirmed: 'success',
    Completed: 'primary',
    Declined: 'error',
    Canceled: 'error',
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f8f4ff',
        minHeight: '100vh',
        padding: 4,
      }}
    >
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
          <EventAvailableIcon sx={{ fontSize: 40, color: 'white' }} />
        </Avatar>
        <Typography
          variant="h4"
          sx={{
            color: '#4a148c',
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          My Appointments
        </Typography>
        <Typography variant="body1" sx={{ color: '#6a1b9a' }}>
          View and manage your scheduled appointments.
        </Typography>
      </Box>

      {Object.keys(groupedAppointments).length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', width: '100%', color: '#6a1b9a' }}
        >
          No appointments found. Click the button below to create one.
        </Typography>
      ) : (
        Object.keys(groupedAppointments).map((status) => (
          <Box key={status} sx={{ marginBottom: 4 }}>
            <Typography
              variant="h5"
              sx={{
                marginBottom: 2,
                color: '#4a148c',
                fontWeight: 'bold',
              }}
            >
              {status}
            </Typography>
            <Grid container spacing={3}>
              {groupedAppointments[status].map((appointment) => (
                <Grid item xs={12} sm={6} md={4} key={appointment._id}>
                  <Card
                    sx={{
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          color: '#4a148c',
                          fontWeight: 'bold',
                          marginBottom: 1,
                        }}
                      >
                        Pet: {appointment.pet.name} ({appointment.pet.type})
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Owner: {appointment.user.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Doctor: {appointment.doctor.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Date: {new Date(appointment.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Time: {appointment.timeSlot}
                      </Typography>
                      <Chip
                        label={appointment.status}
                        color={statusColors[appointment.status] || 'default'}
                        sx={{ marginTop: 1, fontWeight: 'bold' }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}

      <Button
        onClick={handleCreateAppointment}
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '18px',
          backgroundColor: '#49416D',
          '&:hover': {
            backgroundColor: '#6a1b9a',
          },
          borderRadius: '50%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}
      >
        +
      </Button>
    </Box>
  );
};

export default AppointmentList;
