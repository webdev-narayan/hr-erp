
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Application from "../models/application.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const application = await Application.create(req.body);
           return res.status(200).send(application);
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const applications = await Application.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, applications.count)
            return res.status(200).send({ data: applications.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const application = await Application.findByPk(id);
            if (!application) {
                return res.status(404).send(errorResponse({status:404,message:"application not found!"}))
            }
                return res.status(200).send({data:application})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getApplication = await Application.findByPk(id)
            
            if (!getApplication) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[application]] = await Application.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"application updated!",data:application})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getApplication = await Application.findByPk(id)

            if (getApplication) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const application = Application.destroy({ where: { id } });
            return res.status(200).send({message:"application deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

