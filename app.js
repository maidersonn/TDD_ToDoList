require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todosRoute = require("./routes/todos");
const app = express();
const db = require("./config/db");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/", todosRoute(db));

module.exports = app;
