import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import bgImg from "../assets/bgImg.jpg"; // Adjust path based on your file structure
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
      const user = JSON.parse(localStorage.getItem("user")); 
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
          <header className="relative text-white py-24 text-center shadow-md bg-cover object-cover bg-center min-h-[100vh]" style={{ backgroundImage: `url(${bgImg})`, height: '100vh' }}>

        {/* Text Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 mt-40">
          <h1 className="text-6xl text-green-500 font-extrabold mb-4 drop-shadow">Smart Care Cleaning Services</h1>
          <p className="text-xl mb-6 opacity-90 text-gray-600">Professional Home & Office Cleaning</p>
          <a
            href="#booking"
            className="inline-block text-xl bg-white text-green-600 font-semibold px-8 py-3 rounded-lg shadow hover:bg-green-100 transition-all duration-300"
          >
            Book a Service
          </a>
        </div>
      </header>
      
      {/* Services */}
      <section id="services" className="px-6 py-16 bg-green-50 text-center">
        <h2 className="text-3xl font-extrabold text-green-700 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6 border border-gray-200 hover:shadow-xl hover:bg-green-50 transform hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-green-700 mb-3">{service.name}</h3>
              <p className="text-gray-600 text-md text-justify leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
    </section>

      {/* Booking Form */}
    <section id="booking" className="bg-white py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-700">Book a Cleaning Service</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
          value={formData.name}
          className="w-full p-3 border border-gray-300 rounded focus:outline-green-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          required
          onChange={handleChange}
          value={formData.address}
          className="w-full p-3 border border-gray-300 rounded focus:outline-green-500"
        />
        
        <select
          name="service"
          onChange={handleChange}
          value={formData.service}
          className="w-full p-3 border border-gray-300 rounded focus:outline-green-500"
        >
          {services.map((service) => (
            <option key={service._id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
          value={formData.date}
          className="w-full p-3 border border-gray-300 rounded focus:outline-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition cursor-pointer"
        >
          Submit Booking
        </button>
      </form>
    </section>

    {/* About Us */}
      <section id="about" className="bg-green-50 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">About Us</h2>
        <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg">
          <p>
            At <span className="font-semibold text-green-700">Smart Care Cleaning Services</span>, we believe that a clean environment is a happy environment. 
            With years of experience in both home and office cleaning, our dedicated team ensures your space is spotless, sanitized, and sparkling. 
            We use eco-friendly products and trusted techniques to provide reliable, top-notch cleaning services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-10">Contact Us</h2>
        <div className="max-w-3xl mx-auto text-left space-y-4 text-gray-700 text-lg">
          <p><strong>📍 Address:</strong> 121 perera Street, Colombo, Sri Lanka</p>
          <p><strong>📞 Phone:</strong> +94 71 234 5678</p>
          <p><strong>✉️ Email:</strong> support@smartcare.lk</p>
          <p>Have questions or want a custom quote? Feel free to reach out to us anytime. We’re here to help!</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Smart Care Cleaning. All rights reserved.</p>
      </footer>
    </div>
  );
}
