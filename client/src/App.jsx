import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Assuming you're using js-cookie
import {jwtDecode} from "jwt-decode"; // Correctly import jwtDecode
import "./App.scss";
import {
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
} from "./index";
import ReservedSeats from "./Admin/ReservedSeats";
import RoutesBoarding from "./components/Routes/RoutesBoarding";
import BusBook from "./Admin/busBook";

const Dashboard = () => <h2>Welcome to your Dashboard</h2>;

function AppRoutes() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (token) {
      try {
        jwtDecode(token); 
      } catch (error) {
        Cookies.remove('token'); 
      }
    } 
  }, [navigate]);

  return (
    <div  className="flex flex-col">
      <div
        style={{
          background:
            "radial-gradient(circle at left, #FFEDD5  50%, #FFFAF0 50%)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1, 
        }}
      />
        <Header />
      <div className="flex-grow overflow-y-auto">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/routes" element={<RoutesBoarding />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking/>} />
          <Route
            path="/login"
            element={<ProtectedRoute component={Login} checkLoginOrSignUp />}
          />
          <Route
            path="/signup"
            element={<ProtectedRoute component={Signup} checkLoginOrSignUp />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route
            path="/user/:id"
            element={<ProtectedRoute component={UserDetail} />}
          />
          <Route
            path="/user-management"
            element={<ProtectedRoute component={UserManagement} />}
          />
          <Route
            path="/center-management"
            element={<ProtectedRoute component={CenterManagement} />}
          />
          <Route
            path="/busBook"
            element={<ProtectedRoute component={BusBook} />}
          />
          <Route
            path="/your_trips"
            element={<ProtectedRoute component={YourTrip} />}
          />
          <Route
            path="/reservedSeats"
            element={<ProtectedRoute component={ReservedSeats} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes /> {/* Wrap your routes inside Router */}
    </Router>
  );
}

export default App;
