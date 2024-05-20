const express = require("express");
const router = express.Router();
const addressController = require("../controllers/AddressController");

router.get("/", addressController.getAddresses);
router.get("/:add_id", addressController.getAddressById);
router.post("/", addressController.addAddress);
router.put("/:add_id", addressController.updateAddress);
router.delete("/:add_id", addressController.deleteAddress);

module.exports = router;
