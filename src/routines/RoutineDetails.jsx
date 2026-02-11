import { useNavigate, useParams } from "react-router";
import { deleteRoutine, getRoutines } from "../api/routines";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import SetForm from "../sets/SetForm";
import SetItem from "../sets/SetItem";

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
      <h3>Sets</h3>
      {routine.sets?.length > 0 ? (
        <ul>
          {routine.sets.map((set) => (
            <SetItem
              key={set.id}
              set={set}
              setError={setError}
              syncDetails={syncDetails}
            />
          ))}
        </ul>
      ) : (
        <p>{token ? "Add sets below" : "Login to add sets"}</p>
      )}
      {token && <button onClick={tryDelete}>Delete Routine</button>}
      {error && <p role="alert">{error}</p>}
      {token && <SetForm syncDetails={syncDetails} routineId={routine.id} />}
    </>
  );
}
