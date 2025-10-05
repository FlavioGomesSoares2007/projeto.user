import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false
});

try {
  await sequelize.authenticate();
  console.log('banco conectado');
} catch (error) {
  console.error('Erro ao conectar no banco:', error);
}

export default sequelize;
