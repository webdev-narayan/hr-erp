import { sequelize } from '../../database/connection.js';
import generator from '../api/permission/services/generator.js';
import Permission from './../api/permission/models/permission.js';
import * as relation from "./relation.js"
export default async function () {
    try {
        const { permissions } = await generator()
        const createdPermission = await Permission.bulkCreate(permissions, { updateOnDuplicate: ["api", "method", "endpoint", "name"] })
    } catch (error) {
        console.log(error)
    }
}