
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';
import User from './../../user/models/user.js';

const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT
    }
});

Role.sync({ alter: true })
export default Role;