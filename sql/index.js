import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const conn = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,         // obrigatoriamente SSL
            rejectUnauthorized: false // aceita certificados autoassinados
        }
    },
    logging: false
});

export default conn;
