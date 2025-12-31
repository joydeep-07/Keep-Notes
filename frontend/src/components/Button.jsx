import React from "react";

const Button = ({ text, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
       items-center justify-center
        px-3 py-1 text-sm rounded-sm
        text-white 
        bg-gradient-to-r from-amber-500 to-yellow-400
        shadow-lg shadow-amber-500/30
        transition-all duration-300 ease-out
      
       
      `}
    >
      <span className="relative z-10">{text}</span>

      {/* Glow Effect */}
      <span className="absolute inset-0 rounded-xl bg-white/10 blur-md opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
};

export default Button;
