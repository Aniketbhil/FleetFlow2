import { useState } from "react";
import { apiRequest } from "../api/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("dispatcher");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await apiRequest("/auth/register", "POST", {
      email,
      password,
      role,
    });

    if (data.id) {
      alert("Registration successful. You can now login.");
    } else {
      alert("Registration failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="manager">Manager</option>
        <option value="dispatcher">Dispatcher</option>
        <option value="safety">Safety Officer</option>
        <option value="finance">Financial Analyst</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;