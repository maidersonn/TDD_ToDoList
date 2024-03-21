require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todosRoute = require("./routes/todos");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/", todosRoute);

module.exports = app;
