const request = require("supertest");
const app = require("../src/api/app");
const { seed, clean } = require("./dbForTest");
const create = require("../scripts/createdb");

beforeAll(async () => {
  await create();
});
beforeEach(async () => {
  await seed();
});
afterEach(async () => {
  await clean();
});
describe("DELETE", () => {
  it("DELETE /", () => {
    return request(app).delete("/").expect(204);
  });
  it("DELETE /:name", () => {
    return request(app).delete("/dni").expect(204);
  });
});
describe("POST", () => {
  it("POST /  => should create a new item", () => {
    return request(app)
      .post("/")
      .send({
        name: "korrika",
        description: "Día 20 de marzo pasa la korrika por el pueblo",
      })
      .expect(201)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "korrika",
          })
        );
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
  it("GET / should return status 200", () => {
    return request(app).get("/").expect(200);
  });
  it("GET / should return array of objects with 'name' and 'description' as keys.", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              description: expect.any(String),
            }),
          ])
        );
        expect(response.status).toBe(200);
      });
  });
});
describe("GET /:name", () => {
  it("GET /:name => should return status 200", () => {
    return request(app).get("/dni").expect(200).expect("Content-Type", /json/);
  });
  it("GET /:name => should return object containing the name and description", () => {
    return request(app)
      .get("/dni")
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "dni",
            description: expect.any(String),
          })
        );
      });
  });
  it("GET /:name => should return 404 if item not found", () => {
    return request(app).get("/foo").expect(404);
  });
});

describe("UPDATE", () => {
  it("UPDATE /:name", () => {
    return request(app)
      .put("/dni")
      .send({
        name: "carne de conducir",
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "carne de conducir",
            description: expect.any(String),
          })
        );
        expect(response.statusCode).toBe(200);
      });
  });
});
