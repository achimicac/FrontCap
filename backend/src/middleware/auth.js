const jwt = require("jsonwebtoken");
const pool = require("../../db");

exports.auth = (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(401).send("ไม่พบ token, ยกเลิกการยืนยันตัวตน");
    }
    const decoded = jwt.verify(token, "jwtS3cr3t");

    //console.log("middleware", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Token ไม่ถูกต้อง");
  }
};

exports.maidCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { rows } = await pool.query(
      'SELECT user_id FROM "User" WHERE email = $1',
      [email]
    );

    if (rows[0].user_role !== "maid") {
      res.status(403).send(err, "การเข้าถึงแม่บ้านถูกปฏิเสธ");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("การเข้าถึงแม่บ้านถูกปฏิเสธ");
  }
};
