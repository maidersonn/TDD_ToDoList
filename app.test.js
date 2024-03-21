const request = require("supertest");
const app = require("././app");

describe("GET /", () => {
  it("GET / should return status 200", () => {
    return request(app).get("/").expect(200).expect("Content-Type", /json/);
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
      });
  });
});
describe("GET /:name", () => {
  it("GET /name => should return status 200", () => {
    return request(app).get("/dni").expect(200).expect("Content-Type", /json/);
  });
  it("GET /:name => should return object containing the name", () => {
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
describe("POST", () => {
  it("POST /  => should create a new item", () => {
    return request(app)
      .post("/")
      .send({
        name: "korrika",
        description: "Día 20 de marzo pasa la korrika por el pueblo",
      })
      .expect(201)
      .expect("Content-Type", /json/);
  });
  it("POST / => should return 400 if property not string", () => {
    return request(app)
      .post("/")
      .send({
        name: undefined,
        description: "js",
      })
      .expect(400)
      .expect("Content-Type", /json/);
  });
});
describe("DELETE", () => {
  it("DELETE /", () => {
    return request(app).delete("/").expect(204);
  });
});
