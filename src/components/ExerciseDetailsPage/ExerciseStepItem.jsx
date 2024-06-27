import { ListItem, Typography } from '@mui/joy';

export default function ExerciseStepItem({ s }) {
  return (
    <ListItem sx={{ mb: 1 }}>
      <Typography>
        <strong>Step {s.step_number}</strong>: {s.description}
      </Typography>
    </ListItem>
  );
}
