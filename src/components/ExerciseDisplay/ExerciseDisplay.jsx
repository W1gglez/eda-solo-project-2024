import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function ExerciseDisplay({ search }) {
  const location = useLocation();
  const exercises = useSelector((store) => store.exercises);
  const dispatch = useDispatch();

  console.log(location);

  return (
    <>
      <table>
        <tbody>
          {exercises.data?.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>
                {location.pathname === '/home' ? (
                  <></>
                ) : (
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'SET_EXERCISE_ID',
                        payload: {
                          exercise_id: e.id,
                          exercise_name: e.name,
                        },
                      })
                    }
                  >
                    Insert Add Icon
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {exercises.totalPages === 1 ? (
        <></>
      ) : (
        <>
          <button
            onClick={() => {
              search.page = search.page > 1 ? search.page - 1 : search.page;
              dispatch({ type: 'FETCH_EXERCISES', payload: search });
            }}
          >
            Previous Page
          </button>
          <button
            onClick={() => {
              search.page =
                search.page < exercises.totalPages
                  ? search.page + 1
                  : search.page;
              dispatch({ type: 'FETCH_EXERCISES', payload: search });
            }}
          >
            Next Page
          </button>
        </>
      )}
    </>
  );
}
