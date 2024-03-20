const express = require("express");
const todosRoute = require("./routes/todos");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", todosRoute);

module.exports = app;
