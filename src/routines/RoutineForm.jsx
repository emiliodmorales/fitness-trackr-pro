import { useState } from "react";
import { createRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

/** Form for a user to create a new routine with a name and description. */
export default function RoutineForm({ syncRoutines }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryCreateRoutine = async (formData) => {
    setError(null);

    const name = formData.get("name");
    const description = formData.get("description");

    try {
      await createRoutine(token, { name, description });
      syncRoutines();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add a new routine</h2>
      <form action={tryCreateRoutine}>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Description
          <input type="text" name="description" />
        </label>
        <button>Add routine</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
