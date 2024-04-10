//server.js
const { nanoid } = require("nanoid");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 7000;

let todos = [
  {
    id: nanoid(),
    title: "todo 1",
    completed: true,
  },
  {
    id: nanoid(),
    title: "todo 2",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 3",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 4",
    completed: false,
  },
  {
    id: nanoid(),
    title: "todo 5",
    completed: false,
  },
];

// Initial setting (with cors)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Controllers
app.get("/api", (req, res) => {
  res.json({ text: "Hello World!" });
});

app.get("/api/todos", (req, res) => res.send(todos));

app.post("/api/todos", (req, res) => {
  const todo = { title: req.body.title, id: nanoid(), completed: false };
  todos.push(todo);
  return res.send(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const targetTodo = todos.find((todo) => todo.id == id);
  if (targetTodo) {
    targetTodo.completed = !targetTodo.completed;
  }
  return res.send(targetTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

// Check server listen
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
