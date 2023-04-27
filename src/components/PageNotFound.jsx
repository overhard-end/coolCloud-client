import { ErrorOutline } from '@mui/icons-material';
import React from 'react';

import { Button, Container, Typography } from '@mui/material';

export const PageNotFound = () => {
  return (
    <>
      <Container maxWidth="lg">
        <ErrorOutline sx={{ fontSize: '100px', fill: 'grey' }} />
        <Typography mb="50px" color="gray" variant="h4">
          Page not found !!!
        </Typography>
        <Button onClick={() => document.location.replace('/')} variant="contained">
          Back to Home
        </Button>
      </Container>
    </>
  );
};
