
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';

const Global = sequelize.define("Global", {

  api: {
    type: DataTypes.STRING,
  },
});
Global.sync()
export default Global

