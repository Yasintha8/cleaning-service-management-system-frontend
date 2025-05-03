import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role || "user");
      setUsername(parsedUser.username || "username");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="w-full h-[70px] bg-gradient-to-r from-teal-600 to-green-500 shadow-md flex items-center px-6 text-white font-semibold text-lg justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          Cleaning Manager
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`flex-col md:flex-row md:flex md:items-center md:space-x-4 absolute md:static top-[70px] left-0 w-full md:w-auto bg-teal-700 md:bg-transparent text-white p-4 md:p-0 transition-all duration-300 z-40 ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {userRole ? (
          <>
            <span className="mb-4 md:mb-0 md:mr-4">
              Welcome,{" "}
              <span className="hover:text-purple-300 font-bold">{username}</span>
            </span>
            <button
              onClick={() => {
                navigate("/dashboard");
                setMenuOpen(false);
              }}
              className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold mb-3 md:mb-0"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
            className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
