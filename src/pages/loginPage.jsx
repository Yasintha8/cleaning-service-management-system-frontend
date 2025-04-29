import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate =  useNavigate();

    function handleLogin(){
        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            username: username,
            password: password
        }).then(
            (response) => {
                console.log("Login successfull", response.data);
                toast.success("Login successfull");
                localStorage.setItem("token", response.data.token);

                const user = response.data.user;
                if(user.role === "admin"){
                    // Redirect to admin page
                    navigate("/admin");
                } else {
                    // Redirect to home page
                    navigate("/");
                }
            setLoading(false);

        }) .catch(
            (error) => {
                console.log("Login failed", error.response.data);
                toast.error(error.response.data.message||"Login failed")
                setLoading(false);
            }
        )

        console.log("Login Button Clicked");    
    }   

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">

            <div className="w-[50%] h-full flex justify-center items-center bg-black/25">
                <div className="w-[450px] h-[550px] backdrop-blur-xl border border-white shadow-2xl rounded-xl flex flex-col justify-center items-center bg">
                <h2 className="text-white text-4xl font-semibold mb-[20px]">Welcome Back</h2>
                    <input 
                        onChange={(e) => 
                            setUsername(e.target.value)}
                        type="text" 
                        className="w-[400px] h-[50px] border border-white text-white placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none "
                        placeholder="Username"/>
                    <input 
                        onChange={(e) => 
                            setPassword(e.target.value)}
                        type="password" 
                        className="w-[400px] h-[50px] border border-white text-white placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none "
                        placeholder="Password"/>

                    <button 
                        onClick={handleLogin}
                        className="w-[400px] h-[50px] bg-green-600 cursor-pointer text-white hover:bg-green-700 rounded-xl mt-[20px]">
                    
                    {
                        loading?"Loading...":"Login"
                    }
                    
                    </button>
                    <p className="text-gray-800 mt-[20px]">
                        Don't have an account yet? <span className="text-green-800 hover:text-green-900">
                        <Link to={"/register"}>Register Now</Link>
                    </span>
                    </p>
                </div>
            </div>

            <div className="w-[50%] h-full">
                
            </div>
        </div>
    )
}