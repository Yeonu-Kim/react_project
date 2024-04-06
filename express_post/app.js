const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const { secret } = require("./configs/secret");
const { hbsHelper } = require("./utils/hbsHelper");
const postService = require("./services/post");

// Set app and body parsers
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: hbsHelper,
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// Set controllers
app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";

  try {
    const result = await postService.postList(page, search);
    res.render("home", { title: "테스트 게시판" });
  } catch (error) {
    console.log(error);
    res.render("home", { title: "테스트 게시판" });
  }
});

app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

app.post("/write", async (req, res) => {
  const data = req.body;
  const post = await postService.writePost(data);
  console.log(post._id);
  res.redirect(`/detail/${post._id}`);
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
