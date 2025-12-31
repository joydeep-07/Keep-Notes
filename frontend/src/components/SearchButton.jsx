import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Search */}
      <button
        className={`relative flex items-center gap-2 rounded-full transition-colors ${
          isOpen ? "border border-[var(--border-light)]" : "border-none"
        }`}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: 12 }}
              animate={{ width: 192, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 12 }}
              transition={{
                duration: 0.35,
                ease: easeInOut, // Material-like easing
              }}
              className="overflow-hidden"
            >
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm px-5 text-[var(--text-main)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div onClick={() => setIsOpen(!isOpen)} className="p-2.5 rounded-full">
          <Search
            size={16}
            className="text-[var(--text-secondary)] cursor-pointer shrink-0"
          />
        </div>
      </button>
    </div>
  );
};

export default SearchButton;
