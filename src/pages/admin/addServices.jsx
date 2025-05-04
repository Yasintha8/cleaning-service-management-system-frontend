import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AddProductForm() {

    const[name, setName] = useState("");
    const[description, setDescription] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(){

        
        try{        
        const service = {
            name: name,
            description: description
        }
        const token = localStorage.getItem("token")
        console.log(token);

        // product added to db
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/service", service, {
            headers: {
                "Authorization": "Bearer "+token
            },
        })
        toast.success("Service added successfully")
        navigate("/admin/services")
    }catch(error){
        console.log(error);
        toast.error("Service add failed")
    }
    }

    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[400px] rounded-lg shadow-lg flex flex-col justify-center items-center border-gray-200 border-2">
            <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Service</h1>
            <input 
                value={name}
                onChange={
                    (e) => 
                        setName(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Service Name"
            />

            <input 
                value={description}
                onChange={
                    (e) => 
                        setDescription(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Service Description"
            />          
            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"/admin/services"} className="bg-red-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg hover:bg-red-500  cursor-pointer ">Cancle</Link>
                <button onClick={handleSubmit} className="bg-green-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-500  cursor-pointer ">Add Product</button>
            </div>
            </div>
        </div>
    )
}


