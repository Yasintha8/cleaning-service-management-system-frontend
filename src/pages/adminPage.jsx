import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineStorefront } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import AddminServices from "./admin/services";
import AddServices from "./admin/addServices";
import EditService from "./admin/editService";
import User from "./admin/users";
import AdminBookingPage from "./admin/bookings";
import Dashboard from "../components/adminDashboard";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";

export default function AdminPage() {
    const [userValidated, setUserValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("You are not logged in")
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                headers: {
                    "Authorization": "Bearer "+token
                },
        }).then((response) => {
            if(response.data.user.role == "admin"){
                setUserValidated(true)
            }else{
                toast.error("You are not an admin")
                navigate("/login")
            }
        }).catch(() => {
            toast.error("Something went wrong please login again")
            navigate("/login")
        })
        }
    })
    return (
        <div className="flex h-screen">
            {userValidated ?
            <>
                {/* Sidebar */}
                <div className="w-[200px] bg-gray-800 text-white text-lg shadow-md h-screen fixed top-0 left-0 z-10 p-4">
                    <Link to="/admin" className="flex items-center p-2"><FaFileInvoice className="mr-2" />Dashboard</Link>
                    <Link to="/admin/users" className="flex items-center p-2"><FaUsers className="mr-2" />Users</Link>
                    <Link to="/admin/services" className="flex items-center p-2"><MdOutlineStorefront className="mr-2" />Services</Link>
                    <Link to="/admin/bookings" className="flex items-center p-2"><FaFileInvoice className="mr-2" />Bookings</Link>
                </div>

                {/* Main Content */}
                <div className="ml-[200px] w-[calc(100%-200px)] h-screen overflow-y-auto bg-gray-100 p-4 rounded-lg">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<User />} />
                        <Route path="/services" element={<AddminServices />} />
                        <Route path="/bookings" element={<AdminBookingPage />} />
                        <Route path="/addservices" element={<AddServices />} />
                        <Route path="/editservice" element={<EditService />} />
                    </Routes>
                </div>
            </>
            :
            <Loader/>
        }
        </div>
    );
}
