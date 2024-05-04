const express = require("express");

const app = express();
const port = 7000;

// Check server listen
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });