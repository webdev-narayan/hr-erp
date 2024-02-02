
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Module from "../models/module.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const module = await Module.create(req.body);
           return res.status(200).send(module);
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const modules = await Module.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, modules.count)
            return res.status(200).send({ data: modules.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const module = await Module.findByPk(id);
            if (!module) {
                return res.status(404).send(errorResponse({status:404,message:"module not found!"}))
            }
                return res.status(200).send({data:module})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getModule = await Module.findByPk(id)
            
            if (!getModule) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[module]] = await Module.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"module updated!",data:module})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getModule = await Module.findByPk(id)

            if (getModule) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const module = Module.destroy({ where: { id } });
            return res.status(200).send({message:"module deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

