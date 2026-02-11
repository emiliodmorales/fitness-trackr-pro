import { useAuth } from "../auth/AuthContext";
import { deleteSet } from "../api/sets";

export default function SetItem({ setError, set, syncDetails }) {
  const { token } = useAuth();

  async function tryDeleteSet() {
    try {
      await deleteSet(token, set.id);
      syncDetails();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <li>
      {set.name} × {set.count}{" "}
      {token && <button onClick={tryDeleteSet}>Remove set</button>}
    </li>
  );
}
