const request = require("supertest");
const app = require("../app");
const crud = require("../data/crud");
jest.mock("../data/crud");

describe("DELETE", () => {
  it("DELETE / should return 204 if everythin ok", () => {
    crud.deleteAll.mockResolvedValue(Promise.resolve());
    crud.getAll.mockResolvedValue(Promise.resolve([]));
    return request(app).delete("/").expect(204);
  });
  it("DELETE / should return 500 if something wrong", () => {
    crud.deleteAll.mockResolvedValue(Promise.resolve());
    crud.getAll.mockResolvedValue(
      Promise.resolve([{ name: "dni", description: "ffoo" }])
    );
    return request(app).delete("/").expect(500);
  });
  it("DELETE /:name should return 204 if everythin ok", () => {
    crud.deleteByName.mockResolvedValue(Promise.resolve());
    crud.getByName.mockResolvedValue(Promise.resolve(undefined));
    return request(app).delete("/dni").expect(204);
  });
  it("DELETE /:name should return 500 if something wrong", () => {
    crud.deleteByName.mockResolvedValue(Promise.resolve());
    crud.getByName.mockResolvedValue(
      Promise.resolve({ name: "dni", description: "ffoo" })
    );
    return request(app).delete("/dni").expect(500);
  });
});

describe("POST", () => {
  it("POST /  => should create a new item", () => {
    const newTodo = {
      name: "korrika",
      description: "Día 20 de marzo pasa la korrika por el pueblo",
    };
    crud.create.mockResolvedValue(Promise.resolve([newTodo]));
    return request(app)
      .post("/")
      .send(newTodo)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(newTodo);
      });
  });
  it("POST / => should return 400 if property not string", () => {
    return request(app)
      .post("/")
      .send({
        description: "js",
      })
      .expect(400)
      .expect("Content-Type", /json/);
  });
});

describe("GET /", () => {
  it("GET / should return response with array of objects with 'name' and 'description' as keys and status 200", () => {
    const todos = [
      {
        name: "korrika",
        description: "Día 20 de marzo pasa la korrika por el pueblo",
      },
    ];
    crud.getAll.mockResolvedValue(Promise.resolve(todos));
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.body).toEqual(todos);
        expect(response.status).toBe(200);
      });
  });
});

describe("GET /:name", () => {
  it("GET /name => should return status 200", () => {
    crud.getByName.mockResolvedValue(Promise.resolve("whatever"));
    return request(app).get("/dni").expect(200).expect("Content-Type", /json/);
  });
  it("GET /:name => should return object containing the name and description", () => {
    const todo = {
      name: "korrika",
      description: "Día 20 de marzo pasa la korrika por el pueblo",
    };
    crud.getByName.mockResolvedValue(Promise.resolve(todo));
    return request(app)
      .get("/korrika")
      .then((response) => {
        expect(response.body).toEqual(todo);
      });
  });
  it("GET /:name => should return 404 if item not found", () => {
    crud.getByName.mockResolvedValue(Promise.resolve(undefined));
    return request(app).get("/foo").expect(404);
  });
});

describe("UPDATE", () => {
  it("UPDATE /:name", () => {
    const todo = { name: "carne de conducer", description: "futu" };
    crud.updateByName.mockResolvedValue(Promise.resolve(true));
    crud.getByName.mockResolvedValue(Promise.resolve(todo));
    return request(app)
      .put("/dni")
      .send({
        name: "carne de conducir",
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(todo);
        expect(response.statusCode).toBe(200);
      });
  });
});
