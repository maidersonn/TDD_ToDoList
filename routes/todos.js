const express = require("express");
const router = express.Router();

let todos = [
  {
    name: "dni",
    description: "llamar por teléfono para coger cita de renovación",
  },
  {
    name: "pintar",
    description: "Comprar pintura y pintar sala y comedor",
  },
];

router.get("/", (_, res) => {
  res.status(200).json(todos);
});
router.get("/:name", (req, res) => {
  const todo = todos.find((todo) => todo.name === String(req.params.name));
  todo
    ? res.status(200).json(todo)
    : res.status(404).json({ message: "Not found" });
});
router.post("/", (req, res) => {
  const todo = req.body;
  console.log(todo.name);
  if (typeof todo.name !== "string" || typeof todo.description !== "string") {
    res.status(400).json({ message: "Validation Error" });
  }
  todos.push({ name: todo.name, description: todo.description });
  res.status(201).json();
});
router.delete("/", (_, res) => {
  todos = [];
  res.status(204).json();
});
module.exports = router;
