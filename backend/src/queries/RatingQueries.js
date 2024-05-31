const getRatings = "SELECT * FROM Rating";
const getRatingById = "SELECT * FROM Rating WHERE user_id = $1";
const addRating =
  "INSERT INTO Rating (user_id, Avg_Rate) VALUES ($1, $2) RETURNING *";
const updateRating =
  "UPDATE Rating SET Avg_Rate = $1 WHERE user_id = $2 RETURNING *";
const deleteRating = "DELETE FROM Rating WHERE user_id = $1 RETURNING *";

module.exports = {
  getRatings,
  getRatingById,
  addRating,
  updateRating,
  deleteRating,
};
