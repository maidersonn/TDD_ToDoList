module.exports = (service) => {
  const getAll = async (req, res) => {
    const todos = await service.getAll();
    res.status(200).json(todos);
  };
  const getByName = async (req, res) => {
    const name = req.params.name;
    const todo = await service.getByName({ name: name });
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  };
  const create = async (req, res) => {
    const todo = req.body;
    if (typeof todo.name !== "string" || typeof todo.description !== "string") {
      res.status(400).json({ message: "Validation Error" });
    } else {
      const newTodo = await service.create({
        name: todo.name,
        description: todo.description,
      });
      res.status(201).json(newTodo);
    }
  };
  const deleteAll = async (_, res) => {
    await service.deleteAll();
    const todos = await service.getAll();
    if (todos.length === 0) {
      res.status(204).json();
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  const deleteByName = async (req, res) => {
    const todo = req.params.name;
    await service.deleteByName({ name: todo });
    const deletedTodo = await service.getByName({ name: todo });
    if (!deletedTodo) {
      res.status(204).json();
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  const updateByName = async (req, res) => {
    const name = req.params.name;
    const newTodoName = req.body.name;
    await service.updateByName({ name: name, newName: newTodoName });
    const todo = await service.getByName({ name: newTodoName });
    res.status(200).json(todo);
  };
  return { getAll, getByName, create, deleteAll, deleteByName, updateByName };
};
