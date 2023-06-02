import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

import Header from '../components/Header';
import Cloud from '../assets/cloud3.png';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box>
          <Box justifyContent="flex-start">
            <Typography mb="50px" color="primary" fontWeight="600" variant="h2">
              Secure file storage for everyone
            </Typography>
            <img src={Cloud} alt="cloudImage" />
          </Box>
          <Link to="/auth">
            <Button variant="contained">Get started</Button>
          </Link>
        </Box>
      </Container>
    </>
  );
};
