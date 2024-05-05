const express = require("express");

const router = express.Router();

// CREATE

// UPDATE

// DELETE

// GET

// GET ALL
router.get('/', (req, res) => {
    res.send("Hello this is hotel endpoint")
})

module.exports = router