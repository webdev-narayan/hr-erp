
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';
import Team from '../../team/models/team.js';

const Department = sequelize.define("Department", {
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },

});
// Department.sync()
export default Department

