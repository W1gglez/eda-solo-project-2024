import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function CalorieTrackerDisplay() {
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
      >
        100%
      </progress>
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
      <table>
        <tbody>
          {calorieTracker.log_entrys.map((f) => {
            return (
              <tr key={f.entry_id}>
                <td>{f.name}</td>
                <td>
                  <ul>
                    <li>Calories: {f.calories}</li>
                    {f.protein && <li>Protein: {f.protein}</li>}
                    {f.carbs && <li>Carbohydrates: {f.carbs}</li>}
                    {f.fats && <li>Fats: {f.fats}</li>}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
