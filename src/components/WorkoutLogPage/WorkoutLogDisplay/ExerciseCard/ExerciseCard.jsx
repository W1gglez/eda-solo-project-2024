import { Card, IconButton, Table, Typography } from '@mui/joy';
import { Delete, Edit, EditOff } from '@mui/icons-material';
import SetInfoDisplay from './SetInfoDisplay/SetInfoDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function ExerciseCard({ e }) {
  const date = useSelector((store) => store.date);
  const [isEditable, setIsEditable] = useState(false);

  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        bgcolor: 'inherit',
        boxShadow: '  5px 5px 10px  #aeaec0 ,  -5px -5px 10px  #FFFFFF',
      }}
    >
      <Typography level='title-lg'>{e.exercise_name}</Typography>
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
          id='edit-btn'
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
            />
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
