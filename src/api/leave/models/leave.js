
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const Leave = sequelize.define("Leave", {
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    allowNull: false,
    defaultValue: 'PENDING',
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
Leave.sync()
export default Leave

