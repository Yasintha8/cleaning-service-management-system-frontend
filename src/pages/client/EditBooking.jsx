import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s.name}>{s.name}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Update Booking
        </button>
      </form>
    </div>
  );
};

export default EditBooking;
