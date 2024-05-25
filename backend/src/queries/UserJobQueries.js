// const getUserJobs = "SELECT * FROM UserJob";
// const geUserJobById =
//   "SELECT * FROM UserJob WHERE Maid_ID = $1 AND Job_ID = $2";
const addUserJob =
  "INSERT INTO UserJob (User_ID, Job_ID) VALUES ($1, $2) RETURNING *";
const deleteUserJob = "DELETE FROM UserJob WHERE User_ID = $1 RETURNING *";

module.exports = {
  //   getMaidJobs,
  //   getMaidJobById,
  addUserJob,
  deleteUserJob,
};
