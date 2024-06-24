import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function NutritionDiaryForm({ setDisplayForm }) {
  const calorieTracker = useSelector((store) => store.calorieTracker);
  const date = useSelector((store) => store.date);
  const [newEntry, setNewEntry] = useState({
    log_id: calorieTracker.log_id,
    date: date,
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ENTRY', payload: newEntry });
    setDisplayForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='new-item-input'>Name:</label>
      <input
        id='new-item-input'
        type='text'
        onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
        required
      />
      <br />
      <label htmlFor='new-item-calories'>Calories: </label>
      <input
        id='new-item-calories'
        type='text'
        onChange={(e) => setNewEntry({ ...newEntry, calories: e.target.value })}
        required
      />
      <br />
      <label htmlFor='new-item-protein'>Protein:</label>
      <input
        placeholder='Optional'
        id='new-item-protein'
        type='text'
        onChange={(e) => setNewEntry({ ...newEntry, protein: e.target.value })}
      />
      <br />
      <label htmlFor='new-item-carbs'>Carbohydrates:</label>
      <input
        placeholder='Optional'
        id='new-item-carbs'
        type='text'
        onChange={(e) => setNewEntry({ ...newEntry, carbs: e.target.value })}
      />
      <br />
      <label htmlFor='new-item-fat'>Fats:</label>
      <input
        placeholder='Optional'
        id='new-item-fat'
        type='text'
        onChange={(e) => setNewEntry({ ...newEntry, fats: e.target.value })}
      />
      <br />
      <button>Submit</button>
      <button
        type='button'
        onClick={() => setDisplayForm(false)}
      >
        Cancel
      </button>
    </form>
  );
}
