
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const Module = sequelize.define("Module", {
  name: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.TEXT
  }
});
Module.sync()
export default Module

