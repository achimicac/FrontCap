const getReviews = "SELECT * FROM Review";
const getReviewById="SELECT * FROM Review WHERE Review_ID = $1";
const addReview="INSERT INTO Review (Maid_ID, Customer_ID, Star, Comment) VALUES ($1, $2, $3, $4) RETURNING *";
const updateReview="UPDATE Review SET Maid_ID = $1, Customer_ID = $2, Star = $3, Comment = $4 WHERE Review_ID = $5 RETURNING *";
const deleteReview="DELETE FROM Review WHERE Review_ID = $1 RETURNING *";

module.exports ={
    getReviews,
    getReviewById,
    addReview,
    updateReview,
    deleteReview,

};

