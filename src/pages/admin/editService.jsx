import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link,  useLocation,  useNavigate } from "react-router-dom";

export default function EditService() {

    const locationDate = useLocation();
    const navigate = useNavigate();

    if(locationDate.state == null){
        toast.error("Please select a service to edit")
        window.location.href = "/admin/services"
        
    }
    const[_id, set_id] = useState(locationDate.state._id);
    const[name, setName] = useState(locationDate.state.name);
    const[description, setDescription] = useState(locationDate.state.description);

    async function handleSubmit(){

        try{
        const service = {
            name: name,
            description: description
        }
        const token = localStorage.getItem("token")
        console.log(token);

        // service added to db
        await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/service/"+_id, service, {
            headers: {
                "Authorization": "Bearer "+token
            },
        })
        toast.success("Service updated successfully")
        navigate("/admin/services")
    }catch(error){
        console.log(error);
        toast.error("Service updating failed")
    }
    }

    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[400px] rounded-lg shadow-lg flex flex-col justify-center items-center  border-gray-200 border-2">
            <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Edit Service</h1>
            <input 
                disabled
                value={_id}
                onChange={
                    (e) => 
                        set_id(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500 text-gray-500 placeholder-gray rounded-xl p-4 m-[5px] hover:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Service ID"
            />
            <input 
                value={name}
                onChange={
                    (e) => 
                        setName(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500   rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Service Name"
            />
            <textarea 
                value={description}
                onChange={
                    (e) => 
                        setDescription(e.target.value)
                }
                className="w-[400px] h-[60px] border border-gray-500   rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Service Description"
            />
            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"/admin/services"} className="bg-red-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg hover:bg-red-500  cursor-pointer ">Cancle</Link>
                <button onClick={handleSubmit} className="bg-green-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-500  cursor-pointer ">Edit Service</button>
            </div>
            </div>
        </div>
    )
}


