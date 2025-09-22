import { useState } from "react";
import "./App.css";
import HomePage from "./Components/Landing/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./Components/Landing/LoginForm";
import SignupForm from "./Components/Landing/SignupForm";
import About from "./Components/Landing/About";
import ContactUs from "./Components/Landing/ContactUs";
import Features from "./Components/Landing/Features";
import FAQ from "./Components/Landing/FAQ";
import ManagerDashboard from "./Components/Manager/ManagerDashboard";
import SuperAdminDashboard from "./Components/SuperAdminDashboard";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeLeavePage from "./Components/Employee/EmployeeLeavePage";
import ManagerLeavePage from "./Components/Manager/ManagerLeavePage";
import EmployeeAttendancePage from "./Components/Employee/EmployeeAttendancePage";
import ManagerAttendancePage from "./Components/Manager/ManagerAttendancePage";
import EmployeePayrollPage from "./Components/Employee/EmployeePayrollPage";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null); // Add user state to manage the current user

  return (
    <BrowserRouter basename="/ems">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/leave" element={<EmployeeLeavePage />} />
        <Route path="/leave/approvals" element={<ManagerLeavePage />} />
        <Route path="/managerdashboard" element={<ManagerDashboard />} />
        <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/attendance" element={<EmployeeAttendancePage />} />
        <Route path="/payroll" element={<EmployeePayrollPage />} />
        <Route path="/attendance/manage" element={<ManagerAttendancePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
