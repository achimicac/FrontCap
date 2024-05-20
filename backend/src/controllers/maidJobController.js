const pool = require("../../db");
const queries = require("../queries/maidJobQueries");

const getMaidJobs = async (req, res) => {
    try {
        const result = await pool.query(queries.getMaidJobs);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMaidJobById = async (req, res) => {
    const { maid_id, job_id } = req.params;
    try {
        const result = await pool.query(queries.getMaidJobById, [maid_id, job_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'MaidJob not found' });
            return;
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addMaidJob = async (req, res) => {
    const { Maid_ID, Job_ID } = req.body;
    try {
        const result = await pool.query(queries.addMaidJob, [Maid_ID, Job_ID]);
        if (result.rows.length === 0) {
            return res.status(500).json({ error: 'No MaidJob was created' });
        }
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteMaidJob = async (req, res) => {
    const { maid_id, job_id } = req.params;
    try {
        const result = await pool.query(queries.deleteMaidJob, [maid_id, job_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'MaidJob not found' });
        }
        res.status(200).json({ message: 'MaidJob deleted successfully' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getMaidJobs,
    getMaidJobById,
    addMaidJob,
    deleteMaidJob,
};
