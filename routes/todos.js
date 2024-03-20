const express = require("express");
const router = express.Router();
const createError = require("http-errors");

router.get("/", (req, res) => {
  res.status(200).json();
});

module.exports = router;
