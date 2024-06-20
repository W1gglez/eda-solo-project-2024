import { useState } from 'react';

export default function AddSetForm({
  setExerciseDetails,
  exerciseDetails,
  setDisplayForm,
}) {
  const [set, setSet] = useState({ reps: 0, weight: 0 });

  const handleAddSet = (e) => {
    e.preventDefault();
    setExerciseDetails({
      ...exerciseDetails,
      set_info: [
        ...exerciseDetails.set_info,
        {
          ...set,
          set_number: exerciseDetails.set_info.length + 1,
        },
      ],
    });
    setDisplayForm(false);
  };

  return (
    <>
      <form onSubmit={handleAddSet}>
        <fieldset>
          <legend>{exerciseDetails.name}</legend>
          <label htmlFor='reps'>Reps:</label>
          <input
            id='reps'
            type='number'
            //   value={set.reps}
            placeholder='Enter Reps Completed'
            onChange={(e) => setSet({ ...set, reps: e.target.value })}
            required
          />
          <br />
          <label htmlFor='weight'>Weight:</label>
          <input
            type='number'
            //   value={set.weight}
            onChange={(e) => setSet({ ...set, weight: e.target.value })}
            placeholder='Enter Weight Used'
            required
          />
          <br />
          <button>Insert Confirm Icon</button>
          <button
            type='button'
            onClick={() => {
              setDisplayForm(false);
            }}
          >
            Insert Cancel Icon
          </button>
        </fieldset>
      </form>
    </>
  );
}
