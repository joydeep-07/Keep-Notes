import React from "react";
import { MdFormatColorText } from "react-icons/md";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

const Toolbar = ({
  // actions
  onUndo,
  onRedo,
  onFormat,
  onAlign,
  onFontSizeChange,
  onTextColorChange,

  // states
  fontSize,
  textColor,
  isBold,
  isItalic,
  isUnderline,
  textAlign,
}) => {
  return (
    <div className="flex items-center gap-1 p-3 border-b border-[var(--border-light)] flex-wrap bg-[var(--bg-secondary)]">
      {/* Undo / Redo */}
      <button
        onClick={onUndo}
        className="p-2 rounded hover:bg-[var(--bg-hover)]"
        title="Undo"
      >
        <Undo size={16} />
      </button>

      <button
        onClick={onRedo}
        className="p-2 rounded hover:bg-[var(--bg-hover)]"
        title="Redo"
      >
        <Redo size={16} />
      </button>

      <div className="w-px h-6 bg-[var(--border-light)] mx-1" />

      {/* Font Size */}
      <select
        value={fontSize}
        onChange={onFontSizeChange}
        className="px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-light)] cursor-pointer rounded text-xs"
      >
        <option value="small">Small</option>
        <option value="normal">Normal</option>
        <option value="large">Large</option>
      </select>

      <div className="w-px h-6 bg-[var(--border-light)] mx-1" />

      {/* Bold / Italic / Underline */}
      <button
        onClick={() => onFormat("bold")}
        className={`p-2 rounded ${
          isBold
            ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
            : "hover:bg-[var(--bg-hover)]"
        }`}
        title="Bold"
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => onFormat("italic")}
        className={`p-2 rounded ${
          isItalic
            ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
            : "hover:bg-[var(--bg-hover)]"
        }`}
        title="Italic"
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => onFormat("underline")}
        className={`p-2 rounded ${
          isUnderline
            ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
            : "hover:bg-[var(--bg-hover)]"
        }`}
        title="Underline"
      >
        <Underline size={16} />
      </button>

      <div className="w-px h-6 bg-[var(--border-light)] mx-1" />

      {/* Text Color */}
      <div className="flex items-center gap-1 cursor-pointer">
        <MdFormatColorText size={16} className="text-[var(--text-secondary)]" />
        <input
          type="color"
          value={textColor}
          onChange={onTextColorChange}
          className="w-8 h-8 cursor-pointer bg-transparent border-none"
          title="Text Color"
        />
      </div>

      <div className="w-px h-6 bg-[var(--border-light)] mx-1" />

      {/* Alignment */}
      <button
        onClick={() => onAlign("left")}
        className={`p-2 rounded ${
          textAlign === "left"
            ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
            : "hover:bg-[var(--bg-hover)]"
        }`}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>

      <button
        onClick={() => onAlign("center")}
        className={`p-2 rounded ${
          textAlign === "center"
            ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
            : "hover:bg-[var(--bg-hover)]"
        }`}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>

      <button
        onClick={() => onAlign("right")}
        className={`p-2 rounded ${
          textAlign === "right"
            ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]"
            : "hover:bg-[var(--bg-hover)]"
        }`}
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
    </div>
  );
};

export default Toolbar;
