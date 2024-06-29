import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  Table,
  IconButton,
  Card,
  Typography,
  Input,
  Grid,
  Box,
  Button,
} from '@mui/joy';
import { EditOff, Edit, Delete, Check } from '@mui/icons-material';

export default function NutritionLogDisplayItem({ f }) {
  const dispatch = useDispatch();
  const date = useSelector((store) => store.date);
  const [newCalories, setNewCalories] = useState(f.calories);
  const [newProtein, setNewProtein] = useState(f.protein);
  const [newCarbs, setNewCarbs] = useState(f.carbs);
  const [newFats, setNewFats] = useState(f.fats);
  const [editable, setEditable] = useState(false);

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ENTRY', payload: { date: date, id } });
  };
  return (
    <Card
      sx={{
        bgcolor: 'inherit',
        boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
      }}
    >
      <Typography level='title-lg'>{f.name}</Typography>
      <IconButton
        sx={{ position: 'absolute', top: '0.675rem', right: '0.5rem' }}
        onClick={() => handleDelete(f.entry_id)}
      >
        <Delete />
      </IconButton>
      {editable ? (
        <IconButton
          sx={{
            position: 'absolute',
            top: '0.675rem',
            right: '2.5rem',
          }}
          onClick={() => setEditable(false)}
        >
          <EditOff />
        </IconButton>
      ) : (
        <IconButton
          id='edit-btn'
          sx={{
            position: 'absolute',
            top: '0.675rem',
            right: '2.5rem',
          }}
          onClick={() => setEditable(true)}
        >
          <Edit />
        </IconButton>
      )}
      <Table>
        <tbody>
          {editable ? (
            <>
              <tr>
                <td>
                  <Grid
                    container
                    xs={12}
                    sx={{ p: 0, flexDirection: 'row' }}
                  >
                    <Grid
                      xs={4}
                      sx={{ alignContent: 'center', textAlign: 'center' }}
                    >
                      <Typography>Calories:</Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Input
                        sx={{
                          p: 0.5,
                          bgcolor: 'inherit',
                          boxShadow:
                            '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
                          '&:focus-within': {
                            border: 'none',
                          },
                          '&:focus-within::before': {
                            boxShadow:
                              ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                          },
                        }}
                        type='number'
                        value={newCalories}
                        onChange={(e) => setNewCalories(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </td>
              </tr>
              {f.protein && (
                <tr>
                  <td>
                    <Grid
                      container
                      xs={12}
                      sx={{ p: 0, flexDirection: 'row' }}
                    >
                      <Grid
                        xs={4}
                        sx={{ alignContent: 'center', textAlign: 'center' }}
                      >
                        <Typography>Protein:</Typography>
                      </Grid>
                      <Grid xs={8}>
                        <Input
                          endDecorator='g'
                          sx={{
                            p: 0.5,
                            bgcolor: 'inherit',
                            boxShadow:
                              '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
                            '&:focus-within': {
                              border: 'none',
                            },
                            '&:focus-within::before': {
                              boxShadow:
                                ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                            },
                          }}
                          type='number'
                          value={newProtein}
                          onChange={(e) => setNewProtein(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </td>
                </tr>
              )}
              {f.carbs && (
                <tr>
                  <td>
                    <Grid
                      container
                      xs={12}
                      sx={{ p: 0, flexDirection: 'row' }}
                    >
                      <Grid
                        xs={6}
                        sx={{ alignContent: 'center', textAlign: 'center' }}
                      >
                        <Typography>Carbohydrates:</Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Input
                          endDecorator='g'
                          sx={{
                            p: 0.5,
                            bgcolor: 'inherit',
                            boxShadow:
                              '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
                            '&:focus-within': {
                              border: 'none',
                            },
                            '&:focus-within::before': {
                              boxShadow:
                                ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                            },
                          }}
                          type='number'
                          value={newCarbs}
                          onChange={(e) => setNewCarbs(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </td>
                </tr>
              )}
              {f.fats && (
                <tr>
                  <td>
                    <Grid
                      container
                      xs={12}
                      sx={{ p: 0, flexDirection: 'row' }}
                    >
                      <Grid
                        xs={3}
                        sx={{ alignContent: 'center', textAlign: 'center' }}
                      >
                        <Typography>Fats:</Typography>
                      </Grid>
                      <Grid xs={9}>
                        <Input
                          endDecorator='g'
                          sx={{
                            p: 0.5,
                            bgcolor: 'inherit',
                            boxShadow:
                              '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
                            '&:focus-within': {
                              border: 'none',
                            },
                            '&:focus-within::before': {
                              boxShadow:
                                ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                            },
                          }}
                          type='number'
                          value={newFats}
                          onChange={(e) => setNewFats(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </td>
                </tr>
              )}
            </>
          ) : (
            <>
              <tr flex>
                <td style={{ padding: '0px' }}>
                  {' '}
                  <Typography
                    sx={{ flex: 1, alignContent: 'center' }}
                    level='body-md'
                  >
                    <Typography sx={{ fontWeight: 600 }}>Calories: </Typography>
                    {f.calories}
                  </Typography>
                </td>
              </tr>
              {f.protein && (
                <tr>
                  <td style={{ padding: '6px 0px' }}>
                    <Typography level='body-md'>
                      <Typography sx={{ fontWeight: 600 }}>
                        Protein:{' '}
                      </Typography>
                      {f.protein}g
                    </Typography>
                  </td>
                </tr>
              )}
              {f.carbs && (
                <tr>
                  <td style={{ padding: '6px 0px' }}>
                    <Typography level='body-md'>
                      <Typography sx={{ fontWeight: 600 }}>
                        Carbohydrates:
                      </Typography>{' '}
                      {f.carbs}g
                    </Typography>
                  </td>
                </tr>
              )}
              {f.fats && (
                <tr>
                  <td style={{ padding: '6px 0px' }}>
                    <Typography level='body-md'>
                      <Typography sx={{ fontWeight: 600 }}>Fats: </Typography>
                      {f.fats}g
                    </Typography>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </Table>
      {editable && (
        <Grid sx={{ flex: 1, p: 0, textAlign: 'center' }}>
          <Button
            sx={{
              background: '#be3144',
              ':hover': { backgroundColor: '#9e2837', opacity: '95%' },
            }}
            onClick={() => {
              dispatch({
                type: 'EDIT_ENTRY',
                payload: {
                  ...f,
                  calories: newCalories,
                  protein: newProtein,
                  carbs: newCarbs,
                  fats: newFats,
                  date: date,
                },
              });
              setEditable(false);
            }}
          >
            Update
          </Button>
        </Grid>
      )}
    </Card>
  );
}

