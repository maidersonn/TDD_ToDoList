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
