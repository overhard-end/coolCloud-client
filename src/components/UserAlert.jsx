import { Alert, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export const UserAlert = () => {
  const errorMessage = useSelector((state) => state.userReducer.errorMessage);
  return (
    <Box
      display="flex"
      flexDirection="column"
      textAlign="start"
      position="absolute"
      top="200px"
      sx={{}}>
      {errorMessage
        ? errorMessage.map((error) => (
            <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="error">
              {` ${error.msg}`}
            </Alert>
          ))
        : ''}
    </Box>
  );
};
