const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

// Set view engine to handlebars
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", { title: "안녕하세요!", message: "만나서 반갑습니다." });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
