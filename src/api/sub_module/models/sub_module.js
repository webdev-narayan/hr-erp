
    import { DataTypes } from 'sequelize';
    import { sequelize } from '../../../../database/connection.js';

   const Sub_module = sequelize.define("Sub_module", {
    
    name: {
        type: DataTypes.STRING,
          },

    description: {
        type: DataTypes.STRING,
          },
    });
    Sub_module.sync()
    export default Sub_module

