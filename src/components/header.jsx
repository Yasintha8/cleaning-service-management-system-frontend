import { useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();
    return(
        <div className="w-full h-[70px] bg-blue-400 flex items-center p-2 text-white font-bold text-xl justify-between">
            <h1>Booking App</h1>
            <h1 className="mr-2 cursor-pointer"
               onClick={()=>navigate("/dashboard")}
            >Dashboard</h1>
        </div>
    )
}