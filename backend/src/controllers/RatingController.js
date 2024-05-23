const pool = require("../../db");
const queries = require("../queries/RatingQueries");

const getRatings = async (req, res) => {
  try {
    const result = await pool.query(queries.getRatings);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRatingById = async (req, res) => {
  const id = parseInt(req.params.maid_id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(queries.getRatingById, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addRating = async (req, res) => {
  const { email } = req.body;

  try {
    const { rows } = await pool.query(
      "SELECT user_id FROM Account WHERE email = $1",
      [email]
    );

    await pool.query(queries.addRating, [rows[0].user_id, 0]);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const updateRating = async (req, res) => {
  const id = parseInt(req.params.maid_id);
  const { Avg_Rate } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(queries.updateRating, [Avg_Rate, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteRating = async (req, res) => {
  const id = parseInt(req.params.maid_id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(queries.deleteRating, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }
    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getRatings,
  getRatingById,
  addRating,
  updateRating,
  deleteRating,
};