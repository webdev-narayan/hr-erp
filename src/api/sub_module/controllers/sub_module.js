
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Sub_module from "../models/sub_module.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const sub_module = await Sub_module.create(req.body);
           return res.status(200).send(sub_module);
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const sub_modules = await Sub_module.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, sub_modules.count)
            return res.status(200).send({ data: sub_modules.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const sub_module = await Sub_module.findByPk(id);
            if (!sub_module) {
                return res.status(404).send(errorResponse({status:404,message:"sub_module not found!"}))
            }
                return res.status(200).send({data:sub_module})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getSub_module = await Sub_module.findByPk(id)
            
            if (!getSub_module) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[sub_module]] = await Sub_module.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"sub_module updated!",data:sub_module})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getSub_module = await Sub_module.findByPk(id)

            if (getSub_module) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const sub_module = Sub_module.destroy({ where: { id } });
            return res.status(200).send({message:"sub_module deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

