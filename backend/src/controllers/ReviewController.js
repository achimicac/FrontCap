const pool = require("../../db");
const queries = require("../queries/ReviewQueries");

const getReviews = async (req, res) => {
    try {
        const result = await pool.query(queries.getReviews);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getReviewById = async (req, res) => {
    const id = parseInt(req.params.review_id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.getReviewById, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addReview = async (req, res) => {
    const { Maid_ID, Customer_ID, Star, Comment } = req.body;

    try {
        const result = await pool.query(queries.addReview, [Maid_ID, Customer_ID, Star, Comment]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateReview = async (req, res) => {
    const id = parseInt(req.params.review_id);
    const { Maid_ID, Customer_ID, Star, Comment } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.updateReview, [Maid_ID, Customer_ID, Star, Comment, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteReview = async (req, res) => {
    const id = parseInt(req.params.review_id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.deleteReview, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getReviews,
    getReviewById,
    addReview,
    updateReview,
    deleteReview
};
