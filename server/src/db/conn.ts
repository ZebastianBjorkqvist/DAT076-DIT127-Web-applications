import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

export let conn: Sequelize;
dotenv.config();
if (process.env.NODE_ENV === "test") {
    if (!process.env.TEST_DB_URL) {
        throw new Error("TEST_DB_URL environment variable is not defined");
    }
    conn = new Sequelize(process.env.TEST_DB_URL);

} else {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL environment variable is not defined");
  }
  conn = new Sequelize(process.env.DB_URL);
}

export async function initDB(test : boolean = false) {
    if (test) {
        await conn.sync({ force: true, logging: false });
    }else{
        await conn.sync({ alter: true });
    }
}

export async function closeDB() {
    await conn.close();
}
