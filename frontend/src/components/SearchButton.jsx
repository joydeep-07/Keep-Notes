import { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

const SearchButton = ({ search, setSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className={`relative flex items-center rounded-full transition-colors ${
        isOpen ? "border border-[var(--border-light)]" : ""
      }`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0, x: 12 }}
            animate={{ width: 200, opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: 12 }}
            transition={{ duration: 0.35, ease: easeInOut }}
            className="overflow-hidden"
          >
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="w-full bg-transparent outline-none text-sm px-4 text-[var(--text-main)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-full cursor-pointer"
      >
        <Search size={16} className="text-[var(--text-secondary)]" />
      </div>
    </button>
  );
};

export default SearchButton;
