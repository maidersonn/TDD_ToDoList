const request = require("supertest");
const app = require("././app");
//const server = require("./server");

describe("GET /", () => {
  it("GET / should return object", () => {
    return request(app).get("/").expect(200);
  });
});
