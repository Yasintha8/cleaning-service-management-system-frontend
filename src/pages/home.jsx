import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
    const [services, setServices] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(
        ()=>{
           if(!loaded){
               axios.get(import.meta.env.VITE_BACKEND_URL+"/api/service").then(
                   (response)=>{
                       console.log("Products fetched successfully", response.data);
                       setServices(response.data);
                       setLoaded(true);
                   }
               ) 
           }
             
        }
        ,  [loaded]
    )

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    service: "Basic Cleaning",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}, your booking is received!`);
    // Handle form submission logic here (e.g., send to backend)
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="bg-green-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">SparklePro Cleaning Services</h1>
        <p className="text-lg mb-6">Professional Home & Office Cleaning at Your Convenience</p>
        <a href="#booking" className="bg-white text-green-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition">
          Book a Service
        </a>
      </header>

      {/* Services Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-10">
  {services.map((service, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer border border-gray-200 hover:bg-green-50"
    >
      {/* Optional icon or image */}
      {service.icon && (
        <div className="text-4xl mb-4 text-green-500">{service.icon}</div>
      )}

      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>

      {service.description && (
        <p className="text-gray-600 text-sm">{service.description}</p>
      )}
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
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            value={formData.email}
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
            <option value="Basic Cleaning">Basic Cleaning</option>
            <option value="Deep Cleaning">Deep Cleaning</option>
            <option value="Office Cleaning">Office Cleaning</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
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
