import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://postgres@localhost:5432');

export async function initDB(){
    await sequelize.sync({alter: true});
}