import React, { useContext } from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { MenuTools } from './MenuTools';
import { SearchField } from './SearchField';
import { ProfileMenu } from './ProfileMenu';
import { AppIcon } from './AppIcon';
import { UserContext } from '..';
import { Link } from 'react-router-dom';

export default function Header() {
  const user = useContext(UserContext);
  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'right' }}>
        <AppIcon />
        {user.tokens.accessToken ? (
          <>
            <Box position="absolute" marginLeft="250px" left="0">
              <MenuTools />
            </Box>
            <SearchField />
            <Box marginLeft="20px">
              <ProfileMenu />
            </Box>
          </>
        ) : (
          <Box>
            <Link to="/auth/sign-in">
              <Button variant="contained">Sign in</Button>
            </Link>
            <Link to="/auth/sign-up">
              <Button variant="contained">Sign up</Button>
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
