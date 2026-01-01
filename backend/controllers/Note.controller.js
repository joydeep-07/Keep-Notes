const Note = require("../models/Note.model");

/* ================= CREATE NOTE ================= */
exports.createNote = async (req, res) => {
  try {
    const { title, note } = req.body;

    if (!title || !note) {
      return res.status(400).json({ message: "Title and note are required" });
    }

    const newNote = await Note.create({
      userId: req.user.id,
      title,
      note,
    });

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ================= GET ALL NOTES ================= */
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ================= GET SINGLE NOTE ================= */
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ================= UPDATE NOTE ================= */
exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/* ================= DELETE NOTE ================= */
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
