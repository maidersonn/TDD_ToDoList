const createTodoList = require("./index");

test("should return an empty object", () => {
  expect(createTodoList()).toEqual({});
});
