import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';
import { FaLock } from 'react-icons/fa';  // For an icon
import "./UnauthorizedPage.css";

function UnauthorizedPage() {
  const navigate = useNavigate();

  // Redirect user after 3 seconds (or you can trigger it based on logic)
  useEffect(() => {
    setTimeout(() => {
      navigate('/');  // Redirect to the email verification page
    }, 3000);  // Redirect after 3 seconds
  }, [navigate]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          border: '2px solid #ff5722',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fff3e0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FaLock size={50} color="#ff5722" /> {/* Lock icon */}
        <Typography variant="h5" sx={{ marginTop: 2, color: '#ff5722' }}>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          You are not authorized to view this page.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Redirecting to the correct page...
        </Typography>

        <Button
          variant="contained"
          sx={{
            marginTop: 3,
            backgroundColor: '#ff5722',
            '&:hover': {
              backgroundColor: '#ff3d00',
            },
          }}
          onClick={() => navigate('/')}
        >
          Go to Home Page
        </Button>
      </Box>
    </Container>
  );
}

export default UnauthorizedPage;
