
    import { DataTypes } from 'sequelize';
    import { sequelize } from '../../../../database/connection.js';

   const Payroll = sequelize.define("Payroll", {
    
    name: {
        type: DataTypes.STRING,
          },
    });
    Payroll.sync()
    export default Payroll

