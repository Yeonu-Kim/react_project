const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

// CREATE
router.post("/", usersController.createUser);
// UPDATE
router.patch("/:id", usersController.updateUser);
// DELETE
router.delete("/:id", usersController.deleteUser);
// GET
router.get("/:id", usersController.getUser);
// GET ALL
router.get("/", usersController.getAllUser);

module.exports = router