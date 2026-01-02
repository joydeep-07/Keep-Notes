import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NOTES_ENDPOINTS } from "../utils/endpoint";
import NoteDetail from "./NoteDetail";
import NoNotes from "./NoNotes";
import { stripHtml } from "../utils/textUtils";
import { formatDate } from "../utils/dateFormat";
import Loader from "./Loader";

const Notes = ({ notes, setNotes, loading }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  // Get auth state from Redux
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const getPreview = (html, wordLimit = 20) => {
    const plainText = stripHtml(html);
    const words = plainText.split(" ");

    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : plainText;
  };

  // Handle note deletion (REAL-TIME)
  const handleDeleteNote = async (noteId) => {
    if (!isAuthenticated || !token) return;

    try {
      await axios.delete(NOTES_ENDPOINTS.DELETE(noteId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update UI instantly
      setNotes((prev) => prev.filter((note) => note._id !== noteId));

      if (selectedNote && selectedNote._id === noteId) {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      alert(err.response?.data?.message || "Failed to delete note");
    }
  };

  // Handle note update on real time
  const handleUpdateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    setSelectedNote(updatedNote);
  };

  if (loading) {
    return <Loader/> ;
  }

  if (notes.length === 0) {
    return <NoNotes />;
  }

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
        {notes.map((note) => (
          <div
            key={note._id}
            onClick={() => setSelectedNote(note)}
            className="
              bg-[var(--bg-secondary)]/40
              border border-[var(--border-light)]/70
              rounded-xl
              p-4
              cursor-pointer
              hover:shadow-md
              hover:border-[var(--accent-primary)]/30
              transition-all
              duration-200
              flex
              flex-col
              group
            "
          >
            <h2 className="text-xl heading text-[var(--accent-primary)] mb-2 truncate">
              {note.title}
            </h2>

            {/* Preview text */}
            <p className="text-xs text-[var(--text-secondary)]/80 leading-relaxed flex-grow">
              {getPreview(note.note, 15)}
            </p>

            {/* Footer with date */}
            <div className="mt-5 flex justify-between items-center">
              <span className="text-[10px] text-[var(--text-secondary)]">
                {formatDate(note.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Note Detail Modal */}
      {selectedNote && (
        <NoteDetail
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onDelete={handleDeleteNote}
          onUpdate={handleUpdateNote}
          token={token}
        />
      )}
    </>
  );
};

export default Notes;
