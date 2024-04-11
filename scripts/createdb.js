const db = require("../src/config/db");
const { createSqlTag } = require("slonik");
const sql = createSqlTag();

const create = async () => {
  const pool = await db();
  try {
    pool.any(sql.unsafe`
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            `);
    pool.any(sql.unsafe`     
                CREATE TABLE IF NOT EXISTS todo (
                    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                    name TEXT UNIQUE NOT NULL,
                    description TEXT
                );
            `);

    console.info("> creation done! 🚀");
  } catch (error) {
    console.info("> creation error! ❌");
    console.info(">", error.message);
  }
};
module.exports = create;
