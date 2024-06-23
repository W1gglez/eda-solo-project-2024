import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AddSetForm({ setDisplayForm }) {
  const setInfo = useSelector((store) => store.setInfo);
  const [set, setSet] = useState({ reps: 0, weight: 0 });
  const dispatch = useDispatch();

  const handleAddSet = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_SET_INFO',
      payload: [
        ...setInfo.set_info,
        {
          ...set,
          set_number: setInfo.set_info.length + 1,
        },
      ],
    });
    setDisplayForm(false);
  };

  return (
    <>
      <form onSubmit={handleAddSet}>
        <fieldset>
          <legend>Add Set</legend>
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
