import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

export const AppIcon = () => {
  return (
    <Box position="absolute" left="0">
      <Link to="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
        <IconButton>
          <Typography fontWeight="bold" color="white" variant="h4">
            CoolCloud
            <Cloud fontSize="30px" />
          </Typography>
        </IconButton>
      </Link>
    </Box>
  );
};
