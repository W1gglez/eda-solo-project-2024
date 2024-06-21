import { useSelector } from 'react-redux';

export default function CalorieTrackerProgressBars() {
  const calorieTracker = useSelector((store) => store.calorieTracker);
  return (
    <>
      <br />{' '}
      <label htmlFor='calories'>
        {calorieTracker.total_calories}/{'<Calorie Target>'}
      </label>
      <progress
        id='calories'
        value={calorieTracker.total_calories}
        max='1500'
      ></progress>
      <br />
      <label htmlFor='protein'>
        {calorieTracker.total_protein ?? '??'}/{'<Protein Target>'}
      </label>
      <progress
        id='protein'
        value={calorieTracker.total_protein ?? 0}
        max='100'
      ></progress>
      <br />
      <label htmlFor='carbs'>
        {calorieTracker.total_carbs ?? '??'}/{'<Carb Target>'}
      </label>
      <progress
        id='carbs'
        value={calorieTracker.total_carbs ?? 0}
        max='100'
      ></progress>
      <br />
      <label htmlFor='fats'>
        {calorieTracker.total_fats ?? '??'}/{'<Fat Target>'}
      </label>
      <progress
        id='fats'
        value={calorieTracker.total_fats ?? 0}
        max='100'
      ></progress>
    </>
  );
}
