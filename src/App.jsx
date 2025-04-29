import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminPage from './pages/adminPage';
import { Toaster } from 'react-hot-toast';
import Home from './pages/home';

function App() {

  return (
      <BrowserRouter>
      <Toaster position='top-right'/>
        <Routes path="/*">
        <Route path="/admin/*" element={<AdminPage   />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} /> */}
            <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
