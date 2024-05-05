const express = require("express");
const hotelsController = require("../controllers/hotelsController");

const router = express.Router();

// CREATE
router.post("/", hotelsController.createHotel);
// UPDATE
router.patch("/:id", hotelsController.updateHotel);
// DELETE
router.delete("/:id", hotelsController.deleteHotel);
// GET
router.get("/:id", hotelsController.getHotel);
// GET ALL
router.get("/", hotelsController.getAllHotel);

module.exports = router