import {
  useParams,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AddExerciseDisplay from './AddExerciseDisplay/AddExerciseDisplay';
import AddSetForm from './AddSetForm/AddSetForm';

export default function AddExercisePage() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const date = useSelector((store) => store.date);
  const exerciseDetails = useSelector((store) => store.AddExerciseDetails);
  //   const [exerciseDetails, setExerciseDetails] = useState({
  //     workout_id: params.workout_id,
  //     exercise_id: 0, //exercise.id
  //     exercise_name: '',
  //     set_info: [],
  //   });

  useEffect(() => {
    console.log('Processing useEffect');
    dispatch({ type: 'SET_WORKOUT_ID', payload: params.workout_id });
    setLoading(false);
  }, []);

  const handleLogExercise = () => {
    dispatch({
      type: 'ADD_EXERCISE',
      payload: {
        ...exerciseDetails,
        date: date,
      },
    });
    dispatch({ type: 'CLEAR_DETAILS' });
    history.goBack();
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
      <h3>{exerciseDetails.exercise_name}</h3>
      {loading ? (
        <></>
      ) : (
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
      )}
    </>
  );
}
