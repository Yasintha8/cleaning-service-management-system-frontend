import { Route, Routes } from "react-router-dom";
import Home from "./home";
import EditBooking from "./client/EditBooking";

export default function HomePage() {
    return (
        <div className="w-full h-screen max-h-screen">
            <div  className="w-full h-[calc(100vh-70px)]">
                <Routes path="/*">
                    <Route path="/*" element={<Home/>} />
                </Routes>
            </div>
        </div>
    );
}