
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const Application = sequelize.define("Application", {
  name: {
    type: DataTypes.STRING
  },
  address: { type: DataTypes.STRING, },
  city: { type: DataTypes.STRING },
  pin_code: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING }

});
Application.sync()
export default Application

