require("dotenv").config();
const slonik = require("slonik");

const db = async () => {
  const pool = await slonik.createPool(
    "postgres://user1:1234@127.0.0.1:5432/TDDexercise"
  );
  return pool;
};
module.exports = db;
