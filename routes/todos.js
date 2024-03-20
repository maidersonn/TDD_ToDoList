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

module.exports = router;
