import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form onSubmit={registerUser}>
      <Stack spacing={2}>
        <h2>Sign Up</h2>
        {errors.registrationMessage && (
          <h3
            className='alert'
            role='alert'
          >
            {errors.registrationMessage}
          </h3>
        )}
        <FormControl>
          <FormLabel htmlFor='username'>Username:</FormLabel>
          <Input
            autoFocus
            autoComplete='off'
            sx={{
              margin: '5px',
              mb: '10px',
              backgroundColor: '#d3d6db',
              border: 'none',
              boxShadow: 'none',
              borderRadius: '0',
              borderBottom: '1px solid #303841',
              '&:focus-within': {
                border: 'none',
              },
              '&:focus-within::before': {
                boxShadow:
                  ' 10px 10px 30px  #aeaec0 , -10px -10px 30px  #FFFFFF',
                borderRadius: '8px',
              },
            }}
            type='text'
            name='username'
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password'>Password: </FormLabel>

          <Input
            sx={{
              margin: '5px',
              mb: '10px',
              backgroundColor: '#d3d6db',
              border: 'none',
              boxShadow: 'none',
              borderRadius: '0',
              borderBottom: '1px solid #303841',
              '&:focus-within': {
                border: 'none',
              },
              '&:focus-within::before': {
                boxShadow:
                  ' 10px 10px 30px  #aeaec0 , -10px -10px 30px  #FFFFFF',
                borderRadius: '8px',
              },
            }}
            type={showPassword ? 'text' : 'password'}
            endDecorator={
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
                sx={{ ':hover': { bgcolor: 'transparent' } }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
            name='password'
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button
            type='submit'
            sx={{
              bgcolor: '#be3144',
              ':hover': { backgroundColor: '#8c2432', opacity: '95%' },
            }}
          >
            Continue
          </Button>{' '}
        </FormControl>
      </Stack>
    </form>
  );
}

export default RegisterForm;
