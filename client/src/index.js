import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/services/Services";
import Booking from "./components/Booking/Booking";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import YourTrip from "./components/YourTrip/YourTrip";
import Attendance from "./components/Attendance/Attendance";
import UserManagement from "./Admin/UserManagement";
import CenterManagement from "./Admin/CenterManagement";
import UserDetail from "./Admin/UserDetail";
import background from "./images/background.jpg";

export {
  AuthProvider,
  useAuth,
  Header,
  Hero,
  Services,
  Booking,
  ProtectedRoute,
  Signup,
  Login,
  Contact,
  Footer,
  PageNotFound,
  YourTrip,
  Attendance,
  UserManagement,
  CenterManagement,
  UserDetail,
  background
};
