import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/bookings")
        .then((response) => {
          console.log("Bookings fetched successfully", response.data);
          setBookings(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          toast.error("Failed to load bookings");
          console.error(err);
        });
    }
  }, [loaded]);

  // Delete Booking
  async function deleteBooking(_id) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to delete booking");
      return;
    }

    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/bookings/" + _id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Booking deleted successfully");
      setLoaded(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete booking");
    }
  }

  return (
    <div className="w-full h-full relative rounded-xl shadow-md bg-white p-4">
      <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>

      {loaded ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
            <thead className="bg-green-500 text-sm text-left text-white uppercase tracking-wider">
              <tr className="divide-x divide-gray-300">
                <th className="px-6 py-3">Booking ID</th>
                <th className="px-6 py-3">Customer Name</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Date & Time</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-100 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">{booking._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.customer_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(booking.date_time).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.service_id?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.user_id?.username || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <FaRegTrashAlt
                      onClick={() => deleteBooking(booking._id)}
                      className="text-red-500 hover:text-red-600 cursor-pointer text-[18px] transition"
                      title="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
