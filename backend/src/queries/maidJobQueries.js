
const getMaidJobs = 'SELECT * FROM MaidJob';
const getMaidJobById = 'SELECT * FROM MaidJob WHERE Maid_ID = $1 AND Job_ID = $2';
const addMaidJob = 'INSERT INTO MaidJob (Maid_ID, Job_ID) VALUES ($1, $2) RETURNING *';
const deleteMaidJob = 'DELETE FROM MaidJob WHERE Maid_ID = $1 AND Job_ID = $2 RETURNING *';

module.exports = {
    getMaidJobs,
    getMaidJobById,
    addMaidJob,
    deleteMaidJob
};
