import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-lg">
          MyStore
        </Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/">Home</Link>
        <Link to="/vendors">Vendors</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
