import React from "react";
import { motion, AnimatePresence, easeInOut, easeIn, easeOut } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: easeIn,
    
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: {
      duration: 0.18,
      ease: easeOut,
      
    },
  },
};

const NoteDetail = ({ note, onClose }) => {
  return (
    <AnimatePresence>
      {note && (
        <motion.div
          className="fixed inset-0 z-70 flex justify-center items-start p-20"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop (NO blur = smooth) */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[3px] "
            variants={backdrop}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="
              relative
              z-10
              w-[90%]
              max-w-2xl
              bg-[var(--bg-secondary)]
              rounded-xl
              border
              border-[var(--border-light)]
              p-6
              pb-20
              will-change-transform
            "
            variants={modal}
          >
            <h1 className="text-2xl heading text-[var(--accent-primary)] mb-4">
              {note.title}
            </h1>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {note.note}
            </p>

            <span className="block mt-6 text-xs text-[var(--text-muted)]">
              {note.date}
            </span>

            <div className="absolute bottom-0 left-0 w-full p-4 border-t border-[var(--border-light)] bg-[var(--bg-secondary)] rounded-b-xl">
              <button className="text-sm text-[var(--accent-primary)]">
                Edit Note
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteDetail;
