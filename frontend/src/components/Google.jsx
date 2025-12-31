import React from "react";
import { FcGoogle } from "react-icons/fc";

const Google = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 flex items-center justify-center gap-3 rounded-full font-medium transition"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-main)",
      }}
    >
      <FcGoogle size={22} />
      <span style={{ color: "var(--text-main)" }}>Continue with Google</span>
    </button>
  );
};

export default Google;
