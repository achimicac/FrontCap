const pool = require("../../db");
const queries = require("../queries/UserJobQueries");

// const getUserJobs = async (req, res) => {
//   try {
//     const result = await pool.query(queries.getUserJobs);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const getUserJobById = async (req, res) => {
//   const { User_ID, Job_ID } = req.params;
//   try {
//     const result = await pool.query(queries.getUserJobById, [User_ID, Job_ID]);
//     if (result.rows.length === 0) {
//       res.status(404).json({ error: "UserJob not found" });
//       return;
//     }
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const addUserJob = async (req, res) => {
  const { email, jobs } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT user_id FROM Account WHERE email = $1",
      [email]
    );

    let result = [];
    for (let i = 0; i < jobs.length; i++) {
      const qu = await pool.query(queries.addUserJob, [
        rows[0].user_id,
        jobs[i].job_id,
      ]);
      result.push(qu);
    }

    if (result.length === 0) {
      return res
        .status(500)
        .json({ success: false, error: "No UserJob was created" });
    }
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const updateUserJob = async (req, res) => {
  const { email, role } = req.user;
  const { jobs } = req.body;
  try {
    if (role === "customer") {
      const get_ids = await pool.query(
        "SELECT user_id FROM Account WHERE email = $1 LIMIT 1",
        [email]
      );

      const user_id = get_ids.rows[0].user_id;

      const search_user_job = await pool.query(
        "SELECT * FROM UserJob WHERE user_id = $1",
        [user_id]
      );

      if (search_user_job.rows.length == 0) {
        // Add new Jobs
        let result = [];
        for (let i = 0; i < jobs.length; i++) {
          const qu = await pool.query(queries.addUserJob, [
            user_id,
            jobs[i].job_id,
          ]);
          result.push(qu);
        }
        if (result.length == jobs.length)
          return res.status(201).json({ success: true });
      } else {
        // Delete old Jobs and Insert new Jobs
        const delete_query = await pool.query(queries.deleteUserJob, [user_id]);

        let result = [];
        for (let i = 0; i < jobs.length; i++) {
          const qu = await pool.query(queries.addUserJob, [
            user_id,
            jobs[i].job_id,
          ]);
          result.push(qu);
        }
        if (delete_query && result.length == jobs.length)
          return res.status(201).json({ success: true });
      }
    } else {
      return res.status(403).json({ success: false, error: "Forbidden User" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUserJob = async (req, res) => {
  const { User_ID, Job_ID } = req.params;
  try {
    const result = await pool.query(queries.deleteUserJob, [User_ID, Job_ID]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "UserJob not found" });
    }
    res.status(200).json({ message: "UserJob deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  // getUserJobs,
  // getUserJobById,
  addUserJob,
  updateUserJob,
  deleteUserJob,
};
