export default function ExerciseStepItem({ s }) {
  return (
    <li>
      Step {s.step_number}: {s.description}
    </li>
  );
}
