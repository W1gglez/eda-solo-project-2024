import { useSelector } from 'react-redux';
import CalorieTrackerProgressBars from './CalorieTrackerProgressBars/CalorieTrackerProgressBars';
import CalorieTrackerDisplayItem from './CalorieTrackerDisplayItem/CalorieTrackerDisplayItem';

export default function CalorieTrackerDisplay() {
  const calorieTracker = useSelector((store) => store.calorieTracker);
  const date = useSelector((store) => store.date);

  const isAllValuesNull = (obj) => {
    return Object.values(obj).every((value) => value === null);
  };

  return (
    <>
      {isAllValuesNull(calorieTracker.log_entrys[0]) ? (
        <p>Add Entry to start tracking</p>
      ) : (
        <>
          <CalorieTrackerProgressBars />
          <table>
            <tbody>
              {calorieTracker.log_entrys.map((f) => {
                return (
                  <CalorieTrackerDisplayItem
                    f={f}
                    key={f.entry_id}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
