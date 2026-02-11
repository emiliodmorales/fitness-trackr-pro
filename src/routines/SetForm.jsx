import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getActivities } from "../api/activities";

/** Form for a user to create a new routine with a name and description. */
export default function SetForm({ syncDetails, routineId }) {
  const { token } = useAuth();
  if (!token) return;

  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  const [error, setError] = useState(null);

  const tryAddSet = async (formData) => {
    setError(null);

    const activityId = formData.get("activityId");
    const count = formData.get("count");

    try {
      await createSet(token, { activityId, routineId, count });
      syncDetails();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h3>Add a new set</h3>
      <form action={tryAddSet}>
        <label>
          Name
          <select type="text" name="activityId">
            <option>Select activity</option>
            {activities.map(ActivityOption)}
          </select>
        </label>
        <label>
          Count
          <input type="number" min="1" name="count" />
        </label>
        <button>Add set</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}

function ActivityOption(activity) {
  return (
    <option key={activity.id} value={activity.id}>
      {activity.name}
    </option>
  );
}
