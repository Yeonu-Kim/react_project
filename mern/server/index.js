const express = require("express");
const dotoenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");

const app = express();
const port = 7000;

// Env Setting
dotoenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credential: true
}))

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Undefined Server Error";

    console.log(err);
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        stack: err.stack
    });
});

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
