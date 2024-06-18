import { useSelector, useDispatch } from 'react-redux';

export default function ExerciseDisplay({ search, setSearch }) {
  const exercises = useSelector((store) => store.exercises);
  const dispatch = useDispatch();
  return (
    <>
      <table>
        <tbody>
          {exercises.data?.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
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
              search.page =
                search.page < exercises.totalPages
                  ? search.page - 1
                  : search.page;
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
              console.log(search);
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
