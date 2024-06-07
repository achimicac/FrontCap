const pool = require("../../db");
const queries = require("../queries/ReviewQueries");

const getReview = async (req, res) => {
  const { maid_email } = req.body;

  try {
    const maid = await pool.query(
      "SELECT user_id FROM Account WHERE email = $1",
      [maid_email]
    );
    const maid_id = maid.rows[0].user_id;

    const review_query = `SELECT review.*, acc.firstname
                            FROM review
                                INNER JOIN Account acc 
                                ON acc.user_id = review.customer_id
                            WHERE review.maid_id = $1`;
    const review = await pool.query(review_query, [maid_id]);

    if (review.rowCount === 0) return res.status(400).json({ success: false });

    return res.status(200).json({
      success: true,
      review_count: review.rowCount,
      review_data: review.rows,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getReviewById = async (req, res) => {
//   const { maid_id } = req.body;

//   try {
//     const review_query = `SELECT review.*, acc.firstname
//                         FROM review
//                             INNER JOIN Account acc
//                             ON acc.user_id = review.customer_id
//                         WHERE review.maid_id = $1`;
//     const review = await pool.query(review_query, [maid_id]);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const addReview = async (req, res) => {
  const { invoice_id, maid_id, customer_id, star, comment } = req.body;
  console.log(req.body);

  try {
    const addReview_updateInvoice = await pool.query(
      `WITH new_review AS (
                INSERT INTO review (maid_id, customer_id, star, comment)
                VALUES ($1, $2, $3, $4)
                RETURNING review_id
            )
            UPDATE invoice
            SET review_id = (SELECT review_id FROM new_review)
            WHERE invoice_id = $5
            RETURNING *`,
      [maid_id, customer_id, star, comment, invoice_id]
    );

    console.log(addReview_updateInvoice.rows[0]);
    res.status(201).json({
      success: true,
      invoice_id: addReview_updateInvoice.rows[0].invoice_id,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateReview = async (req, res) => {
  const id = parseInt(req.params.review_id);
  const { Maid_ID, Customer_ID, Star, Comment } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(queries.updateReview, [
      Maid_ID,
      Customer_ID,
      Star,
      Comment,
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
  const id = parseInt(req.params.review_id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const result = await pool.query(queries.deleteReview, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  //   getReviewById,
  getReview,
  addReview,
  updateReview,
  deleteReview,
};
