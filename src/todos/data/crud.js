const { createSqlTag } = require("slonik");
const sql = createSqlTag();

module.exports = (db) => {
  const create = async ({ name, description }) => {
    const pool = await db();
    try {
      const result =
        await pool.any(sql.unsafe`INSERT INTO todo (name, description)
              VALUES (${name}, ${description})
              RETURNING name
      `);
      return { name: result[0].name };
    } catch (error) {
      console.error("Error at insertTodo query: ", error.message);
      throw error;
    }
  };
  const getAll = async () => {
    const pool = await db();
    try {
      const result = await pool.any(sql.unsafe`      
              SELECT *
              FROM todo
      `);
      return result.map((todo) => {
        return { name: todo.name, description: todo.description };
      });
    } catch (error) {
      console.error("Error at getAll query: ", error.message);
      throw error;
    }
  };
  const getByName = async ({ name }) => {
    const pool = await db();
    try {
      const result = await pool.any(sql.unsafe`      
              SELECT *
              FROM todo
              WHERE name=${name}
      `);
      return result.length === 0
        ? undefined
        : { name: result[0].name, description: result[0].description };
    } catch (error) {
      console.error("Error at getByName query: ", error.message);
      throw error;
    }
  };
  const deleteAll = async () => {
    const pool = await db();
    try {
      pool.any(sql.unsafe`      
              DELETE FROM todo
          `);
    } catch (error) {
      console.error("Error at deleteAll query: ", error.message);
      throw error;
    }
  };
  const deleteByName = async ({ name }) => {
    const pool = await db();
    try {
      pool.any(sql.unsafe`
              DELETE FROM todo
              WHERE name=${name}
          `);
    } catch (error) {
      console.error("Error at deleteByName query: ", error.message);
      throw error;
    }
  };
  const updateByName = async ({ name, newName }) => {
    const pool = await db();
    try {
      pool.any(sql.unsafe`      
                  UPDATE todo
                  SET name=${newName}
                  WHERE name=${name};
          `);
    } catch (error) {
      console.error("Error at updateByName query: ", error.message);
      throw error;
    }
  };
  return { getAll, create, getByName, deleteAll, deleteByName, updateByName };
};
