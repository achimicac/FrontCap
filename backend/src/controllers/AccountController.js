const queries  = require("../queries");
const pool = require("../../db");

const getAccount = async (req,res) => {

    pool.query("SELECT * FROM Account", (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results.rows);
    });
};             

const getAccountById = async(req, res) => {
    console.log(req.params);
    const id = parseInt(req.params.user_id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    pool.query('SELECT * FROM Account WHERE User_ID = $1', [id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.rows.length === 0) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        res.status(200).json(results.rows[0]);
    });
};

const addAccount = async (req, res) => {
    const {
        User_Role,
        User_Pic,
        Firstname,
        Lastname,
        Birthday,
        Tel,
        Email,
        Pass,
        Description
    } = req.body;

    try {
        const emailCheckResult = await pool.query(queries.checkEmailExists, [Email]);
        if (emailCheckResult.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        const query = `
            INSERT INTO Account (User_Role, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Description)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;
        const values = [User_Role, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Description];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(500).json({ error: 'No account was created' });
        }
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }};

module.exports = {
    addAccount,
    getAccount,
    getAccountById,
};


