import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role || "user");
      setUsername(parsedUser.username || "username"); // Replace 'name' with the correct field (e.g., parsedUser.username)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="w-full h-[70px] bg-gradient-to-r from-teal-600 to-green-500 shadow-md flex items-center px-6 text-white font-semibold text-lg justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          Cleaning Manager
        </Link>
      </div>
      <nav className="flex items-center space-x-4">
        {userRole ? (
          <>
            <span className="mr-4">Welcome, <span className="hover:text-purple-700">{username}</span></span>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
