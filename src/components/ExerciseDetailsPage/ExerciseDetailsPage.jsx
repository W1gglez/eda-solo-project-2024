import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import ExerciseStepItem from './ExerciseStepItem';

export default function ExerciseDetailsPage() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const exerciseDetails = useSelector((store) => store.exerciseDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_EXERCISE_DETAILS', payload: { id: params.id } });
  }, []);

  return (
    <>
      <button onClick={() => history.goBack()}>Insert back arrow</button>
      <div>
        <img
          src={exerciseDetails.image_url}
          alt={exerciseDetails.name}
        />
        <h2>{exerciseDetails.name}</h2>
        <ul>
          {exerciseDetails.steps.map((s) => (
            <ExerciseStepItem
              s={s}
              key={s.step_number}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
