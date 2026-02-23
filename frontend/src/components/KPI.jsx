import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";

function KPI() {
  const [vehicles, setVehicles] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const v = await apiRequest("/vehicles");
    const t = await apiRequest("/trips");

    setVehicles(v);
    setTrips(t);
  }

  const activeFleet = vehicles.filter(v => v.status === "On Trip").length;
  const inShop = vehicles.filter(v => v.status === "In Shop").length;
  const utilization = vehicles.length > 0
    ? ((activeFleet / vehicles.length) * 100).toFixed(1)
    : 0;

  return (
    <div>
      <h2>Command Center</h2>
      <p>Active Fleet: {activeFleet}</p>
      <p>Maintenance Alerts: {inShop}</p>
      <p>Utilization Rate: {utilization}%</p>
      <p>Total Trips: {trips.length}</p>
    </div>
  );
}

export default KPI;