import { Link, useNavigate, useParams } from "react-router";
import { deleteActivity, getActivity } from "../api/activities";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [activity, setActivity] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      setActivity(await getActivity(id));
    };
    fetchDetails();
  }, []);

  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <p>Created by {activity.creatorName}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
      <Link to="/">Back to activities</Link>
    </>
  );
}
