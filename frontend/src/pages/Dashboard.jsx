import { useEffect, useRef } from "react";
import Vehicles from "./Vehicles";
import Drivers from "./Drivers";
import Trips from "./Trips";
import { apiRequest } from "../api/api";
import KPI from "../components/Kpi";

function Dashboard() {
  const socketRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/dashboard");
    socketRef.current = ws;

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log("Realtime event:", data);

      // Refetch fresh data when event received
      await apiRequest("/vehicles");
      await apiRequest("/drivers");
      await apiRequest("/trips");

      window.location.reload(); // simple version for now
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>FleetFlow Dashboard</h1>
      <KPI />
      <Vehicles />
      <Drivers />
      <Trips />
    </div>
  );
}

export default Dashboard;