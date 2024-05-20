const getRatings = "SELECT * FROM Rating";
const getRatingById = "SELECT * FROM Rating WHERE Maid_ID = $1" ;
const addRating  = "INSERT INTO Rating (Maid_ID, Avg_Rate) VALUES ($1, $2) RETURNING *";
const updateRating = "UPDATE Rating SET Avg_Rate = $1 WHERE Maid_ID = $2 RETURNING *";
const deleteRating = "DELETE FROM Rating WHERE Maid_ID = $1 RETURNING *";

module.exports ={
    getRatings,
    getRatingById,
    addRating,
    updateRating,
    deleteRating,
};
