import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';

function LoginPage() {
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
          <LoginForm />
        </Grid>
        <Grid
          xs={12}
          sx={{ textAlign: 'center' }}
        >
          <Button
            sx={{
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
              history.push('/registration');
            }}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
