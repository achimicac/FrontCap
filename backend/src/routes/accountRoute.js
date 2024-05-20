const express = require("express");
const router =express.Router();
const AccountController = require("../controllers/AccountController");

router.get("/" , AccountController.getAccount);
router.get("/:user_id", AccountController.getAccountById);
router.post("/",AccountController.addAccount);
router.put("/:user_id",AccountController. updateAccount);
router.delete("/:user_id",AccountController. deleteAccount);

module.exports = router;
            
    