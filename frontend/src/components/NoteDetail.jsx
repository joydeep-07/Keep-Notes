import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, easeIn, easeOut } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { downloadNoteAsPdf } from "../utils/downloadPdf";
import Toolbar from "./Toolbar";
import { NOTES_ENDPOINTS } from "../utils/endpoint";
import { formatDate } from "../utils/dateFormat";

import {
  formatText,
  updateFormatStates,
  handleUndo,
  handleRedo,
  saveHistory,
} from "../utils/toolbarFunction";
import Action from "./Action";

/* ================= ANIMATION ================= */

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: easeIn },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.18, ease: easeOut },
  },
};

/* ================= COMPONENT ================= */

const NoteDetail = ({ note, onClose, onDelete, onUpdate, token }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.note);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Toolbar states
  const [fontSize, setFontSize] = useState("normal");
  const [textColor, setTextColor] = useState("#000000");
  const [textAlign, setTextAlign] = useState("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);

  const editorRef = useRef(null);
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);

  /* ================= CHANGE DETECTION ================= */

  useEffect(() => {
    setHasChanges(title !== note.title || content !== note.note);
  }, [title, content, note]);

  /* ================= INIT EDITOR ================= */

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = note.note;
      saveHistory(editorRef, historyRef, historyIndexRef);
    }
  }, [note]);

  /* ================= FORMAT HELPERS ================= */

  const syncFormatStates = () =>
    updateFormatStates({
      setIsBold,
      setIsItalic,
      setIsUnderline,
      setTextAlign,
      setIsBulletList,
      setIsNumberedList,
    });

  const applyFormat = (command, value = null) =>
    formatText(command, {
      editorRef,
      value,
      setContent,
      updateFormatStates: syncFormatStates,
      historyRef,
      historyIndexRef,
    });

  const undo = () =>
    handleUndo(editorRef, historyRef, historyIndexRef, setContent);

  const redo = () =>
    handleRedo(editorRef, historyRef, historyIndexRef, setContent);

  /* ================= EDITOR INPUT ================= */

  const handleEditorInput = () => {
    if (!editorRef.current) return;

    setContent(editorRef.current.innerHTML);
    saveHistory(editorRef, historyRef, historyIndexRef);
    syncFormatStates();
  };

  /* ================= API HANDLERS ================= */

  const handleSave = async () => {
    if (!token || !hasChanges) return;

    try {
      setIsSaving(true);

      const res = await axios.put(
        NOTES_ENDPOINTS.UPDATE(note._id),
        { title, note: content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onUpdate?.(res.data);
      setHasChanges(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

 const handleDeleteNote = async () => {
   await onDelete(note._id);
   onClose();
 };


  /* ================= RENDER ================= */

  return (
    <AnimatePresence>
      {note && (
        <motion.div
          className="fixed inset-0 z-70 flex justify-center items-start p-4 md:p-20"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
            variants={backdrop}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-5xl min-h-[75vh] max-h-[800px] bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-light)] flex flex-col"
            variants={modal}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-light)]">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="text-2xl heading text-[var(--text-main)]/95 bg-transparent outline-none w-full pr-4"
              />

              <button
                onClick={handleDeleteNote}
                className="p-2 rounded-lg text-red-500 hover:bg-red-500/10"
              >
                <AiOutlineDelete size={20} />
              </button>

              <Action
                onDelete={() => handleDeleteNote(note._id)}
                onDownload={() => downloadNoteAsPdf(title, editorRef.current)}
              />
            </div>

            {/* Toolbar */}
            <Toolbar
              onUndo={undo}
              onRedo={redo}
              onFormat={applyFormat}
              onAlign={(align) =>
                applyFormat(
                  align === "left"
                    ? "justifyLeft"
                    : align === "center"
                    ? "justifyCenter"
                    : "justifyRight"
                )
              }
              onFontSizeChange={(e) => {
                setFontSize(e.target.value);
                applyFormat(
                  "fontSize",
                  e.target.value === "small"
                    ? "2"
                    : e.target.value === "large"
                    ? "5"
                    : "3"
                );
              }}
              onTextColorChange={(e) => {
                setTextColor(e.target.value);
                applyFormat("foreColor", e.target.value);
              }}
              fontSize={fontSize}
              textColor={textColor}
              isBold={isBold}
              isItalic={isItalic}
              isUnderline={isUnderline}
              textAlign={textAlign}
            />

            {/* Editor */}
            <div className="flex-1 overflow-auto p-6">
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                onClick={syncFormatStates}
                onKeyUp={syncFormatStates}
                className="min-h-full outline-none text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap"
                style={{
                  fontSize:
                    fontSize === "small"
                      ? "14px"
                      : fontSize === "large"
                      ? "18px"
                      : "16px",
                }}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--border-light)] p-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--text-secondary)]">
                  {note.createdAt === note.updatedAt
                    ? `Created ${formatDate(note.createdAt)}`
                    : `Last Updated ${formatDate(note.updatedAt)}`}
                </span>

                <button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className={`px-4 py-2 rounded-sm ${
                    hasChanges
                      ? "bg-[var(--accent-primary)] text-white"
                      : "bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteDetail;
