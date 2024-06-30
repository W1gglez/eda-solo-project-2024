import { List, ListItem, Typography } from '@mui/joy';
import { useSelector } from 'react-redux';

export default function AddExerciseDisplay() {
  const setInfo = useSelector((store) => store.setInfo);

  return (
    <List
      id={setInfo.exercise_name}
      sx={{ ml: { xs: 8, md: 16 } }}
    >
      {setInfo.set_info.map((s, i) => (
        <ListItem key={i}>
          <Typography level='body-lg'>
            <Typography sx={{ fontWeight: 700 }}>
              Set {s.set_number}:
            </Typography>{' '}
            {s.reps} reps @ {s.weight} lbs
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}
