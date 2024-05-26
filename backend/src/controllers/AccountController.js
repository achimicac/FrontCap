const queries = require("../queries/accountQueries");
const pool = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const getAccount = async (req, res) => {
  const { email, role } = req.user;

  if (!email || !role) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid request data" });
  }

  try {
    const { rows } = await pool.query(queries.getAccount, [email]);
    const user_cut = rows[0];

    res.status(200).json({ success: true, user: user_cut });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getAccountByIds = async (req, res) => {
  const { ids } = req.body;

  let result = [];
  for (let i = 0; i < ids.length; i++) {
    const select_query = await pool.query(queries.getAccountById, [ids[i]]);
    result.push(select_query.rows[0]);
  }

  if (result.length > 0) {
    return res.status(200).json({ success: true, maid_data: result });
  } else {
    res.status(404).json({ success: false });
  }
};

const addAccount = async (req, res) => {
  const {
    User_Role,
    User_Gender,
    User_Pic,
    Firstname,
    Lastname,
    Birthday,
    Tel,
    Email,
    Description,
    Pass,
  } = req.body;

  try {
    const emailCheckResult = await pool.query(queries.checkEmailExists, [
      Email,
    ]);
    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const query = `
            INSERT INTO Account (
                User_Role, 
                User_Gender, 
                User_Pic, 
                Firstname, 
                Lastname, 
                Birthday, 
                Tel, 
                Email, 
                Pass, 
                Description)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
    const values = [
      User_Role,
      User_Gender,
      User_Pic,
      Firstname,
      Lastname,
      Birthday,
      Tel,
      Email,
      Pass,
      Description,
    ];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(500).json({ error: "No account was created" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAccount = async (req, res) => {
  const {
    User_Role,
    User_Gender,
    User_Pic,
    Firstname,
    Lastname,
    Birthday,
    Tel,
    Email,
    Pass,
    Description,
  } = req.body;
  const { id } = req.params;

  try {
    const result = await database.pool.query(queries.updateAccount, [
      User_Role,
      User_Gender,
      User_Pic,
      Firstname,
      Lastname,
      Birthday,
      Tel,
      Email,
      Pass,
      Description,
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAccount = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM Account WHERE User_ID = $1 RETURNING *",
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    const {
      user_role,
      user_gender,
      firstname,
      lastname,
      birthday,
      tel,
      email,
      pass,
    } = req.body;
    const { rows } = await pool.query(
      "SELECT user_id FROM Account WHERE email = $1 OR tel = $2",
      [email, tel]
    );
    if (rows.length > 0) {
      return res.json({
        success: false,
        text: "อีเมลหรือเบอร์โทรนี้ถูกใช้ลงทะเบียนมาก่อนแล้ว",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordEncoded = await bcrypt.hash(pass, salt);
    const insertAccountQuery = `INSERT INTO Account (
                            user_role, 
                            user_gender, 
                            user_pic, 
                            firstname, 
                            lastname, 
                            birthday, 
                            tel, 
                            email, 
                            pass, 
                            description
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const insertAccountValues = [
      user_role,
      user_gender,
      null,
      firstname,
      lastname,
      birthday,
      tel,
      email,
      passwordEncoded,
      null,
    ];
    await pool.query(insertAccountQuery, insertAccountValues);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error signing up", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const { rows } = await pool.query(
      "SELECT * FROM Account WHERE email = $1",
      [email]
    );
    if (rows.length > 0) {
      const isMatch = await bcrypt.compare(pass, rows[0].pass);

      if (!isMatch) {
        return res.status(400).send("รหัสผ่านไม่ถูกต้อง");
      }

      const payload = {
        user: {
          email: rows[0].email,
          role: rows[0].user_role,
        },
      };

      jwt.sign(payload, "jwtS3cr3t", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        return res.json({ token, payload });
      });
    } else {
      return res.status(400).send("ไม่พบบัญชีผู้ใช้");
    }
  } catch (error) {
    console.error("Error signing up", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// const uploadImage = async (req, res) => {
//   // console.log("yay");
//   const imageName = req.file.filename;

//   try {
//     const upload_query = `UPDATE Account SET
//                         User_Pic = $1
//                     WHERE User_Pic IS NULL RETURNING *`;
//     const { rows } = await pool.query(upload_query, [imageName]);
//     res.json({ success: true });
//   } catch (err) {
//     res.json({ success: false, error: err });
//   }
// };

module.exports = {
  addAccount,
  getAccount,
  getAccountByIds,
  updateAccount,
  deleteAccount,
  register,
  login,
  // uploadImage,
};
