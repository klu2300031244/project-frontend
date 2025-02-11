import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./Components/Landing/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./Components/Landing/LoginForm";
import SignupForm from "./Components/Landing/SignupForm";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
