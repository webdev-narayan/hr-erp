
import { getPagination, getMeta } from "../../../services/pagination.js";
import Team from "../models/team.js";
import { errorResponse } from "../../../services/errorResponse.js";
import { request, response } from "express";
export const create = async (req = request, res = response) => {
    try {

        const team = await Team.create(req.body);
        return res.status(200).send(team);
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const find = async (req = request, res = response) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination)
        const teams = await Team.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit
        });
        const meta = await getMeta(pagination, teams.count)
        return res.status(200).send({ data: teams.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const findOne = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const team = await Team.findByPk(id);
        if (!team) {
            return res.status(404).send(errorResponse({ status: 404, message: "team not found!" }))
        }
        return res.status(200).send({ data: team })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getTeam = await Team.findByPk(id)

        if (!getTeam) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const [rowCount, [team]] = await Team.update(req.body, { where: { id }, returning: true });
        return res.status(200).send({ message: "team updated!", data: team })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const destroy = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const getTeam = await Team.findByPk(id)

        if (getTeam) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const team = Team.destroy({ where: { id } });
        return res.status(200).send({ message: "team deleted!" })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

