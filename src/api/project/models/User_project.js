
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';
import User from '../../user/models/user.js';
import Project from './project.js';

const User_project = sequelize.define("User_project", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, key: "id",
      unique: "user_project_ids"
    }
  },
  ProjectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project, key: "id",
      unique: "user_project_ids"
    }
  }
}, {
  indexes: [{
    unique: true,
    fields: ["UserId", "ProjectId"]
  }]
});
User_project.sync();
export default User_project

