
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import Payroll from "../models/payroll.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const payroll = await Payroll.create(req.body);
           return res.status(200).send(payroll);
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const payrolls = await Payroll.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, payrolls.count)
            return res.status(200).send({ data: payrolls.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const payroll = await Payroll.findByPk(id);
            if (!payroll) {
                return res.status(404).send(errorResponse({status:404,message:"payroll not found!"}))
            }
                return res.status(200).send({data:payroll})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getPayroll = await Payroll.findByPk(id)
            
            if (!getPayroll) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[payroll]] = await Payroll.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"payroll updated!",data:payroll})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const getPayroll = await Payroll.findByPk(id)

            if (getPayroll) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const payroll = Payroll.destroy({ where: { id } });
            return res.status(200).send({message:"payroll deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

