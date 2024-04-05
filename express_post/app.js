const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;
const { secret } = require("./configs/secret");
const mongoose = require("mongoose");

// Set view engine to handlebars
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", { title: "테스트 게시판" });
});

app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

app.get("/detail/:id", async (req, res) => {
  res.render("detail", {
    title: "테스트 게시판",
  });
});

// Check the express connection
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Check the mongoDB connection
mongoose
  .connect(secret.mongoURI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.log(error);
  });
