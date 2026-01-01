import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NOTES_ENDPOINTS } from "../utils/endpoint";
import NoteDetail from "./NoteDetail";
import NoNotes from "./NoNotes";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get auth state from Redux
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const getPreview = (text, wordLimit = 20) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Fetch notes from API
  const fetchNotes = async () => {
    if (!isAuthenticated || !token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(NOTES_ENDPOINTS.GET_ALL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notes");
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated]);

  // Handle note deletion
  const handleDeleteNote = async (noteId) => {
    if (!isAuthenticated || !token) return;

    try {
      await axios.delete(NOTES_ENDPOINTS.DELETE(noteId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted note from state
      setNotes(notes.filter((note) => note._id !== noteId));

      // Close detail modal if open
      if (selectedNote && selectedNote._id === noteId) {
        setSelectedNote(null);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      alert(err.response?.data?.message || "Failed to delete note");
    }
  };

  // Handle note update
  const handleUpdateNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    setSelectedNote(updatedNote);
  };

  // Refresh notes
  const handleRefresh = () => {
    fetchNotes();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg text-[var(--text-secondary)]">
            Please log in to view your notes
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)] mx-auto"></div>
          <p className="mt-4 text-[var(--text-secondary)]">Loading notes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchNotes}
            className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:opacity-90 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
     <NoNotes/>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold heading text-[var(--text-primary)]">
          My Notes ({notes.length})
        </h1>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 text-sm bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] rounded-lg transition"
        >
          Refresh
        </button>
      </div>

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
            <div className="mt-4 pt-3 border-t border-[var(--border-light)]/50 flex justify-between items-center">
              <span className="text-xs text-[var(--text-muted)]">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    window.confirm("Are you sure you want to delete this note?")
                  ) {
                    handleDeleteNote(note._id);
                  }
                }}
                className="
                  text-xs 
                  text-red-500 
                  opacity-0 
                  group-hover:opacity-100 
                  hover:text-red-600 
                  transition-opacity
                  px-2 py-1
                  rounded
                  hover:bg-red-50
                "
              >
                Delete
              </button>
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
