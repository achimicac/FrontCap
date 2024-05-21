
const express = require('express');
const pool = require('./db');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        
        const { email, tel } = req.body;
        const { rows } = await pool.query('SELECT user_id FROM "User" WHERE email = $1 OR tel = $2', [email, tel]);
        if (rows.length > 0) {
            return res.json({ success: false, text: "อีเมลหรือเบอร์โทรนี้ถูกใช้ลงทะเบียนมาก่อนแล้ว" });
        }

    
        const userPicBlob = Buffer.from(req.body.user_pic, 'base64');

        
        
        const passwordEncoded = someHashFunction(req.body.password);

        
        const insertQuery = 'INSERT INTO "User" (user_role, user_gender, user_pic, firstname, lastname, birthday, tel, email, pass, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const insertValues = [
            req.body.user_role,
            req.body.user_gender,
            userPicBlob,
            req.body.firstname,
            req.body.lastname,
            req.body.birthday,
            req.body.tel,
            req.body.email,
            passwordEncoded,
            req.body.description
        ];

        await pool.query(insertQuery, insertValues);

        return res.json({ success: true });
    } catch (error) {
        console.error('Error signing up', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
