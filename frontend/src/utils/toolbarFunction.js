// utils/toolbarFunction.js

export const saveHistory = (editorRef, historyRef, historyIndexRef) => {
  if (!editorRef.current) return;

  const currentContent = editorRef.current.innerHTML;

  historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);

  historyRef.current.push(currentContent);
  historyIndexRef.current = historyRef.current.length - 1;
};

export const formatText = (
  command,
  {
    editorRef,
    value = null,
    setContent,
    updateFormatStates,
    historyRef,
    historyIndexRef,
  }
) => {
  if (!editorRef.current) return;

  // save history before change
  saveHistory(editorRef, historyRef, historyIndexRef);

  document.execCommand(command, false, value);

  updateFormatStates();
  setContent(editorRef.current.innerHTML);
  editorRef.current.focus();
};

export const updateFormatStates = ({
  setIsBold,
  setIsItalic,
  setIsUnderline,
  setTextAlign,
  setIsBulletList,
  setIsNumberedList,
}) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const parent = range.commonAncestorContainer.parentElement;

  setIsBold(document.queryCommandState("bold"));
  setIsItalic(document.queryCommandState("italic"));
  setIsUnderline(document.queryCommandState("underline"));

  setTextAlign(parent.style.textAlign || "left");

  const tag = parent.tagName.toLowerCase();
  const listParent = parent.parentElement?.tagName.toLowerCase();

  setIsBulletList(tag === "li" && listParent === "ul");
  setIsNumberedList(tag === "li" && listParent === "ol");
};

export const handleUndo = (
  editorRef,
  historyRef,
  historyIndexRef,
  setContent
) => {
  if (historyIndexRef.current <= 0) return;

  historyIndexRef.current--;
  const prev = historyRef.current[historyIndexRef.current];
  editorRef.current.innerHTML = prev;
  setContent(prev);
};

export const handleRedo = (
  editorRef,
  historyRef,
  historyIndexRef,
  setContent
) => {
  if (historyIndexRef.current >= historyRef.current.length - 1) return;

  historyIndexRef.current++;
  const next = historyRef.current[historyIndexRef.current];
  editorRef.current.innerHTML = next;
  setContent(next);
};
