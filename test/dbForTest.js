const db = require("../src/config/db");
const { createSqlTag } = require("slonik");
const sql = createSqlTag();

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
module.exports = { seed: seed, clean: clean };
