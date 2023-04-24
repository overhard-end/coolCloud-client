import { Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router';
import { UserContext } from '..';
import Header from '../components/Header';

export const AuthPage = () => {
  const user = useContext(UserContext);
  const SignUp = user.build({ toolId: 'ranrlmo' });
  const SignIn = user.build({ toolId: 'albmdao' });

  return (
    <>
      <Header />

      <Container maxWidth="lg">
        <Typography mb="50px" color="gray" variant="h4">
          For using our services, please sing up or sign in to your account.
        </Typography>
        <Routes>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </Container>
    </>
  );
};
