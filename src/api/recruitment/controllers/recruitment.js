
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Recruitment from "../models/recruitment.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const recruitment = await Recruitment.create(req.body);
           return res.status(200).send(recruitment);
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const recruitments = await Recruitment.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, recruitments.count)
            return res.status(200).send({ data: recruitments.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const recruitment = await Recruitment.findByPk(id);
            if (!recruitment) {
                return res.status(404).send(errorResponse({status:404,message:"recruitment not found!"}))
            }
                return res.status(200).send({data:recruitment})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getRecruitment = await Recruitment.findByPk(id)
            
            if (!getRecruitment) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[recruitment]] = await Recruitment.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"recruitment updated!",data:recruitment})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getRecruitment = await Recruitment.findByPk(id)

            if (getRecruitment) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const recruitment = Recruitment.destroy({ where: { id } });
            return res.status(200).send({message:"recruitment deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

