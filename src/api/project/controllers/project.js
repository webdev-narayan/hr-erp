
import { getPagination, getMeta } from "../../../services/pagination.js";
import Project from "../models/project.js";
import { errorResponse } from "../../../services/errorResponse.js";
import { request, response } from "express";
import Module from "../../module/models/module.js";
import { sequelize } from "../../../../database/connection.js";
import User_module from './../../module/models/User_module.js';
export const create = async (req = request, res = response) => {
    const transaction = await sequelize.transaction()
    try {
        const { modules } = req.body;
        const project = await Project.create(req.body,);
        let moduleObject = modules.map((item) => {
            return { name: item.name, note: item.note || null, ProjectId: project.id }
        })
        const module = await Module.bulkCreate(moduleObject)
        let user_module_array = []
        for (const [i, item] of module.entries()) {
            for (const id of modules[i].users) {
                user_module_array.push({ UserId: id, ModuleId: item.dataValues.id })
            }
        }

        let userModule = await User_module.bulkCreate(user_module_array)
        return res.status(200).send({ data: { project, module, userModule } });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req = request, res = response) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination)
        const projects = await Project.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit,
            include: [{ model: Module, as: "modules", include: "users" }]
        });
        const meta = await getMeta(pagination, projects.count)
        return res.status(200).send({ data: projects.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).send(errorResponse({ status: 404, message: "project not found!" }))
        }
        return res.status(200).send({ data: project })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getProject = await Project.findByPk(id)

        if (!getProject) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const [rowCount, [project]] = await Project.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "project updated!", data: project })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getProject = await Project.findByPk(id)

        if (getProject) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const project = Project.destroy({ where: { id } });
        return res.status(200).send({ message: "project deleted!" })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

