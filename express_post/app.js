const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

// Set view engine to handlebars
app.engine("hbs", handlebars.engine());
app.set("view_engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
