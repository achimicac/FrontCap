const pool = require("../../db");
const queries = require("../queries/jobQueries");

const getJobs = async (req, res) => {
    try {
        const result = await pool.query(queries.getJobs);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getJobById = async (req, res) => {
    const id = parseInt(req.params.job_id);  

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.getJobById, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addJob = async (req, res) => {
    const { Job_Name } = req.body;

    try {
        const result = await pool.query(queries.addJob, [Job_Name]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateJob = async (req, res) => {
    const id = parseInt(req.params.job_id);  
    const { Job_Name } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.updateJob, [Job_Name, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteJob = async (req, res) => {
    const id = parseInt(req.params.job_id);  

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query(queries.deleteJob, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob,
};


