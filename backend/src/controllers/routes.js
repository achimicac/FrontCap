const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/" , controller.getAccount);

module.exports = router;
