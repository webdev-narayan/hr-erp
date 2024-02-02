
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Attendence from "../models/attendence.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const attendence = await Attendence.create(req.body);
           return res.status(200).send(attendence);
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const attendences = await Attendence.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, attendences.count)
            return res.status(200).send({ data: attendences.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const attendence = await Attendence.findByPk(id);
            if (!attendence) {
                return res.status(404).send(errorResponse({status:404,message:"attendence not found!"}))
            }
                return res.status(200).send({data:attendence})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getAttendence = await Attendence.findByPk(id)
            
            if (!getAttendence) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[attendence]] = await Attendence.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"attendence updated!",data:attendence})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getAttendence = await Attendence.findByPk(id)

            if (getAttendence) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const attendence = Attendence.destroy({ where: { id } });
            return res.status(200).send({message:"attendence deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

