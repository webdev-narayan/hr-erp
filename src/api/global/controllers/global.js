
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Global from "../models/global.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const global = await Global.create(req.body);
           return res.status(200).send(global);
        } catch (error) {
            console.log(error);
           return res.status(500).send(error);
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const globals = await Global.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, globals.count)
            return res.status(200).send({ data: globals.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(error);
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const global =await  Global.findByPk(id);
            if (!global) {
                return res.status(404).send(errorResponse({status:404,message:"global not found!"}))
            }
                return res.status(200).send({data:global})
        } catch (error) {
            console.log(error);
           return res.status(500).send(error);
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getGlobal = await Global.findByPk(id)
            
            if (!getGlobal) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[global]] = await Global.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"global updated!",data:global})
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getGlobal =await  Global.findByPk(id)

            if (getGlobal) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const global = Global.destroy({ where: { id } });
            return res.status(200).send({message:"global deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    };

