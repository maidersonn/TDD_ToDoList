const express = require("express");
const router = express.Router();
const createError = require("http-errors");

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

router.get("/", (req, res) => {
  res.status(200).json(todos);
});
router.get("/:name", (req, res) => {
  const todo = todos.find((todo) => todo.name === String(req.params.name));
  res.status(200).json(todo);
});
module.exports = router;
