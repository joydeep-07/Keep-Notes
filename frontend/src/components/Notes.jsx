import React, { useState } from "react";
import { data } from "../assets/Data";
import NoteDetail from "./NoteDetail";

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState(null);

  const getPreview = (text, wordLimit = 20) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <>
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-5
        "
      >
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNote(item)}
            className="
              bg-[var(--bg-secondary)]/40
              border border-[var(--border-light)]/70
              rounded-xl
              p-4
              cursor-pointer
              hover:shadow-md
              transition
              flex
              flex-col
            "
          >
            <h2 className="text-xl heading text-[var(--accent-primary)] mb-2">
              {item.title}
            </h2>

            {/* Preview text */}
            <p className="text-xs text-[var(--text-secondary)]/80 leading-relaxed">
              {getPreview(item.note, 15)}
            </p>

            {/* Date always at bottom */}
            <span className="mt-auto pt-4 text-xs text-[var(--text-muted)]">
              {item.date}
            </span>
          </div>
        ))}
      </div>

      {/* Note Detail Modal */}
      {selectedNote && (
        <NoteDetail note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </>
  );
};

export default Notes;
