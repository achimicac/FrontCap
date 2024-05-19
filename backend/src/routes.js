const { Router } = require("express");
const controller = require("./controllers/AccountController");

const router = Router();

router.get("/" , controller.getAccount);
router.post("/",controller.addAccount);
router.get("/:user_id", controller.getAccountById);

module.exports = router;
            
