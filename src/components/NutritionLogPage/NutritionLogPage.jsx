import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import NutritionLogDisplay from './NutritionLogDisplay/NutritionLogDisplay';
import NutritionDiaryForm from './NutrionDiaryForm/NutrionDiaryForm';
import DateSelector from '../DateSelector/DateSelector';

export default function NutritionLogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const nutritionLog = useSelector((store) => store.nutritionLog);
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
      <h1>Nutrition Log</h1>
      <DateSelector />

      {isLoading ? (
        <></>
      ) : (
        <>
          {nutritionLog.log_id && <NutritionLogDisplay />}
          {displayForm ? (
            <NutritionDiaryForm setDisplayForm={setDisplayForm} />
          ) : (
            <button onClick={() => setDisplayForm(true)}>Add Entry</button>
          )}
        </>
      )}
    </>
  );
}
