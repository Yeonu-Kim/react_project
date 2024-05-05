const express = require("express");
const hotelsController = require("../controllers/hotelsController");
const tokenUtil = require("../utils/verifyToken");

const router = express.Router();

// CREATE
router.post("/", tokenUtil.verifyAdmin, hotelsController.createHotel);
// UPDATE
router.patch("/:id", tokenUtil.verifyAdmin, hotelsController.updateHotel);
// DELETE
router.delete("/:id", tokenUtil.verifyAdmin, hotelsController.deleteHotel);
// GET
router.get("/:id", hotelsController.getHotel);
// GET ALL
router.get("/", hotelsController.getAllHotel);

module.exports = router