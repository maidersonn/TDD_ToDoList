const express = require("express");
const router = express.Router();

module.exports = (controller) => {
  router.get("/", controller.getAll);
  router.get("/:name", controller.getByName);
  router.post("/", controller.create);
  router.delete("/", controller.deleteAll);
  router.delete("/:name", controller.deleteByName);
  router.put("/:name", controller.updateByName);
  return router;
};
