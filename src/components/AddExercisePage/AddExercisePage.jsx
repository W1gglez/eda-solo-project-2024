import {
  useParams,
  useHistory,
} from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import AddExerciseDisplay from './AddExerciseDisplay/AddExerciseDisplay';
import AddSetForm from './AddSetForm/AddSetForm';
import moment from 'moment';

export default function AddExercisePage() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [displayForm, setDisplayForm] = useState(false);
  const [exerciseDetails, setExerciseDetails] = useState({
    workout_id: params.workout_id,
    exercise_id: 4, //exercise.id
    set_info: [],
  });

  const handleLogExercise = () => {
    console.log('in handleLogExercise');
    dispatch({
      type: 'ADD_EXERCISE',
      payload: {
        ...exerciseDetails,
        date: moment(params.date).format('YYYY-MM-DD'),
      },
    });
    history.goBack();
  };
  return (
    <>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        Insert Back Arrow
      </button>
      {/* <h3>{exercise.name}</h3> */}
      <AddExerciseDisplay exerciseDetails={exerciseDetails} />
      {displayForm ? (
        <AddSetForm
          setExerciseDetails={setExerciseDetails}
          exerciseDetails={exerciseDetails}
          setDisplayForm={setDisplayForm}
        />
      ) : (
        <>
          <button onClick={() => setDisplayForm(true)}>Add Set</button>
          <button onClick={() => handleLogExercise()}>Log Exercise</button>
        </>
      )}
    </>
  );
}
