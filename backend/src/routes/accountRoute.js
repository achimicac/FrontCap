const express = require("express");
const router = express.Router();
const AccountController = require("../controllers/AccountController");
const { upload } = require("../middleware/uploadImage");
const { auth } = require("../middleware/auth");

router.post("/getAccount", auth, AccountController.getAccount);
router.post("/getByIDs", AccountController.getAccountByIds);
router.post("/", AccountController.addAccount);
router.post("/login", AccountController.login);
router.post("/register", AccountController.register);
router.put("/:user_id", AccountController.updateAccount);
// router.post(
//   "/uploadImage",
//   upload.single("image"),
//   AccountController.uploadImage
// );
router.delete("/:user_id", AccountController.deleteAccount);

module.exports = router;
