import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function CalorieTrackerDisplayItem({
  f,
  editable,
  setEditable,
}) {
  const dispatch = useDispatch();
  const date = useSelector((store) => store.date);
  const [newCalories, setNewCalories] = useState(f.calories);
  const [newProtein, setNewProtein] = useState(f.protein);
  const [newCarbs, setNewCarbs] = useState(f.carbs);
  const [newFats, setNewFats] = useState(f.fats);

  return (
    <>
      <td>
        <table>
          <tbody>
            {editable ? (
              <>
                <tr>
                  <td>
                    Calories:
                    <input
                      type='number'
                      value={newCalories}
                      onChange={(e) => setNewCalories(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                {f.protein && (
                  <tr>
                    <td>
                      Protein:{' '}
                      <input
                        type='number'
                        value={newProtein}
                        onChange={(e) => setNewProtein(e.target.value)}
                      />
                    </td>
                  </tr>
                )}
                {f.carbs && (
                  <tr>
                    <td>
                      Carbohydrates:{' '}
                      <input
                        type='number'
                        value={newCarbs}
                        onChange={(e) => setNewCarbs(e.target.value)}
                      />
                    </td>
                  </tr>
                )}
                {f.fats && (
                  <tr>
                    <td>
                      Fats:
                      <input
                        type='number'
                        value={newFats}
                        onChange={(e) => setNewFats(e.target.value)}
                      />
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <>
                <tr>
                  <td>Calories: {f.calories}</td>
                </tr>
                {f.protein && (
                  <tr>
                    <td>Protein: {f.protein}</td>
                  </tr>
                )}
                {f.carbs && (
                  <tr>
                    <td>Carbohydrates: {f.carbs}</td>
                  </tr>
                )}
                {f.fats && (
                  <tr>
                    <td>Fats: {f.fats}</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </td>
      {editable && (
        <td>
          <button
            onClick={() => {
              dispatch({
                type: 'EDIT_ENTRY',
                payload: {
                  ...f,
                  calories: newCalories,
                  protein: newProtein,
                  carbs: newCarbs,
                  fats: newFats,
                  date: date,
                },
              });
              setEditable(false);
            }}
          >
            Update Item
          </button>
        </td>
      )}
    </>
  );
}
