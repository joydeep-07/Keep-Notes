import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import AskDelete from "./AskDelete"; // adjust path if needed

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeInOut" },
  },
};

const Action = ({ onDelete, onDownload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const wrapperRef = useRef(null);

  const handleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete?.();
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    onDownload?.();
  };

  return (
    <>
      <div className="relative" ref={wrapperRef}>
        <button
          onClick={handleDropdown}
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-main)] transition"
        >
          <BsThreeDotsVertical />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="
                absolute 
                right-0 
                mt-2 
                w-44 
                bg-[var(--bg-secondary)] 
                border 
                border-[var(--border-light)] 
                rounded-lg 
                shadow-lg 
                z-50
              "
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Download */}
              <button
                onClick={handleDownload}
                className="w-full px-4 py-2 text-left text-sm font-medium rounded-t-lg hover:text-emerald-500 hover:bg-[var(--text-secondary)]/8"
              >
                Download
              </button>

              {/* Delete */}
              <button
                onClick={handleDeleteClick}
                className="w-full px-4 py-2 text-left text-sm font-medium rounded-b-lg hover:text-red-500 hover:bg-[var(--text-secondary)]/8"
              >
                Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <AskDelete
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Action;
