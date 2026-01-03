import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NOTES_ENDPOINTS } from "../utils/endpoint";
import NoteDetail from "./NoteDetail";
import NoNotes from "./NoNotes";
import Loader from "./Loader";
import { stripHtml } from "../utils/textUtils";
import { formatDate } from "../utils/dateFormat";

const Notes = ({ notes, setNotes, loading, search }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteNote = async (noteId) => {
    if (!isAuthenticated || !token) return;

    await axios.delete(NOTES_ENDPOINTS.DELETE(noteId), {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotes((prev) => prev.filter((note) => note._id !== noteId));
    if (selectedNote?._id === noteId) setSelectedNote(null);
  };

  if (loading) return <Loader />;
  if (filteredNotes.length === 0) return <NoNotes />;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            onClick={() => setSelectedNote(note)}
            className="bg-[var(--bg-secondary)]/40 border border-[var(--border-light)]/70 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <h2 className="text-lg font-semibold text-[var(--accent-primary)] mb-2 line-clamp-1">
              {note.title}
            </h2>

            <p className="text-xs text-[var(--text-secondary)] line-clamp-3 flex-grow">
              {stripHtml(note.note)}
            </p>

            <span className="mt-5 text-[10px] text-[var(--text-secondary)]/80">
              {formatDate(note.createdAt)}
            </span>
          </div>
        ))}
      </div>

      {selectedNote && (
        <NoteDetail
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onDelete={handleDeleteNote}
          token={token}
        />
      )}
    </>
  );
};

export default Notes;
