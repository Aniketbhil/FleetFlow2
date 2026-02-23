import { useState, useEffect } from "react";
import { apiRequest } from "../api/api";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    const data = await apiRequest("/drivers");
    setDrivers(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await apiRequest("/drivers", "POST", {
      name,
      license_expiry: licenseExpiry,
    });

    setName("");
    setLicenseExpiry("");

    fetchDrivers();
  }

  return (
    <div>
      <h2>Driver Registry</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Driver Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          value={licenseExpiry}
          onChange={(e) => setLicenseExpiry(e.target.value)}
        />

        <button type="submit">Add Driver</button>
      </form>

      <hr />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>License Expiry</th>
            <th>Status</th>
            <th>Safety Score</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.license_expiry}</td>
              <td>{driver.status}</td>
              <td>{driver.safety_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Drivers;