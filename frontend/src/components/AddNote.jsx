import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { FaPenNib, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { NOTES_ENDPOINTS } from "../utils/endpoint";

const AddNote = ({ setNotes }) => {
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [height, setHeight] = useState("auto");

  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  /* ================= AUTO RESIZE ================= */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      setHeight(textareaRef.current.scrollHeight + "px");
    }
  }, [text]);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setAdd(false);
      }
    };

    if (add) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [add]);

  /* ================= ADD NOTE ================= */
  /* ================= ADD NOTE ================= */
  const handleAddNote = async () => {
    if (!title.trim() || !text.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add notes");
      return;
    }

    try {
      const res = await axios.post(
        NOTES_ENDPOINTS.CREATE,
        { title, note: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🚀 REAL-TIME UPDATE (ONLY NEW LINE)
      setNotes((prev) => [res.data, ...prev]);

      setTitle("");
      setText("");
      setAdd(false);
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-[var(--bg-secondary)]/40 border border-[var(--border-light)]/50 rounded-lg max-w-xl mx-auto"
    >
      {/* Trigger */}
      <motion.div
        onClick={() => setAdd((prev) => !prev)}
        className="py-2 px-5 w-full flex justify-between items-center cursor-pointer rounded-t-lg transition-all"
        layout
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)]">
            <FaPenNib size={14} />
          </div>
          <p className="text-[var(--text-main)] font-medium">Add a Note</p>
        </div>

        <motion.div
          animate={{ rotate: add ? -180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FaChevronUp size={12} className="text-[var(--text-secondary)]" />
        </motion.div>
      </motion.div>

      {/* Expandable Form */}
      <AnimatePresence>
        {add && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: easeInOut }}
            className="overflow-hidden origin-top"
          >
            <div className=" shadow-lg p-6 mt-3 rounded-b-lg rounded-t-none">
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's the event about?"
                  className="w-full border-b border-[var(--border-light)] py-3 px-4 focus:outline-none"
                  autoFocus
                />
              </div>

              {/* Note */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Note
                </label>
                <motion.textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe the event in detail..."
                  className="w-full border-b border-[var(--border-light)] py-3 px-4 resize-none focus:outline-none overflow-hidden"
                  rows={1}
                  style={{ height, lineHeight: 1.5 }}
                  animate={{ height }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                  }}
                />
              </div>

              <button
                onClick={handleAddNote}
                className="w-full py-1.5 text-sm rounded-sm bg-[var(--accent-primary)] text-white font-medium"
              >
                Add Note
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddNote;
