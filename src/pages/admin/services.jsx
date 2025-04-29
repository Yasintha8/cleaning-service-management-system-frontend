import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
export default function AdminProductPage(){

    const [services, setServices] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate()

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

     // delete product function
     async function deleteProduct(id){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login first to delete service")
            return
        }
    
            try{
                await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/service/"+id, {
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
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addservices"} className="bg-gray-600 absolute text-white text-3xl p-[12px] rounded-full mb-4 hover:bg-gray-300 hover:text-gray-600 cursor-pointer right-5 bottom-5">
            <FaPlus />
            </Link>
            {loaded && <table className="w-full ">
                <thead>
                    <tr>
                        <th className="p-2">Service ID</th>
                        <th className="p-2">Service Name</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                services.map(
                    (service, index)=>{
                        return(
                            <tr key={index} className="border-b-2 border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
                                <td className="p-2">{service._id}</td>
                                <td className="p-2">{service.name}</td>
                                <td className="p-2">
                                    <div className="w-full h-full flex justify-center">
                                    <FaRegTrashAlt onClick={()=>{
                                        deleteProduct(service._id)
                                    }} className="text-[20px] m-[10px]  hover:text-red-600 " /> 
                                    <GrEdit onClick={()=>{
                                        //load edit product form
                                        navigate("/admin/editservice", {
                                            state: service
                                        })
                                    }}
                                    className="text-[20px] m-[10px]  hover:text-blue-600" />
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                )
            }
                </tbody>
            </table>}
            {
                !loaded && 
                <Loader />
            }
        </div>
    )
}
