const queries = require("../queries");
const database = require('../../db');

exports.getAllAccounts = async (req, res) => {
    try {
        const result = await database.pool.query(queries.getAllAccounts);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }};

exports.createAccount = async (req, res) => {
    const { User_Role, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Descript } = req.body;

    try {
        const existsResult = await database.pool.query(queries.checkEmailExists, [Email]);
        if (existsResult.rows[0].exists) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const result = await database.pool.query(queries.createAccount, [User_Role, User_Pic, Firstname, Lastname, Birthday, Tel, Email, Pass, Descript]);
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
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
        // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
        const emailCheckResult = await pool.query(queries.checkEmailExists, [Email]);
        if (emailCheckResult.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await database.pool.query(queries.deleteAccount, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Account not found' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.checkEmailExists = async (req, res) => {
    const { Email } = req.body;

    try {
        const result = await database.pool.query(queries.checkEmailExists, [Email]);

        if (result.rows[0].exists) {
            return res.status(409).json({ error: 'Email already exists' });
        } else {
            return res.status(200).json({ message: 'Email is available' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}; 



