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

router.get("/", (req, res) => {
  res.status(200).json(todos);
});
router.get("/:name", (req, res) => {
  const todo = todos.find((todo) => todo.name === String(req.params.name));
  todo
    ? res.status(200).json(todo)
    : res.status(404).json({ message: "Not found" });
});
module.exports = router;
