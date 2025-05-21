import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import loginbg from "../../assets/loginbg.jpg";
import loginbg2 from "../../assets/loginbg2.png";
export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleRegister() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
            username,
            password,
        }).then((response) => {
            console.log("Registration successful", response.data);
            toast.success("Registration successful");
            navigate("/login");
            setLoading(false);
        }).catch((error) => {
            console.log("Registration failed", error.response?.data || error);
            toast.error(error.response?.data?.message || "Registration failed");
            setLoading(false);
        });
    }

    return (
        <div className="w-full min-h-screen bg-cover bg-center flex flex-col md:flex-row" style={{ backgroundImage: `url(${loginbg})` }}>
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 h-64 md:h-full hidden md:block">
                    <img src={loginbg2} alt="" className="w-full h-full object-cover" />
            </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="w-full max-w-md backdrop-blur-xl border border-white shadow-2xl rounded-xl flex flex-col items-center p-6 mt-20 md:mt-0">
            <h1 className="text-green-600 text-4xl md:text-6xl font-extrabold drop-shadow text-center">
                Smart Care
            </h1>
            <span className="text-purple-600 font-semibold text-xl md:text-3xl drop-shadow text-center">
                Cleaning Service
            </span>
            <hr className="w-full h-[2px] bg-white mt-4" />
            <h2 className="text-white text-2xl md:text-4xl font-semibold my-6 text-center">
                Create Account
            </h2>

            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-[50px] border border-white text-white placeholder-gray-300 bg-transparent rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Username"
            />

            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] border border-white text-white placeholder-gray-300 bg-transparent rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Password"
            />

            <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-[50px] border border-white text-white placeholder-gray-300 bg-transparent rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Confirm Password"
            />

            <button
                onClick={handleRegister}
                className="w-full h-[50px] bg-green-600 cursor-pointer text-white hover:bg-green-700 rounded-xl mt-4"
            >
                {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="text-white mt-6 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-green-300 hover:text-green-400 font-semibold underline">
                Login
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
}
