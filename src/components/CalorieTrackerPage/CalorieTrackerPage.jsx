import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CalorieTrackerDisplay from './CalorieTrackerDisplay/CalorieTrackerDisplay';
import NutritionDiaryForm from './NutrionDiaryForm/NutrionDiaryForm';

export default function CalorieTrackerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const calorieTracker = useSelector((store) => store.calorieTracker);
  const date = useSelector((store) => store.date);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    dispatch({
      type: 'FETCH_TRACKER',
      payload: { date: date },
    });
    setIsLoading(false);
  }, [date]);

  return (
    <>
      <h1>Nutrition Diary</h1>
      <input
        type='date'
        value={date}
        onChange={(e) => {
          dispatch({
            type: 'SET_DATE',
            payload: e.target.value,
          }),
            setDisplayForm(false);
        }}
      />

      {isLoading ? (
        <></>
      ) : (
        <>
          {calorieTracker.log_id && <CalorieTrackerDisplay />}
          {displayForm && (
            <NutritionDiaryForm setDisplayForm={setDisplayForm} />
          )}
          {displayForm || (
            <button onClick={() => setDisplayForm(true)}>Add Entry</button>
          )}
        </>
      )}
    </>
  );
}
