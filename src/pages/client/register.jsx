import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full flex justify-center items-center bg-black/25">
                <div className="w-[450px] h-[650px] backdrop-blur-xl border border-white shadow-2xl rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-white text-4xl font-semibold mb-[20px]">Create Account</h2>

                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-[400px] h-[50px] border border-white text-white placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                        placeholder="Username"
                    />

                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white text-white placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                        placeholder="Password"
                    />

                    <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white text-white placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                        placeholder="Confirm Password"
                    />

                    <button
                        onClick={handleRegister}
                        className="w-[400px] h-[50px] bg-green-600 cursor-pointer text-white hover:bg-green-700 rounded-xl mt-[20px]"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                    <p className="text-gray-800 mt-[20px]">
                        Already have an account?{" "}
                        <span className="text-green-800 hover:text-green-900">
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </div>
            </div>

            <div className="w-[50%] h-full">
                {/* Empty right side / optional image */}
            </div>
        </div>
    );
}
