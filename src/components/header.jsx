import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route
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

  const isHome = location.pathname === "/"; // Check if the current page is the homepage

  return (
    <header className="w-full h-[70px] bg-gradient-to-r from-teal-600 to-green-500 shadow-md flex items-center justify-between px-6 text-white font-semibold text-lg sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">Cleaning Manager</Link>
      </div>

      {/* Desktop & Tablet Navigation Links - Show only on Home page */}
      {isHome && (
        <nav className="hidden lg:flex items-center justify-center space-x-6 text-white font-semibold">
          <a href="#" className="hover:text-green-200 transition">Home</a>
          <a href="#services" className="hover:text-green-200 transition">Services</a>
          <a href="#about" className="hover:text-green-200 transition">About Us</a>
          <a href="#contact" className="hover:text-green-200 transition">Contact Us</a>
        </nav>
      )}

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} className="cursor-pointer" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        className={`flex-col lg:flex-row lg:flex lg:items-center lg:space-x-4 absolute lg:static top-[70px] left-0 w-full lg:w-auto bg-teal-700 lg:bg-transparent text-white p-4 lg:p-0 transition-all duration-300 z-40 ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {isHome && (
          <div className="lg:hidden flex flex-col space-y-4">
          <a href="#" className="hover:text-green-800 transition mb-4 lg:mb-0">Home</a>
          <a href="#services" className="hover:text-green-800 transition mb-4 lg:mb-0">Services</a>
          <a href="#about" className="hover:text-green-800 transition mb-4 lg:mb-0">About Us</a>
          <a href="#contact" className="hover:text-green-800 transition mb-4 lg:mb-0">Contact Us</a>
        </div>
        )}
      
        {userRole ? (
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
            <span className="lg:mb-0">
              Welcome,{" "}
              <span className="hover:text-purple-300 font-bold">{username}</span>
            </span>
            <button
              onClick={() => {
                navigate("/dashboard");
                setMenuOpen(false);
              }}
              className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4 lg:space-y-0">
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="bg-white text-teal-700 px-4 py-2 rounded-md shadow hover:bg-teal-100 transition duration-300 font-bold cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
