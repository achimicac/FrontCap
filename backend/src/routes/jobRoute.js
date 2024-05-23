const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobController");

router.get("/", jobController.getJobs);
router.get("/:job_id", jobController.getJobById);
router.post("/", jobController.addJob);
router.put("/:job_id", jobController.updateJob);
router.delete("/:job_id", jobController.deleteJob);

module.exports = router;

