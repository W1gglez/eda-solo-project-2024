import { Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';

export default function ExerciseLibrary() {
  const dispatch = useDispatch();

  return (
    <>
      {/* workout log/calorie log buttons */}
      <Button color='primary'>Workout Log</Button>
      <Button>Calorie Tracker</Button>
      {/* Search Bar */}

      {/* /Musclegroup widgets? */}
    </>
  );
}
