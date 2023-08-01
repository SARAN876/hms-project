import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Oops! The page youre looking for doesnt exist.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The requested page couldnt be found. Please check the URL or go back to the
        <Link to="/">home page</Link>.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ marginTop: '1rem' }}>
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
