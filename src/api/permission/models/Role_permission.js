
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../../database/connection.js';
import Permission from './permission.js';
import Role from '../../role/models/role.js';

const Role_permission = sequelize.define("Role_permission", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true, 
    // },
    PermissionId: {
        type: DataTypes.INTEGER,
        references: { model: Permission, key: "id" },
        unique: "role_permission_ids"
    },
    RoleId: {
        type: DataTypes.INTEGER,
        unique: "role_permission_ids",
        references: { model: Role, key: "id", }
    }
}, {
    indexes: [{
        unique: true,
        fields: ["RoleId", "PermissionId"]
    }]
});

Role_permission.sync()
export default Role_permission 
