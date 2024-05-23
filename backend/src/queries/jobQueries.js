const getJobs = "SELECT * FROM Job";
const getJobById = "SELECT * FROM Job WHERE Job_ID = $1";
const addJob = "INSERT INTO Job (Job_Name) VALUES ($1) RETURNING *";
const updateJob = "UPDATE Job SET Job_Name = $1 WHERE Job_ID = $2 RETURNING *";
const deleteJob = "DELETE FROM Job WHERE Job_ID = $1 RETURNING *";

module.exports = {
    getJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob,
};

