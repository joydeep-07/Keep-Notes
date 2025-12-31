import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPenNib } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AddNote = () => {
  const [add, setAdd] = useState(false);
  const [text, setText] = useState("");
  const [height, setHeight] = useState("auto");

  // ONE ref for trigger + form (important)
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      setHeight(textareaRef.current.scrollHeight + "px");
    }
  }, [text]);

  // Click outside to close
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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [add]);

  return (
    <div
      ref={containerRef}
      className="w-full border border-[var(--border-light)] rounded-lg max-w-xl mx-auto"
    >
      {/* Trigger */}
      <motion.div
        onClick={() => setAdd((prev) => !prev)}
        className="py-2 px-5 w-full flex justify-between items-center cursor-pointer rounded-xl transition-all"
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
          {add ? (
            <FaChevronUp className="text-[var(--text-secondary)]" />
          ) : (
            <FaChevronDown className="text-[var(--text-secondary)]" />
          )}
        </motion.div>
      </motion.div>

      {/* Expandable Form */}
      <AnimatePresence>
        {add && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden origin-top"
          >
            <div
              className="bg-[var(--bg-main)] text-[var(--text-main)] shadow-lg p-6 mt-3 rounded-xl rounded-t-none"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="What's the event about?"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-light)] py-3 px-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--border-light)]"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Description
                </label>
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe the event in detail..."
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-light)] py-3 px-4 resize-none rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--border-light)] min-h-[120px]"
                  style={{ height }}
                  rows={4}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddNote;
