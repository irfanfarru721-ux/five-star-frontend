import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/api.js"; // optional backend functions
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role

  const handleSubmit = async (e) => {
    e.preventDefault();

    // For demo purposes, directly login user
    login({ email, role });
    navigate("/"); // redirect to home after login
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Login / Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
        </select>
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login / Signup
        </button>
      </form>
    </div>
  );
}
