import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import loginbg from "../assets/loginbg.jpg";
import loginbg2 from "../assets/loginbg2.png";

export default function LoginPage() {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate =  useNavigate();

    function handleLogin(){
        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login", {
            username: username,
            password: password
        }).then(
            (response) => {
                console.log("Login successfull", response.data);
                toast.success("Login successfull");
                        
                localStorage.setItem("token", response.data.token); // token = string
                localStorage.setItem("user", JSON.stringify(response.data.user)); // user = object
        
                const user = response.data.user;
                if(user.role === "admin"){
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                setLoading(false);
            }
        ).catch((error) => {
            console.log("Login failed", error.response.data);
            toast.error(error.response.data.message || "Login failed");
            setLoading(false);
        });
        
    }   

    return (
        <div className="w-full h-screen bg-cover bg-center flex" style={{ backgroundImage: `url(${loginbg})` }} >

             {/* Left Side: Login Form */}
            <div className="w-1/2 h-full hidden md:block">
                <img src={loginbg2} alt="" className="w-full h-full object-cover"/>
            </div>  
       
            {/* Right Side: Optional Image or Content */}
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="w-[450px] h-[550px] backdrop-blur-lg border border-white/30 shadow-2xl rounded-xl flex flex-col justify-center items-center bg-black/10 p-6">
                <h2 className="text-white text-4xl font-bold mb-6">Welcome Back</h2>

                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="w-full h-[50px] border border-white/30 bg-transparent text-white placeholder-white/70 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full h-[50px] border border-white/30 bg-transparent text-white placeholder-white/70 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                    onClick={handleLogin}
                    className="w-full h-[50px] bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold rounded-xl mt-4"
                >
                    {loading ? "Loading..." : "Login"}
                </button>

                <p className="text-white mt-6">
                    Don't have an account yet?{" "}
                    <Link to="/register" className="text-green-300 hover:text-green-400 font-semibold underline">
                    Register Now
                    </Link>
                </p>
                </div>
            </div>
            </div>
    )
}