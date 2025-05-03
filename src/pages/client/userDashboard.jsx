import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/user/${user._id || user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Failed to load your bookings.");
      }
    };

    if (user) fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-4 rounded shadow">
              <p><strong>Service:</strong> {booking.service_name || booking.service?.name}</p>
              <p><strong>Date:</strong> {new Date(booking.date_time).toLocaleString()}</p>
              <p><strong>Address:</strong> {booking.address}</p>
              <button
                onClick={() => {/* Navigate to edit form later */}}
                className="mt-2 text-blue-600 underline"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
