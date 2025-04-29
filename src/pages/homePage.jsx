import { Route, Routes } from "react-router-dom";
import Home from "./home";

export default function HomePage() {
    return (
        <div className="w-full h-screen max-h-screen">
            <div  className="w-full h-[calc(100vh-70px)]">
                <Routes path="/*">
                    <Route path="/*" element={<Home/>} />
                    {/* <Route path="/products" element={<ProductPage />} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} /> */}
                </Routes>
            </div>
        </div>
    );
}