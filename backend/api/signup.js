const express = require("express");
const pool = require("./db");
const bcrypt = require("bcryptjs");

// const router = express.Router();

// router.post("/signup", async (req, res) => {
//   try {
//     const {
//       user_role,
//       user_gender,
//       firstname,
//       lastname,
//       birthday,
//       tel,
//       email,
//       pass,
//     } = req.body;
//     const { rows } = await pool.query(
//       'SELECT user_id FROM "User" WHERE email = $1 OR tel = $2',
//       [email, tel]
//     );
//     if (rows.length > 0) {
//       return res.json({
//         success: false,
//         text: "อีเมลหรือเบอร์โทรนี้ถูกใช้ลงทะเบียนมาก่อนแล้ว",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const passwordEncoded = await bcrypt.hash(pass, salt);

//     const insertQuery = `INSERT INTO "User" (
//                             user_role,
//                             user_gender,
//                             user_pic,
//                             firstname,
//                             lastname,
//                             birthday,
//                             tel,
//                             email,
//                             pass,
//                             description
//                         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
//     const insertValues = [
//       user_role,
//       user_gender,
//       null,
//       firstname,
//       lastname,
//       birthday,
//       tel,
//       email,
//       passwordEncoded,
//       null,
//     ];

//     await pool.query(insertQuery, insertValues);

//     return res.json({ success: true });
//   } catch (error) {
//     console.error("Error signing up", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal Server Error" });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const { email, pass } = req.body;
//     const { rows } = await pool.query(
//       'SELECT user_id FROM "User" WHERE email = $1',
//       [email]
//     );
//     if (rows.length > 0) {
//       const isMatch = await bcrypt.compare(pass, rows[0].pass);

//       if (!isMatch) {
//         return res.status(400).send("รหัสผ่านไม่ถูกต้อง");
//       }

//       const payload = {
//         user: {
//           email: rows[0].email,
//           role: rows[0].user_role,
//         },
//       };

//       jwt.sign(payload, "jwtS3cr3t", { expiresIn: "1d" }, (err, token) => {
//         if (err) throw err;
//         res.json({ token, payload });
//       });
//     } else {
//       return res.status(400).send("ไม่พบบัญชีผู้ใช้");
//     }
//   } catch (error) {
//     console.error("Error signing up", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal Server Error" });
//   }
// });

module.exports = router;
