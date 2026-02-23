import { useState, useEffect } from "react";
import { apiRequest } from "../api/api";

function Trips() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [cargo, setCargo] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const vehicleData = await apiRequest("/vehicles");
    const driverData = await apiRequest("/drivers");
    const tripData = await apiRequest("/trips");

    setVehicles(vehicleData.filter(v => v.status === "Available"));
    setDrivers(driverData.filter(d => d.status === "On Duty"));
    setTrips(tripData);
  }

  async function handleDispatch(e) {
    e.preventDefault();

    try {
      await apiRequest("/trips", "POST", {
        vehicle_id: parseInt(selectedVehicle),
        driver_id: parseInt(selectedDriver),
        cargo_weight: parseFloat(cargo),
      });

      fetchData();
    } catch (err) {
      alert("Trip creation failed");
    }
  }

  return (
    <div>
      <h2>Trip Dispatcher</h2>

      <form onSubmit={handleDispatch}>
        <select onChange={e => setSelectedVehicle(e.target.value)}>
          <option>Select Vehicle</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>

        <select onChange={e => setSelectedDriver(e.target.value)}>
          <option>Select Driver</option>
          {drivers.map(d => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Cargo Weight"
          value={cargo}
          onChange={e => setCargo(e.target.value)}
        />

        <button type="submit">Dispatch</button>
      </form>

      <hr />

      <h3>Active Trips</h3>
      {trips.map(trip => (
        <div key={trip.id}>
          Trip #{trip.id} - {trip.status}
        </div>
      ))}
    </div>
  );
}

export default Trips;