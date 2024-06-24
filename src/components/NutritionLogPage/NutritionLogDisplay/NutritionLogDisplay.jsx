import { useSelector } from 'react-redux';
import NutritionLogProgressBars from './NutritionLogProgressBars/NutritionLogProgressBars';
import NutritionLogDisplayItem from './NutritionLogDisplayItem/NutritionLogDisplayItem';

export default function NutritionLogDisplay() {
  const nutritionLog = useSelector((store) => store.nutritionLog);
  const date = useSelector((store) => store.date);

  const isAllValuesNull = (obj) => {
    return Object.values(obj).every((value) => value === null);
  };

  return (
    <>
      {isAllValuesNull(nutritionLog.log_entrys[0]) ? (
        <p>Add Entry to start tracking</p>
      ) : (
        <>
          <NutritionLogProgressBars />
          <table>
            <tbody>
              {nutritionLog.log_entrys.map((f) => {
                return (
                  <NutritionLogDisplayItem
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
