import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const { token } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (token) {
    return <Dashboard />;
  }

  return (
    <div>
      {showRegister ? <Register /> : <Login />}

      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? "Go to Login" : "Go to Register"}
      </button>
    </div>
  );
}

export default App;