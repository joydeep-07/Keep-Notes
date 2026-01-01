import React, { useState, useRef, useEffect } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const UserDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= REDUX STATE ================= */
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  /* ================= CLOSE ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate("/"); // or /login
  };

  /* ================= USER INITIALS ================= */
  const getInitials = () => {
    if (!user) return "";
    return `${user.name?.[0] || ""}${user.surname?.[0] || ""}`.toUpperCase();
  };

  /* ================= HIDE IF NOT LOGGED IN ================= */
  if (!isAuthenticated || !user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex items-center gap-2
          px-3 py-2 rounded-full
          hover:text-[var(--accent-primary)]
          cursor-pointer
          transition-all duration-300
        "
      >
        <FaRegUser size={16} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              absolute right-0 mt-3 w-72
              rounded-lg
              bg-[var(--bg-main)]/90 backdrop-blur-xl
              border border-[var(--border-light)]
              shadow-[0_20px_50px_rgba(0,0,0,0.08)]
              overflow-hidden
              z-50
              origin-top-right
            "
          >
            {/* User Info */}
            <div className="p-5 border-b border-[var(--border-light)]">
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-11 h-11 rounded-full
                    flex items-center justify-center
                    bg-gradient-to-br
                    from-[var(--accent-primary)]
                    to-[var(--accent-secondary)]
                    text-white font-semibold
                  "
                >
                  {getInitials()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user.name} {user.surname}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center gap-3
                  px-4 py-2.5 rounded-lg
                  text-sm font-medium
                  text-red-600 dark:text-red-400
                  hover:bg-red-50 dark:hover:bg-red-950/30
                  transition-colors
                "
              >
                <FiLogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDetail;
