const express = require("express");
const {
  getAll,
  create,
  getByName,
  deleteAll,
  deleteByName,
  updateByName,
} = require("../data/crud");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    const todos = await getAll(db);
    res.status(200).json(todos);
  });
  router.get("/:name", async (req, res) => {
    const name = req.params.name;
    const todo = await getByName(db, { name: name });
    if (todo[0]) {
      res.status(200).json(todo[0]);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });
  router.post("/", async (req, res) => {
    const todo = req.body;
    if (typeof todo.name !== "string" || typeof todo.description !== "string") {
      res.status(400).json({ message: "Validation Error" });
    } else {
      const newTodo = await create(db, {
        name: todo.name,
        description: todo.description,
      });
      console.log(newTodo);
      res.status(201).json(newTodo[0]);
    }
  });

  router.delete("/", async (_, res) => {
    await deleteAll(db);
    const todos = await getAll(db);
    if (!todos[0]) {
      res.status(204).json();
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  router.delete("/:name", async (req, res) => {
    const todo = req.params.name;
    await deleteByName(db, { name: todo });
    const deletedTodo = await getByName(db, { name: todo });
    if (!deletedTodo[0]) {
      res.status(204).json();
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  router.put("/:name", async (req, res) => {
    const name = req.params.name;
    const newTodoName = req.body.name;
    await updateByName(db, { name: name, newName: newTodoName });
    const todo = await getByName(db, { name: newTodoName });
    res.status(200).json(todo[0]);
  });
  return router;
};
