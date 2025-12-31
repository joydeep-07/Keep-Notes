// src/pages/Signup.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../components/Login";
import Register from "../components/Register";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -800 : 800,
    opacity: 0,
  }),
};

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [direction, setDirection] = useState(1);

  // Unified switch function
  const switchForm = (type) => {
    if (type === "login") {
      setDirection(-1);
      setIsLogin(true);
    } else {
      setDirection(1);
      setIsLogin(false);
    }
  };

  return (
    <div className="grid place-items-center min-h-screen bg-gray-900 overflow-hidden">
      <div className="relative w-2xl max-w-full h-[520px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {isLogin ? (
            <motion.div
              key="login"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Login onSwitch={() => switchForm("register")} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Register onSwitch={() => switchForm("login")} />
            </motion.div>
          )}
        </AnimatePresence>

       
      </div>
    </div>
  );
};

export default Signup;
