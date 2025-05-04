import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings/user/${user._id || user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        if (!error.response || error.response.status !== 404) {
          toast.error("Failed to load your bookings.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBookings();
  }, [location]);

  // 🔴 Delete booking handler

const handleDelete = (id) => {
  toast((t) => (
    <span>
      Are you sure you want to delete?
      <div className="mt-2 flex gap-2">
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("Booking deleted successfully.");
              setBookings((prev) => prev.filter((b) => b._id !== id));
            } catch (error) {
              console.error("Error deleting booking:", error);
              toast.error("Failed to delete booking.");
            }
          }}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          onClick={() => toast.dismiss(t.id)}
        >
          No
        </button>
      </div>
    </span>
  ), {
    duration: 10000,
  });
};

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-green-700 mt-4">
          My Bookings
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
              >
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">Customer Name:</span>{" "}
                    {booking.customer_name}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Service:</span>{" "}
                    <span className="text-green-600">{booking.service_id.name}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Date:</span>{" "}
                    {new Date(booking.date_time).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Address:</span>{" "}
                    {booking.address}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      navigate(`/edit-booking/${booking._id}`, {
                        state: booking,
                      })
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
                  >
                    Edit Booking
                  </button>

                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                  >
                    Delete Booking
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
