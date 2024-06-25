import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm/RegisterForm';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          width: '90vw',
          maxWidth: '400px',
          padding: '25px',
        }}
      >
        <Grid xs={12}>
          <RegisterForm />
        </Grid>
        <Grid
          container
          xs={12}
        >
          <Grid xs={8}>
            <p>Have an Account?</p>
          </Grid>
          <Grid
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{
                display: 'inline',
                margin: 'auto',
                padding: 0,
                background: 'none',
                borderbottom: '1px solid #303841',
                color: '#303841',
                ':hover': {
                  bgcolor: 'transparent',
                  borderColor: '1px solid #be3144',
                  color: '#be3144',
                },
              }}
              onClick={() => {
                history.push('/login');
              }}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
