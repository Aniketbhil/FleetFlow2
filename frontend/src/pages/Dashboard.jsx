import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Vehicles from "./Vehicles";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>FleetFlow Dashboard</h1>
      <Vehicles />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;