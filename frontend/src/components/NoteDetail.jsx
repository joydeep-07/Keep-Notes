import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { data } from "../assets/Data";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = data.find((item) => item.id === Number(id));

  if (!note) {
    return <div className="text-center">Note not found</div>;
  }

  return (
    <div className="max-w-5xl pt-20 mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-[var(--accent-primary)]"
      >
        ← Back
      </button>

      <div className="bg-[var(--bg-secondary)]/50 p-6 rounded-xl border border-[var(--border-light)]/70">
        <h1 className="text-2xl heading text-[var(--accent-primary)] mb-4">
          {note.title}
        </h1>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {note.note}
        </p>

        <span className="block mt-6 text-xs text-[var(--text-muted)]">
          {note.date}
        </span>
      </div>
    </div>
  );
};

export default NoteDetail;
