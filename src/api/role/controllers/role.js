
import { getPagination, getMeta } from "../../../services/pagination.js";
import Role from "../models/role.js";
import { errorResponse } from "../../../services/errorResponse.js";
import Role_permission from "../../permission/models/Role_permission.js";

export const create = async (req, res) => {
    try {
        const { name, description, permissions } = req.body;
        const isRoleExists = await Role.findOne({ where: { name: name.toUpperCase() } })
        if (isRoleExists) {
            return res.status(400).send(errorResponse({ message: `role with the name ${name.toUpperCase()} already exists` }))
        }
        const role = await Role.create({ name: name.toUpperCase(), description }, { raw: true })
        if (permissions.length) {
            let arr = permissions.map((id) => {
                return { id: id, RoleId: 20, PermissionId: id }
            })
            await Role_permission.bulkCreate(arr)
        }
        return res.status(200).send({ data: role });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Failed to create a role' });
    }
};

export const find = async (req, res) => {
    try {
        const roles = await Role.findAll();
        return res.status(200).send({ data: roles });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ message: "Internal server error", status: 500, details: error.message }));
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params
        const isRoleExists = await Role.findByPk(id);
        if (!isRoleExists) {
            return res.status(404).send(errorResponse({ status: 404, message: `Role with id ${id} Not found!` }))
        }
        return res.status(200).send({ data: isRoleExists })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ message: "Internal server error", status: 500, details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const isRoleExists = await Role.findByPk(id)

        if (!isRoleExists) {
            return res.status(404).send(errorResponse({ status: 404, message: `Role with id ${id} not found` }))
        }
        const [rowCount, [role]] = await Role.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "role updated!", data: role })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ message: "internal server error", status: 500, details: error.message }));
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params
        const isRoleExists = Role.findByPk(id)

        if (!isRoleExists) {
            return res.status(404).send(errorResponse({ message: `Role with id ${id} Not Found!` }))
        }
        const role = await Role.destroy({ where: { id } });
        return res.status(200).send({ message: "role deleted!" })
    } catch (error) {
        console.log(error);
        res.status(500).send(errorResponse({ status: 500, message: "internal server error", details: error.message }));
    }
};

