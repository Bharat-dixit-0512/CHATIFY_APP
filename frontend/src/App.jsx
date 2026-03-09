import { useState } from "react";
import "./App.css";
import API_BASE_URL from "./config/api";

function App() {
  const [count, setCount] = useState(0);
  const [apiStatus, setApiStatus] = useState("Not checked");

  const checkBackend = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setApiStatus("Connected");
    } catch (error) {
      setApiStatus(`Failed (${error.message})`);
    }
  };

  return (
    <>
      <h1>Chatify App</h1>
      <div className="card">
        <button onClick={() => setCount((prev) => prev + 1)}>count is {count}</button>
      </div>

      <div className="card">
        <p>API Base URL: {API_BASE_URL}</p>
        <button onClick={checkBackend}>Check Backend Connection</button>
        <p>Backend Status: {apiStatus}</p>
      </div>
    </>
  );
}

export default App;
