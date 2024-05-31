const pool = require("../../db");
const queries = require("../queries/UserJobQueries");

const getTimeWeight = async (req, res) => {
  const { room_id, job_ids } = await req.body;
  try {
    let result = [];
    for (let i = 0; i < job_ids.length; i++) {
      const search_time_weight = await pool.query(
        "SELECT * FROM timeweight WHERE room_id = $1 and job_id = $2",
        [room_id, job_ids[i]]
      );
      const time_weight = search_time_weight.rows[0];
      result.push(time_weight);
    }
    return res.status(200).json({ success: true, time_weight: result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: error });
  }
};

module.exports = {
  getTimeWeight,
};
