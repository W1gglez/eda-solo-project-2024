import ExerciseSearch from '../ExerciseSearch/ExerciseSearch';

export default function ExerciseLibrary() {
  return (
    <>
      {/* workout log/calorie log buttons */}
      <button>Workout Log</button>
      <button>Calorie Tracker</button>
      {/* Normal Search */}
      <ExerciseSearch />

      {/* /Search via musclegroup */}
    </>
  );
}
