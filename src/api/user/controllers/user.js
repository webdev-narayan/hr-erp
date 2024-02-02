
// import { getPagination, getMeta } from "../../../services/pagination.js";
import { Op } from "sequelize";
import User from "../models/user.js";
import { errorResponse } from "../../../services/errorResponse.js";
import { getMeta, getPagination } from "../../../services/pagination.js";
// import { errorResponse } from "../../../services/errorResponse.js";

export const create = async (req, res) => {
    try {
        const body = req.body;
        const phone = body.phone.match(/\+91(\d{10})$|\d{10}$/)[1] || body.phone.match(/\+91(\d{10})$|\d{10}$/)[0];
        const isUserExists = await User.findOne({ where: { [Op.or]: [{ username: body.username }, { phone: phone }, { email: body.email }] } })
        if (isUserExists) {
            return res.status(409).send(errorResponse({ status: 409, message: "user with credential already exists" }))
        }
        const user = await User.create(req.body);
        return res.status(200).send({ data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
};

export const find = async (req, res) => {
    try {
        const query = req.query;
        const pagination = await getPagination(query.pagination)
        const users = await User.findAndCountAll({
            offset: pagination.offset,
            limit: pagination.limit,
            raw: true,
            attributes: { exclude: ["password"] }
        });
        const meta = await getMeta(pagination, users.count)
        return res.status(200).send({ data: users.rows, meta });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
};

export const findOne = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id, {
            attributes: { exclude: ["password"] }
        });
        if (!user) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        return res.status(200).send({ data: user })
    } catch (error) {
        console.log(error);
        return res.status(500).send(errorResponse({ status: 500, message: "Internal Server Error", details: error.message }));
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const isUserExists = await User.findByPk(id)
        if (!isUserExists) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const [rowCount, [user]] = await User.update(req.body, { where: { id }, returning: true, raw: true });
        return res.status(200).send({ message: "user updated!", data: user })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params
        const isUserExists = User.findByPk(id)
        if (!isUserExists) {
            return res.status(400).send(errorResponse({ message: "Invalid ID" }))
        }
        const user = await User.destroy({ where: { id } });
        return res.status(200).send({ message: "user deleted!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to fetch user' });
    }
};

