import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import editbg from "../../assets/editbg.jpg";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: location.state?.customer_name || "", // Fallback to empty string if not available
    address: location.state?.address || "",
    date: location.state?.date || "",
    service: location.state?.service || "",
  });
  

  useEffect(() => {
    console.log("Location state:", location.state); // Check the contents of location.state
    if (!location.state) {
      toast.error("Please select a service to edit");
      navigate("/dashboard");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/service`);
        setServices(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load services.");
      }
    };

    fetchServices();

  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedService = services.find(s => s.name === formData.service);
    if (!selectedService) {
      toast.error("Selected service not found.");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`, {
        customer_name: formData.customer_name,
        address: formData.address,
        date_time: new Date(formData.date).toISOString(),
        service_id: selectedService._id,
        user_id: user._id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Booking updated successfully.");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update booking.");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="flex w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
    
    {/* Left Side Image - Only visible on medium screens and up */}
    <div className="w-1/2 hidden md:block">
      <img src={editbg} alt="" className="w-full h-full object-cover opacity-80" />
    </div>

    {/* Edit Booking Form */}
    <div className="w-full md:w-1/2 p-6 bg-white rounded-2xl">
      <h2 className="text-3xl font-extrabold text-green-600 mb-6 text-center">Edit Booking</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full h-12 border border-gray-300 rounded-lg px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full h-12 border border-gray-300 rounded-lg px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-1/2 h-12 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 h-12 bg-green-600 hover:bg-teal-700 text-white font-bold rounded-lg transition duration-300"
          >
            Update Booking
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
};

export default EditBooking;
