import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/User/Login";
import Scanner from "./pages/User/Scanner";
import Form from "./pages/User/Form";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./router/ProtectedRoute";
import { UserNavbar } from "./components/UserNavbar";
import { AdminNavbar } from "./components/AdminNavbar";
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
        <Route path="/" Component={Login} />
        <Route path="/scanner" Component={Scanner} />
        <Route path="/form" Component={Form} />
        <Route path="/home" Component={Home} />
        <Route path="/user-details" Component={UserDetails} />
        <Route path="/vehicle-details" Component={VehicleDetails} />
        <Route path="/inspection-details" Component={InspectionDetails} />
        <Route path="/user-register" Component={UserRegister} />
        <Route path="/vehicle-register" Component={VehicleRegister} />
      </Routes>
    </>
  );
};

export default App;
