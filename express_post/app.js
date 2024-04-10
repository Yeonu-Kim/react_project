const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const handlebars = require("express-handlebars");
const { secret } = require("./configs/secret");
const { hbsHelper } = require("./utils/hbsHelper");
const postService = require("./services/post");

// Set app and body parsers
const app = express();
const port = 7000;
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
app.set("views", path.join(__dirname + "/views"));

// Set static files
app.use(express.static(path.join(__dirname + "public")));

app.get("/js/detail.js", (req, res) => {
  res.set("Content-Type", "text/javascript");
  res.sendFile(path.join(__dirname, "public", "js", "detail.js"));
});

// Set controllers
app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";

  try {
    const [posts, paginator] = await postService.postList(page, search);
    res.render("home", { title: "테스트 게시판", search, paginator, posts });
  } catch (error) {
    res.render("home", { title: "테스트 게시판" });
  }
});

app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판", mode: "create" });
});

app.post("/write", async (req, res) => {
  const data = req.body;
  const post = await postService.writePost(data);
  res.redirect(`/detail/${post._id}`);
});

app.get("/detail/:id", async (req, res) => {
  const post = await postService.getDetailPost(req.params.id);
  res.render("detail", {
    title: "테스트 게시판",
    post: post,
  });
});

app.post("/check-password", async (req, res) => {
  const { id, password } = req.body;
  const post = await postService.getPostByIdAndPassword(id, password);

  if (!post) {
    return res.json({ isExist: false });
  } else {
    return res.json({ isExist: true });
  }
});

app.get("/modify/:id", async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  res.render("write", { title: "테스트 게시판", mode: "modify", post });
});

app.post("/modify/:id", async (req, res) => {
  const id = req.params.id;
  const { title, password, content } = req.body;

  const post = {
    title,
    content,
    createdDate: new Date().toISOString(),
  };

  const result = await postService.updatePost(id, post);
  res.redirect(`/detail/${id}`);
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;

  const result = await postService.deletePost(id, password);

  if (result.ok) {
    return res.json({ isSuccess: true });
  } else {
    return res.json({ isSuccess: false });
  }
});

app.post("/comment/:id", async (req, res) => {
  const postId = req.params.id;
  const newComment = await postService.addComment(postId, req.body);

  return res.redirect(`/detail/${postId}`);
});

app.delete("/comment/:postId/:commentId", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const { password } = req.body;

  const result = await postService.deleteComment(postId, commentId, password);

  if (result.ok) {
    return res.json({ isSuccess: true });
  } else {
    return res.json({ isSuccess: false });
  }
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
