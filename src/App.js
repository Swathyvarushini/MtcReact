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
import SelectRole from './pages/Admin/SelectRole'; 
import SecurityDetails from "./pages/Admin/SecurityDetails";
import TimeKeeperDetails from "./pages/Admin/TimeKeeperDetails";
import InspectionRecord from "./pages/User/InspectionRecord";
import SecurityRecord from "./pages/User/SecurityRecord";
import TimeKeeperRecord from "./pages/User/TimeKeeperRecord";
import ScrollToTop from "./components/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';
import CheckerRecord from "./pages/User/CheckerRecord";
import CheckerDetails from "./pages/Admin/CheckerDetails";


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop/>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isUserRoute = location.pathname.startsWith('/scanner') || location.pathname.startsWith('/form') || location.pathname.startsWith('/inspection-record') || location.pathname.startsWith('/security-record') || location.pathname.startsWith('/checker-record');
  const isAdminRoute = location.pathname.startsWith('/home') || location.pathname.startsWith('/user-details') || location.pathname.startsWith('/vehicle-details') || location.pathname.startsWith('/inspection-details') || location.pathname.startsWith('/security-details') || location.pathname.startsWith('checker-details') || location.pathname.startsWith('/user-register') || location.pathname.startsWith('/vehicle-register');

  return (
    <>
      {isUserRoute && <UserNavbar />}
      {isAdminRoute && <AdminNavbar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Login/></ProtectedRoute>} />
        <Route path="/scanner" element={<ProtectedRoute><Scanner/></ProtectedRoute>} />
        <Route path="/form" element={<ProtectedRoute><Form/></ProtectedRoute>} />
        <Route path="/inspection-record" element={<ProtectedRoute><InspectionRecord/></ProtectedRoute>} />
        <Route path="/security-record" element={<ProtectedRoute><SecurityRecord/></ProtectedRoute>} />
        <Route path="/checker-record" element={<ProtectedRoute><CheckerRecord/></ProtectedRoute>} />
        {/* <Route path="/timekeeper-record" element={<ProtectedRoute><TimeKeeperRecord/></ProtectedRoute>} /> */}
        <Route path="/select-role" element={<ProtectedRoute><SelectRole/></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/user-details" element={<ProtectedRoute><UserDetails/></ProtectedRoute>} />
        <Route path="/vehicle-details" element={<ProtectedRoute><VehicleDetails/></ProtectedRoute>} />
        <Route path="/inspection-details" element={<ProtectedRoute><InspectionDetails/></ProtectedRoute>} />
        <Route path="/security-details" element={<ProtectedRoute><SecurityDetails/></ProtectedRoute>} />
        <Route path="/checker-details" element={<ProtectedRoute><CheckerDetails/></ProtectedRoute>} />
        {/* <Route path="/timekeeper-details" element={<ProtectedRoute><TimeKeeperDetails /></ProtectedRoute>} /> */}
        <Route path="/user-register" element={<ProtectedRoute><UserRegister/></ProtectedRoute>} />
        <Route path="/vehicle-register" element={<ProtectedRoute><VehicleRegister/></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
