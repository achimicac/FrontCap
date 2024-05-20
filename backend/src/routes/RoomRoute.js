const express = require("express");
const router = express.Router();
const roomController = require("../controllers/RoomController");

router.get("/", roomController.getRooms);
router.get("/:room_id", roomController.getRoomById);
router.post("/", roomController.addRoom);
router.put("/:room_id", roomController.updateRoom);
router.delete("/:room_id", roomController.deleteRoom);

module.exports = router;
