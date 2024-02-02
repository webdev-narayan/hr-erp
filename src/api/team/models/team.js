
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const Team = sequelize.define("Team", {
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});
Team.sync()
export default Team

