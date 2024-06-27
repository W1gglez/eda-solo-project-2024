import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { ButtonGroup, IconButton, Input } from '@mui/joy';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function DateSelector() {
  const dispatch = useDispatch();
  const date = useSelector((store) => store.date);

  const setDate = (e) => {
    let newDate = e.target.value;
    if (newDate === '') {
      newDate = moment().format('YYYY-MM-DD');
    }
    dispatch({
      type: 'SET_DATE',
      payload: newDate,
    });
  };

  return (
    <ButtonGroup
      sx={{
        flex: 1,
        boxShadow: ' 5px 5px 10px  #aeaec0 , -5px -5px 10px  #FFFFFF',
      }}
    >
      <IconButton
        sx={{
          flex: 1,
          '&:focus': {
            bgcolor: '#c1c4c9',
          },
          '&:focus-within': {
            boxShadow:
              ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
          },
        }}
        onClick={() =>
          dispatch({
            type: 'SET_DATE',
            payload: moment(date).subtract(1, 'd').format('YYYY-MM-DD'),
          })
        }
      >
        <ChevronLeft />
      </IconButton>

      <Input
        sx={{
          bgcolor: 'inherit',
          '&:focus-within': {
            border: 'none',
          },
          '&:focus-within::before': {
            boxShadow:
              ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
          },
        }}
        type='date'
        value={date}
        onChange={setDate}
      />

      <IconButton
        sx={{
          flex: 1,
          '&:focus': {
            bgcolor: '#c1c4c9',
          },
          '&:focus-within': {
            boxShadow:
              ' inset 5px 5px 10px  #aeaec0 , inset -5px -5px 10px  #FFFFFF',
          },
        }}
        onClick={() =>
          dispatch({
            type: 'SET_DATE',
            payload: moment(date).add(1, 'd').format('YYYY-MM-DD'),
          })
        }
      >
        <ChevronRight />
      </IconButton>
    </ButtonGroup>
  );
}
