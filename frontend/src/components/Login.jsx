import { useState, useContext } from "react";
import { apiRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await apiRequest("/auth/login", "POST", {
      email,
      password,
    });

    if (data.access_token) {
      login(data.access_token);
      alert("Login successful");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;