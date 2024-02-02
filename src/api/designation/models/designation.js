
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const Designation = sequelize.define("Designation", {
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});
Designation.sync()
export default Designation

