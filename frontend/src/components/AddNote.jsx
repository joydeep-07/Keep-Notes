import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPenNib } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AddNote = () => {
  const [add, setAdd] = useState(false);
  const [text, setText] = useState("");
  const [height, setHeight] = useState("auto");
  const containerRef = useRef(null);
  const textareaRef = useRef(null);
  const formContentRef = useRef(null);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      setHeight(textareaRef.current.scrollHeight + "px");
    }
  }, [text]);

  // Detect click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setAdd(false);
      }
    };
    if (add) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [add]);

  return (
    <div className="w-full border border-[var(--border-light)] rounded-lg max-w-xl mx-auto">
      {/* FAQ Card-like Trigger */}
      <motion.div
        onClick={() => setAdd(!add)}
        className=" py-2 px-5 w-full flex rounded-xl  justify-between items-center cursor-pointer transition-all "
        whileTap={{ scale: 0.98 }}
        layout
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-white">
            <FaPenNib size={14} />
          </div>
          <p className="text-[var(--text-main)] font-medium">Take a Note…</p>
        </div>
        <motion.div
          animate={{ rotate: add ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FaChevronDown className="text-[var(--text-secondary)]" />
        </motion.div>
      </motion.div>

      {/* FAQ Card-like Expandable Content */}
      <AnimatePresence>
        {add && (
          <motion.div
            ref={containerRef}
            initial={{
              opacity: 0,
              height: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              height: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden origin-top"
            style={{ transformOrigin: "top center" }}
          >
            <motion.div
              ref={formContentRef}
              className="bg-[var(--bg-main)] text-[var(--text-main)] rounded-xl shadow-lg p-6 mt-3 rounded-t-none"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Title - FAQ-like styling */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mb-4"
              >
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="What's the event about?"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-main)] placeholder-[var(--text-secondary)] py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[var(--border-light)] focus:border-transparent rounded-lg transition-all"
                  autoFocus
                />
              </motion.div>

              {/* Description - FAQ-like styling */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Description
                </label>
                <textarea
                  ref={textareaRef}
                  placeholder="Describe the event in detail..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-light)] text-[var(--text-main)] placeholder-[var(--text-secondary)] py-3 px-4 resize-none focus:outline-none focus:ring-1 focus:ring-[var(--border-light)] focus:border-transparent rounded-lg transition-all min-h-[120px]"
                  style={{ height }}
                  rows={4}
                />
              </motion.div>

             
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddNote;
