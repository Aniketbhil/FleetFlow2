import { useState, useEffect } from "react";
import { apiRequest } from "../api/api";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [odometer, setOdometer] = useState("");

  // Fetch vehicles when component loads
  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    const data = await apiRequest("/vehicles");
    setVehicles(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await apiRequest("/vehicles", "POST", {
      name,
      plate_number: plate,
      max_capacity: parseFloat(capacity),
      odometer: parseFloat(odometer),
    });

    // Clear form
    setName("");
    setPlate("");
    setCapacity("");
    setOdometer("");

    // Refresh list
    fetchVehicles();
  }

  return (
    <div>
      <h2>Vehicle Registry</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Plate Number"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />
        <input
          placeholder="Max Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <input
          placeholder="Odometer"
          value={odometer}
          onChange={(e) => setOdometer(e.target.value)}
        />
        <button type="submit">Add Vehicle</button>
      </form>

      <hr />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Plate</th>
            <th>Capacity</th>
            <th>Odometer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
              <td>{vehicle.plate_number}</td>
              <td>{vehicle.max_capacity}</td>
              <td>{vehicle.odometer}</td>
              <td>{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicles;