const request = require("supertest");
const app = require("././app");
//const server = require("./server");

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
