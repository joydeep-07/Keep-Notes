import jsPDF from "jspdf";

export const downloadNoteAsPdf = (title, editorElement) => {
  if (!editorElement) return;

  const pdf = new jsPDF("p", "mm", "a4");

  pdf.html(editorElement, {
    x: 15,
    y: 20,
    width: 180, // content width
    windowWidth: editorElement.scrollWidth,
    autoPaging: "text",
    callback: function (doc) {
      doc.save(`${title || "note"}.pdf`);
    },
  });
};
