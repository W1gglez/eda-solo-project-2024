import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import ExerciseSearch from '../ExerciseSearch/ExerciseSearch';

export default function ExerciseLibrary() {
  const history = useHistory();

  return (
    <>
      {/* workout log/calorie log buttons */}
      <button onClick={() => history.push('/workout-log')}>Workout Log</button>
      <button>Calorie Tracker</button>
      {/* Search Options w/ display */}
      <ExerciseSearch />
    </>
  );
}
