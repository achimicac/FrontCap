const express = require("express");
const router = express.Router();
const userJobController = require("../controllers/UserJobController");
const { auth } = require("../middleware/auth");

router.post("/Userjobs", auth, userJobController.getUserJobs);
// router.get('/Userjobs/:User_id/:job_id', UserJobController.getUserJobById);
router.post("/addUserjobs", userJobController.addUserJob);
router.post("/updateUserJob", auth, userJobController.updateUserJob);
// router.delete('/Userjobs/:User_id/:job_id', UserJobController.deleteUserJob);

module.exports = router;  