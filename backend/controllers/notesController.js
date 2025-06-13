const pool = require("../db");

exports.getAllNotes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Catatan tidak ditemukan" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    res.json({ message: "Catatan berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
