require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../config/db");
const crud = require("../todos/data/crud")(db);
const service = require("../todos/domain/service")(crud);
const controller = require("../controllers")(service);
const router = require("./router")(controller);

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/", router);

module.exports = app;
