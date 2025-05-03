import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/adminPage';
import { Toaster } from 'react-hot-toast';
import Home from './pages/home';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/client/register';
import UserDashboard from './pages/client/userDashboard';
import EditBooking from './pages/client/EditBooking';

function App() {

  return (
      <BrowserRouter>
      <Toaster position='top-right'/>
        <Routes path="/*">
            <Route path="/admin/*" element={<AdminPage   />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/edit-booking/:id" element={<EditBooking/>} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App
