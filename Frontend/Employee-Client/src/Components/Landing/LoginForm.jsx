import React from "react";
import "../css/LoginForm.css";
import styled from "styled-components";
import HomeNavbar from "../NavBars/HomeNavbar";
import { Link } from "react-router-dom";
const LoginForm = () => {
  return (
    <div>
      <HomeNavbar />
      <div className="container">
        <div className="card">
          <a className="login">Log in</a>
          <div className="inputBox">
            <input type="text" required="required" />
            <span className="user">Username</span>
          </div>
          <div className="inputBox">
            <input type="password" required="required" />
            <span>Password</span>
          </div>

          <button className="enter">Enter</button>
          <div className="message">Don't have an account? <Link to="/signup"><a href="#">Sign up</a></Link></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
