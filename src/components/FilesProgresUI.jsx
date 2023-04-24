import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatSizeUnits } from '../utils/sizeFormat';

export const FilesProgresUI = () => {
  const files = useSelector((state) => state.filesReducer.files);
  const sizeHumanFormat = formatSizeUnits(files.size);
  const maxSizeHumanFormat = formatSizeUnits(files.maxSize);
  return (
    <Box sx={{}}>
      <LinearProgress variant="determinate" value={(files.size / files.maxSize) * 100} />
      <Typography>{`Использовано ${sizeHumanFormat}  из ${maxSizeHumanFormat}`}</Typography>
    </Box>
  );
};
