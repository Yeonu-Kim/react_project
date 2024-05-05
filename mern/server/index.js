const express = require("express");
const dotoenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");

const app = express();
const port = 7000;

// Env Setting
dotoenv.config();

// Routes
app.get("/", (req, res) => {
    res.json("Hello World!");
});

// Middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Check the mongoDB connection
const connectDB = async () => { 
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
