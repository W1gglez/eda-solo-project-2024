import {
  useParams,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AddExerciseDisplay from './AddExerciseDisplay/AddExerciseDisplay';
import AddSetForm from './AddSetForm/AddSetForm';
import ExerciseDisplay from '../ExerciseLibraryPage/ExerciseDisplay/ExerciseDisplay';

export default function AddExercisePage() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearch] = useState({ search: '', page: 1 });
  const [displayResults, setDisplayResults] = useState(false);

  const date = useSelector((store) => store.date);
  const setInfo = useSelector((store) => store.setInfo);

  useEffect(() => {
    dispatch({ type: 'SET_WORKOUT_ID', payload: Number(params.workout_id) });
    setLoading(false);
  }, []);

  const handleLogExercise = () => {
    setInfo.set_info.length > 0
      ? (dispatch({
          type: 'ADD_EXERCISE',
          payload: {
            ...setInfo,
            date: date,
          },
        }),
        dispatch({ type: 'CLEAR_DETAILS' }),
        history.goBack())
      : /*Possibly change to modal/popup*/
        alert('You must add a set before logging.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'FETCH_EXERCISES', payload: searchQuery });
    setDisplayResults(true);
    setSearch({ ...searchQuery, search: '' });
  };

  return (
    <>
      <button
        onClick={() => {
          history.goBack();
          dispatch({ type: 'CLEAR_DETAILS' });
        }}
      >
        Insert Back Arrow
      </button>
      <h4>{setInfo.exercise_name}</h4>
      {loading ? (
        <></>
      ) : setInfo.exercise_id ? (
        <>
          <AddExerciseDisplay />
          {displayForm ? (
            <AddSetForm setDisplayForm={setDisplayForm} />
          ) : (
            <>
              <button onClick={() => setDisplayForm(true)}>Add Set</button>
              <button onClick={() => handleLogExercise()}>Log Exercise</button>
            </>
          )}
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={searchQuery.search}
              onChange={(e) =>
                setSearch({ ...searchQuery, search: e.target.value })
              }
              placeholder='Search'
            />
          </form>
          {displayResults && (
            <ExerciseDisplay
              search={searchQuery}
              setDisplayForm={setDisplayForm}
            />
          )}
        </>
      )}
    </>
  );
}
