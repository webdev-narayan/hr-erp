
    import { DataTypes } from 'sequelize';
    import { sequelize } from '../../../../database/connection.js';

   const Recruitment = sequelize.define("Recruitment", {
    
    name: {
        type: DataTypes.STRING,
          },
    });
    Recruitment.sync()
    export default Recruitment

