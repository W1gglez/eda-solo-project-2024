import { useSelector } from 'react-redux';

export default function CalorieTrackerDisplay() {
  const calorieTracker = useSelector((store) => store.calorieTracker);
  return (
    <table>
      <tbody>
        {calorieTracker.log_entrys.map((f) => {
          return (
            <tr key={f.entry_id}>
              <td rowSpan={2}>{f.name}</td>
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
  );
}
