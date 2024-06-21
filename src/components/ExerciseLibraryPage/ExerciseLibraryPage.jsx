import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import ExerciseSearch from '../ExerciseSearch/ExerciseSearch';

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
          <button onClick={() => history.push('/nutrition-diary')}>
            Calorie Tracker
          </button>
        </>
      ) : (
        <>
          <button disabled>Workout Log *Lock Icon*</button>
          <button disabled>Calorie Tracker *Lock Icon*</button>
        </>
      )}

      {/* Search Options w/ display */}
      <ExerciseSearch />
    </>
  );
}
