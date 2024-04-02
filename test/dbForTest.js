const db = require("../config/db.js");
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
const seed = async () => {
  const pool = await db();
  try {
    await pool.any(sql.unsafe`
            BEGIN;

            INSERT INTO todo (name, description)
            VALUES ('dni', 'llamar por teléfono para coger cita de renovación'),
                   ('pintar','Comprar pintura y pintar sala y comedor');
            
            
            COMMIT;        
            `);

    console.info("> instertion done! 🚀");
  } catch (error) {
    console.info("> insertion error! ❌");
    console.info(">", error.message);
  }
};

const clean = async () => {
  const pool = await db();
  try {
    await pool.any(sql.unsafe`
            BEGIN;

            DELETE FROM todo;
            COMMIT;        
            `);

    console.info("> cleaning done! 🚀");
  } catch (error) {
    console.info("> cleaning error! ❌");
    console.info(">", error.message);
  }
};
module.exports = { seed: seed, clean: clean, create: create };
