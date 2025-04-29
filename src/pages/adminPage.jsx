import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineStorefront } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import AddminServices from "./admin/services";
import AddServices from "./admin/editService";
import EditService from "./admin/editService";

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="h-full w-[300px]">
              <Link to="/admin/users" className="flex items-center p-2"><FaUsers className="mr-2"/>Users</Link>
              <Link to="/admin/services" className="flex items-center p-2"><MdOutlineStorefront className="mr-2" /> Services</Link>
              <Link to="/admin/bookings" className="flex items-center p-2"><FaFileInvoice className="mr-2" />Bookings</Link>
            </div>
            <div className="h-full bg-white w-[calc(100%-300px)] rounded-lg">
                <Routes path="/*">
                <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/services" element={<AddminServices />} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/addservices" element={<AddServices />} />
                    <Route path="/editservices" element={<EditService />} />
                </Routes>
            </div>
        </div>
    );
}