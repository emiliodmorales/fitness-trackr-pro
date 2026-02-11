import { Route, Routes } from "react-router";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails.jsx";
import RoutinesPage from "./routines/RoutinesPage.jsx";
import RoutineDetails from "./routines/RoutineDetails.jsx";
import Layout from "./layout/Layout.jsx";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Error404 from "./Error404.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="activities/:id" element={<ActivityDetails />} />

        <Route path="routines">
          <Route index element={<RoutinesPage />} />
          <Route path=":id" element={<RoutineDetails />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
