import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./router/ProtectedRoute";
import { UserNavbar } from "./components/UserNavbar";
import { AdminNavbar } from "./components/AdminNavbar";
import Login from "./pages/User/Login";
import Scanner from "./pages/User/Scanner";
import Form from "./pages/User/Form";
import Home from "./pages/Admin/Home";
import UserDetails from "./pages/Admin/UserDetails";
import VehicleDetails from "./pages/Admin/VehicleDetails";
import InspectionDetails from "./pages/Admin/InspectionDetails";
import UserRegister from "./pages/Admin/UserRegister";
import VehicleRegister from "./pages/Admin/VehicleRegister";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isUserRoute = location.pathname.startsWith('/scanner') || location.pathname.startsWith('/form');
  const isAdminRoute = location.pathname.startsWith('/home') || location.pathname.startsWith('/user-details') || location.pathname.startsWith('/vehicle-details') || location.pathname.startsWith('/inspection-details') || location.pathname.startsWith('/user-register') || location.pathname.startsWith('/vehicle-register');


  return (
    <>
      {isUserRoute && <UserNavbar />}
      {isAdminRoute && <AdminNavbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/form" element={<Form />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/user-details" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
        <Route path="/vehicle-details" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />
        <Route path="/inspection-details" element={<ProtectedRoute><InspectionDetails /></ProtectedRoute>} />
        <Route path="/user-register" element={<ProtectedRoute><UserRegister /></ProtectedRoute>} />
        <Route path="/vehicle-register" element={<ProtectedRoute><VehicleRegister /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
