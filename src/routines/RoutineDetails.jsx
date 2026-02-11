import { Link, useNavigate, useParams } from "react-router";
import { deleteRoutine, getRoutines } from "../api/routines";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import SetForm from "./SetForm";

export default function RoutineDetails() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [routine, setRoutine] = useState({});

  const syncDetails = () => {
    const fetchDetails = async () => {
      const routines = await getRoutines();
      const routine = routines.filter((routine) => routine.id == id)[0];
      setRoutine(routine);
    };
    fetchDetails();
  };
  useEffect(syncDetails, []);

  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteRoutine(token, routine.id);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!routine) return <p>Loading...</p>;

  return (
    <>
      <h2>{routine.name}</h2>
      <p>{routine.goal}</p>
      <p>Created by {routine.creatorName}</p>
      {routine.sets?.length > 0 ? (
        <>
          <h3>Sets</h3>
          <ul>{routine.sets.map(SetItem)}</ul>
        </>
      ) : (
        <p>Add sets</p>
      )}
      {token && <button onClick={tryDelete}>Delete Routine</button>}
      {error && <p role="alert">{error}</p>}
      {token && <SetForm syncDetails={syncDetails} routineId={routine.id} />}
    </>
  );
}

function SetItem(activity) {
  return (
    <p>
      {activity.name} x{activity.count}
    </p>
  );
}
