import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

export let conn: Sequelize;
dotenv.config();

if (process.env.NODE_ENV === "test") {
    conn = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory',
    })
} else {
    if (!process.env.DB_URL) {
        throw new Error("DB_URL environment variable is not defined");
    }
    conn = new Sequelize(process.env.DB_URL);
}

export async function initDB() {
    await conn.sync({ alter: true });
}