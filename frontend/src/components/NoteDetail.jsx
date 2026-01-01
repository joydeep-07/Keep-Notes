import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  easeInOut,
  easeIn,
  easeOut,
} from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { NOTES_ENDPOINTS } from "../utils/endpoint";
import Toolbar from "./Toolbar";
import { formatDate } from "../utils/dateFormat";

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

const NoteDetail = ({ note, onClose, onDelete, onUpdate, token }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.note);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textAlign, setTextAlign] = useState("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);

  const editorRef = useRef(null);
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);

  // Check for changes
  useEffect(() => {
    const hasTitleChanged = title !== note.title;
    const hasContentChanged = content !== note.note;
    setHasChanges(hasTitleChanged || hasContentChanged);
  }, [title, content, note]);

  // Save history state
  const saveHistory = () => {
    if (editorRef.current) {
      const currentContent = editorRef.current.innerHTML;
      // Remove old future history
      historyRef.current = historyRef.current.slice(
        0,
        historyIndexRef.current + 1
      );
      historyRef.current.push(currentContent);
      historyIndexRef.current = historyRef.current.length - 1;
    }
  };

  // Initialize editor content and history
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
      saveHistory();
    }
  }, []);

  // Formatting functions
  const formatText = (command, value = null) => {
    if (editorRef.current) {
      // Save selection
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // Save current state before formatting
      saveHistory();

      // Execute format command
      document.execCommand(command, false, value);

      // Update local states
      updateFormatStates();

      // Update content state
      setContent(editorRef.current.innerHTML);

      // Restore focus
      editorRef.current.focus();
    }
  };

  const updateFormatStates = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement = range.commonAncestorContainer.parentElement;

        // Check bold
        setIsBold(document.queryCommandState("bold"));

        // Check italic
        setIsItalic(document.queryCommandState("italic"));

        // Check underline
        setIsUnderline(document.queryCommandState("underline"));

        // Check alignment
        const align = parentElement.style.textAlign || "left";
        setTextAlign(align);

        // Check lists
        const tagName = parentElement.tagName.toLowerCase();
        const isLi = tagName === "li";
        const parentTag = isLi
          ? parentElement.parentElement.tagName.toLowerCase()
          : "";
        setIsBulletList(parentTag === "ul");
        setIsNumberedList(parentTag === "ol");
      }
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      saveHistory();
      updateFormatStates();
    }
  };

  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      const previousContent = historyRef.current[historyIndexRef.current];
      if (editorRef.current) {
        editorRef.current.innerHTML = previousContent;
        setContent(previousContent);
      }
    }
  };

  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      const nextContent = historyRef.current[historyIndexRef.current];
      if (editorRef.current) {
        editorRef.current.innerHTML = nextContent;
        setContent(nextContent);
      }
    }
  };

  const handleSave = async () => {
    if (!token || !hasChanges) return;

    try {
      setIsSaving(true);
      const response = await axios.put(
        NOTES_ENDPOINTS.UPDATE(note._id),
        {
          title,
          note: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (onUpdate) {
        onUpdate(response.data);
      }

      // Reset change detection
      setHasChanges(false);
    } catch (error) {
      console.error("Error updating note:", error);
      alert(error.response?.data?.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        if (onDelete) {
          await onDelete(note._id);
        }
        onClose();
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleInsertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      const text = prompt("Enter the link text (optional):", url);
      formatText("createLink", url);
    }
  };

  const handleInsertImage = () => {
    const url = prompt("Enter the image URL:");
    if (url) {
      formatText("insertImage", url);
    }
  };

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
            className="
              relative
              z-10
              w-full
              max-w-5xl
              min-h-[75vh]
              max-h-[800px]
              bg-[var(--bg-secondary)]
              rounded-xl
              border
              border-[var(--border-light)]
              flex
              flex-col
              will-change-transform
            "
            variants={modal}
          >
            {/* Header */}
            <div className="flex items-center justify-between  p-6 border-b border-[var(--border-light)]">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  text-2xl
                  heading
                  text-[var(--accent-primary)]
                  bg-transparent
                  border-none
                  outline-none
                  w-full
                  pr-4
                  placeholder-[var(--text-muted)]
                "
                placeholder="Note Title"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 active:scale-95 transition"
                  title="Delete note"
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>
            </div>

            <Toolbar
              onUndo={handleUndo}
              onRedo={handleRedo}
              onFormat={formatText}
              onAlign={(align) => {
                setTextAlign(align);
                formatText(
                  align === "left"
                    ? "justifyLeft"
                    : align === "center"
                    ? "justifyCenter"
                    : "justifyRight"
                );
              }}
              onFontSizeChange={(e) => {
                setFontSize(e.target.value);
                formatText(
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
                formatText("foreColor", e.target.value);
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
                onKeyUp={updateFormatStates}
                onClick={updateFormatStates}
                className="
                  min-h-full
                  outline-none
                  text-[var(--text-secondary)]
                  leading-relaxed
                  whitespace-pre-wrap
                  word-break: break-word
                "
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
            <div className="border-t border-[var(--border-light)] rounded-b-xl p-4 bg-[var(--bg-secondary)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  {new Date(note.createdAt).getTime() ===
                  new Date(note.updatedAt).getTime() ? (
                    <span>Created {formatDate(note.createdAt)}</span>
                  ) : (
                    <span>Last Updated {formatDate(note.updatedAt)}</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {hasChanges && (
                    <button
                      onClick={() => {
                        setTitle(note.title);
                        setContent(note.note);
                        if (editorRef.current) {
                          editorRef.current.innerHTML = note.note;
                        }
                        setHasChanges(false);
                        historyRef.current = [note.note];
                        historyIndexRef.current = 0;
                      }}
                      className="px-3 py-2 text-xs font-medium rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition"
                    >
                      Discard
                    </button>
                  )}

                  <button
                    onClick={handleSave}
                    disabled={!hasChanges || isSaving}
                    className={`
                      px-4 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition
                      ${
                        hasChanges
                          ? "bg-[var(--accent-primary)] text-white hover:opacity-90"
                          : "bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed"
                      }
                    `}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>Save Changes</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteDetail;
