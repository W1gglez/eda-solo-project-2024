import { useSelector } from 'react-redux';

export default function NutritionLogProgressBars() {
  const nutritionLog = useSelector((store) => store.nutritionLog);
  const user = useSelector((store) => store.user);
  return (
    <>
      <br />{' '}
      <label htmlFor='calories'>
        Calories: {nutritionLog.total_calories}/{user.bmr}
      </label>
      <progress
        id='calories'
        value={nutritionLog.total_calories}
        max='1500'
      ></progress>
      <br />
      <label htmlFor='protein'>
        Protein: {nutritionLog.total_protein ?? '??'}/{'<Protein Target>'}
      </label>
      <progress
        id='protein'
        value={nutritionLog.total_protein ?? 0}
        max='100'
      ></progress>
      <br />
      <label htmlFor='carbs'>
        Carbs: {nutritionLog.total_carbs ?? '??'}/{'<Carb Target>'}
      </label>
      <progress
        id='carbs'
        value={nutritionLog.total_carbs ?? 0}
        max='100'
      ></progress>
      <br />
      <label htmlFor='fats'>
        Fats: {nutritionLog.total_fats ?? '??'}/{'<Fat Target>'}
      </label>
      <progress
        id='fats'
        value={nutritionLog.total_fats ?? 0}
        max='100'
      ></progress>
    </>
  );
}
