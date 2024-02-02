
import { getPagination, getMeta } from "../../../services/pagination.js";
import Designation from "../models/designation.js";
import { errorResponse } from "../../../services/errorResponse.js";
import { request, response } from "express";
import { sequelize } from './../../../../database/connection.js';

export const create = async (req = request, res = response) => {
    try {
        const designation = await Designation.create(req.body);
        return res.status(200).send(designation);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req = request, res = response) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination)
        const designations = await Designation.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit,
            attributes: { include: [[sequelize.literal('(SELECT COUNT(*) FROM "Users" WHERE "Users"."DesignationId" = "Designation"."id")'), "employees"]] }
        });

        const meta = await getMeta(pagination, designations.count)
        return res.status(200).send({ data: designations.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const designation = await Designation.findByPk(id);
        if (!designation) {
            return res.status(404).send(errorResponse({ status: 404, message: "designation not found!" }))
        }
        return res.status(200).send({ data: designation })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getDesignation = await Designation.findByPk(id)

        if (!getDesignation) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const [rowCount, [designation]] = await Designation.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "designation updated!", data: designation })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getDesignation = await Designation.findByPk(id)

        if (getDesignation) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const designation = Designation.destroy({ where: { id } });
        return res.status(200).send({ message: "designation deleted!" })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

