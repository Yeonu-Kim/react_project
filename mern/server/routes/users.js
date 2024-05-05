const express = require("express");
const usersController = require("../controllers/usersController");
const tokenUtil = require("../utils/verifyToken");

const router = express.Router();

// CREATE
router.post("/", usersController.createUser);
// UPDATE
router.patch("/:id", tokenUtil.verifyUser, usersController.updateUser);
// DELETE
router.delete("/:id", tokenUtil.verifyUser, usersController.deleteUser);
// GET
router.get("/:id", tokenUtil.verifyUser, usersController.getUser);
// GET ALL
router.get("/", tokenUtil.verifyAdmin, usersController.getAllUser);

module.exports = router