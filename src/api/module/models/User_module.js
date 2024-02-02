
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const User_module = sequelize.define("User_module", {

});
User_module.sync()
export default User_module

