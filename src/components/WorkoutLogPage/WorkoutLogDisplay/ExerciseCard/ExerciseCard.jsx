import { Card, IconButton, Table, Typography } from '@mui/joy';
import { Delete, Edit, EditOff } from '@mui/icons-material';
import SetInfoDisplay from './SetInfoDisplay/SetInfoDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ExerciseCard({ e, i }) {
  const date = useSelector((store) => store.date);
  const [isEditable, setIsEditable] = useState(false);
  const history = useHistory();
  const card_index = i;

  const dispatch = useDispatch();
  return (
    <Card
      id={'Card' + card_index}
      sx={{
        bgcolor: 'inherit',
        boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
      }}
    >
      <Typography
        level='title-lg'
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          history.push(`/exercise-details/${e.exercise_id}`);
        }}
      >
        {e.exercise_name}
      </Typography>
      <IconButton
        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        onClick={() =>
          dispatch({
            type: 'REMOVE_EXERCISE',
            payload: {
              id: e.detail_id,
              date: date,
            },
          })
        }
      >
        <Delete />
      </IconButton>
      {isEditable ? (
        <IconButton
          className='edit-btn'
          sx={{
            position: 'absolute',
            top: '0.875rem',
            right: '2.5rem',
          }}
          onClick={() => setIsEditable(false)}
        >
          <EditOff />
        </IconButton>
      ) : (
        <IconButton
          className='edit-btn'
          sx={{
            position: 'absolute',
            top: '0.875rem',
            right: '2.5rem',
          }}
          onClick={() => setIsEditable(true)}
        >
          <Edit />
        </IconButton>
      )}

      <Table>
        <tbody>
          {e.set_info?.map((s, i) => (
            <SetInfoDisplay
              s={s}
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              key={i}
              card_index={card_index}
            />
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
