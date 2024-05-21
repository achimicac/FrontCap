const express = require("express");
const router = express.Router();
const maidJobController = require("../controllers/maidJobController");

router.get('/maidjobs', maidJobController.getMaidJobs);
router.get('/maidjobs/:maid_id/:job_id', maidJobController.getMaidJobById);
router.post('/maidjobs', maidJobController.addMaidJob);
router.delete('/maidjobs/:maid_id/:job_id', maidJobController.deleteMaidJob);

module.exports = router;  