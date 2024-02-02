
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';
import Role from '../../role/models/role.js';


const User = sequelize.define("User", {
    name: { type: DataTypes.STRING },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
    },
    country_code: {
        type: DataTypes.STRING,
        defaultValue: "+91"
    },
    password: {
        type: DataTypes.STRING,
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    employement_type: {
        type: DataTypes.ENUM("FULL_TIME", "PART_TIME", "INTERN", "CONTRACT"),
        defaultValue: "INTERN"
    }
});

export default User