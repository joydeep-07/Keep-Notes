import React from "react";

const NoteDetail = ({ note, onClose }) => {
  return (
    <div className="fixed inset-0 z-70 flex justify-center items-start p-20">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
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
        "
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

        {/* BOTTOM FIXED SECTION */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-[var(--border-light)] bg-[var(--bg-secondary)] rounded-b-xl">
          {/* Place this at the bottom */}
          <button className="text-sm text-[var(--accent-primary)]">
            Edit Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
