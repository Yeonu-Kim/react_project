const express = require("express");
const roomsController = require("../controllers/roomsController");
const tokenUtil = require("../utils/verifyToken");

const router = express.Router();

// CREATE
router.post("/:hotelID", tokenUtil.verifyAdmin, roomsController.createRoom);
// UPDATE
router.patch("/:id", tokenUtil.verifyAdmin, roomsController.updateRoom);
// DELETE
router.delete("/:id", tokenUtil.verifyAdmin, roomsController.deleteRoom);
// GET
router.get("/:id", roomsController.getRoom);
// GET ALL
router.get("/", roomsController.getAllRoom);

module.exports = router