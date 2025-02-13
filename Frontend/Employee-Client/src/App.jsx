import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./Components/Landing/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./Components/Landing/LoginForm";
import SignupForm from "./Components/Landing/SignupForm";
import About from "./Components/Landing/About";
import ContactUs from "./Components/Landing/ContactUs";
import Features from "./Components/Landing/Features";
import FAQ from "./Components/Landing/FAQ";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/faq" element={<FAQ />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
