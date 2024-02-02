
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Leave from "../models/leave.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const leave = await Leave.create(req.body);
           return res.status(200).send(leave);
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const leaves = await Leave.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, leaves.count)
            return res.status(200).send({ data: leaves.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const leave = await Leave.findByPk(id);
            if (!leave) {
                return res.status(404).send(errorResponse({status:404,message:"leave not found!"}))
            }
                return res.status(200).send({data:leave})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getLeave = await Leave.findByPk(id)
            
            if (!getLeave) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[leave]] = await Leave.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"leave updated!",data:leave})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getLeave = await Leave.findByPk(id)

            if (getLeave) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const leave = Leave.destroy({ where: { id } });
            return res.status(200).send({message:"leave deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

