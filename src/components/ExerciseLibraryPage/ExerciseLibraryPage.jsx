import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import ExerciseSearch from '../ExerciseSearch/ExerciseSearch';
import { useSelector } from 'react-redux';

export default function ExerciseLibrary() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <>
      {user.id ? (
        <>
          <button onClick={() => history.push('/workout-log')}>
            Workout Log
          </button>
          <button>Calorie Tracker</button>
        </>
      ) : (
        <>
          <button
            disabled
            onClick={() => history.push('/workout-log')}
          >
            Workout Log *Lock Icon*
          </button>
          <button disabled>Calorie Tracker *Lock Icon*</button>
        </>
      )}

      {/* Search Options w/ display */}
      <ExerciseSearch />
    </>
  );
}
