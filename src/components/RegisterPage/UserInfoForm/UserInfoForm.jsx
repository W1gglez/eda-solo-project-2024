import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import FormLabel from '@mui/joy/FormLabel';
import Container from '@mui/joy/Container';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Grid } from '@mui/joy';

export default function UserInfoForm() {
  const user = useSelector((store) => store.user);
  const [userInfo, setUserInfo] = useState({});
  const [height, setHeight] = useState({});
  const dispatch = useDispatch();
  const heightInInches = height.feet * 12 + height.inches;
  const history = useHistory();

  function calculateBmr(gender) {
    switch (gender) {
      case 'Male':
        return (
          66 +
          6.23 * userInfo.weight /* in pounds*/ +
          12.7 * heightInInches /*in inches*/ -
          6.8 * userInfo.age /*in years*/
        );
      case 'Female':
        return (
          655 +
          4.35 * userInfo.weight /*in pounds*/ +
          4.7 * heightInInches /*in inches*/ -
          4.7 * userInfo.age /*in years*/
        );
      default:
        console.error('Invalid Gender');
        return null;
    }
  }

  const addUserInfo = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const genderJson = Object.fromEntries(formData.entries());

    dispatch({
      type: 'ADD_USER_INFO',
      payload: {
        ...userInfo,
        ...genderJson,
        user_id: user.id,
        height: heightInInches,
        bmr: Math.round(calculateBmr(genderJson.gender) * 1.2),
      },
    });
    history.push('/home');
  }; // end registerUser

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '75vh',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        sx={{ width: '90vw', maxWidth: '400px', padding: '25px' }}
      >
        <form onSubmit={addUserInfo}>
          <Stack spacing={3}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={1}
            >
              <Grid xs={12}>
                <FormLabel htmlFor='height'>Height </FormLabel>
              </Grid>
              <Grid xs={6}>
                <FormControl>
                  <Input
                    autoFocus
                    autoComplete='off'
                    sx={{
                      margin: '5px',
                      mb: '10px',
                      backgroundColor: '#d3d6db',
                      border: 'none',
                      boxShadow:
                        ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                      '&:focus-within': {
                        border: 'none',
                      },
                      '&:focus-within::before': {
                        boxShadow:
                          ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                    id='height-feet'
                    type='number'
                    onChange={(e) =>
                      setHeight({ feet: Number(e.target.value) })
                    }
                    required
                    endDecorator='ft'
                  />
                </FormControl>
              </Grid>

              <Grid xs={6}>
                <FormControl>
                  <Input
                    autoComplete='off'
                    sx={{
                      margin: '5px',
                      mb: '10px',
                      backgroundColor: '#d3d6db',
                      border: 'none',
                      boxShadow:
                        ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                      '&:focus-within': {
                        border: 'none',
                      },
                      '&:focus-within::before': {
                        boxShadow:
                          ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                    id='height-inches'
                    type='number'
                    onChange={(e) =>
                      setHeight({ ...height, inches: Number(e.target.value) })
                    }
                    required
                    endDecorator='inches'
                  />
                </FormControl>
              </Grid>

              <Grid xs={6}>
                <FormControl>
                  <FormLabel htmlFor='weight'>Weight</FormLabel>
                  <Input
                    autoComplete='off'
                    sx={{
                      margin: '5px',
                      mb: '10px',
                      backgroundColor: '#d3d6db',
                      border: 'none',
                      boxShadow:
                        ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                      '&:focus-within': {
                        border: 'none',
                      },
                      '&:focus-within::before': {
                        boxShadow:
                          ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                    id='weight'
                    type='number'
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        weight: Number(e.target.value),
                      })
                    }
                    required
                    endDecorator='lbs'
                  />
                </FormControl>
              </Grid>

              <Grid xs={6}>
                <FormControl>
                  <FormLabel htmlFor='age'>Age </FormLabel>
                  <Input
                    autoComplete='off'
                    sx={{
                      margin: '5px',
                      mb: '10px',
                      backgroundColor: '#d3d6db',
                      border: 'none',
                      boxShadow:
                        ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                      '&:focus-within': {
                        border: 'none',
                      },
                      '&:focus-within::before': {
                        boxShadow:
                          ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                    id='age'
                    type='number'
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, age: Number(e.target.value) })
                    }
                    required
                  />
                </FormControl>
              </Grid>

              <Grid xs={12}>
                <FormLabel htmlFor='gender'>Gender</FormLabel>
                <Select
                  sx={{
                    backgroundColor: '#d3d6db',
                    border: 'none',
                    boxShadow:
                      ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',

                    '&:hover': {
                      background: 'inherit',
                      border: 'none',
                      boxShadow:
                        ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                      borderRadius: '8px',
                    },
                    '&:focus-within': {
                      border: 'none',
                    },
                    '&:focus-within::before': {
                      boxShadow:
                        ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                  name='gender'
                  id='gender'
                  placeholder='Select your gender'
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, gender: e.target.value })
                  }
                  required
                >
                  <Option value='Male'>Male</Option>
                  <Option value='Female'>Female</Option>
                </Select>
              </Grid>
            </Grid>

            <Button
              xs={12}
              type='submit'
              sx={{
                background: '#be3144',
                ':hover': { backgroundColor: '#9e2837', opacity: '95%' },
              }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Grid>
    </Container>
  );
}
