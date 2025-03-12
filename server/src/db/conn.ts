import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

export let conn: Sequelize;
dotenv.config();

if (process.env.NODE_ENV === "test") {
  conn = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
} else {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL environment variable is not defined");
  }
  conn = new Sequelize(process.env.DB_URL);
}

export async function initDB() {
  try {
    await conn.sync({ alter: true, force: false });
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
