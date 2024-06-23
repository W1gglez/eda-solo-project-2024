import { useSelector } from 'react-redux';

export default function CalorieTrackerProgressBars() {
  const calorieTracker = useSelector((store) => store.calorieTracker);
  const user = useSelector((store) => store.user);
  return (
    <>
      <br />{' '}
      <label htmlFor='calories'>
        Calories: {calorieTracker.total_calories}/{user.bmr}
      </label>
      <progress
        id='calories'
        value={calorieTracker.total_calories}
        max='1500'
      ></progress>
      <br />
      <label htmlFor='protein'>
        Protein: {calorieTracker.total_protein ?? '??'}/{'<Protein Target>'}
      </label>
      <progress
        id='protein'
        value={calorieTracker.total_protein ?? 0}
        max='100'
      ></progress>
      <br />
      <label htmlFor='carbs'>
        Carbs: {calorieTracker.total_carbs ?? '??'}/{'<Carb Target>'}
      </label>
      <progress
        id='carbs'
        value={calorieTracker.total_carbs ?? 0}
        max='100'
      ></progress>
      <br />
      <label htmlFor='fats'>
        Fats: {calorieTracker.total_fats ?? '??'}/{'<Fat Target>'}
      </label>
      <progress
        id='fats'
        value={calorieTracker.total_fats ?? 0}
        max='100'
      ></progress>
    </>
  );
}
