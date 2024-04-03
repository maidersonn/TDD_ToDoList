const { createSqlTag } = require("slonik");
const sql = createSqlTag();

const create = async (db, { name, description }) => {
  const pool = await db();
  try {
    const result = pool.any(sql.unsafe`INSERT INTO todo (name, description)
            VALUES (${name}, ${description})
            RETURNING name
    `);
    return result;
  } catch (error) {
    console.error("Error at insertTodo query: ", error.message);
    throw error;
  }
};
const getAll = async (db) => {
  const pool = await db();
  try {
    const result = pool.any(sql.unsafe`      
            SELECT *
            FROM todo
    `);
    return result;
  } catch (error) {
    console.error("Error at getAll query: ", error.message);
    throw error;
  }
};
const getByName = async (db, { name }) => {
  const pool = await db();
  try {
    const result = pool.any(sql.unsafe`      
            SELECT *
            FROM todo
            WHERE name=${name}
    `);
    return result.length === 0 ? undefined : result[0];
  } catch (error) {
    console.error("Error at getByName query: ", error.message);
    throw error;
  }
};
const deleteAll = async (db) => {
  const pool = await db();
  try {
    const result = pool.any(sql.unsafe`      
            DELETE FROM todo
        `);
  } catch (error) {
    console.error("Error at deleteAll query: ", error.message);
    throw error;
  }
};
const deleteByName = async (db, { name }) => {
  const pool = await db();
  try {
    const result = pool.any(sql.unsafe`
            DELETE FROM todo
            WHERE name=${name}
        `);
  } catch (error) {
    console.error("Error at deleteByName query: ", error.message);
    throw error;
  }
};
const updateByName = async (db, { name, newName }) => {
  const pool = await db();
  try {
    const result = pool.any(sql.unsafe`      
                UPDATE todo
                SET name=${newName}
                WHERE name=${name};
        `);
  } catch (error) {
    console.error("Error at updateByName query: ", error.message);
    throw error;
  }
};
module.exports = {
  create,
  getAll,
  getByName,
  deleteAll,
  deleteByName,
  updateByName,
};
