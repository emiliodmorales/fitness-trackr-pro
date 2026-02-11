import { Link } from "react-router";

export default function RoutineList({ routines, syncRoutines }) {
  return (
    <ul>
      {routines.map((routine) => (
        <RoutineListItem
          key={routine.id}
          routine={routine}
          syncRoutines={syncRoutines}
        />
      ))}
    </ul>
  );
}

function RoutineListItem({ routine, syncRoutines }) {
  return (
    <li>
      <p>
        <Link to={"/routines/" + routine.id}>{routine.name}</Link>
      </p>
    </li>
  );
}
