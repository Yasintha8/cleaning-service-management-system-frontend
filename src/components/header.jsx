import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!storedUser); // Set true if user exists
  }, []);

  return (
    <header className="w-full h-[70px] bg-gradient-to-r from-teal-600 to-green-500 shadow-md flex items-center px-6 text-white font-semibold text-lg justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          Cleaning Manager
        </Link>
      </div>
      <nav className="flex items-center space-x-4">
        {isLoggedIn ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold"
          >
            Dashboard
          </button>
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
