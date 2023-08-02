import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { getAuth, register } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { DriveFolderUploadRounded, MarkAsUnread } from '@mui/icons-material';

export const AuthPage = () => {
  const { isLoading, error, inVerify } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [authType, setAuthType] = useState('signup');
  const withCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const types = ['signup', 'login'];
  const fields =
    authType === 'signup' ? ['email', 'password', 'confirmPass'] : ['email', 'password'];
  const { control, setError, handleSubmit, watch, reset, clearErrors } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPass: '',
    },
  });
  const emailRegExp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validationRules = (item) => {
    if (item === 'email')
      return {
        pattern: {
          value: emailRegExp,
          message: 'Please enter a valid email',
        },
      };
    if (item === 'confirmPass')
      return {
        validate: (val) => {
          if (watch('password') !== val) return 'Your passwords do no match';
        },
      };
  };
  useEffect(() => {
    if (fields.some((field) => field === error.param)) {
      setError(error.param, { type: 'api', message: error.msg });
    }
  }, [error]);

 
  const onSubmit = async (data, e) => {
    delete data['confirmPass'];
    if(authType ==='signup') return dispatch(register(data))
    dispatch(getAuth(data,));
  };

  return (
    <>
      <Header />
      <Container maxWidth="xs">
      {inVerify ? 
      <Card >
        <CardContent>
        <Typography variant='h3' fontWeight='600' color='primary'> Great!</Typography>
        <Divider/>
        <MarkAsUnread color='primary'/>
        <Typography fontWeight='600'>Check your email to confirm </Typography>
        {/* <Divider/>
        <Button  variant='contained' onClick={()=>document.location.replace('/')} > Back to Home </Button> */}
        </CardContent>
      </Card> : 
<>
        {types.map((type) => (
          <Button
            key={type}
            sx={{ marginLeft: '20px' }}
            variant="contained"
            onClick={() => {
              reset();
              setAuthType(type);
            }}
            disabled={authType === type ? true : false}>
            {withCapitalize(type)}
          </Button>
        ))}
        <Stack marginBottom="30px" marginTop="30px" component="form" spacing={2}>
          <Typography fontWeight="500" variant="h4">
            {withCapitalize(authType)}
          </Typography>

          {fields.map((item) => (
            <Controller
              rules={{
                required: {
                  value: true,
                  message: 'Fill this field',
                },
                ...validationRules(item),
              }}
              key={item}
              name={item}
              control={control}
              render={({ field, fieldState, formState }) => (
                <TextField
                  error={fieldState.invalid}
                  helperText={
                    fieldState.invalid && fieldState.error.message ? fieldState.error.message : ''
                  }
                  label={withCapitalize(field.name)}
                  value={field.value}
                  onChange={field.onChange}
                  onClick={() => clearErrors(item)}
                />
              )}
            />
          ))}
        </Stack>
        <Button onClick={handleSubmit(onSubmit)} variant="outlined">
          {isLoading ? <CircularProgress /> : withCapitalize(authType)}
        </Button>
        <Box paddingTop="20px">
          {error.param === 'server' ? <Alert severity="error">{error.msg}</Alert> : ''}
        </Box>
        </>
}
      </Container>
    </>
  );
};
