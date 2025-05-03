import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
export default function AdminServicePage(){

    const [services, setServices] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate()

    useEffect(
         ()=>{
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/service").then(
                    (response)=>{
                        console.log("Services fetched successfully", response.data);
                        setServices(response.data);
                        setLoaded(true);
                    }
                ) 
            }
              
         }
         ,  [loaded]
     )

     // delete service function
     async function deleteService(_id){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login first to delete service")
            return
        }
    
            try{
                await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/service/"+_id, {
                    headers: {
                        "Authorization": "Bearer "+token
                    }
                })
                setLoaded(false)
                toast.success("Service deleted successfully")
            } catch(error){
                console.log(error);
                toast.error("Service delete failed")
                return
            }
        }

    return(
        <div className="overflow-x-auto p-2">
          <h2 className="text-2xl font-semibold mb-4">Services</h2>
        {/* Add Service Button */}
        <Link
          to="/admin/addservices"
          className="bg-green-600 hover:bg-green-500 text-white text-2xl p-3 rounded-full absolute bottom-5 right-5 shadow-lg transition duration-200"
          title="Add Service"
        >
          <FaPlus />
        </Link>

    {/* Table or Loader */}
    {loaded ? (
      <div className="overflow-x-auto w-full mx-auto bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
          <thead className="bg-green-500 text-sm text-left text-white uppercase tracking-wider">
            <tr className="divide-x divide-gray-300">
              <th className="px-6 py-3">Service ID</th>
              <th className="px-6 py-3">Service Name</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition duration-150 ease-in-out text-sm "
              >
                <td className="px-6 py-4 whitespace-nowrap">{service._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="inline-flex gap-4 items-center justify-center">
                    <FaRegTrashAlt
                      onClick={() => deleteService(service._id)}
                      className="text-red-500 hover:text-red-600 cursor-pointer text-[18px] transition"
                      title="Delete"
                    />
                    <GrEdit
                      onClick={() =>
                        navigate("/admin/editservice", {
                          state: service,
                        })
                      }
                      className="text-blue-500 hover:text-blue-600 cursor-pointer text-[18px] transition"
                      title="Edit"
                    />
                  </div>
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

    )
}
