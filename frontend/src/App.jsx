import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./layouts/Navbar";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Root from "./layouts/Root";
import Home from "./Pages/Home";
import Signup from "./Pages/SignUp";
const App = () => {
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {/* Layout Route */}
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Signup />} />
              {/* <Route path="register" element={<Register />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  );
};

export default App;
