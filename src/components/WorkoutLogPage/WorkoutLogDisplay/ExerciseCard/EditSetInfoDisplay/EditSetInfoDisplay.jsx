import { Check, Close } from '@mui/icons-material';
import { Grid, IconButton, Input, Typography } from '@mui/joy';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EditSetInfoDisplay({
  s,
  updatedSet,
  setUpdatedSet,
  setEditSet,
  editBtn,
}) {
  const date = useSelector((store) => store.date);
  const [newReps, setReps] = useState(s.reps);
  const [newWeight, setWeight] = useState(s.weight);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedSet({
      ...s,
      reps: Number(newReps),
      weight: Number(newWeight),
    });
    console.table(updatedSet);
  }, [newReps, newWeight]);

  return (
    <tr>
      <td style={{ padding: '6px 0px' }}>
        <Grid
          container
          xs={12}
          sx={{ alignItems: 'center' }}
          spacing={2}
        >
          <Grid xs>
            <Input
              sx={{
                p: 0.5,
                bgcolor: 'inherit',
                boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
                '&:focus-within': {
                  border: 'none',
                },
                '&:focus-within::before': {
                  boxShadow:
                    ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                },
              }}
              type='number'
              value={newReps}
              onChange={(e) => {
                setReps(e.target.value);
                console.log(updatedSet);
              }}
              required
              endDecorator='reps'
            />
          </Grid>
          <Grid
            xs={0.5}
            sx={{ p: 0 }}
          >
            <Typography>@</Typography>
          </Grid>
          <Grid xs>
            <Input
              sx={{
                p: 0.5,
                bgcolor: 'inherit',
                boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
                '&:focus-within': {
                  border: 'none',
                },
                '&:focus-within::before': {
                  boxShadow:
                    ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
                },
              }}
              endDecorator='lbs'
              type='number'
              value={newWeight}
              onChange={(e) => {
                setWeight(e.target.value);
                console.log(updatedSet);
              }}
              required
            />
          </Grid>
          <Grid
            xs={3}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              p: 0,
            }}
          >
            <IconButton
              onClick={() => {
                console.log({
                  ...updatedSet,
                  date: date,
                });
                dispatch({
                  type: 'EDIT_SET',
                  payload: {
                    ...updatedSet,
                    date: date,
                  },
                });
                setEditSet(false);
                editBtn.disabled = false;
              }}
            >
              <Check />
            </IconButton>

            <IconButton
              onClick={() => {
                setEditSet(false);
                editBtn.disabled = false;
              }}
            >
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </td>
    </tr>
  );
}
