import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [user, setUsers] = useState([]);
    const [service, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch all data in parallel
        const fetchData = async () => {
            try {
                const [userRes, serviceRes, bookingRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user"),
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/service"),
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/bookings"),
                ]);

                setUsers(userRes.data);
                console.log("Users:", userRes.data);

                setServices(serviceRes.data);
                setBookings(bookingRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    👥 Total Users: {user.length}
                </div>
                <div className="bg-white p-4 rounded shadow">
                    🛠️ Total Services: {service.length}
                </div>
                <div className="bg-white p-4 rounded shadow">
                    📅 Total Bookings: {bookings.length}
                </div>
            </div>
        </div>
    );
}
