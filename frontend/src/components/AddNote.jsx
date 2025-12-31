import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
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
        layout
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] ">
            <FaPenNib size={14} />
          </div>
          <p className="text-[var(--text-main)] font-medium">Add a Note</p>
        </div>

        <motion.div
          animate={{ rotate: add ? -180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {add ? (
            <FaChevronUp size={12} className="text-[var(--text-secondary)]" />
          ) : (
            <FaChevronUp size={12} className="text-[var(--text-secondary)]" />
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
              ease: easeInOut,
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
                  Title
                </label>
                <input
                  type="text"
                  placeholder="What's the event about?"
                  className="w-full border-b border-[var(--border-light)] py-3 px-4 focus:outline-none  "
                  autoFocus
                />
              </div>

              {/* Description */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Note
                </label>
                <motion.textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe the event in detail..."
                  className="w-full border-b border-[var(--border-light)] py-3 px-4 resize-none focus:outline-none   overflow-hidden"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddNote;
