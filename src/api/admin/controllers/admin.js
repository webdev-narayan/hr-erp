
import { getPagination, getMeta } from "../../../services/pagination.js";
import User from "../../user/models/user.js";
import { errorResponse } from "../../../services/errorResponse.js";
import { request, response } from "express";
import { Op } from "sequelize";
import Role from "../../role/models/role.js";
import { issue } from "../../../services/jwt.js";
import Permission from './../../permission/models/permission.js';
import Role_permission from './../../permission/models/Role_permission.js';
export const create = async (req = request, res = response) => {
    try {
        const body = req.body;
        const { name, username, password, email, phone } = body
        const isAdminExists = await User.findOne({
            where: { [Op.or]: [{ username }, { phone }, { email }] },
            raw: true
        })
        if (isAdminExists) {
            return res.status(400).send(errorResponse({ message: "User with credentials Already Exists" }))
        }
        const role = await Role.findOne({ where: { name: "ADMIN" }, raw: true })
        const admin = await User.create({
            name, username, password, email, phone,
            RoleId: role.id
        }, { raw: true });
        return res.status(200).send({ data: admin });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const find = async (req = request, res = response) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination)
        const admins = await User.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, admins.count)
        return res.status(200).send({ data: admins.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const findOne = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const admin = await User.findByPk(id);
        if (!admin) {
            return res.status(404).send(errorResponse({ status: 404, message: "admin not found!" }))
        }
        return res.status(200).send({ data: admin })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const update = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getAdmin = await User.findByPk(id)

        if (!getAdmin) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const [rowCount, [admin]] = await User.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "admin updated!", data: admin })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const destroy = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getAdmin = await User.findByPk(id)

        if (getAdmin) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const admin = User.destroy({ where: { id } });
        return res.status(200).send({ message: "admin deleted!" })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const loginAdmin = async (req = request, res = response) => {
    try {
        const body = req.body;
        const isAdminExists = await User.findOne({
            where: { [Op.or]: [{ username: body?.username }, { email: body?.email }] },
            raw: true,
            attributes: { exclude: ["password"] }
        })
        if (!isAdminExists) {
            return res.status(400).send(errorResponse({ message: "Invalid User Credentials" }))
        }
        const token = issue({ id: isAdminExists.id })

        return res.status(200).send({ jwt: token, data: isAdminExists });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: error.message }));
    }
};

export const allPermissions = async (req, res) => {
    try {
        const perms = await Permission.findAll({ attributes: ["id"], raw: true })
        const arr = perms.map((item) => {
            return { RoleId: req.body.RoleId, PermissionId: item.id }
        })
        await Role_permission.bulkCreate(arr, { updateOnDuplicate: ["RoleId", "PermissionId"] })
        return res.status(200).send({ message: "Role Permission Given" })
    } catch (error) {
        console.log(error)
        return res.status(500).send(errorResponse({ status: 500, message: error.message }))
    }
}
