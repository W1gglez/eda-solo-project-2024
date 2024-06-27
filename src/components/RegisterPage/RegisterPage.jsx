import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm/RegisterForm';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Clear from '@mui/icons-material/Clear';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
      }}
    >
      <IconButton
        onClick={() => history.push('/')}
        sx={{
          position: 'absolute',
          top: '3%',
          right: '5%',
          boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',
        }}
      >
        <Clear />
      </IconButton>
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
            <p>Have an account?</p>
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
              <Typography level='body-lg'>Sign In</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
