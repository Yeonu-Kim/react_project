const express = require("express");
const dotoenv = require("dotenv")
const mongoose = require("mongoose");

const app = express();
const port = 7000;

// Env Setting
dotoenv.config();

app.get("/", (req, res) => {
    res.json("Hello World!");
});

// Check the mongoDB connection
const connectDB = async () => {
    console.log(process.env.MONGO);
    
    mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch((error) => {
        console.log(error);
    });
}

// Check server listen
app.listen(port, () => {
    connectDB();
    console.log(`Listening on port ${port}`);
  });
