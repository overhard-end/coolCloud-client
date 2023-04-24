import { ArrowBack } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';
import { FilesProgresUI } from '../components/FilesProgresUI';
import { ProfileMenu } from '../components/ProfileMenu';

export const Settings = () => {
  return (
    <>
      <AppBar>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit">
                <ArrowBack fontSize="large" fontWeight="bold" />
              </IconButton>
            </Link>
            <Typography sx={{ fontSize: '20px' }} ml="20px" variant="overline" color="white">
              Настройки
            </Typography>
          </Box>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: '100px' }}>
        <Stack spacing={1}>
          <Typography variant="overline" fontSize={'20px'}>
            Хранилище
          </Typography>
          <FilesProgresUI />
          <Button variant="outlined">Купить больше места</Button>
          <Divider />
          <Typography variant="overline" fontSize={'20px'}>
            Язык
          </Typography>
        </Stack>
      </Container>
    </>
  );
};
