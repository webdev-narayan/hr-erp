
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const Attendence = sequelize.define("Attendence", {
  checkInTime: {
    type: DataTypes.DATE,
  },
  checkOutTime: {
    type: DataTypes.DATE,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('PRESENT', 'ABSENT', "LEAVE"),
    allowNull: false,
    defaultValue: 'present', // Set a default value if needed
  },
  late: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  half_day: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});
Attendence.sync()
export default Attendence

