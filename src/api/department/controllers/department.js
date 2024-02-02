
import { getPagination, getMeta } from "../../../services/pagination.js";
import Department from "../models/department.js";
import { errorResponse } from "../../../services/errorResponse.js";
import { request, response } from "express";
export const create = async (req = request, res = response) => {
    try {
        const body = req.body;
        const { name, description } = body
        const isDprtExists = await Department.findOne({ where: { name: name.toUpperCase() } })
        if (isDprtExists) {
            return res.status(400).send(errorResponse({ message: "Department name already exists" }))
        }
        const department = await Department.create(req.body, { raw: true });
        return res.status(200).send({ data: department });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: error.message }));
    }
};

export const find = async (req = request, res = response) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination)
        const departments = await Department.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, departments.count)
        return res.status(200).send({ data: departments.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const findOne = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).send(errorResponse({ status: 404, message: "department not found!" }))
        }
        return res.status(200).send({ data: department })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const update = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getDepartment = await Department.findByPk(id)

        if (!getDepartment) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const [rowCount, [department]] = await Department.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "department updated!", data: department })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const destroy = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getDepartment = await Department.findByPk(id)

        if (getDepartment) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const department = Department.destroy({ where: { id } });
        return res.status(200).send({ message: "department deleted!" })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

