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
          <div className="role-selection">
            <span className="role-label">Select Role :</span>
            <div className="wrapper-signup">
              <div className="option">
                <input
                  defaultChecked={role === "Admin"}
                  value="Admin"
                  name="role"
                  type="radio"
                  className="input"
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className="btn">
                  <span className="span">Admin</span>
                </div>
              </div>

              <div className="option">
                <input
                  defaultChecked={role === "Employer"}
                  value="Employer"
                  name="role"
                  type="radio"
                  className="input"
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className="btn">
                  <span className="span">Employer</span>
                </div>
              </div>

              <div className="option">
                <input
                  defaultChecked={role === "Employee"}
                  value="Employee"
                  name="role"
                  type="radio"
                  className="input"
                  onChange={(e) => setRole(e.target.value)}
                />
                <div className="btn">
                  <span className="span">Employee</span>
                </div>
              </div>
            </div>
          </div>
          <button className="enter-signup">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
