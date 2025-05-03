import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/header";

export default function Home() {
  
  const [services, setServices] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    date: "",
    service: "",
  });

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/service")
        .then((response) => {
          setServices(response.data);
          if (response.data.length > 0) {
            setFormData((prev) => ({
              ...prev,
              service: response.data[0].name,
            }));
          }
          setLoaded(true);
        })
        .catch((error) => {
          toast.error("Failed to load services");
          console.error(error);
        });
    }
  }, [loaded]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user")); // This is correct
      console.log("User:", user);

      

      if (!user || !(user._id || user.id)) {
        toast.error("User not logged in or session expired.");
        return;
      }
      
      

      const selectedService = services.find((s) => s.name === formData.service);
      if (!selectedService) {
        toast.error("Selected service not found.");
        return;
      }

      

      const bookingData = {
        customer_name: formData.name,
        address: formData.address,
        date_time: new Date(formData.date).toISOString(),
        service_id: selectedService._id,
        service_name: selectedService.name,
        user_id: user._id || user.id,

      };
            
      console.log("Booking data:", bookingData);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL+"/api/bookings",
        bookingData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success(`Thank you ${formData.name}, your booking is received!`);
        setFormData({
          name: "",
          address: "",
          date: "",
          service: services[0]?.name || "",
        });
      } else {
        toast.error("Booking submission failed.");
      }
    } catch (error) {
      console.error("Booking submission failed:", error);
      toast.error("Booking submission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      {/* Hero */}
      <header className="bg-green-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">SparklePro Cleaning Services</h1>
        <p className="text-lg mb-6">Professional Home & Office Cleaning</p>
        <a
          href="#booking"
          className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Book a Service
        </a>
      </header>

      {/* Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg border border-gray-200 hover:bg-green-50 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <section id="booking" className="bg-white py-16 px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Book a Cleaning Service</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            onChange={handleChange}
            value={formData.name}
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            required
            onChange={handleChange}
            value={formData.address}
            className="w-full p-3 border rounded"
          />
          <input
            type="date"
            name="date"
            required
            onChange={handleChange}
            value={formData.date}
            className="w-full p-3 border rounded"
          />
          <select
            name="service"
            onChange={handleChange}
            value={formData.service}
            className="w-full p-3 border rounded"
          >
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Submit Booking
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 SparklePro Cleaning. All rights reserved.</p>
      </footer>
    </div>
  );
}
