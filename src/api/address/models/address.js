
    import { DataTypes } from 'sequelize';
    import { sequelize } from '../../../../database/connection.js';

   const Address = sequelize.define("Address", {
    
    name: {
        type: DataTypes.STRING,
          },
    });
    Address.sync()
    export default Address

