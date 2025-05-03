import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/user/${user._id || user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetching bookings from:", `${import.meta.env.VITE_BACKEND_URL}/api/bookings/user/${user._id || user.id}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Failed to load your bookings.");
      }
    };

    if (user) fetchBookings();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 mt-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">Loading your bookings...</p>
      ) : (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <li key={booking._id} className="bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
          <div className="space-y-2">
            <p><span className="font-semibold text-gray-700">Customer Name:</span> {booking.customer_name}</p>
            <p><span className="font-semibold text-gray-700">Service:</span> <span className="text-green-600">{booking.service_name}</span></p>
            <p><span className="font-semibold text-gray-700">Date:</span> {new Date(booking.date_time).toLocaleString()}</p>
            <p><span className="font-semibold text-gray-700">Address:</span> {booking.address}</p>
          </div>
          <button
            onClick={() =>
              navigate(`/edit-booking/${booking._id}`, {
                state: booking,
              })
            }
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Edit Booking
          </button>
        </li>
      ))}
    </ul>
  )}
  </div>
</div>


  );
};

export default UserDashboard;
