const pool = require("../../db");
const queries = require("../queries/addressQueries");


const getAddresses = async (req, res) => {
    try {
        const result = await pool.query(queries.getAddresses);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAddressById = async (req, res) => {
    const id = parseInt(req.params.add_id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    pool.query('SELECT * FROM Address WHERE add_ID = $1', [id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.rows.length === 0) {
            res.status(404).json({ error: 'Address not found' });
            return;
        }
        res.status(200).json(results.rows[0]);
    });
};


const addAddress = async (req, res) => {
    const { User_ID, Latitude, Longitude, Address } = req.body;

    try {
        const query = `
            INSERT INTO Address (User_ID, Latitude, Longitude, Address)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [User_ID, Latitude, Longitude, Address];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateAddress = async (req, res) => {
    const id = parseInt(req.params.add_id);
    const { User_ID, Latitude, Longitude, Address } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const query = `
            UPDATE Address
            SET User_ID = $1, Latitude = $2, Longitude = $3, Address = $4
            WHERE Add_ID = $5
            RETURNING *
        `;
        const values = [User_ID, Latitude, Longitude, Address, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteAddress = async (req, res) => {
    const id = parseInt(req.params.add_id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const result = await pool.query("DELETE FROM Address WHERE Add_ID = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAddresses,
    getAddressById,
    addAddress,
    updateAddress,
    deleteAddress
};
