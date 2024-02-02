
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const Project = sequelize.define("Project", {
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM("NOT_STARTED", "IN_PROGRESS", "COMPLETED", "HOLD"),
    defaultValue: "NOT_STARTED"
  },
  note: {
    type: DataTypes.STRING,
  },
});
Project.sync()
export default Project

