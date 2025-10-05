import { DataTypes } from "sequelize"
import pool from "../sql/index.js"

const User = pool.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        require: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    }
})

export default User