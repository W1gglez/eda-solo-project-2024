import { useSelector } from 'react-redux';

export default function ExerciseDisplay() {
  const exercises = useSelector((store) => store.exercises);

  return (
    <table>
      {exercises?.map((e) => (
        <tr key={e.id}>
          <td>{e.name}</td>
        </tr>
      ))}
    </table>
  );
}
