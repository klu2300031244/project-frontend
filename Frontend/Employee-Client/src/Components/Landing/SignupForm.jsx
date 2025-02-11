import React, { useState } from "react";
import "../css/SignupForm.css";
import HomeNavbar from "../NavBars/HomeNavbar";

const SignupForm = () => {
  const [role, setRole] = useState("");

  return (
    <div>
        <HomeNavbar />
      <div className="container-signup">
        <div className="card-signup">
          <a className="signup">Sign Up</a>

          <div className="inputBox-signup">
            <input type="text" required="required" />
            <span>Full Name</span>
          </div>

          <div className="inputBox-signup">
            <input type="text" required="required" />
            <span>Username</span>
          </div>

          <div className="inputBox-signup">
            <input type="email" required="required" />
            <span>Email</span>
          </div>

          <div className="inputBox-signup">
            <input type="password" required="required" />
            <span>Password</span>
          </div>

          <div className="inputBox-signup">
            <input type="password" required="required" />
            <span>Confirm Password</span>
          </div>

          {/* Radio Button for Role Selection */}

          <div className="radio-inputs">
            <span className="role-label">Select Role |</span>
            <label className="radio">
              <input
                type="radio"
                name="role"
                value="Admin"
                checked={role === "Admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="name">Admin</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="role"
                value="Employer"
                checked={role === "Employer"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="name">Employer</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="role"
                value="Employee"
                checked={role === "Employee"}
                onChange={(e) => setRole(e.target.value)}
              />
              <span className="name">Employee</span>
            </label>
          </div>

          <button className="enter-signup">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
